require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/tudiaespecial";
const EventSchema = new mongoose.Schema({}, { strict: false, collection: "events" });
const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

const sections = {
  countdown: true,
  gallery: false,
  gallery2: false,
  location: true,
  itinerary: true,
  trivia: false,
  dress_code: false,
  gifts: false,
  rsvp: true,
  music: false,
};

const event = {
  category: "eventos",
  slug: "radio-club",
  template_key: "custom_event_lu3hn_radio40",
  title: "LU3HN - 40 años al aire",
  honorees: "Radio Club Villa del Rosario",
  event_type: "40 aniversario",
  date: "2026-10-23",
  time: "19:00",
  venue_name: "Sede Radio Club",
  venue_address: "Monseñor Lindor Ferreyra 868",
  maps_url: "https://www.google.com/maps/place/Radio+club+Villa+del+Rosario+LU3HN/@-31.5529082,-63.5337952,19.54z/data=!4m6!3m5!1s0x94332b0029c8e5d3:0x87fca017fa6f16f7!8m2!3d-31.5527603!4d-63.5335124!16s%2Fg%2F11wy4z5pcq?entry=ttu&g_ep=EgoyMDI2MDkwOC4wIKXMDSoASAFQAw%3D%3D",
  hero_image: "/images/events/lu3hn-40/hero-logo.jpeg",
  sections,
  sections_json: JSON.stringify(sections),
  gallery: [],
  gallery2: [],
  itinerary: {},
  ceremonies: {},
  admin_pin: "4023",
  status: "ready",
  custom_data: {
    theme: "radio_on_air_gold_red",
    hide_contact_name: true,
    countdown_iso: "2026-10-23T19:00:00-03:00",
    schedule: [
      { title: "Acto Protocolar", time: "19:00 hs", start_time: "19:30 hs" },
      { title: "Cena Aniversario", time: "21:30 hs", start_time: "22:00 hs" },
    ],
    venues: [
      {
        label: "Acto Protocolar",
        name: "Sede Radio Club",
        address: "Monseñor Lindor Ferreyra 868",
        map_query: "Radio Club Villa del Rosario LU3HN, Monseñor Lindor Ferreyra 868, Villa del Rosario, Córdoba",
        maps_url: "https://www.google.com/maps/place/Radio+club+Villa+del+Rosario+LU3HN/@-31.5529082,-63.5337952,19.54z/data=!4m6!3m5!1s0x94332b0029c8e5d3:0x87fca017fa6f16f7!8m2!3d-31.5527603!4d-63.5335124!16s%2Fg%2F11wy4z5pcq?entry=ttu&g_ep=EgoyMDI2MDkwOC4wIKXMDSoASAFQAw%3D%3D",
      },
      {
        label: "Cena Aniversario",
        name: "Salón EME",
        address: "Predio Festival Nacional del Agua",
        map_query: "Salón EME, Predio Festival Nacional del Agua, Villa del Rosario, Córdoba",
        maps_url: "https://www.google.com/maps/place/Festival+Folclore+En+El+Agua/@-31.5415753,-63.5309804,17.71z/data=!4m6!3m5!1s0x94332bcb0a25276d:0x204ce6318f30a163!8m2!3d-31.5420174!4d-63.5306962!16s%2Fg%2F11fx_0q5pn?entry=ttu&g_ep=EgoyMDI2MDkwOC4wIKXMDSoASAFQAw%3D%3D",
      },
    ],
    dinner_price: "$50.000",
  },
  client_original_data: {
    source: "custom_codex",
    note: "LU3HN Radio Club Villa del Rosario, 40 aniversario.",
  },
};

async function main() {
  await mongoose.connect(MONGODB_URI);
  const existing = await Event.findOne({ slug: event.slug }).lean();
  if (existing) throw new Error("El slug radio-club ya existe. No se modificó ningún evento.");
  await Event.create({ ...event, created_at: new Date(), updated_at: new Date() });
  console.log("ready: http://localhost:3003/radio-club");
  console.log("admin: http://localhost:3003/radio-club/admin");
  console.log("pin: 4023");
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
