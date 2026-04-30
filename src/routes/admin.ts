import { Router, Request, Response, NextFunction } from "express";
import { Event, Order, Rsvp } from "../db";

const router = Router();

interface AuthedRequest extends Request {
  session?: Record<string, any> | null;
}

async function getEventBySlug(slug: string) {
  try {
    return await Event.findOne({ slug });
  } catch (error) {
    console.log('Error finding event by slug:', slug, error);
    return null;
  }
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const session: any = (req as any).session;
  if (session && session[`admin_${slug}`]) {
    return next();
  }
  return res.redirect(`/${slug}/admin/login`);
}

function requireOwner(req: Request, res: Response, next: NextFunction) {
  const session: any = (req as any).session;
  if (session && session.owner_logged_in) {
    return next();
  }
  return res.redirect("/admin/orders/login");
}

async function getOrdersForDashboard() {
  console.log('=== GET ORDERS DEBUG ===');
  const orders = await Order.find().sort({ created_at: -1 }).lean();
  console.log('Orders found:', orders.length);
  const result = [];
  for (const order of orders) {
    console.log('Processing order:', order._id, 'event_id:', order.event_id);
    let eventSlug = null;
    let eventAdminPin = null;
    if (order.event_id) {
      console.log('Trying to find event with event_id:', order.event_id);
      try {
        const event = await Event.findById(order.event_id).lean();
        if (event) {
          eventSlug = event.slug;
          eventAdminPin = event.admin_pin;
        }
      } catch (error) {
        console.log('Invalid event_id format:', order.event_id);
      }
    }
    let notes = "";
    if (order.raw_form_json && typeof order.raw_form_json === 'object') {
      notes = (order.raw_form_json as any).notes || "";
    }
    result.push({ ...order, event_slug: eventSlug, event_admin_pin: eventAdminPin, notes });
  }
  console.log('========================');
  return result;
}

router.get("/:slug/admin/login", async (req: Request, res: Response) => {
  const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const event = await getEventBySlug(slug);
  if (!event) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }
  res.render("admin/login", { slug, error: null });
});

router.post("/:slug/admin/login", async (req: Request, res: Response) => {
  const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const event = await getEventBySlug(slug);
  if (!event) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  const { pin } = req.body as { pin?: string };
  if (pin && pin === event.admin_pin) {
    const session: any = (req as any).session;
    if (session) {
      session[`admin_${slug}`] = true;
    }
    return res.redirect(`/${slug}/admin`);
  }

  return res.render("admin/login", {
    slug,
    error: "PIN incorrecto. Intentá nuevamente.",
  });
});

router.get("/:slug/admin", requireAdmin, async (req: Request, res: Response) => {
  const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const event = await getEventBySlug(slug);
  if (!event) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  const rsvps = await Rsvp.find({ event_id: event._id }).sort({ created_at: -1 }).lean();

  const totals = rsvps.reduce(
    (acc, r) => {
      if (r.status === "confirmed") {
        acc.confirmedCount += r.people_count;
      }
      if (r.status === "declined") {
        acc.declinedCount += r.people_count;
      }
      return acc;
    },
    { confirmedCount: 0, declinedCount: 0 }
  );

  res.render("admin/dashboard", {
    event,
    rsvps,
    totals,
  });
});

// Admin global de pedidos
router.get("/admin/orders/login", (req: Request, res: Response) => {
  res.render("admin/orders-login", { error: null });
});

router.post("/admin/orders/login", (req: Request, res: Response) => {
  const { pin } = req.body as { pin?: string };
  const masterPin = process.env.OWNER_ADMIN_PIN || "admin123";
  if (pin && pin === masterPin) {
    const session: any = (req as any).session;
    if (session) {
      session.owner_logged_in = true;
    }
    return res.redirect("/admin/orders");
  }
  return res.render("admin/orders-login", {
    error: "PIN incorrecto.",
  });
});

