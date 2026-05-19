"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.param("slug", async (req, res, next, slug) => {
    let event;
    try {
        event = await db_1.Event.findOne({ slug });
    }
    catch (error) {
        console.error("Error finding event by slug:", slug, error);
        return res.status(404).render("errors/404", { url: req.originalUrl });
    }
    if (!event) {
        return res.status(404).render("errors/404", { url: req.originalUrl });
    }
    req.event = event;
    next();
});
router.get("/:slug", (req, res) => {
    const event = req.event;
    if (!event || event.status !== "ready") {
        return res.status(404).render("errors/404", { url: req.originalUrl });
    }
    const viewName = `templates/${event.template_key}`;
    res.render(viewName, {
        event,
        sections: event.sections || {},
        gallery: event.gallery || [],
        itinerary: event.itinerary || {},
        isDemo: false,
        req,
    });
});
router.post("/api/:slug/rsvp", async (req, res) => {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
    let event;
    try {
        event = await db_1.Event.findOne({ slug });
    }
    catch (error) {
        console.error("Error finding event by slug:", slug, error);
        return res.status(404).render("errors/404", { url: req.originalUrl });
    }
    if (!event) {
        return res.status(404).render("errors/404", { url: req.originalUrl });
    }
    const { contact_name, people_count, people_names, food_preferences, song_suggestions, comments, status, } = req.body;
    await db_1.Rsvp.create({
        event_id: event._id,
        contact_name,
        people_count: Number(people_count) || 1,
        people_names: people_names || "",
        food_preferences: food_preferences || "",
        song_suggestions: song_suggestions || "",
        comments: comments || "",
        status: status === "declined" ? "declined" : "confirmed",
    });
    res.redirect(`/${slug}?rsvp=ok`);
});
exports.default = router;
