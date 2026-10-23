import { Router } from "express";
import { Event, Rsvp } from "../db";

const router = Router();
const menus = ["Menu estandar", "Restricciones alimentarias (informar)"];

function cleanName(value: unknown) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

// Only Lucas uses this endpoint; other invitations keep their existing handlers.
router.post("/api/lucas-35/rsvp", async (req, res) => {
  try {
    const event = await Event.findOne({
      slug: "lucas-35",
      template_key: "custom_event_lucas35",
      status: "ready",
    });
    if (!event) return res.status(404).json({ error: "Invitación no disponible." });

    const count = Number(req.body.people_count);
    const status = req.body.status;
    let guests;
    try {
      guests = JSON.parse(req.body.guests_json);
    } catch {
      return res.status(400).json({ error: "Completá los datos de cada persona." });
    }
    if (!Number.isInteger(count) || count < 1 || count > 30
      || !Array.isArray(guests) || guests.length !== count
      || !["confirmed", "declined"].includes(status)) {
      return res.status(400).json({ error: "Revisá la cantidad de personas y la asistencia." });
    }

    const normalized = guests.map((guest: any) => ({
      surname: cleanName(guest?.surname),
      givenName: cleanName(guest?.givenName),
      type: guest?.type,
      menu: guest?.menu,
    }));
    if (normalized.some((guest) => !guest.surname || !guest.givenName
      || guest.surname.length > 100 || guest.givenName.length > 100
      || (status === "confirmed" && (!["mayor", "menor"].includes(guest.type) || !menus.includes(guest.menu))))) {
      return res.status(400).json({ error: "Completá apellido, nombre, tipo de invitación y menú de cada persona." });
    }
    const comments = typeof req.body.comments === "string" ? req.body.comments.trim() : "";
    if (comments.length > 3000) return res.status(400).json({ error: "El comentario es demasiado largo." });

    const names = normalized.map((guest) => `${guest.surname} ${guest.givenName}${status === "confirmed" ? ` [ ${guest.type.toUpperCase()} ]` : ""}`);
    await Rsvp.create({
      event_id: event._id,
      contact_name: names[0],
      people_count: count,
      people_names: names.join("\n"),
      food_preferences: status === "declined" ? "" : normalized.map((guest) => guest.menu).join("\n"),
      comments,
      status,
    });
    return res.json({ ok: true });
  } catch (error) {
    console.error("Error saving Lucas RSVP:", error instanceof Error ? error.name : "UnknownError");
    return res.status(500).json({ error: "No pudimos guardar la respuesta. Intentá nuevamente." });
  }
});

export default router;
