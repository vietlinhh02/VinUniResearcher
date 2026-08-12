import Link from "next/link";
import { ArrowUpRight, MapPin } from "@phosphor-icons/react/dist/ssr";

const PRODUCT_LINKS = [
  { href: "/#quy-trinh", label: "Quy trình học" },
  { href: "/#kiem-chung", label: "Nguyên tắc kiểm chứng" },
  { href: "/register", label: "Đăng ký" },
  { href: "/login", label: "Đăng nhập" },
] as const;

const RESEARCH_LINKS = [
  {
    href: "https://vinuni.edu.vn",
    label: "VinUniversity",
    external: true,
  },
  {
    href: "https://en.wikipedia.org/wiki/Learning_by_teaching",
    label: "Learning-by-Teaching",
    external: true,
  },
  {
    href: "https://vi.wikipedia.org/wiki/Seneca",
    label: "Docendo discimus",
    external: true,
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-surface-deep px-6 py-16 text-on-dark">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-lg font-bold lowercase">mentee</p>
            <p className="mt-3 max-w-sm text-sm text-on-dark-mute">
              Nghiên cứu dạy lại có kiểm chứng: người học dạy AI, quan sát AI áp dụng lời dạy và sửa
              suy luận dựa trên lỗi nhìn thấy được.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-on-dark-mute">
              <MapPin size={16} weight="bold" />
              VinUniversity, Vinhomes Ocean Park, Hà Nội
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-on-dark-mute">
              Sản phẩm
            </p>
            <nav className="mt-4 flex flex-col gap-3 text-sm">
              {PRODUCT_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-on-dark-mute transition-colors hover:text-on-dark"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-on-dark-mute">
              Nghiên cứu
            </p>
            <nav className="mt-4 flex flex-col gap-3 text-sm">
              {RESEARCH_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-1 text-on-dark-mute transition-colors hover:text-on-dark"
                >
                  {link.label}
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-divider-dark pt-6 text-xs text-on-dark-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 mentee — VinUniversity</p>
          <p>Ảnh: vinuni.edu.vn</p>
        </div>
      </div>
    </footer>
  );
}
