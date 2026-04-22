import { Router, Request, Response, NextFunction } from "express";
import { Event, Rsvp } from "../db";

const router = Router();

interface EventRequest extends Request {
  event?: any;
}

// Middleware para cargar el evento por slug
router.param("slug", async (req: EventRequest, res: Response, next: NextFunction, slug: string) => {
  console.log('=== MIDDLEWARE DEBUG ===');
  console.log('Looking for slug:', slug);
  console.log('========================');
  
  let event;
  try {
    event = await Event.findOne({ slug });
  } catch (error) {
    console.log('Error finding event by slug:', slug, error);
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }
  
  console.log('Event found:', event ? 'YES' : 'NO');
  if (event) {
    console.log('Event ID:', event._id);
    console.log('Event template:', event.template_key);
  }
  console.log('========================');
  
  if (!event) {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }
  req.event = event;
  next();
});

// Invitación pública
router.get("/:slug", (req: EventRequest, res: Response) => {
  console.log('=== ROUTE DEBUG ===');
  console.log('Slug requested:', req.params.slug);
  console.log('==================');
  
  const event = req.event;
  
  console.log('EVENT DEBUG:');
  console.log('Event object keys:', Object.keys(event || {}));
  console.log('Event ID:', event?._id);
  console.log('Event slug:', event?.slug);
  console.log('Event template_key:', event?.template_key);
  console.log('Event status:', event?.status);
  console.log('Raw event object:', event);
  console.log('Raw sections:', event?.sections);
  console.log('Raw gallery:', event?.gallery);
  console.log('Raw itinerary:', event?.itinerary);
  console.log('==================');

  if (!event || event.status !== "ready") {
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

  const sections = event.sections || {};
  const gallery = event.gallery || [];
  const itinerary = event.itinerary || {};

  console.log('PARSED DATA:');
  console.log('Sections:', sections);
  console.log('Gallery:', gallery);
  console.log('Itinerary:', itinerary);
  console.log('==================');

  console.log('=== FINAL RENDER DEBUG ===');
  console.log('Sections.itinerary:', sections.itinerary);
  console.log('Itinerary object:', itinerary);
  console.log('Itinerary keys:', Object.keys(itinerary));
  console.log('Itinerary ceremony:', itinerary.ceremony);
  console.log('============================');

  const viewName = `templates/${event.template_key}`;

  res.render(viewName, {
    event,
    sections,
    gallery,
    itinerary,
    isDemo: false,
    req,
  });
});

// API para RSVP
router.post("/api/:slug/rsvp", async (req: Request, res: Response) => {
  const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  
  let event;
  try {
    event = await Event.findOne({ slug });
  } catch (error) {
    console.log('Error finding event by slug:', slug, error);
    return res.status(404).render("errors/404", { url: req.originalUrl });
  }

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

  await Rsvp.create({
    event_id: event._id,
    contact_name,
    people_count: count,
    people_names: people_names || "",
    food_preferences: food_preferences || "",
    song_suggestions: song_suggestions || "",
    comments: comments || "",
    status: finalStatus,
  });

  res.redirect(`/${slug}?rsvp=ok`);
});

export default router;

