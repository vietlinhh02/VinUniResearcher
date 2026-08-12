import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Brain,
  ChalkboardTeacher,
  ChatsCircle,
  Lightbulb,
  Plus,
  Student,
} from "@phosphor-icons/react/dist/ssr";

import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/app/components/button";

export const metadata: Metadata = {
  title: "Tổng quan — mentee",
};

const STATS = [
  { icon: ChalkboardTeacher, value: 0, label: "Phiên đã dạy" },
  { icon: Lightbulb, value: 0, label: "Chủ đề đã chọn" },
  { icon: Brain, value: 0, label: "Lỗ hổng phát hiện" },
] as const;

const QUICK_STEPS = [
  "Hoàn thành toàn bộ bài thực hành được giao",
  "Dạy lại kỹ năng trọng tâm và xác nhận trạng thái kiến thức",
  "Quan sát AI giải bài toán biến thể rồi sửa phần suy luận còn thiếu",
] as const;

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="w-full">
      <h1 className="font-display text-3xl font-light leading-tight tracking-tight text-ink sm:text-4xl">
        Tổng quan
      </h1>
      <p className="mt-3 max-w-xl text-base text-body">
        Đây là không gian theo dõi quá trình dạy lại có kiểm chứng. Mỗi phiên bắt đầu sau khi bạn
        hoàn thành bài thực hành và kết thúc bằng một bài toán mới do chính bạn giải quyết.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-hairline bg-surface-card p-6 shadow-soft"
          >
            <stat.icon size={28} weight="duotone" className="text-primary" />
            <p className="mt-3 font-display text-4xl font-light tracking-tight text-ink">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-charcoal">{stat.label}</p>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-light text-ink">Phiên dạy của bạn</h2>
          <Link
            href="/dashboard/sessions"
            className="flex items-center gap-1 text-sm font-semibold text-link transition-colors hover:text-primary-deep"
          >
            Xem tất cả
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
        <div className="mt-4 flex flex-col items-center gap-4 rounded-lg border border-hairline bg-surface-card px-6 py-16 text-center">
          <Student size={48} weight="duotone" className="text-primary" />
          <p className="font-display text-xl font-semibold text-ink">Chưa có phiên dạy nào</p>
          <p className="max-w-md text-sm text-charcoal">
            Quy trình dạy lại đang được hoàn thiện cho giai đoạn thử nghiệm sản phẩm. Khi bài thực
            hành đầu tiên sẵn sàng, bạn sẽ bắt đầu phiên Mentee ngay tại đây.
          </p>
          <Button type="button" disabled className="mt-2 gap-2">
            <Plus size={18} weight="bold" />
            Mở phiên dạy đầu tiên
          </Button>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-light text-ink">
          Chuẩn bị cho buổi dạy đầu tiên
        </h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {QUICK_STEPS.map((step, index) => (
            <li
              key={step}
              className="flex min-h-20 items-center gap-3 rounded-md bg-surface-bone p-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-on-primary">
                {index + 1}
              </span>
              <p className="text-sm text-body">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 flex items-center gap-2 text-sm text-charcoal">
          <ChatsCircle size={18} />
          AI chỉ được sử dụng trạng thái kiến thức mà bạn đã đọc và xác nhận.
        </p>
      </section>
    </div>
  );
}
