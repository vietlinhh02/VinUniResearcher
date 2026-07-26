import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { AuthShell } from "@/app/components/auth-shell";
import RegisterForm from "./register-form";

export const metadata: Metadata = {
  title: "Đăng ký — Mentee",
};

export default async function RegisterPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <AuthShell
      title="Đăng ký"
      subtitle="Tạo tài khoản để bắt đầu dạy AI học trò đầu tiên của bạn."
      footerText="Đã có tài khoản?"
      footerLinkHref="/login"
      footerLinkLabel="Đăng nhập"
    >
      <RegisterForm />
    </AuthShell>
  );
}
