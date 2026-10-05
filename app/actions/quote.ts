"use server";
import { headers } from "next/headers";
import { db } from "@/db";
import { quoteRequests } from "@/db/schema";
import { quoteSchema } from "@/lib/quote-schema";

type Result = { ok: boolean; message: string; fieldErrors?: Record<string, string[]> };
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
function rateLimited(ip: string) { const now = Date.now(); const current = attempts.get(ip); if (!current || current.resetAt <= now) { attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS }); return false; } if (current.count >= MAX_ATTEMPTS) return true; current.count += 1; return false; }

export async function submitQuote(formData: FormData): Promise<Result> {
  if (String(formData.get("website") ?? "").trim()) return { ok: true, message: "Thanks. Your enquiry has been sent and we will be in touch." };
  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? requestHeaders.get("x-real-ip") ?? "unknown";
  if (rateLimited(ip)) return { ok: false, message: "Too many attempts. Please try again in a few minutes." };
  const parsed = quoteSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { ok: false, message: "Please check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };

  let savedId: number;
  try {
    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured.");
    const inserted = await db.insert(quoteRequests).values({ name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone || null, projectType: parsed.data.projectType, message: parsed.data.message }).$returningId();
    savedId = inserted[0]?.id ?? 0;
    if (!savedId) throw new Error("MySQL insert returned no id.");
  } catch (error) { console.error("[quote] database save failed:", error instanceof Error ? error.message : "unknown error"); return { ok: false, message: "We could not save your enquiry right now. Your details were not sent; please try again." }; }

  const missing = ["RESEND_API_KEY", "QUOTE_TO_EMAIL", "QUOTE_FROM_EMAIL"].filter((key) => !process.env[key]);
  if (missing.length) { console.error(`[quote] email skipped for saved lead ${savedId}; missing configuration: ${missing.join(", ")}`); return { ok: true, message: "Thanks. Your enquiry was saved successfully. We will be in touch soon." }; }
  try {
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.QUOTE_FROM_EMAIL, to: [process.env.QUOTE_TO_EMAIL], reply_to: parsed.data.email, subject: `VedaTech enquiry from ${parsed.data.name}`, text: [`Lead ID: ${savedId}`, `Name: ${parsed.data.name}`, `Email: ${parsed.data.email}`, `Phone: ${parsed.data.phone || "Not provided"}`, `Project type: ${parsed.data.projectType}`, "", parsed.data.message].join("\n") }) });
    if (!response.ok) { console.error(`[quote] email failed for saved lead ${savedId}: Resend HTTP ${response.status}`); return { ok: true, message: "Thanks. Your enquiry was saved successfully. We will be in touch soon." }; }
    return { ok: true, message: "Thanks. Your enquiry has been saved and sent. We will be in touch soon." };
  } catch (error) { console.error(`[quote] email failed for saved lead ${savedId}:`, error instanceof Error ? error.message : "unknown error"); return { ok: true, message: "Thanks. Your enquiry was saved successfully. We will be in touch soon." }; }
}
