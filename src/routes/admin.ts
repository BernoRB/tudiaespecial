import { Router, Request, Response, NextFunction } from "express";
import db from "../db";

const router = Router();

type EventRow = {
  id: number;
  slug: string;
  admin_pin: string;
};

interface AuthedRequest extends Request {
  session?: Record<string, any> | null;
}

function getEventBySlug(slug: string): EventRow | undefined {
  const stmt = db.prepare("SELECT * FROM events WHERE slug = ?");
  return stmt.get(slug) as EventRow | undefined;
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

function getOrdersForDashboard() {
  const rows = db
    .prepare(`
      SELECT
        o.*,
        e.slug AS event_slug,
        e.admin_pin AS event_admin_pin
      FROM orders o
      LEFT JOIN events e ON e.id = o.event_id
      ORDER BY o.created_at DESC
    `)
    .all() as Array<any>;

  return rows.map((row) => {
    let notes = "";
    try {
      const payload = JSON.parse(row.raw_form_json || "{}");
      notes = payload.notes || "";
    } catch {
      notes = "";
    }
    return { ...row, notes };
  });
}

router.get("/:slug/admin/login", (req: Request, res: Response) => {
  const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const event = getEventBySlug(slug);
  if (!event) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }
  res.render("admin/login", { slug, error: null });
});

router.post("/:slug/admin/login", (req: Request, res: Response) => {
  const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const event = getEventBySlug(slug);
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

router.get("/:slug/admin", requireAdmin, (req: Request, res: Response) => {
  const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const event = getEventBySlug(slug);
  if (!event) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  const rsvpsStmt = db.prepare(
    "SELECT * FROM rsvps WHERE event_id = ? ORDER BY created_at DESC"
  );
  const rsvps = rsvpsStmt.all(event.id) as Array<{
    people_count: number;
    status: string;
  }>;

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

router.get("/admin/orders", requireOwner, (req: Request, res: Response) => {
  const orders = getOrdersForDashboard();
  res.render("admin/orders-dashboard", {
    orders,
    published: null,
  });
});

router.post("/admin/orders/:id/publish", requireOwner, (req: Request, res: Response) => {
  const orderId = Number(req.params.id);
  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(orderId) as any;
  if (!order) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  const payload = JSON.parse(order.raw_form_json || "{}");
  const honorees = payload.honorees || "Evento";
  const slugBase = String(honorees)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 28) || `evento${orderId}`;
  const slug = `${slugBase}${orderId}`;
  const adminPin = Math.floor(1000 + Math.random() * 9000).toString();
  const sections = {
    gallery: !!payload.section_gallery,
    dress_code: !!payload.section_dress_code,
    location: !!payload.section_location,
    itinerary: !!payload.section_itinerary,
    gifts: !!payload.section_gifts,
    music: !!payload.section_music,
  };
  const {
    custom_slug,
    hero_image,
    gallery_urls,
    gift_alias,
    gift_cbu,
    gift_holder,
  } = req.body as Record<string, string | undefined>;
  const customSlugNormalized = (custom_slug || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 40);
  const finalSlug = customSlugNormalized || slug;
  const gallery = (gallery_urls || "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  const insert = db.prepare(`
    INSERT INTO events (
      slug, category, template_key, honorees, date, time, venue_name, venue_address, maps_url,
      dress_code, sections_json, hero_message, gallery_json, hero_image, gift_alias, gift_cbu, gift_holder,
      contact_email, contact_whatsapp, admin_pin, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const info = insert.run(
    finalSlug,
    payload.category || order.category,
    payload.template_key || order.template_key,
    honorees,
    payload.date || "",
    payload.time || "",
    payload.venue_name || "",
    payload.venue_address || "",
    "",
    payload.dress_code || "",
    JSON.stringify(sections),
    payload.hero_message || "",
    JSON.stringify(gallery),
    hero_image || "",
    gift_alias || "",
    gift_cbu || "",
    gift_holder || "",
    payload.contact_email || order.customer_email,
    payload.contact_whatsapp || order.customer_whatsapp,
    adminPin,
    "ready"
  );

  const eventId = Number(info.lastInsertRowid);
  db.prepare("UPDATE orders SET event_id = ?, status = 'paid', updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(
    eventId,
    orderId
  );

  const orders = getOrdersForDashboard();
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

router.get("/admin/events/:id/edit", requireOwner, (req: Request, res: Response) => {
  const eventId = Number(req.params.id);
  const event = db.prepare("SELECT * FROM events WHERE id = ?").get(eventId) as any;
  if (!event) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  let sections = {
    gallery: false,
    dress_code: false,
    location: false,
    itinerary: false,
    gifts: false,
    music: false,
  };
  try {
    sections = { ...sections, ...(JSON.parse(event.sections_json || "{}") || {}) };
  } catch {
    // ignore
  }
  let galleryUrls = "";
  try {
    const g = JSON.parse(event.gallery_json || "[]");
    if (Array.isArray(g)) {
      galleryUrls = g.join("\n");
    }
  } catch {
    galleryUrls = "";
  }

  return res.render("admin/event-edit", {
    event,
    sections,
    galleryUrls,
    saved: false,
  });
});

router.post("/admin/events/:id/edit", requireOwner, (req: Request, res: Response) => {
  const eventId = Number(req.params.id);
  const event = db.prepare("SELECT * FROM events WHERE id = ?").get(eventId) as any;
  if (!event) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  const body = req.body as Record<string, string | undefined>;
  const sections = {
    gallery: !!body.section_gallery,
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

  const normalizedSlug = String(body.slug || event.slug)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 40);

  db.prepare(`
    UPDATE events
    SET
      slug = ?,
      category = ?,
      template_key = ?,
      honorees = ?,
      date = ?,
      time = ?,
      venue_name = ?,
      venue_address = ?,
      maps_url = ?,
      dress_code = ?,
      sections_json = ?,
      hero_message = ?,
      gallery_json = ?,
      hero_image = ?,
      gift_alias = ?,
      gift_cbu = ?,
      gift_holder = ?,
      contact_email = ?,
      contact_whatsapp = ?,
      admin_pin = ?,
      status = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    normalizedSlug || event.slug,
    body.category || event.category || "",
    body.template_key || event.template_key || "",
    body.honorees || "",
    body.date || "",
    body.time || "",
    body.venue_name || "",
    body.venue_address || "",
    body.maps_url || "",
    body.dress_code || "",
    JSON.stringify(sections),
    body.hero_message || "",
    JSON.stringify(gallery),
    body.hero_image || "",
    body.gift_alias || "",
    body.gift_cbu || "",
    body.gift_holder || "",
    body.contact_email || "",
    body.contact_whatsapp || "",
    body.admin_pin || event.admin_pin || "1234",
    body.status || "ready",
    eventId
  );

  const updated = db.prepare("SELECT * FROM events WHERE id = ?").get(eventId) as any;
  return res.render("admin/event-edit", {
    event: updated,
    sections,
    galleryUrls: gallery.join("\n"),
    saved: true,
  });
});

export default router;

