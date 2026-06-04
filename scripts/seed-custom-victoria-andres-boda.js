require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/tudiaespecial";

const EventSchema = new mongoose.Schema({}, { strict: false, collection: "events" });
const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

const adminPin = "3010";
const discardedSlugs = ["victoria-andres", "victoria-y-andres"];

const sections = {
  countdown: true,
  gallery: true,
  gallery2: true,
  location: true,
  itinerary: false,
  trivia: false,
  dress_code: true,
  gifts: true,
  rsvp: true,
  music: true,
};

const event = {
  category: "bodas",
  slug: "boda-victoria-andres",
  template_key: "custom_boda_victoria_andres_champagne",
  title: "Boda Victoria & Andres",
  honorees: "Victoria & Andrés",
  event_type: "Boda",
  date: "2026-10-30",
  time: "21:00",
  venue_name: "Sum Eventos",
  venue_address: "San Luis 514, Rosario, Argentina",
  maps_url: "",
  dress_code: "Elegante Sport",
  reserved_color: "blanco",
  reserved_message: "El color blanco se reserva a la novia.",
  hero_message: "Como un sueño que se hace realidad",
  quote_message: "Como un sueño que se hace realidad,\nnuestro amor fluye suavemente,\ny en este momento se vuelve eterno",
  hero_image: "/images/events/victoria-andres/2.jpeg?v=20260603",
  sections,
  sections_json: JSON.stringify(sections),
  gallery: [
    "/images/events/victoria-andres/1.jpeg",
    "/images/events/victoria-andres/portada.jpeg",
    "/images/events/victoria-andres/3.jpeg",
  ],
  gallery2: [
    "/images/events/victoria-andres/4.jpeg",
    "/images/events/victoria-andres/5.jpeg",
    "/images/events/victoria-andres/6.jpeg",
    "/images/events/victoria-andres/7.jpeg",
  ],
  itinerary: {},
  ceremonies: {},
  gift_alias: "maria.victoria1705",
  gift_cbu: "0000003100053556152329",
  gift_holder: "",
  gift_message: "Tu presencia es el mejor regalo. Si deseás hacernos un obsequio, te dejamos nuestros datos.",
  contact_email: "cliente.demo@tudiaespecial.com",
  contact_whatsapp: "+54 9 11 5555-5555",
  admin_pin: adminPin,
  status: "ready",
  custom_data: {
    theme: "champagne",
    end_time: "03:00",
    hide_food_preferences: true,
    hide_contact_name: true,
  },
  client_original_data: {
    source: "custom_codex",
    note: "Boda Victoria y Andres, version champagne final.",
  },
};

async function main() {
  await mongoose.connect(MONGODB_URI);
  await Event.deleteMany({ slug: { $in: discardedSlugs } });
  await Event.findOneAndUpdate(
    { slug: event.slug },
    {
      $set: { ...event, updated_at: new Date() },
      $unset: { rsvp_group_key: "" },
      $setOnInsert: { created_at: new Date() },
    },
    { upsert: true, new: true }
  );
  console.log(`ready: http://localhost:3000/${event.slug}`);
  console.log(`admin: http://localhost:3000/${event.slug}/admin`);
  console.log(`pin: ${adminPin}`);
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
