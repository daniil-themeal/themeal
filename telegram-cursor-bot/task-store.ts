import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { TaskSection } from "./user-registry.js";

export type { TaskSection };

export type TodoItem = {
  id: number;
  text: string;
  done: boolean;
  deferred: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: number;
};

type SectionBucket = { nextId: number; items: RawTodoItem[] };
type RawTodoItem = Partial<TodoItem> & { status?: string };
type LegacyV2Store = {
  version: 2;
  sections: Record<string, SectionBucket>;
};
type LegacyPerUserStore = Record<string, SectionBucket>;
type StoreData = {
  version: 3;
  sections: Record<string, SectionBucket>;
};

const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), "data");
const STORE_FILE = join(DATA_DIR, "tasks.json");

const LEGACY_SECTION_MAP: Record<string, string> = {
  stas: "47420604",
  daniil: "113321584",
};

function emptyBucket(): SectionBucket {
  return { nextId: 1, items: [] };
}

function normalizeItem(raw: RawTodoItem): TodoItem {
  let done = raw.done ?? false;
  if (raw.status === "done") done = true;
  return {
    id: raw.id!,
    text: raw.text ?? "",
    done,
    deferred: raw.deferred ?? false,
    createdAt: raw.createdAt ?? new Date().toISOString(),
    updatedAt: raw.updatedAt ?? new Date().toISOString(),
    createdBy: raw.createdBy,
  };
}

function ensureBucket(data: StoreData, section: TaskSection): SectionBucket {
  if (!data.sections[section]) data.sections[section] = emptyBucket();
  return data.sections[section];
}

function reassignIds(bucket: SectionBucket): void {
  bucket.nextId = 1;
  for (const item of bucket.items) {
    item.id = bucket.nextId++;
  }
}

function mergeBucket(data: StoreData, section: TaskSection, source: SectionBucket): void {
  const bucket = ensureBucket(data, section);
  for (const raw of source.items ?? []) {
    const normalized = normalizeItem(raw);
    bucket.items.push({ ...normalized, id: bucket.nextId++ });
  }
}

function redistributeByCreator(data: StoreData): void {
  const moves: Array<{ item: RawTodoItem; target: string }> = [];
  for (const [sectionKey, bucket] of Object.entries(data.sections)) {
    bucket.items = bucket.items.filter((raw) => {
      if (raw.createdBy && String(raw.createdBy) !== sectionKey) {
        moves.push({ item: raw, target: String(raw.createdBy) });
        return false;
      }
      return true;
    });
    reassignIds(bucket);
  }
  for (const { item, target } of moves) {
    mergeBucket(data, target, { nextId: 1, items: [item] });
  }
}

function migrateToV3(raw: unknown): StoreData {
  const data: StoreData = { version: 3, sections: {} };
  if (!raw || typeof raw !== "object") return data;

  const obj = raw as Record<string, unknown>;
  if (obj.version === 3 && obj.sections) {
    return obj as StoreData;
  }

  if (obj.version === 2 && obj.sections) {
    const v2 = obj as LegacyV2Store;
    for (const [key, bucket] of Object.entries(v2.sections)) {
      const target = LEGACY_SECTION_MAP[key] ?? key;
      mergeBucket(data, target, bucket);
    }
    redistributeByCreator(data);
    return data;
  }

  const legacy = obj as LegacyPerUserStore;
  for (const [userKey, bucket] of Object.entries(legacy)) {
    if (userKey === "version" || userKey === "sections") continue;
    const target = LEGACY_SECTION_MAP[userKey] ?? userKey;
    mergeBucket(data, target, bucket);
  }
  return data;
}

function ensureStore(): StoreData {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  if (!existsSync(STORE_FILE)) {
    const data: StoreData = { version: 3, sections: {} };
    saveStore(data);
    return data;
  }
  try {
    const parsed = JSON.parse(readFileSync(STORE_FILE, "utf8"));
    const data = migrateToV3(parsed);
    if (!parsed?.version || parsed.version !== 3) saveStore(data);
    return data;
  } catch {
    const data: StoreData = { version: 3, sections: {} };
    saveStore(data);
    return data;
  }
}

function saveStore(data: StoreData): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf8");
}

