require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/tudiaespecial";

const EventSchema = new mongoose.Schema({}, { strict: false, collection: "events" });
const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

const groupKey = "isabella-15-2026";
const adminPin = "1516";
const gallery = [
  "/images/events/isabella-15/gallery-01.webp",
  "/images/events/isabella-15/gallery-02.webp",
  "/images/events/isabella-15/gallery-03.webp",
  "/images/events/isabella-15/gallery-04.webp",
  "/images/events/isabella-15/gallery-05.webp",
  "/images/events/isabella-15/gallery-06.webp",
];

const sections = {
  countdown: true,
  gallery: true,
  gallery2: false,
  location: true,
  itinerary: false,
  trivia: false,
  dress_code: true,
  gifts: true,
  rsvp: true,
  music: true,
};

const shared = {
  category: "quinces",
  template_key: "custom_quince_isabella_diamond",
  title: "Mis 15 Isabella",
  honorees: "Isabella",
  event_type: "Cumpleaños de 15",
  rsvp_group_key: groupKey,
  date: "2026-08-16",
  venue_name: "Salon Avellaneda",
  venue_address: "Nicolás Avellaneda 322, Alta Gracia, Córdoba",
  maps_url: "",
  dress_code: "Elegante Sport",
  hero_message: "",
  quote_message: "Como una estrella en el cielo, me detendré en cada luna a recordar mi niñez, para que ese brillo especial nunca se pierda en la inmensidad del universo.",
  hero_image: "/images/events/isabella-15/hero-disco.webp",
  sections,
  sections_json: JSON.stringify(sections),
  gallery,
  gallery2: [],
  itinerary: {},
  ceremonies: {},
  gift_alias: "",
  gift_cbu: "",
  gift_holder: "",
  gift_message: "Con tu presencia alcanza, pero si deseas hacerme un regalo será recibido con mucho amor.",
  contact_email: "cliente.demo@tudiaespecial.com",
  contact_whatsapp: "+54 9 11 5555-5555",
  admin_pin: adminPin,
  status: "ready",
  age_years: 15,
  reserved_color: "plateado",
  reserved_message: "El color plateado se reserva a la cumpleañera",
  client_original_data: {
    source: "custom_codex",
    note: "Evento real Isabella, dos entradas con RSVP unificado.",
  },
};

const events = [
  {
    ...shared,
    slug: "isabella-cena",
    legacy_slug: "isabella-cena-fiesta",
    time: "21:30",
    custom_data: {
      variant_label: "Cena + Fiesta",
      card_prices: [
        { label: "Adultos", value: "$75.000" },
        { label: "Menores (5 a 12 años)", value: "$45.000" },
      ],
    },
  },
  {
    ...shared,
    slug: "isabella-fiesta",
    legacy_slug: "isabella-solo-fiesta",
    time: "23:59",
    custom_data: {
      variant_label: "Solo Fiesta",
      card_prices: [
        { label: "Valor de la tarjeta", value: "$25.000" },
      ],
    },
  },
];

async function main() {
  await mongoose.connect(MONGODB_URI);
  for (const event of events) {
    const { legacy_slug, ...eventData } = event;
    await Event.findOneAndUpdate(
      { slug: { $in: [event.slug, legacy_slug].filter(Boolean) } },
      { $set: { ...eventData, updated_at: new Date() }, $setOnInsert: { created_at: new Date() } },
      { upsert: true, new: true }
    );
    console.log(`ready: http://localhost:3000/${event.slug}`);
  }
  console.log(`admin: http://localhost:3000/${events[0].slug}/admin`);
  console.log(`pin: ${adminPin}`);
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
