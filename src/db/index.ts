import path from "path";
import Database from "better-sqlite3";

const dbPath = path.join(__dirname, "..", "..", "data", "app.db");

const db = new Database(dbPath);

function ensureColumn(table: string, column: string, definition: string) {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>;
  const exists = columns.some((c) => c.name === column);
  if (!exists) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }
}

// Inicialización de tablas si no existen
db.exec(`
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    template_key TEXT NOT NULL,
    title TEXT,
    honorees TEXT,
    date TEXT,
    time TEXT,
    venue_name TEXT,
    venue_address TEXT,
    maps_url TEXT,
    dress_code TEXT,
    sections_json TEXT,
    hero_message TEXT,
    gallery_json TEXT,
    contact_email TEXT,
    contact_whatsapp TEXT,
    admin_pin TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending_payment',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS rsvps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    contact_name TEXT NOT NULL,
    people_count INTEGER NOT NULL,
    people_names TEXT,
    food_preferences TEXT,
    song_suggestions TEXT,
    comments TEXT,
    status TEXT NOT NULL DEFAULT 'confirmed',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER,
    customer_email TEXT NOT NULL,
    customer_whatsapp TEXT NOT NULL,
    category TEXT NOT NULL,
    template_key TEXT NOT NULL,
    raw_form_json TEXT NOT NULL,
    payment_method TEXT,
    amount INTEGER,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE SET NULL
  );
`);

// Migraciones livianas para nuevas propiedades de templates
ensureColumn("events", "hero_image", "TEXT");
ensureColumn("events", "gift_alias", "TEXT");
ensureColumn("events", "gift_cbu", "TEXT");
ensureColumn("events", "gift_holder", "TEXT");

export default db;

