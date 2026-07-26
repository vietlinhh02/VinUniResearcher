"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EnvelopeSimple, LockSimple, SignIn } from "@phosphor-icons/react";
import { toast } from "sonner";

import { postJSON, type User } from "@/lib/api";
import { Button } from "@/app/components/button";
import { TextField } from "@/app/components/text-field";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    try {
      const user = await postJSON<User>("/api/v1/auth/login", { email, password });
      toast.success(`Chào mừng trở lại, ${user.name}!`);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Đăng nhập thất bại");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextField
        label="Email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(event.target.value)
        }
        placeholder="ban@vinuni.edu.vn"
        icon={<EnvelopeSimple size={18} />}
      />

      <TextField
        label="Mật khẩu"
        type="password"
        required
        autoComplete="current-password"
        value={password}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(event.target.value)
        }
        placeholder="••••••••"
        icon={<LockSimple size={18} />}
      />

      <Button type="submit" disabled={submitting} className="mt-2 gap-2">
        <SignIn size={18} weight="bold" />
        {submitting ? "Đang đăng nhập…" : "Đăng nhập"}
      </Button>
    </form>
  );
}
