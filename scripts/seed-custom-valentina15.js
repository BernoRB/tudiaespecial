require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/tudiaespecial";

const EventSchema = new mongoose.Schema({}, { strict: false, collection: "events" });
const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

const groupKey = "valentina-15-silver-2026";
const adminPin = "1548";
const shared = {
  category: "quinces",
  template_key: "custom_quince_silver_disco",
  title: "Mis 15 Valentina",
  honorees: "Valentina",
  event_type: "Cumpleanos de 15",
  rsvp_group_key: groupKey,
  date: "2026-11-14",
  venue_name: "Salon Nocturna",
  venue_address: "Av. Figueroa Alcorta 3580, Buenos Aires",
  maps_url: "",
  dress_code: "Elegante en negro, blanco o plateado",
  hero_message: "Una noche para brillar",
  quote_message: "Trae ganas de bailar. Si traes pasos prohibidos, avisa asi reforzamos la pista.",
  hero_image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1300&auto=format&fit=crop",
  sections: {
    countdown: true,
    gallery: true,
    gallery2: false,
    location: true,
    itinerary: false,
    trivia: false,
    dress_code: true,
    gifts: false,
    rsvp: true,
  },
  sections_json: JSON.stringify({
    countdown: true,
    gallery: true,
    gallery2: false,
    location: true,
    itinerary: false,
    trivia: false,
    dress_code: true,
    gifts: false,
    rsvp: true,
  }),
  gallery: [
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=900&auto=format&fit=crop",
  ],
  gallery2: [],
  itinerary: {},
  ceremonies: {},
  gift_alias: "",
  gift_cbu: "",
  gift_holder: "",
  gift_message: "",
  contact_email: "cliente.demo@tudiaespecial.com",
  contact_whatsapp: "+54 9 11 5555-5555",
  admin_pin: adminPin,
  status: "ready",
  age_years: 15,
  reserved_color: "",
  reserved_message: "",
  client_original_data: {
    source: "custom_codex",
    note: "Evento demo custom creado por script.",
  },
};

const events = [
  {
    ...shared,
    slug: "valentina-cena-fiesta",
    time: "20:30",
    custom_data: {
      variant_label: "Cena + Fiesta",
      hide_food_preferences: true,
      card_prices: [
        { label: "Adultos", value: "$75.000" },
        { label: "Menores (5 a 12 anos)", value: "$45.000" },
      ],
    },
  },
  {
    ...shared,
    slug: "valentina-solo-fiesta",
    time: "23:30",
    custom_data: {
      variant_label: "Solo Fiesta",
      hide_food_preferences: true,
      card_prices: [
        { label: "Valor de la tarjeta", value: "$25.000" },
      ],
    },
  },
];

async function main() {
  await mongoose.connect(MONGODB_URI);
  for (const event of events) {
    await Event.findOneAndUpdate(
      { slug: event.slug },
      { $set: { ...event, updated_at: new Date() }, $setOnInsert: { created_at: new Date() } },
      { upsert: true, new: true }
    );
    console.log(`ready: https://tudiaespecial.com/${event.slug}`);
  }
  console.log(`admin: https://tudiaespecial.com/${events[0].slug}/admin`);
  console.log(`pin: ${adminPin}`);
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
