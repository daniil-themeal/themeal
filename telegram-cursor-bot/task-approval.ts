import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { TaskSection } from "./user-registry.js";

export type ApprovalKind = "change" | "deploy";

export type ApprovalRequest = {
  id: number;
  kind: ApprovalKind;
  section: TaskSection;
  taskId?: number;
  text: string;
  requesterId: number;
  requesterName: string;
  status: "pending" | "approved" | "deferred";
  createdAt: string;
  resolvedAt?: string;
};

type ApprovalStore = { nextId: number; items: ApprovalRequest[] };

const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), "data");
const STORE_FILE = join(DATA_DIR, "approvals.json");

function ensureStore(): ApprovalStore {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  if (!existsSync(STORE_FILE)) return { nextId: 1, items: [] };
  try {
    return JSON.parse(readFileSync(STORE_FILE, "utf8")) as ApprovalStore;
  } catch {
    return { nextId: 1, items: [] };
  }
}

function saveStore(data: ApprovalStore): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf8");
}

export function createApprovalRequest(input: {
  kind?: ApprovalKind;
  section: TaskSection;
  text: string;
  requesterId: number;
  requesterName: string;
  taskId?: number;
}): ApprovalRequest {
  const store = ensureStore();
  const item: ApprovalRequest = {
    id: store.nextId++,
    kind: input.kind ?? "change",
    section: input.section,
    taskId: input.taskId,
    text: input.text.trim(),
    requesterId: input.requesterId,
    requesterName: input.requesterName,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  store.items.push(item);
  saveStore(store);
  return item;
}

export function getApproval(id: number): ApprovalRequest | null {
  const item = ensureStore().items.find((a) => a.id === id);
  if (!item) return null;
  return { ...item, kind: item.kind ?? "change" };
}

export function resolveApproval(
  id: number,
  status: "approved" | "deferred",
): ApprovalRequest | null {
  const store = ensureStore();
  const item = store.items.find((a) => a.id === id);
  if (!item || item.status !== "pending") return null;
  item.status = status;
  item.resolvedAt = new Date().toISOString();
  saveStore(store);
  return item;
}
