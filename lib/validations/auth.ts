import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email noto'g'ri kiritildi"),
  password: z.string().min(1, "Parol kiritilishi shart"),
});

export const registerSchema = z
  .object({
    full_name: z.string().min(3, "Ism kamida 3 ta harf bo'lishi kerak"),
    email: z.string().email("Email noto'g'ri kiritildi"),
    password: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
    confirm_password: z.string().min(6, "Parolni tasdiqlang"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Parollar mos kelmadi",
    path: ["confirm_password"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
