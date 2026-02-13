"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { login, setToken } from "@/lib/api";
import { loginSchema } from "@/lib/validations/auth";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);

    try {
      const response = await login(data.email, data.password);
      setToken(response.access_token);
      
      toast({
        title: "Muvaffaqiyatli!",
        description: "Tizimga kirdingiz.",
      });

      router.push("/");
      router.refresh();
    } catch (error) {
        let msg = "Tizimga kirishda xatolik yuz berdi.";
        if (error instanceof Error) {
            msg = error.message;
        }

      toast({
        title: "Xatolik",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0A1A2F] px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white/5 p-8 border border-white/10 shadow-2xl backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Xush kelibsiz
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Hisobingizga kirish uchun ma'lumotlarni kiriting
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-white" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/50 focus:ring-white/20"
              {...register("email")}
            />
            {errors?.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-white" htmlFor="password">
              Parol
            </Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/50 focus:ring-white/20"
              {...register("password")}
            />
            {errors?.password && (
              <p className="text-sm text-red-400">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-white text-[#0A1A2F] hover:bg-white/90 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Yuklanmoqda..." : "Kirish"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-white/60">Hisobingiz yo'qmi? </span>
          <Link
            href="/register"
            className="font-medium text-white hover:underline underline-offset-4"
          >
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  );
}
