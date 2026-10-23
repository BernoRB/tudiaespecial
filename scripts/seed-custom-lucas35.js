const mongoose = require("mongoose");

// Local preview only: never reads .env or accepts the production connection.
const database = "tudiaespecial_lucas35_local";
const uri = `mongodb://127.0.0.1:27018/${database}`;
const Event = mongoose.model("Event", new mongoose.Schema({}, { strict: false, collection: "events" }));
const sections = {
  countdown: true, gallery: false, gallery2: false, location: true,
  itinerary: false, trivia: false, dress_code: false, gifts: false, rsvp: true, music: false,
};
const event = {
  slug: "lucas-35",
  category: "eventos",
  template_key: "custom_event_lucas35",
  title: "Lucas - Mis 35",
  honorees: "Lucas",
  event_type: "Cumpleaños de 35 años",
  date: "2026-11-21",
  time: "21:30",
  venue_name: "Polideportivo Comunal Oscar Banegas",
  venue_address: "Pedro E. Vivas, Córdoba",
  maps_url: "https://www.google.com/maps?q=Polideportivo+comunal+Oscar+Banegas,+Pedro+E.+Vivas,+C%C3%B3rdoba&ftid=0x943327e4720f4297:0xb72a2848591b998e&entry=gps",
  hero_image: "/images/events/lucas-35/hero-lucas-emerald-v1.webp",
  admin_pin: "3521",
  status: "ready",
  sections,
  sections_json: JSON.stringify(sections),
  gallery: [], gallery2: [], itinerary: {}, ceremonies: {},
  custom_data: {
    theme: "emerald_silver",
    hide_contact_name: true,
    rsvp_admin_mode: "per_guest",
    countdown_iso: "2026-11-21T21:30:00-03:00",
    transfer_account: { alias: "dseventos" },
    bring_drinks: true,
    card_prices: [
      { label: "Mayores", value: "$44.000" },
      { label: "Menores de 5 a 12 años", value: "$22.000" },
    ],
  },
  client_original_data: { source: "custom_codex_local_preview" },
};

async function seedLocal() {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  if (await Event.exists({ slug: event.slug })) {
    console.log("Lucas already exists locally; no document changed.");
  } else {
    await Event.create({ ...event, created_at: new Date(), updated_at: new Date() });
    console.log(`Created only lucas-35 in localhost:27018/${database}`);
  }
  await mongoose.disconnect();
}

module.exports = event;

if (require.main === module) {
  seedLocal().catch(async (error) => {
    console.error(error.message);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  });
}