export function listTasks(section: TaskSection): TodoItem[] {
  const data = ensureStore();
  return (data.sections[section]?.items ?? [])
    .map(normalizeItem)
    .sort((a, b) => a.id - b.id);
}

export function getTask(section: TaskSection, id: number): TodoItem | null {
  return listTasks(section).find((t) => t.id === id) ?? null;
}

export function addTask(section: TaskSection, text: string, createdBy?: number): TodoItem {
  const data = ensureStore();
  const bucket = ensureBucket(data, section);
  const now = new Date().toISOString();
  const item: TodoItem = {
    id: bucket.nextId++,
    text: text.trim(),
    done: false,
    deferred: false,
    createdAt: now,
    updatedAt: now,
    createdBy,
  };
  bucket.items.push(item);
  saveStore(data);
  return item;
}

export function updateTask(section: TaskSection, id: number, text: string): TodoItem | null {
  const data = ensureStore();
  const item = ensureBucket(data, section).items.find((t) => t.id === id);
  if (!item) return null;
  item.text = text.trim();
  item.deferred = false;
  item.updatedAt = new Date().toISOString();
  saveStore(data);
  return normalizeItem(item);
}

export function toggleTaskDone(section: TaskSection, id: number): TodoItem | null {
  const data = ensureStore();
  const item = ensureBucket(data, section).items.find((t) => t.id === id);
  if (!item) return null;
  const normalized = normalizeItem(item);
  item.done = !normalized.done;
  if (item.done) item.deferred = false;
  item.updatedAt = new Date().toISOString();
  saveStore(data);
  return normalizeItem(item);
}

export function setTaskDeferred(section: TaskSection, id: number, deferred: boolean): TodoItem | null {
  const data = ensureStore();
  const item = ensureBucket(data, section).items.find((t) => t.id === id);
  if (!item) return null;
  item.deferred = deferred;
  item.updatedAt = new Date().toISOString();
  saveStore(data);
  return normalizeItem(item);
}

export function deleteTask(section: TaskSection, id: number): boolean {
  const data = ensureStore();
  const bucket = ensureBucket(data, section);
  const before = bucket.items.length;
  bucket.items = bucket.items.filter((t) => t.id !== id);
  if (bucket.items.length === before) return false;
  saveStore(data);
  return true;
}

export function sectionLabelWithCount(section: TaskSection, name: string): string {
  return `${name} (${listTasks(section).length})`;
}

function truncateText(text: string, max = 70): string {
  const oneLine = text.replace(/\s+/g, " ").trim();
  if (oneLine.length <= max) return oneLine;
  return `${oneLine.slice(0, max - 1)}…`;
}

function taskStatusLabel(t: TodoItem): string {
  if (t.done) return "сделана";
  if (t.deferred) return "отложена";
  return "ожидает";
}

export function formatTaskList(
  section: TaskSection,
  sectionTitle: string,
  page = 0,
  pageSize = 8,
  contributor = false,
): string {
  const items = listTasks(section);
  if (items.length === 0) {
    return `📋 ${sectionTitle} — список пуст.\n\nНажми «➕ Добавить», чтобы создать задачу.`;
  }

  const doneCount = items.filter((t) => t.done).length;
  const deferredCount = items.filter((t) => t.deferred && !t.done).length;
  const totalPages = Math.ceil(items.length / pageSize);
  const safePage = Math.min(Math.max(page, 0), totalPages - 1);
  const slice = items.slice(safePage * pageSize, safePage * pageSize + pageSize);

  const lines = slice.flatMap((t) => [
    `#${t.id} — ${taskStatusLabel(t)}`,
    truncateText(t.text),
    "",
  ]);

  const header = [
    `📋 Раздел: ${sectionTitle}`,
    "",
    contributor
      ? "«В работу» — запрос Daniil на выполнение"
      : "«В работу» — отдать агенту",
    "",
  ];
  if (totalPages > 1) header.push(`Страница ${safePage + 1}/${totalPages}`, "");
  header.push(...lines, `Готово: ${doneCount} из ${items.length}`);
  if (deferredCount > 0) header.push(`Отложено: ${deferredCount}`);
  return header.join("\n");
}

export function parseTaskId(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}
