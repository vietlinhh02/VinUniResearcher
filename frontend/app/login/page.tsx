import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { AuthShell } from "@/app/components/auth-shell";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Đăng nhập — Mentee",
};

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <AuthShell
      title="Đăng nhập"
      subtitle="Tiếp tục hành trình dạy AI học trò của bạn."
      footerText="Chưa có tài khoản?"
      footerLinkHref="/register"
      footerLinkLabel="Đăng ký"
    >
      <LoginForm />
    </AuthShell>
  );
}
