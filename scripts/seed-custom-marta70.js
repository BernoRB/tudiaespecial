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
  itinerary: false,
  trivia: false,
  dress_code: false,
  gifts: false,
  rsvp: true,
  music: false,
};

const event = {
  category: "eventos",
  slug: "marta-70",
  template_key: "custom_event_marta70_gold_silver",
  title: "70 A\u00f1os Marta",
  honorees: "Marta",
  event_type: "Cumplea\u00f1os de 70",
  date: "2026-08-22",
  time: "21:30",
  venue_name: "El Gringo",
  venue_address: "Salta 426",
  maps_url: "https://www.google.com/maps/place/Salta+426,+X5963+Villa+del+Rosario,+C%C3%B3rdoba,+Argentina/@-31.5573688,-63.5443759,17z/data=!3m1!4b1!4m6!3m5!1s0x94332a4e496b6d59:0xcd8dac2b688b2ba9!8m2!3d-31.5573734!4d-63.541801!16s%2Fg%2F11jymj7g7_?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D",
  hero_image: "/images/events/marta-70/hero-invitacion.png",
  sections,
  sections_json: JSON.stringify(sections),
  gallery: [],
  gallery2: [],
  itinerary: {},
  ceremonies: {},
  admin_pin: "1346",
  status: "ready",
  custom_data: {
    theme: "black_gold_silver",
    hide_contact_name: true,
    rsvp_admin_mode: "per_guest",
    map_embed_query: "Salon El Gringo, Salta 426, Villa del Rosario, Cordoba, Argentina",
    price_groups: [
      {
        title: "Valor de la tarjeta",
        items: [
          { label: "Mayores", value: "$45.000" },
          { label: "Menores (6 a 12 a\u00f1os)", value: "$22.500" },
        ],
      },
    ],
    transfer_account: { alias: "DSEVENTOS" },
    show_quote: false,
  },
  client_original_data: {
    source: "custom_codex",
    note: "Marta 70, custom event with per-guest meal RSVP.",
  },
};

async function main() {
  await mongoose.connect(MONGODB_URI);
  await Event.findOneAndUpdate(
    { slug: event.slug },
    {
      $set: { ...event, updated_at: new Date() },
      $unset: { rsvp_group_key: "" },
      $setOnInsert: { created_at: new Date() },
    },
    { upsert: true, new: true }
  );
  console.log("ready: http://localhost:3000/marta-70");
  console.log("admin: http://localhost:3000/marta-70/admin");
  console.log("pin: 1346");
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
