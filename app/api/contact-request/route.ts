import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/validations/contact";

type ContactErrorMap = {
  name?: string;
  phone?: string;
  course?: string;
};

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { detail: "So'rov formati noto'g'ri" },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const errors: ContactErrorMap = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !errors[key as keyof ContactErrorMap]) {
        errors[key as keyof ContactErrorMap] = issue.message;
      }
    }

    return NextResponse.json(
      { detail: "Forma xatolar bilan to'ldirilgan", errors },
      { status: 422 },
    );
  }

  // TODO: integrate with CRM/Telegram/email provider.
  await new Promise((resolve) => setTimeout(resolve, 450));

  return NextResponse.json({ status: "ok" }, { status: 200 });
}
