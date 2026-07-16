import { existsSync } from "node:fs";
import { promises as fs } from "node:fs";
import path from "node:path";

import initSqlJs, { type Database, type SqlJsStatic } from "sql.js";

import { adminOrders } from "@/data/mock-data";
import type { AdminOrder } from "@/types";

const STORAGE_DIR = path.join(process.cwd(), "storage");
const DB_FILE = path.join(STORAGE_DIR, "voron-express.sqlite");
const LEGACY_JSON_FILE = path.join(STORAGE_DIR, "orders.json");

let sqlPromise: Promise<SqlJsStatic> | null = null;

function getSql() {
  if (!sqlPromise) {
    sqlPromise = initSqlJs({
      locateFile: (file: string) => path.join(process.cwd(), "node_modules", "sql.js", "dist", file)
    });
  }

  return sqlPromise;
}

async function ensureStorageDir() {
  await fs.mkdir(STORAGE_DIR, { recursive: true });
}

function createSchema(db: Database) {
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      restaurant_name TEXT NOT NULL,
      total INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      status TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      comment TEXT,
      payment_method TEXT,
      delivery_fee INTEGER,
      delivery_zone_title TEXT,
      items_json TEXT
    );
  `);
}

function mapRowToOrder(row: unknown[]) {
  const [
    id,
    customerName,
    restaurantName,
    total,
    createdAt,
    status,
    phone,
    address,
    comment,
    paymentMethod,
    deliveryFee,
    deliveryZoneTitle,
    itemsJson
  ] = row;

  return {
    id: String(id),
    customerName: String(customerName),
    restaurantName: String(restaurantName),
    total: Number(total),
    createdAt: String(createdAt),
    status: status as AdminOrder["status"],
    phone: phone ? String(phone) : undefined,
    address: address ? String(address) : undefined,
    comment: comment ? String(comment) : undefined,
    paymentMethod: paymentMethod ? (String(paymentMethod) as AdminOrder["paymentMethod"]) : undefined,
    deliveryFee: typeof deliveryFee === "number" ? deliveryFee : deliveryFee == null ? undefined : Number(deliveryFee),
    deliveryZoneTitle: deliveryZoneTitle ? String(deliveryZoneTitle) : undefined,
    items: itemsJson ? (JSON.parse(String(itemsJson)) as AdminOrder["items"]) : undefined
  } satisfies AdminOrder;
}

function readOrdersFromDb(db: Database) {
  const result = db.exec(`
    SELECT
      id,
      customer_name,
      restaurant_name,
      total,
      created_at,
      status,
      phone,
      address,
      comment,
      payment_method,
      delivery_fee,
      delivery_zone_title,
      items_json
    FROM orders
    ORDER BY rowid DESC
  `);

  if (result.length === 0) {
    return [];
  }

  return result[0].values.map((row: unknown[]) => mapRowToOrder(row));
}

async function persistDb(db: Database) {
  await ensureStorageDir();
  const bytes = db.export();
  await fs.writeFile(DB_FILE, Buffer.from(bytes));
}

async function migrateLegacyJsonIfNeeded(db: Database) {
  const currentOrders = readOrdersFromDb(db);

  if (currentOrders.length > 0 || !existsSync(LEGACY_JSON_FILE)) {
    return;
  }

  try {
    const rawValue = await fs.readFile(LEGACY_JSON_FILE, "utf8");
    const parsed = JSON.parse(rawValue) as AdminOrder[];

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return;
    }

    for (const order of parsed) {
      insertOrder(db, order);
    }

    await persistDb(db);
  } catch {
    // Ignore legacy migration failures and keep the database empty.
  }
}

async function openDatabase() {
  await ensureStorageDir();
  const SQL = await getSql();
  const database = existsSync(DB_FILE)
    ? new SQL.Database(new Uint8Array(await fs.readFile(DB_FILE)))
    : new SQL.Database();

  createSchema(database);
  await migrateLegacyJsonIfNeeded(database);

  return database;
}

function insertOrder(db: Database, order: AdminOrder) {
  db.run(
    `
      INSERT OR REPLACE INTO orders (
        id,
        customer_name,
        restaurant_name,
        total,
        created_at,
        status,
        phone,
        address,
        comment,
        payment_method,
        delivery_fee,
        delivery_zone_title,
        items_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      order.id,
      order.customerName,
      order.restaurantName,
      order.total,
      order.createdAt,
      order.status,
      order.phone ?? null,
      order.address ?? null,
      order.comment ?? null,
      order.paymentMethod ?? null,
      order.deliveryFee ?? null,
      order.deliveryZoneTitle ?? null,
      order.items ? JSON.stringify(order.items) : null
    ]
  );
}

export async function readPersistedOrders() {
  const db = await openDatabase();

  try {
    return readOrdersFromDb(db);
  } finally {
    db.close();
  }
}

export async function appendPersistedOrder(order: AdminOrder) {
  const db = await openDatabase();

  try {
    insertOrder(db, order);
    await persistDb(db);
  } finally {
    db.close();
  }
}

export async function readAllOrders() {
  const persistedOrders = await readPersistedOrders();
  return [...persistedOrders, ...adminOrders];
}
