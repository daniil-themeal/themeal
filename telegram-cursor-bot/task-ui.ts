import { Markup } from "telegraf";
import { listTasks, sectionLabelWithCount } from "./task-store.js";
import type { TaskSection } from "./user-registry.js";

export const CB_TASK_PREFIX = "t:";
export const CB_APPROVAL_PREFIX = "a:";
export const TASKS_PAGE_SIZE = 6;

export type TaskUiContext = {
  sections: TaskSection[];
  sectionName: (section: TaskSection) => string;
};

export type PendingTaskInput =
  | { type: "add"; section: TaskSection }
  | { type: "edit"; section: TaskSection; taskId: number }
  | { type: "delete_confirm"; section: TaskSection; taskId: number };

export function taskCallback(action: string, id?: number, section?: TaskSection): string {
  const sec = section ? `:${section}` : "";
  return id === undefined
    ? `${CB_TASK_PREFIX}${action}${sec}`
    : `${CB_TASK_PREFIX}${action}:${id}${sec}`;
}

export function approvalCallback(action: "ok" | "def", approvalId: number): string {
  return `${CB_APPROVAL_PREFIX}${action}:${approvalId}`;
}

function parseSection(value: string): TaskSection | undefined {
  return /^\d+$/.test(value) ? value : undefined;
}

export function parseTaskCallback(data: string): {
  action: string;
  id?: number;
  section?: TaskSection;
} | null {
  if (!data.startsWith(CB_TASK_PREFIX)) return null;
  const rest = data.slice(CB_TASK_PREFIX.length);
  const parts = rest.split(":");
  const action = parts[0];
  if (!action) return null;

  let id: number | undefined;
  let section: TaskSection | undefined;

  if (parts.length === 2) {
    const sec = parseSection(parts[1]);
    if (sec) section = sec;
    else id = Number(parts[1]);
  } else if (parts.length >= 3) {
    id = Number(parts[1]);
    section = parseSection(parts[2]);
  }

  if (parts.length >= 2 && id !== undefined && (!Number.isInteger(id) || id < 0)) return null;
  return { action, id, section };
}

export function parseApprovalCallback(data: string): { action: "ok" | "def"; id: number } | null {
  if (!data.startsWith(CB_APPROVAL_PREFIX)) return null;
  const rest = data.slice(CB_APPROVAL_PREFIX.length);
  const [action, idRaw] = rest.split(":");
  if (action !== "ok" && action !== "def") return null;
  const id = Number(idRaw);
  if (!Number.isInteger(id) || id <= 0) return null;
  return { action, id };
}

type InlineRow = ReturnType<typeof Markup.button.callback>[];

function sectionTabsRows(active: TaskSection | null, ui: TaskUiContext): InlineRow[] {
  if (ui.sections.length <= 1) return [];

  const rows: InlineRow[] = [];
  let row: ReturnType<typeof Markup.button.callback>[] = [];

  for (const s of ui.sections) {
    const label = sectionLabelWithCount(s, ui.sectionName(s));
    const text = active === s ? `• ${label}` : label;
    row.push(Markup.button.callback(text, taskCallback("sec", undefined, s)));
    if (row.length === 2) {
      rows.push(row);
      row = [];
    }
  }
  if (row.length) rows.push(row);
  return rows;
}

export function sectionsMenuKeyboard(ui: TaskUiContext) {
  const rows: InlineRow[] = [...sectionTabsRows(null, ui)];
  rows.push([Markup.button.callback("🔄 Обновить", taskCallback("sections"))]);
  return Markup.inlineKeyboard(rows);
}

export function taskInputCancelKeyboard(section: TaskSection, page: number) {
  return Markup.inlineKeyboard([
    [Markup.button.callback("⛔ Отмена", taskCallback("back", page, section))],
  ]);
}

export function tasksKeyboard(
  section: TaskSection,
  page: number,
  ui: TaskUiContext,
  options?: { showCancel?: boolean; canAdd?: boolean },
) {
  const items = listTasks(section);
  const totalPages = Math.max(1, Math.ceil(items.length / TASKS_PAGE_SIZE));
  const safePage = Math.min(Math.max(page, 0), totalPages - 1);

  if (options?.showCancel) {
    return taskInputCancelKeyboard(section, safePage);
  }

  const slice = items.slice(safePage * TASKS_PAGE_SIZE, safePage * TASKS_PAGE_SIZE + TASKS_PAGE_SIZE);

  const rows: InlineRow[] = [];

  for (const item of slice) {
    rows.push([
      Markup.button.callback(`#${item.id} В работу`, taskCallback("run", item.id, section)),
      Markup.button.callback("✏️", taskCallback("edit", item.id, section)),
      Markup.button.callback(item.done ? "Готово ✅" : "Готово", taskCallback("done", item.id, section)),
      Markup.button.callback("❌", taskCallback("del", item.id, section)),
    ]);
  }

  if (totalPages > 1) {
    const nav: ReturnType<typeof Markup.button.callback>[] = [];
    if (safePage > 0) nav.push(Markup.button.callback("◀️", taskCallback("page", safePage - 1, section)));
    nav.push(Markup.button.callback(`${safePage + 1}/${totalPages}`, taskCallback("menu", undefined, section)));
    if (safePage < totalPages - 1) {
      nav.push(Markup.button.callback("▶️", taskCallback("page", safePage + 1, section)));
    }
    rows.push(nav);
  }

  if (options?.canAdd) {
    rows.push([Markup.button.callback("➕ Добавить", taskCallback("add", undefined, section))]);
  }
  rows.push([Markup.button.callback("🚀 Деплой", taskCallback("deploy", undefined, section))]);

  rows.push([Markup.button.callback("🔄 Обновить", taskCallback("menu", safePage, section))]);
  if (ui.sections.length > 1) {
    rows.push([Markup.button.callback("↩️ Назад", taskCallback("sections"))]);
  }
  return Markup.inlineKeyboard(rows);
}

export function deleteConfirmKeyboard(
  section: TaskSection,
  taskId: number,
  page: number,
  ui: TaskUiContext,
) {
  const rows: InlineRow[] = [];
  rows.push([
    Markup.button.callback("✅ Да, удалить", taskCallback("del_ok", taskId, section)),
    Markup.button.callback("⛔ Отмена", taskCallback("back", page, section)),
  ]);
  if (ui.sections.length > 1) {
    rows.push([Markup.button.callback("↩️ Назад", taskCallback("sections"))]);
  }
  return Markup.inlineKeyboard(rows);
}

export function runConfirmKeyboard(
  section: TaskSection,
  taskId: number,
  page: number,
  ui: TaskUiContext,
) {
  const rows: InlineRow[] = [];
  rows.push([
    Markup.button.callback("✅ Да, в работу", taskCallback("run_ok", taskId, section)),
    Markup.button.callback("⛔ Отмена", taskCallback("back", page, section)),
  ]);
  if (ui.sections.length > 1) {
    rows.push([Markup.button.callback("↩️ Назад", taskCallback("sections"))]);
  }
  return Markup.inlineKeyboard(rows);
}

export function approvalKeyboard(approvalId: number) {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("✅ Подтвердить", approvalCallback("ok", approvalId)),
      Markup.button.callback("⏸ Отложить", approvalCallback("def", approvalId)),
    ],
  ]);
}
