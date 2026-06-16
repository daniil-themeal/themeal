import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export async function gitPushFromWorkspace(
  cwd: string,
  ref: string,
): Promise<{ ok: boolean; detail: string }> {
  try {
    const { stdout, stderr } = await execFileAsync("git", ["push", "origin", ref], {
      cwd,
      maxBuffer: 10 * 1024 * 1024,
    });
    const out = `${stdout}${stderr}`.trim();
    return { ok: true, detail: out || "Push succeeded" };
  } catch (err) {
    const stderr =
      err && typeof err === "object" && "stderr" in err
        ? String((err as { stderr?: string }).stderr ?? "")
        : "";
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, detail: (stderr || message).trim() };
  }
}

export async function triggerVercelDeploy(
  hookUrl: string,
): Promise<{ ok: boolean; detail: string }> {
  try {
    const res = await fetch(hookUrl, { method: "POST" });
    if (res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: true, detail: body || "Deploy hook accepted" };
    }
    const text = await res.text().catch(() => "");
    return { ok: false, detail: `HTTP ${res.status}${text ? `: ${text.slice(0, 120)}` : ""}` };
  } catch (err) {
    return { ok: false, detail: err instanceof Error ? err.message : String(err) };
  }
}

/** Marker CSS from commit 04940cb — purple Sample Menu CTA on production. */
const LIVE_FIX_MARKERS = ["--brand-600", "shadow-brand-hover"] as const;

export type ProductionCheck = {
  reachable: boolean;
  jsBundle: string;
  cssBundle: string;
  hasLatestFix: boolean;
  lastModified: string;
};

export async function checkProductionSite(siteUrl: string): Promise<ProductionCheck> {
  const empty: ProductionCheck = {
    reachable: false,
    jsBundle: "",
    cssBundle: "",
    hasLatestFix: false,
    lastModified: "",
  };
  try {
    const res = await fetch(siteUrl, { redirect: "follow" });
    if (!res.ok) return empty;
    const html = await res.text();
    const jsMatch = html.match(/\/assets\/index-[^"]+\.js/);
    const cssMatch = html.match(/\/assets\/index-[^"]+\.css/);
    const jsBundle = jsMatch?.[0] ?? "";
    const cssBundle = cssMatch?.[0] ?? "";
    const base = siteUrl.replace(/\/$/, "");
    let hasLatestFix = false;
    if (cssBundle) {
      const cssRes = await fetch(`${base}${cssBundle}`);
      if (cssRes.ok) {
        const css = await cssRes.text();
        hasLatestFix = LIVE_FIX_MARKERS.every((m) => css.includes(m));
      }
    }
    return {
      reachable: true,
      jsBundle,
      cssBundle,
      hasLatestFix,
      lastModified: res.headers.get("last-modified") ?? "",
    };
  } catch {
    return empty;
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
