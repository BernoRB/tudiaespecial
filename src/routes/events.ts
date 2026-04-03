import { Router, Request, Response, NextFunction } from "express";
import db from "../db";

const router = Router();

type EventRow = {
  id: number;
  slug: string;
  status: string;
  template_key: string;
  sections_json?: string | null;
  gallery_json?: string | null;
};

interface EventRequest extends Request {
  event?: EventRow;
}

// Middleware para cargar el evento por slug
router.param("slug", (req: EventRequest, res: Response, next: NextFunction, slug: string) => {
  const stmt = db.prepare("SELECT * FROM events WHERE slug = ?");
  const event = stmt.get(slug) as EventRow | undefined;
  if (!event) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }
  req.event = event;
  next();
});

// Invitación pública
router.get("/:slug", (req: EventRequest, res: Response) => {
  const event = req.event;

  if (!event || event.status !== "ready") {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  const sections = event.sections_json
    ? JSON.parse(event.sections_json)
    : {};
  const gallery = event.gallery_json ? JSON.parse(event.gallery_json) : [];

  const viewName = `templates/${event.template_key}`;

  res.render(viewName, {
    event,
    sections,
    gallery,
    isDemo: false,
  });
});

// API para RSVP
router.post("/api/:slug/rsvp", (req: Request, res: Response) => {
  const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const eventStmt = db.prepare("SELECT id FROM events WHERE slug = ?");
  const event = eventStmt.get(slug) as { id: number } | undefined;

  if (!event) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  const {
    contact_name,
    people_count,
    people_names,
    food_preferences,
    song_suggestions,
    comments,
    status,
  } = req.body;

  const count = Number(people_count) || 1;
  const finalStatus = status === "declined" ? "declined" : "confirmed";

  const insertStmt = db.prepare(`
    INSERT INTO rsvps (
      event_id,
      contact_name,
      people_count,
      people_names,
      food_preferences,
      song_suggestions,
      comments,
      status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertStmt.run(
    event.id,
    contact_name,
    count,
    people_names || "",
    food_preferences || "",
    song_suggestions || "",
    comments || "",
    finalStatus
  );

  res.redirect(`/${slug}?rsvp=ok`);
});

export default router;

