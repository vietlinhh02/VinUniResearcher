"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EnvelopeSimple, LockSimple, User as UserIcon, UserPlus } from "@phosphor-icons/react";
import { toast } from "sonner";

import { postJSON, type User } from "@/lib/api";
import { Button } from "@/app/components/button";
import { TextField } from "@/app/components/text-field";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 8) {
      toast.error("Mật khẩu cần tối thiểu 8 ký tự");
      return;
    }
    setSubmitting(true);
    try {
      const user = await postJSON<User>("/api/v1/auth/register", {
        name,
        email,
        password,
      });
      toast.success(`Tài khoản đã sẵn sàng — chào mừng, ${user.name}!`);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Đăng ký thất bại");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextField
        label="Họ tên"
        type="text"
        required
        autoComplete="name"
        value={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setName(event.target.value)
        }
        placeholder="Nguyễn Văn A"
        icon={<UserIcon size={18} />}
      />

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
        minLength={8}
        autoComplete="new-password"
        value={password}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(event.target.value)
        }
        placeholder="Tối thiểu 8 ký tự"
        icon={<LockSimple size={18} />}
      />

      <Button type="submit" disabled={submitting} className="mt-2 gap-2">
        <UserPlus size={18} weight="bold" />
        {submitting ? "Đang tạo tài khoản…" : "Đăng ký"}
      </Button>
    </form>
  );
}
