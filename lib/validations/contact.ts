import * as z from "zod";

const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿʻ’'` -]+$/;
const uzPhoneError =
  "Telefon raqam +998 XX XXX XX XX formatida bo'lishi kerak (50, 77, 88, 90, 91, 93, 94, 95, 97, 99 va boshqalar)";

function toUzNationalNumber(rawValue: string): string | null {
  const digits = rawValue.replace(/\D/g, "");
  if (!digits) return null;

  if (/^9980\d{9}$/.test(digits)) {
    const national = digits.slice(4);
    return /^[2-9]\d{8}$/.test(national) ? national : null;
  }

  if (/^998\d{9}$/.test(digits)) {
    const national = digits.slice(3);
    return /^[2-9]\d{8}$/.test(national) ? national : null;
  }

  if (/^0\d{9}$/.test(digits)) {
    const national = digits.slice(1);
    return /^[2-9]\d{8}$/.test(national) ? national : null;
  }

  if (/^\d{9}$/.test(digits)) {
    return /^[2-9]\d{8}$/.test(digits) ? digits : null;
  }

  return null;
}

function normalizeUzPhoneInputDigits(rawValue: string): string {
  const digits = rawValue.replace(/\D/g, "");
  if (!digits) return "";

  if (digits.startsWith("9980")) {
    return `998${digits.slice(4)}`.slice(0, 12);
  }

  if (digits.startsWith("998")) {
    return digits.slice(0, 12);
  }

  if (digits.startsWith("0")) {
    return `998${digits.slice(1)}`.slice(0, 12);
  }

  return `998${digits}`.slice(0, 12);
}

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Ism kamida 3 ta belgidan iborat bo'lishi kerak")
    .max(80, "Ism 80 belgidan oshmasligi kerak")
    .regex(namePattern, "Ismda faqat harf va bo'sh joy bo'lishi kerak"),
  phone: z
    .string()
    .refine((value) => toUzNationalNumber(value) !== null, uzPhoneError)
    .transform((value) => {
      const national = toUzNationalNumber(value);
      return national ? `+998${national}` : value;
    }),
  course: z.string().trim().min(1, "Kursni tanlang"),
});

export type ContactFormInput = z.input<typeof contactSchema>;

export function normalizeUzPhone(rawValue: string): string {
  const normalized = normalizeUzPhoneInputDigits(rawValue);
  if (!normalized) return "";

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
