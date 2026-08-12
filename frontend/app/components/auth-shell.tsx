import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

import { ImageSlideshow, type Slide } from "./image-slideshow";

const SLIDES: readonly Slide[] = [
  { src: "/images/vinuni-campus.jpg", alt: "Khuôn viên VinUniversity nhìn từ trên cao" },
  { src: "/images/vinuni-hall.jpg", alt: "Hội thảo trong giảng đường VinUniversity" },
  { src: "/images/vinuni-study.jpg", alt: "Sinh viên VinUni học nhóm tại ký túc xá" },
  { src: "/images/vinuni-lab.jpg", alt: "Sinh viên VinUni trong phòng lab y khoa" },
  { src: "/images/vinuni-stage.jpg", alt: "Sinh viên VinUni trên sân khấu hội trường" },
];

const SELLING_POINTS = [
  "Hoàn thành bài thực hành trước khi bắt đầu phiên Mentee",
  "Xác nhận chính xác trạng thái kiến thức mà AI được phép sử dụng",
  "Quan sát AI áp dụng lời dạy vào một bài toán biến thể có thể kiểm tra",
  "Tự giải bài toán mới để đánh giá khả năng vận dụng thực sự",
] as const;

const MINI_STATS = [
  { value: "1:1", label: "giáo viên — học trò" },
  { value: "4 bước", label: "trong mỗi vòng lặp học tập" },
  { value: "0đ", label: "trong giai đoạn thử nghiệm sản phẩm" },
] as const;

interface AuthShellProps {
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkHref: string;
  footerLinkLabel: string;
  children: React.ReactNode;
}

export function AuthShell({
  title,
  subtitle,
  footerText,
  footerLinkHref,
  footerLinkLabel,
  children,
}: AuthShellProps) {
  return (
    <main className="flex min-h-screen flex-1 flex-col bg-surface-bone lg:flex-row lg:p-4">
      <aside className="relative flex min-h-64 flex-col overflow-hidden rounded-b-lg p-6 text-on-dark lg:order-2 lg:min-h-0 lg:w-[70%] lg:justify-between lg:rounded-lg lg:p-12">
        <ImageSlideshow
          slides={SLIDES}
          intervalMs={5000}
          dimClassName="opacity-45"
          sizes="(min-width: 1024px) 70vw, 100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-surface-deep via-surface-deep/55 to-primary/20" />

        <Link
          href="/"
          className="relative w-fit font-display text-2xl font-normal lowercase transition-opacity hover:opacity-80"
        >
          mentee
        </Link>

        <div className="relative hidden animate-fade-up lg:my-auto lg:block">
          <p className="text-sm font-semibold uppercase tracking-widest text-on-dark-mute">
            Dạy lại có kiểm chứng · VinUni AI20K
          </p>
          <h2 className="mt-3 font-display text-4xl font-light leading-tight tracking-tight xl:text-5xl">
            Bạn dạy.
            <br />
            AI áp dụng.
            <br />
            Bạn sửa cách hiểu.
          </h2>

          <ul className="mt-8 flex max-w-sm flex-col gap-4">
            {SELLING_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-base text-on-dark-mute">
                <CheckCircle size={22} weight="fill" className="mt-0.5 shrink-0 text-on-dark" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid max-w-sm grid-cols-3 gap-4 border-t border-divider-dark pt-6">
            {MINI_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-light">{stat.value}</p>
                <p className="mt-1 text-xs text-on-dark-mute">{stat.label}</p>
              </div>
            ))}
          </div>

          <blockquote className="mt-10 max-w-sm border-l-2 border-accent pl-4">
            <p className="text-base italic">
              &ldquo;Docendo discimus — chúng ta học bằng cách dạy.&rdquo;
            </p>
            <cite className="mt-1 block text-sm not-italic text-on-dark-mute">— Seneca</cite>
          </blockquote>
        </div>

        <p className="relative mt-2 text-sm text-on-dark-mute lg:hidden">
          Learning-by-Teaching: bạn dạy, AI học.
        </p>
      </aside>

      <section className="flex flex-1 items-center justify-center px-6 py-12 lg:order-1 lg:w-[30%] lg:flex-none lg:px-8 lg:py-24">
        <div className="w-full max-w-md animate-fade-up">
          <h1 className="font-display text-4xl font-light leading-tight tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-body">{subtitle}</p>

          <div className="mt-8 rounded-lg border border-hairline bg-surface-card p-6 shadow-soft sm:p-8">
            {children}
          </div>

          <p className="mt-6 text-sm text-charcoal">
            {footerText}{" "}
            <Link
              href={footerLinkHref}
              className="font-semibold text-link underline transition-colors hover:text-primary-deep"
            >
              {footerLinkLabel}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
