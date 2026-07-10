require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/tudiaespecial";

const EventSchema = new mongoose.Schema({}, { strict: false, collection: "events" });
const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

const adminPin = "3107";
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

const gallery = Array.from({ length: 21 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return `/images/events/picu-xv/gallery-${number}.webp`;
});

const event = {
  category: "quinces",
  slug: "picu-xv",
  template_key: "custom_quince_picu_royal_glow",
  title: "Mis 15 PICU",
  honorees: "PICU",
  event_type: "Cumpleanos de 15",
  date: "2026-07-31",
  time: "21:30",
  venue_name: "Salon Centro Comercial",
  venue_address: "25 de Mayo 972, Villa el Rosario, Cordoba",
  maps_url: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x94332b000b2ddf7d:0x209800adc97e24f0?sa=X&ved=1t:8290&ictx=111",
  dress_code: "Glam Nocturno",
  reserved_color: "",
  reserved_message: "",
  hero_message: "",
  quote_message: "Fuerte y valiente para soñar, libre para vivir",
  hero_image: "/images/events/picu-xv/logo-black-mark-transparent.webp?v=20260710xv",
  sections,
  sections_json: JSON.stringify(sections),
  gallery,
  gallery2: [],
  itinerary: {},
  ceremonies: {},
  gift_alias: "PICUXV",
  gift_cbu: "0000003100092039184873",
  gift_holder: "Ferreyra Laura Nadir",
  gift_message: "Con tu presencia alcanza, pero si deseas hacerme un regalo sera recibido con mucho amor.",
  contact_email: "cliente.demo@tudiaespecial.com",
  contact_whatsapp: "+54 9 11 5555-5555",
  admin_pin: adminPin,
  status: "ready",
  age_years: 15,
  custom_data: {
    theme: "royal_black_gold_glow",
    hero_logo: "/images/events/picu-xv/logo-black-mark-transparent.webp?v=20260710xv",
    confirm_logo: "/images/events/picu-xv/logo-black-glow.webp?v=20260710xv",
    map_embed_query: "Salon Centro Comercial, 25 de Mayo 966, X5963 Villa del Rosario, Córdoba, Argentina",
    price_groups: [
      {
        title: "Cena",
        items: [
          { label: "Mayores", value: "$57.000" },
          { label: "Adolescentes (12 a 18 anos)", value: "$40.000" },
          { label: "Menores (6 a 11 anos)", value: "$30.000" },
        ],
      },
      {
        title: "Brindis",
        items: [
          { label: "Valor de la tarjeta", value: "$20.000" },
        ],
      },
    ],
    transfer_account: {
      alias: "LauraNF",
      cbu: "0110556830055606038251",
      holder: "Ferreyra Laura Nadir",
      bank: "Banco Nacion",
      receipt_note: "Enviar comprobante a 3573457710",
    },
  },
  client_original_data: {
    source: "custom_codex",
    note: "Cumpleanos de 15 PICU, template custom royal black gold glow.",
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
  console.log(`ready: http://localhost:3000/${event.slug}`);
  console.log(`admin: http://localhost:3000/${event.slug}/admin`);
  console.log(`pin: ${adminPin}`);
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
