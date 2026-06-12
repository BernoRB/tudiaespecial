import { Router } from "express";
import path from "path";
import fs from "fs";
import { Order } from "../db";
import { getRelatedSeoPages, getSeoPage, seoPages } from "../seoPages";

const router = Router();

function getHeaderValue(value: string | string[] | undefined): string | null {
  if (Array.isArray(value)) {
    return value[0] || null;
  }
  return value || null;
}

function getVisitorCountry(req: any): string | null {
  const country = getHeaderValue(req.headers["cf-ipcountry"]);
  return country ? country.toUpperCase() : null;
}

// Función para enviar notificación a Discord
async function sendDiscordNotification(order: any) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return;
  }

  const message = {
    content: "🎉 **Nueva solicitud creada**",
    embeds: [
      {
        title: "Datos del cliente",
        color: 0xD4AF37, // Color dorado
        fields: [
          { name: "Nombre", value: order.customer_name || "No especificado", inline: true },
          { name: "Categoría", value: order.category || "No especificado", inline: true },
          { name: "Email", value: order.customer_email || "No especificado", inline: false },
          { name: "WhatsApp", value: order.customer_whatsapp || "No especificado", inline: false },
          { name: "ID de orden", value: order._id.toString(), inline: false },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    if (!response.ok) {
      console.error("Failed to send Discord notification:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending Discord notification:", error);
  }
}

// Landing: renderizamos la landing actual como vista EJS
router.get("/", (req, res) => {
  res.render("landing", {
    country: getVisitorCountry(req),
  });
});

router.get("/debug/country", (req, res) => {
  res.json({
    country: getVisitorCountry(req),
    cfIpCountry: getHeaderValue(req.headers["cf-ipcountry"]),
    cfRay: getHeaderValue(req.headers["cf-ray"]),
    xForwardedFor: getHeaderValue(req.headers["x-forwarded-for"]),
  });
});

// Páginas SEO
router.get("/blog", (req, res) => {
  res.render("seo/index", {
    pages: seoPages,
  });
});

seoPages.forEach((page) => {
  router.get(`/${page.slug}`, (req, res) => {
    const seoPage = getSeoPage(page.slug);
    if (!seoPage) {
      return res.status(404).render("errors/404", { url: req.originalUrl });
    }

    res.render("seo/article", {
      page: seoPage,
      relatedPages: getRelatedSeoPages(seoPage),
    });
  });
});

// Sitemap XML dinámico
router.get("/sitemap.xml", (req, res) => {
  const baseUrl = "https://tudiaespecial.com";
  const currentDate = new Date().toISOString();

  const urls = [
    { loc: `${baseUrl}/`, lastmod: currentDate, changefreq: "weekly", priority: "1.0" },
    { loc: `${baseUrl}/blog`, lastmod: currentDate, changefreq: "weekly", priority: "0.7" },
    ...seoPages.map((page) => ({
      loc: `${baseUrl}/${page.slug}`,
      lastmod: page.updatedAt,
      changefreq: "monthly",
      priority: "0.8",
    })),
    { loc: `${baseUrl}/solicitud`, lastmod: currentDate, changefreq: "monthly", priority: "0.5" },
  ];

  // Agregar demos dinámicamente
  const demoCategories: string[] = ["bodas", "quinces", "bautismos", "peques", "ninos", "eventos"];
  const demoTemplates: Record<string, string[]> = {
    bodas: ["boda_minimal", "boda_midnight", "boda_garden", "boda_ethereal", "boda_eclipse"],
    quinces: ["quinces_glow", "quinces_royal", "quinces_velvet", "quinces_floral", "quinces_diamond"],
    bautismos: ["bautismo_soft", "bautismo_garden"],
    peques: ["peques_soft", "peques_cloud", "peques_dream"],
    ninos: ["ninos_batman", "ninos_ironman", "ninos_spiderman"],
    eventos: ["eventos_dark", "eventos_light", "eventos_anniversary", "eventos_bachelor", "eventos_bachelorette", "eventos_bbq"]
  };

  demoCategories.forEach((category: string) => {
    demoTemplates[category].forEach((template: string) => {
      urls.push({
        loc: `${baseUrl}/demo/${category}/${template}`,
        lastmod: currentDate,
        changefreq: "monthly",
        priority: "0.6"
      });
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  res.header("Content-Type", "application/xml");
  res.send(sitemap);
});

// Formulario de solicitud - Paso 1 (Lead capture)
router.get("/solicitud", (req, res) => {
  res.render("solicitud-paso1");
});

router.post("/solicitud/paso1", async (req, res) => {
  const {
    customer_name,
    category,
    contact_email,
    contact_whatsapp,
  } = req.body;

  const rawForm = JSON.stringify(req.body);

  const order = await Order.create({
    customer_name,
    customer_email: contact_email,
    customer_whatsapp: contact_whatsapp || "",
    category,
    template_key: undefined,
    raw_form_json: req.body,
    status: "lead",
  });

  // Enviar notificación a Discord (fire and forget)
  sendDiscordNotification(order).catch(err => console.error('Discord notification error:', err));

  res.redirect(`/solicitud/paso2/${order._id}`);
});

// Formulario de solicitud - Paso 2 (Datos completos)
router.get("/solicitud/paso2/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  
  let order;
  try {
    order = await Order.findById(orderId);
  } catch (error) {
    console.error("Invalid order ID format:", orderId);
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  if (!order) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  res.render("solicitud-paso2", { order });
});

router.post("/solicitud/paso2/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const {
    template_key,
    honorees,
    hero_message,
    date,
    time,
    venue_name,
    venue_address,
    maps_url,
    dress_code,
    notes,
    // Secciones
    section_countdown,
    section_gallery,
    section_gallery2,
    section_location,
    section_itinerary,
    section_trivia,
    section_dress_code,
    section_gifts,
    section_rsvp,
    // Para bodas - múltiples ceremonias
    civil_enabled,
    civil_date,
    civil_time,
    civil_address,
    church_enabled,
    church_date,
    church_time,
    church_address,
    party_enabled,
    party_date,
    party_time,
    party_address,
    // Para quinces
    reserved_color,
    // Para nuevas categorías
    age_years,
    event_type,
  } = req.body;

  // Obtener el order existente
  let order;
  try {
    order = await Order.findById(orderId);
  } catch (error) {
    console.error("Invalid order ID format:", orderId);
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }
  if (!order) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  // Construir ceremonies si es boda
  let ceremonies = null;
  if (order.category === "bodas") {
    ceremonies = {
      civil: {
        enabled: !!civil_enabled,
        date: civil_date || "",
        time: civil_time || "",
        address: civil_address || "",
      },
      church: {
        enabled: !!church_enabled,
        date: church_date || "",
        time: church_time || "",
        address: church_address || "",
      },
      party: {
        enabled: !!party_enabled,
        date: party_date || "",
        time: party_time || "",
        address: party_address || "",
      },
    };
  }

  // Construir sections_json según el tipo de evento
  const sections = {
    countdown: !!section_countdown,
    gallery: !!section_gallery,
    gallery2: !!section_gallery2,
    location: !!section_location,
    itinerary: !!section_itinerary,
    trivia: !!section_trivia,
    dress_code: !!section_dress_code,
    gifts: !!section_gifts,
    rsvp: !!section_rsvp,
  };

  // Actualizar el order con todos los datos
  try {
    await Order.findByIdAndUpdate(orderId, {
      template_key,
      raw_form_json: { ...order.raw_form_json, ...req.body },
      status: "pending",
      updated_at: new Date(),
    });
  } catch (error) {
    console.error("Invalid order ID format for update:", orderId);
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  res.redirect(`/pago/${orderId}`);
});

// Formulario antiguo (mantener por compatibilidad temporal)
router.post("/solicitud", async (req, res) => {
  const {
    category,
    template_key,
    honorees,
    date,
    time,
    venue_name,
    venue_address,
    maps_url,
    dress_code,
    hero_message,
    contact_email,
    contact_whatsapp,
  } = req.body;

  const sections = {
    gallery: !!req.body.section_gallery,
    dress_code: !!req.body.section_dress_code,
    location: !!req.body.section_location,
    itinerary: !!req.body.section_itinerary,
    gifts: !!req.body.section_gifts,
    music: !!req.body.section_music,
  };

  const order = await Order.create({
    customer_email: contact_email,
    customer_whatsapp: contact_whatsapp,
    category,
    template_key,
    raw_form_json: req.body,
  });

  res.redirect(`/pago/${order._id}`);
});

// Pantalla de pago
router.get("/pago/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  
  let order;
  try {
    order = await Order.findById(orderId);
  } catch (error) {
    console.error("Invalid order ID format:", orderId);
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  if (!order) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  res.render("pago", { order });
});

router.post("/pago/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const paymentMethod = req.body.payment_method;

  let order;
  try {
    order = await Order.findById(orderId);
  } catch (error) {
    console.error("Invalid order ID format:", orderId);
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }
  
  if (!order) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  try {
    await Order.findByIdAndUpdate(orderId, {
      payment_method: paymentMethod,
      updated_at: new Date(),
    });
  } catch (error) {
    console.error("Invalid order ID format for update:", orderId);
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  if (paymentMethod === "transferencia") {
    return res.render("pago-transferencia", { order });
  }

  if (paymentMethod === "mercadopago") {
    const mpLink =
      process.env.MP_LINK ||
      "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=TU_LINK_AQUI";
    return res.redirect(mpLink);
  }

  return res.redirect("/gracias");
});

// Pantalla final de gracias
router.get("/gracias", (req, res) => {
  res.render("gracias");
});

// Pantalla de confirmación después de transferencia
router.get("/confirmacion/:orderId", async (req, res) => {
  const orderId = req.params.orderId;

  let order;
  try {
    order = await Order.findById(orderId);
  } catch (error) {
    console.error("Invalid order ID format:", orderId);
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  if (!order) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  res.render("gracias");
});

// Demos de templates
router.get("/demo/:category/:templateKey", (req, res) => {
  const { category, templateKey } = req.params;

  const demoPath = path.join(
    __dirname,
    "..",
    "..",
    "data",
    "demos",
    `${templateKey}.json`
  );

  if (!fs.existsSync(demoPath)) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  const json = JSON.parse(fs.readFileSync(demoPath, "utf-8"));
  const sections = json.sections || {};

  res.render(`templates/${templateKey}`, {
    event: json,
    sections,
    gallery: json.gallery || [],
    itinerary: json.itinerary || {},
    isDemo: true,
    req,
  });
});

// Sitemap.xml
router.get("/sitemap.xml", (req, res) => {
  const sitemapPath = path.join(__dirname, "..", "..", "public", "sitemap.xml");
  if (fs.existsSync(sitemapPath)) {
    res.sendFile(sitemapPath);
  } else {
    res.status(404).send("Sitemap not found");
  }
});

// Robots.txt
router.get("/robots.txt", (req, res) => {
  const robotsPath = path.join(__dirname, "..", "..", "public", "robots.txt");
  if (fs.existsSync(robotsPath)) {
    res.sendFile(robotsPath);
  } else {
    res.status(404).send("Robots.txt not found");
  }
});

export default router;
