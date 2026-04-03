import { Router } from "express";
import path from "path";
import fs from "fs";
import db from "../db";

const router = Router();

// Landing: renderizamos la landing actual como vista EJS
router.get("/", (req, res) => {
  res.render("landing");
});

// Formulario de solicitud
router.get("/solicitud", (req, res) => {
  res.render("solicitud");
});

router.post("/solicitud", (req, res) => {
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

  const rawForm = JSON.stringify(req.body);

  const stmt = db.prepare(`
    INSERT INTO orders (
      customer_email,
      customer_whatsapp,
      category,
      template_key,
      raw_form_json
    ) VALUES (?, ?, ?, ?, ?)
  `);

  const info = stmt.run(
    contact_email,
    contact_whatsapp,
    category,
    template_key,
    rawForm
  );

  const orderId = info.lastInsertRowid as number;

  res.redirect(`/pago/${orderId}`);
});

// Pantalla de pago
router.get("/pago/:orderId", (req, res) => {
  const orderId = Number(req.params.orderId);
  const stmt = db.prepare("SELECT * FROM orders WHERE id = ?");
  const order = stmt.get(orderId);

  if (!order) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  res.render("pago", { order });
});

router.post("/pago/:orderId", (req, res) => {
  const orderId = Number(req.params.orderId);
  const paymentMethod = req.body.payment_method;

  const getStmt = db.prepare("SELECT * FROM orders WHERE id = ?");
  const order = getStmt.get(orderId);
  if (!order) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  const updateStmt = db.prepare(
    "UPDATE orders SET payment_method = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
  );
  updateStmt.run(paymentMethod, orderId);

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
    isDemo: true,
  });
});

export default router;

