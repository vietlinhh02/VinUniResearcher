import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Không tìm thấy trang — mentee",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6">
      <div className="max-w-md text-center">
        <p
          className="font-display text-8xl font-bold leading-none tracking-tighter
            text-primary sm:text-9xl"
        >
          404
        </p>

        <h1 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-ink">
          Không tìm thấy trang
        </h1>

        <p className="mt-3 text-base leading-relaxed text-body">
          Trang bạn tìm không tồn tại hoặc đã được chuyển đi nơi khác.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center rounded-md bg-surface-dark px-6 text-base
            font-semibold leading-none text-on-dark transition-colors hover:bg-ink"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