router.get("/admin/orders", requireOwner, async (req: Request, res: Response) => {
  const orders = await getOrdersForDashboard();
  res.render("admin/orders-dashboard", {
    orders,
    published: null,
  });
});

router.get("/admin/orders/:id/publish", requireOwner, async (req: Request, res: Response) => {
  const orderId = req.params.id;
  
  let order;
  try {
    order = await Order.findById(orderId);
  } catch (error) {
    console.log('Invalid order ID format:', orderId);
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }
  
  if (!order) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  if (order.event_id) {
    return res.redirect(`/admin/events/${order.event_id}/edit`);
  }

  const formData = order.raw_form_json as any || {};
  
  res.render("admin/order-publish", {
    order,
    formData,
  });
});

router.post("/admin/orders/:id/publish", requireOwner, async (req: Request, res: Response) => {
  const orderId = req.params.id;
  
  let order;
  try {
    order = await Order.findById(orderId);
  } catch (error) {
    console.log('Invalid order ID format:', orderId);
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }
  
  if (!order) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  const payload = order.raw_form_json as any || {};
  const body = req.body as Record<string, string | undefined>;

  // Generar slug y admin pin
  const honorees = body.honorees || payload.honorees || "Evento";
  const slugBase = String(honorees)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 28) || `evento${orderId}`;
  const slug = `${slugBase}${orderId}`;
  const adminPin = body.admin_pin || Math.floor(1000 + Math.random() * 9000).toString();

  // Procesar slug personalizado
  const customSlugNormalized = (body.custom_slug || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 40);
  const finalSlug = customSlugNormalized || slug;

  // Construir objeto sections desde checkboxes
  const sections = {
    countdown: !!body.section_countdown,
    gallery: !!body.section_gallery,
    gallery2: !!body.section_gallery2,
    location: !!body.section_location,
    itinerary: !!body.section_itinerary,
    trivia: !!body.section_trivia,
    dress_code: !!body.section_dress_code,
    gifts: !!body.section_gifts,
    rsvp: !!body.section_rsvp,
  };

  // Procesar galerías
  const gallery = (body.gallery_urls || "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  const gallery2 = (body.gallery2_urls || "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  // Construir itinerary según categoría
  let itinerary: any = {};
  let ceremonies: any = {};

  if (order.category === 'bodas' || order.category === 'bautismos') {
    // Para bodas y bautismos: usar ceremonies sin requerir todos los bloques.
    ceremonies = {
      civil: {
        enabled: order.category === 'bodas' && (!!payload.civil_enabled || !!body.civil_date || !!body.civil_time || !!body.civil_address),
        date: body.civil_date || payload.civil_date || "",
        time: body.civil_time || payload.civil_time || "",
        address: body.civil_address || payload.civil_address || "",
      },
      church: {
        enabled: !!payload.church_enabled || !!body.church_date || !!body.church_time || !!body.church_address || !!body.church_name,
        name: body.church_name || payload.church_name || "",
        date: body.church_date || payload.church_date || body.date || payload.date || "",
        time: body.church_time || payload.church_time || "",
        address: body.church_address || payload.church_address || "",
      },
      party: {
        enabled: !!payload.party_enabled || !!body.party_date || !!body.party_time || !!body.party_address || !!body.party_name,
        name: body.party_name || payload.party_name || body.venue_name || payload.venue_name || "",
        date: body.party_date || payload.party_date || payload.date || "",
        time: body.party_time || payload.party_time || payload.time || "",
        address: body.party_address || payload.party_address || payload.venue_address || "",
      },
    };
    itinerary = {
      ceremony: body.civil_time || payload.civil_time || body.church_time || payload.church_time || "16:00",
      civil: body.civil_time || payload.civil_time || "",
      reception: body.party_time || payload.party_time || payload.time || "18:00",
      dinner: "21:00",
      party: body.party_time || payload.party_time || payload.time || "23:00",
      party_end: "06:00",
    };
  } else {
    // Para otras categorías: usar itinerary genérico
    itinerary = {
      ceremony: body.itinerary_ceremony || "16:00",
      civil: body.itinerary_civil || "",
      reception: body.itinerary_reception || "18:00",
      dinner: body.itinerary_dinner || "21:00",
      party: body.itinerary_party || "23:00",
      party_end: body.itinerary_party_end || "06:00",
    };
  }

  // Extraer campos condicionales
  const ageYears = body.age_years ? parseInt(body.age_years, 10) : (payload.age_years ? parseInt(payload.age_years, 10) : null);
  const eventType = body.event_type || payload.event_type || null;
  const reservedColor = body.reserved_color || payload.reserved_color || null;
  const reservedMessage = body.reserved_message || payload.reserved_message || null;
  const fallbackVenueName = body.venue_name || payload.venue_name || ceremonies.party?.name || ceremonies.church?.name || "";
  const fallbackVenueAddress = body.venue_address || payload.venue_address || ceremonies.party?.address || ceremonies.church?.address || "";
  const fallbackTime = body.time || payload.time || ceremonies.party?.time || ceremonies.church?.time || "";

  // Crear evento con todos los campos
  const event = await Event.create({
    slug: finalSlug,
    category: order.category,
    template_key: payload.template_key || order.template_key,
    title: "",
    honorees: body.honorees || payload.honorees || "",
    event_type: eventType,
    date: body.date || payload.date || "",
    time: fallbackTime,
    venue_name: fallbackVenueName,
    venue_address: fallbackVenueAddress,
    maps_url: body.maps_url || payload.maps_url || "",
    dress_code: body.dress_code || payload.dress_code || "",
    hero_message: body.hero_message || payload.hero_message || "",
    quote_message: body.quote_message || payload.quote_message || "",
    hero_image: body.hero_image || "",
    sections,
    sections_json: JSON.stringify(sections),
    gallery,
    gallery2,
    itinerary,
    ceremonies,
    gift_alias: body.gift_alias || "",
    gift_cbu: body.gift_cbu || "",
    gift_holder: body.gift_holder || "",
    gift_message: body.gift_message || "",
    contact_email: body.contact_email || order.customer_email,
    contact_whatsapp: body.contact_whatsapp || order.customer_whatsapp,
    admin_pin: adminPin,
    status: "ready",
    age_years: ageYears,
    reserved_color: reservedColor,
    reserved_message: reservedMessage,
    client_original_data: payload,
  });

  await Order.findByIdAndUpdate(orderId, {
    event_id: event._id,
    status: "paid",
    updated_at: new Date(),
  });

  const orders = await getOrdersForDashboard();
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  res.render("admin/orders-dashboard", {
    orders,
    published: {
      orderId,
      slug: finalSlug,
      adminPin,
      inviteUrl: `${baseUrl}/${finalSlug}`,
      adminUrl: `${baseUrl}/${finalSlug}/admin`,
    },
  });
});

