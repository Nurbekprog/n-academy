import * as z from "zod";

const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿʻ’'` -]+$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Ism kamida 3 ta belgidan iborat bo'lishi kerak")
    .max(80, "Ism 80 belgidan oshmasligi kerak")
    .regex(namePattern, "Ismda faqat harf va bo'sh joy bo'lishi kerak"),
  phone: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .refine(
      (digits) => /^998\d{9}$/.test(digits),
      "Telefon raqam +998 XX XXX XX XX formatida bo'lishi kerak",
    )
    .transform((digits) => `+${digits}`),
  course: z.string().trim().min(1, "Kursni tanlang"),
});

export type ContactFormInput = z.input<typeof contactSchema>;

export function normalizeUzPhone(rawValue: string): string {
  const digits = rawValue.replace(/\D/g, "");
  if (!digits) return "";

  const normalized = (digits.startsWith("998") ? digits : `998${digits}`).slice(
    0,
    12,
  );

  const a = normalized.slice(0, 3);
  const b = normalized.slice(3, 5);
  const c = normalized.slice(5, 8);
  const d = normalized.slice(8, 10);
  const e = normalized.slice(10, 12);

  let formatted = `+${a}`;
  if (b) formatted += ` ${b}`;
  if (c) formatted += ` ${c}`;
  if (d) formatted += ` ${d}`;
  if (e) formatted += ` ${e}`;
  return formatted;
}
