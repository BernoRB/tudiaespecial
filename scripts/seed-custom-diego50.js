require("dotenv").config();
const mongoose = require("mongoose");

const LOCAL_DATABASE = "tudiaespecial_diego50_local";
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${LOCAL_DATABASE}`;
const parsedUri = new URL(MONGODB_URI);
const databaseName = decodeURIComponent(parsedUri.pathname.replace(/^\/+/, ""));

if (!["localhost", "127.0.0.1", "::1"].includes(parsedUri.hostname) || databaseName !== LOCAL_DATABASE) {
  throw new Error(`Refusing to seed: this script only permits localhost/${LOCAL_DATABASE}.`);
}

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
  slug: "diego-50",
  template_key: "custom_event_diego50",
  title: "Diego - 50 años",
  honorees: "Diego",
  event_type: "Cumpleaños de 50 años",
  date: "2026-10-17",
  time: "21:30",
  venue_name: "Salón Gazzo",
  venue_address: "Ruta 13 km 34",
  maps_url: "https://maps.app.goo.gl/hka5TMHEvFFi4H9b6?g_st=aw",
  hero_image: "/images/events/diego-50/hero-graphite-v2.webp",
  sections,
  sections_json: JSON.stringify(sections),
  gallery: [],
  gallery2: [],
  itinerary: {},
  ceremonies: {},
  admin_pin: "5017",
  status: "ready",
  custom_data: {
    theme: "graphite_silver",
    hide_contact_name: true,
    countdown_iso: "2026-10-17T21:30:00-03:00",
    schedule: [{ title: "17 de octubre", time: "21:30 hs" }],
    transfer_account: { alias: "dseventos" },
    card_prices: [
      { label: "Mayores", value: "$35.000" },
      { label: "Menores (5 a 12 años)", value: "$22.000" },
    ],
  },
  client_original_data: {
    source: "custom_codex_local_preview",
    note: "Evento local independiente. No se debe publicar en Atlas ni ejecutar contra otra base.",
  },
};

async function main() {
  await mongoose.connect(MONGODB_URI);
  const existing = await Event.findOne({ slug: event.slug }).lean();
  if (existing) throw new Error("Slug diego-50 already exists in the dedicated local database; nothing changed.");
  await Event.create({ ...event, created_at: new Date(), updated_at: new Date() });
  console.log(`ready: http://localhost:3004/diego-50`);
  console.log(`admin: http://localhost:3004/diego-50/admin`);
  console.log(`database: localhost/${LOCAL_DATABASE}`);
  console.log("pin: 5017");
  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