router.get("/admin/events/:id/edit", requireOwner, async (req: Request, res: Response) => {
  const eventId = req.params.id;
  
  let event;
  try {
    event = await Event.findById(eventId);
  } catch (error) {
    console.log('Invalid event ID format:', eventId);
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }
  
  if (!event) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  const sections = event.sections || {
    gallery: false,
    gallery2: false,
    dress_code: false,
    location: false,
    itinerary: false,
    trivia: false,
    gifts: false,
    music: false,
  };
  const galleryUrls = (event.gallery || []).join("\n");
  const gallery2Urls = (event.gallery2 || []).join("\n");
  const itinerary = event.itinerary || {};
  const ceremonies = event.ceremonies || {};

  return res.render("admin/event-edit", {
    event,
    sections,
    galleryUrls,
    gallery2Urls,
    itinerary,
    ceremonies,
    saved: false,
    ageYears: event.age_years || null,
    eventType: event.event_type || null,
    clientOriginalData: event.client_original_data || null,
  });
});

router.post("/admin/events/:id/edit", requireOwner, async (req: Request, res: Response) => {
  const eventId = req.params.id;
  
  let event;
  try {
    event = await Event.findById(eventId);
  } catch (error) {
    console.log('Invalid event ID format:', eventId);
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }
  
  if (!event) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  const body = req.body as Record<string, string | undefined>;
  const sections = {
    gallery: !!body.section_gallery,
    gallery2: !!body.section_gallery2,
    dress_code: !!body.section_dress_code,
    location: !!body.section_location,
    itinerary: !!body.section_itinerary,
    gifts: !!body.section_gifts,
    music: !!body.section_music,
  };
  const gallery = (body.gallery_urls || "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  const gallery2 = (body.gallery2_urls || "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  const itinerary = {
    ceremony: body.itinerary_ceremony || "",
    civil: body.itinerary_civil || "",
    reception: body.itinerary_reception || "",
    dinner: body.itinerary_dinner || "",
    party: body.itinerary_party || "",
    party_end: body.itinerary_party_end || "",
  };
  const ceremonies = {
    civil: {
      enabled: !!body.civil_enabled,
      date: body.civil_date || "",
      time: body.civil_time || "",
      address: body.civil_address || "",
    },
    church: {
      enabled: !!body.church_enabled || !!body.church_name || !!body.church_date || !!body.church_time || !!body.church_address,
      name: body.church_name || "",
      date: body.church_date || "",
      time: body.church_time || "",
      address: body.church_address || "",
    },
    party: {
      enabled: !!body.party_enabled || !!body.party_name || !!body.party_date || !!body.party_time || !!body.party_address,
      name: body.party_name || "",
      date: body.party_date || "",
      time: body.party_time || "",
      address: body.party_address || "",
    },
  };

  // Extraer nuevos campos para categorías peques/ninos/eventos
  const ageYears = body.age_years ? parseInt(body.age_years, 10) : null;
  const eventType = body.event_type || null;

  const normalizedSlug = String(body.slug || event.slug)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 40);

  await Event.findByIdAndUpdate(eventId, {
    slug: normalizedSlug || event.slug,
    category: body.category || event.category || "",
    template_key: body.template_key || event.template_key || "",
    honorees: body.honorees || "",
    date: body.date || "",
    time: body.time || "",
    venue_name: body.venue_name || "",
    venue_address: body.venue_address || "",
    maps_url: body.maps_url || "",
    dress_code: body.dress_code || "",
    sections,
    sections_json: JSON.stringify(sections),
    hero_message: body.hero_message || "",
    quote_message: body.quote_message || "",
    gallery,
    gallery2,
    itinerary,
    ceremonies,
    hero_image: body.hero_image || "",
    gift_alias: body.gift_alias || "",
    gift_cbu: body.gift_cbu || "",
    gift_holder: body.gift_holder || "",
    gift_message: body.gift_message || "",
    contact_email: body.contact_email || "",
    contact_whatsapp: body.contact_whatsapp || "",
    admin_pin: body.admin_pin || event.admin_pin || "1234",
    reserved_color: body.reserved_color || null,
    reserved_message: body.reserved_message || null,
    status: body.status || "ready",
    updated_at: new Date(),
    age_years: ageYears,
    event_type: eventType,
  });

  const updated = await Event.findById(eventId);
  return res.render("admin/event-edit", {
    event: updated,
    sections,
    galleryUrls: gallery.join("\n"),
    gallery2Urls: gallery2.join("\n"),
    itinerary: updated?.itinerary || itinerary,
    ceremonies: updated?.ceremonies || ceremonies,
    saved: true,
    ageYears: updated?.age_years || null,
    eventType: updated?.event_type || null,
    clientOriginalData: updated?.client_original_data || null,
  });
});

export default router;
