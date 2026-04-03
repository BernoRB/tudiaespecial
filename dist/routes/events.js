"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
// Middleware para cargar el evento por slug
router.param("slug", (req, res, next, slug) => {
    const stmt = db_1.default.prepare("SELECT * FROM events WHERE slug = ?");
    const event = stmt.get(slug);
    if (!event) {
        return res.status(404).render("errors/404", { url: req.originalUrl });
    }
    req.event = event;
    next();
});
// Invitación pública
router.get("/:slug", (req, res) => {
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
router.post("/api/:slug/rsvp", (req, res) => {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
    const eventStmt = db_1.default.prepare("SELECT id FROM events WHERE slug = ?");
    const event = eventStmt.get(slug);
    if (!event) {
        return res.status(404).render("errors/404", { url: req.originalUrl });
    }
    const { contact_name, people_count, people_names, food_preferences, song_suggestions, comments, status, } = req.body;
    const count = Number(people_count) || 1;
    const finalStatus = status === "declined" ? "declined" : "confirmed";
    const insertStmt = db_1.default.prepare(`
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
    insertStmt.run(event.id, contact_name, count, people_names || "", food_preferences || "", song_suggestions || "", comments || "", finalStatus);
    res.redirect(`/${slug}?rsvp=ok`);
});
exports.default = router;
