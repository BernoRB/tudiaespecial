const mongoose = require("mongoose");

// Local preview only: never reads .env or accepts the production connection.
const database = "tudiaespecial_daniel50_local";
const uri = `mongodb://127.0.0.1:27018/${database}`;
const Event = mongoose.model("Event", new mongoose.Schema({}, { strict: false, collection: "events" }));
const sections = {
  countdown: true, gallery: false, gallery2: false, location: true,
  itinerary: false, trivia: false, dress_code: false, gifts: false, rsvp: true, music: false,
};
const event = {
  slug: "daniel-50",
  category: "eventos",
  template_key: "custom_event_daniel50",
  title: "Daniel - Mis 50",
  honorees: "Daniel",
  event_type: "Cumpleaños de 50 años",
  date: "2026-11-21",
  time: "21:30",
  venue_name: "Salón Exposición - Villa del Rosario",
  venue_address: "Villa del Rosario, Córdoba",
  maps_url: "https://www.google.com/maps/place/Centro+Agrot%C3%A9cnico+Regional+Villa+del+Rosario/@-31.561406,-63.5518321,15.26z/data=!4m7!3m6!1s0x94332b1583071eb9:0x9389f7be3f9dc5b8!4b1!8m2!3d-31.5636681!4d-63.5460481!16s%2Fg%2F11p5692kvf?entry=ttu&g_ep=EgoyMDI2MTAxNC4wIKXMDSoASAFQAw%3D%3D",
  hero_image: "/images/events/daniel-50/hero-daniel-gold-v1.webp",
  admin_pin: "5021",
  status: "ready",
  sections,
  sections_json: JSON.stringify(sections),
  gallery: [], gallery2: [], itinerary: {}, ceremonies: {},
  custom_data: {
    theme: "golden_confetti",
    hide_contact_name: true,
    rsvp_admin_mode: "per_guest",
    countdown_iso: "2026-11-21T21:30:00-03:00",
    reservation_deadline: "Viernes 20/11",
    transfer_account: { alias: "dseventos" },
    card_prices: [
      { label: "Adultos", value: "$55.000" },
      { label: "Niños hasta 12 años", value: "$27.500" },
    ],
  },
  client_original_data: { source: "custom_codex_local_preview" },
};

async function seedLocal() {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  if (await Event.exists({ slug: event.slug })) {
    console.log("Daniel already exists locally; no document changed.");
  } else {
    await Event.create({ ...event, created_at: new Date(), updated_at: new Date() });
    console.log(`Created only daniel-50 in localhost:27018/${database}`);
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
