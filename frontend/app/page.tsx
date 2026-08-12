import Image from "next/image";
import {
  ArrowRight,
  BracketsCurly,
  LockKey,
  MagnifyingGlass,
  ShieldCheck,
  Target,
} from "@phosphor-icons/react/dist/ssr";

import { ButtonLink } from "@/app/components/button";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { LandingMotion } from "./landing-motion";

const LOOP = [
  [
    "01",
    "Hoàn thành bài thực hành",
    "Mentee chỉ xuất hiện sau khi toàn bộ bài thực hành kết thúc.",
  ],
  ["02", "Dạy và xác nhận", "Lời dạy trở thành trạng thái kiến thức có nguồn gốc rõ ràng."],
  ["03", "Quan sát AI làm", "AI chỉ dùng kiến thức đã xác nhận trên một bài toán biến thể."],
  ["04", "Sửa cách suy luận", "Lỗi quan sát được giúp người học bổ sung phần còn thiếu."],
] as const;

const GUARDRAILS = [
  [
    LockKey,
    "Giới hạn theo kiến thức đã dạy",
    "AI không tự dùng kiến thức người học chưa cung cấp và xác nhận.",
  ],
  [ShieldCheck, "Không lộ đáp án", "Chỉ chỉ ra phần thiếu hoặc mâu thuẫn trong lời dạy."],
  [BracketsCurly, "Kết quả có cấu trúc", "Mọi lần áp dụng đều có tiêu chí để hệ thống kiểm tra."],
  [
    Target,
    "Đo khả năng vận dụng",
    "Kết quả cuối được đo bằng bài toán mới do chính người học tự giải quyết.",
  ],
] as const;

const LABS = [
  "Sử dụng API mô hình ngôn ngữ",
  "Thiết kế và đánh giá câu lệnh",
  "Hệ thống truy xuất thông tin",
  "Tác nhân AI và công cụ",
  "Phân tích và sửa lỗi chương trình",
  "An toàn dữ liệu và thông tin cá nhân",
  "Theo dõi và điều tra sự cố",
  "Kiến trúc hệ thống AI",
] as const;

function Hero({ signedIn }: { signedIn: boolean }) {
  return (
    <section className="relative min-h-[760px] overflow-hidden border-b border-hairline bg-canvas px-6 pb-20 pt-36 lg:flex lg:items-center lg:py-32">
      <Image
        src="/images/vinuni-campus.jpg"
        alt="Toàn cảnh khuôn viên VinUniversity"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-canvas/95 via-canvas/75 to-primary/5" />
      <div className="absolute inset-0 bg-linear-to-t from-canvas/70 via-transparent to-canvas/15" />
      <div className="relative grid w-full gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <h1
            data-hero
            className="max-w-3xl font-display text-5xl font-light leading-[1.03] tracking-[-0.025em] text-ink sm:text-6xl"
          >
            Dạy AI. Xem AI làm. Sửa cách hiểu.
          </h1>
          <p data-hero className="mt-7 max-w-2xl text-lg leading-relaxed text-body">
            Dạy lại một kỹ năng, quan sát AI áp dụng lời dạy vào bài toán mới, rồi sửa phần kiến
            thức còn thiếu trước khi tự giải quyết thử thách tiếp theo.
          </p>
          <div data-hero className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={signedIn ? "/dashboard" : "/register"}>
              {signedIn ? "Vào bảng điều khiển" : "Đăng ký"}
            </ButtonLink>
            <ButtonLink href="/#quy-trinh" variant="outline">
              Xem quy trình
            </ButtonLink>
          </div>
          <p
            data-hero
            className="mt-7 max-w-xl border-l-2 border-accent pl-4 text-sm leading-relaxed text-charcoal"
          >
            Không phải chatbot trả lời hộ. Mentee chỉ xuất hiện sau khi bạn đã hoàn thành bài thực
            hành và chỉ được dùng điều bạn xác nhận là đã dạy.
          </p>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  const stages = [
    ["01", "Bạn dạy", "Giải thích kỹ năng bằng cách hiểu của mình."],
    ["02", "AI áp dụng", "Xử lý một tình huống mới chỉ bằng kiến thức đã xác nhận."],
    ["03", "Bạn điều chỉnh", "Sửa phần giải thích còn thiếu dựa trên lỗi quan sát được."],
  ] as const;

  return (
    <div
      data-console
      className="self-end rounded-lg border border-canvas/40 bg-canvas/75 p-3 text-ink shadow-soft backdrop-blur-xl lg:mt-40"
    >
      <div className="grid gap-2 sm:grid-cols-3">
        {stages.map(([number, title, description]) => (
          <div
            data-hover-card
            key={number}
            className="relative flex min-h-44 flex-col rounded-md bg-canvas p-4"
          >
            <span data-card-accent className="w-fit font-code text-xs text-primary">
              {number}
            </span>
            <p
              data-card-text
              className="mt-auto w-fit origin-left font-display text-xl font-normal will-change-transform"
            >
              {title}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-charcoal">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LearningLoop() {
  return (
    <section id="quy-trinh" className="scroll-mt-[60px] bg-surface-bone px-6 py-24">
      <div className="mx-auto w-full max-w-[1600px]">
        <div data-reveal className="grid gap-6 lg:grid-cols-2">
          <p className="font-code text-xs uppercase tracking-[0.18em] text-primary">
            01 · Vòng lặp học tập
          </p>
          <div>
            <h2 className="font-display text-4xl font-light leading-tight tracking-tight sm:text-5xl">
              Một vòng lặp khép kín, sau bài thực hành.
            </h2>
            <p className="mt-5 text-body">
              Các điểm kiểm tra trong bài thực hành chỉ được dùng làm bằng chứng đầu vào. Hoạt động
              dạy lại bắt đầu sau khi người học đã hoàn thành toàn bộ bài.
            </p>
          </div>
        </div>
        <div className="mt-14 grid border-l border-t border-hairline md:grid-cols-2 lg:grid-cols-4">
          {LOOP.map(([number, title, description]) => (
            <article
              data-reveal
              data-hover-card
              key={number}
              className="relative flex min-h-72 flex-col border-b border-r border-hairline bg-canvas p-6"
            >
              <span data-card-accent className="w-fit font-code text-xs text-ash">
                {number}
              </span>
              <h3
                data-card-text
                className="mt-auto w-fit origin-left font-display text-2xl font-light tracking-tight will-change-transform"
              >
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchQuestion() {
  return (
    <section id="nghien-cuu" className="bg-primary px-6 py-24 text-on-primary">
      <div className="mx-auto grid w-full max-w-[1600px] gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <div data-reveal>
          <p className="font-code text-xs uppercase tracking-[0.18em] text-hero-pink">
            02 · Câu hỏi nghiên cứu
          </p>
          <p className="mt-5 text-sm leading-relaxed text-on-dark-mute">
            So sánh với hoạt động chỉ giải thích và nhận phản hồi bằng hội thoại.
          </p>
        </div>
        <blockquote
          data-reveal
          className="font-display text-3xl font-light leading-tight tracking-tight sm:text-5xl"
        >
          “Quan sát AI áp dụng lời dạy, rồi sửa suy luận từ lỗi quan sát được, có giúp người học tự
          giải bài toán mới tốt hơn?”
        </blockquote>
      </div>
    </section>
  );
}

function FieldStudyVisual() {
  return (
    <section className="bg-canvas px-6 py-8">
      <figure
        data-reveal
        className="relative mx-auto min-h-[420px] w-full max-w-[1600px] overflow-hidden rounded-lg"
      >
        <Image
          src="/images/vinuni-lab.jpg"
          alt="Sinh viên VinUni làm việc cùng nhau trong phòng thực hành"
          fill
          sizes="(min-width: 1280px) 1152px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-surface-deep/80 via-surface-deep/20 to-transparent" />
        <figcaption className="absolute bottom-7 left-7 max-w-sm text-on-dark sm:bottom-10 sm:left-10">
          <p className="font-code text-xs uppercase tracking-[0.18em] text-on-dark-mute">
            Pilot context · VinUniversity
          </p>
          <p className="mt-3 font-display text-3xl font-light leading-tight">
            Đánh giá bằng điều người học tự làm được sau cùng.
          </p>
        </figcaption>
      </figure>
    </section>
  );
}

function EvidenceSection() {
  return (
    <section id="kiem-chung" className="bg-canvas px-6 py-24">
      <div className="mx-auto w-full max-w-[1600px]">
        <div data-reveal className="max-w-3xl">
          <p className="font-code text-xs uppercase tracking-[0.18em] text-primary">
            03 · Độ trung thành trước khả năng trả lời trôi chảy
          </p>
          <h2 className="mt-5 font-display text-4xl font-light leading-tight tracking-tight sm:text-5xl">
            AI phải trung thành với điều được dạy.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-body">
            AI làm đúng không chứng minh người học đã thành thạo. Trước hết, hệ thống phải chứng
            minh AI không tự điền kiến thức, không lộ đáp án và không thoát vai học viên.
          </p>
        </div>
        <div className="mt-14 grid gap-px bg-hairline md:grid-cols-2">
          {GUARDRAILS.map(([Icon, title, description]) => (
            <article data-reveal data-hover-card key={title} className="relative bg-canvas p-7">
              <Icon data-card-accent size={28} weight="duotone" className="text-primary" />
              <h3
                data-card-text
                className="mt-8 w-fit origin-left font-display text-2xl font-light will-change-transform"
              >
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReusableSystem() {
  return (
    <section className="border-y border-hairline bg-surface-bone px-6 py-24">
      <div className="mx-auto grid w-full max-w-[1600px] gap-14 lg:grid-cols-2 lg:items-center">
        <div data-reveal>
          <p className="font-code text-xs uppercase tracking-[0.18em] text-primary">
            04 · Bản đặc tả nội dung
          </p>
          <h2 className="mt-5 font-display text-4xl font-light leading-tight tracking-tight sm:text-5xl">
            Một hệ thống dùng chung cho nhiều loại bài thực hành.
          </h2>
          <p className="mt-6 leading-relaxed text-body">
            Mỗi bài thực hành cung cấp mục tiêu, dữ liệu tóm tắt, kỹ năng, cấu trúc giải thích, bài
            toán biến thể, tiêu chí kiểm tra và giới hạn phản hồi. Giảng viên xây nội dung mới mà
            không phải viết lại hệ thống.
          </p>
        </div>
        <div data-reveal className="grid grid-cols-2 gap-3">
          {LABS.map((lab, index) => (
            <div
              data-hover-card
              key={lab}
              className="relative flex min-h-28 flex-col justify-between rounded-md border border-hairline bg-canvas p-4"
            >
              <span data-card-accent className="w-fit font-code text-xs text-ash">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                data-card-text
                className="origin-left text-sm font-semibold text-ink will-change-transform"
              >
                {lab}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NextStep({ signedIn }: { signedIn: boolean }) {
  return (
    <section className="bg-canvas px-6 py-24 text-center">
      <div data-reveal className="mx-auto max-w-3xl">
        <MagnifyingGlass size={34} weight="duotone" className="mx-auto text-accent" />
        <p className="mt-5 font-code text-xs uppercase tracking-[0.18em] text-primary">
          Trạng thái hiện tại của dự án
        </p>
        <h2 className="mt-5 font-display text-4xl font-light leading-tight tracking-tight sm:text-5xl">
          Bước tiếp theo là xây dựng một bài thực hành hoàn chỉnh có thể kiểm chứng.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-body">
          Nhóm đang lựa chọn bài thực hành đầu tiên có mục tiêu rõ, dữ liệu kiểm tra tốt và chuyên
          gia thẩm định để xây dựng phiên bản thử nghiệm vận hành trọn vẹn từ đầu đến cuối.
        </p>
        <div className="mt-9 flex justify-center">
          <ButtonLink href={signedIn ? "/dashboard" : "/register"}>
            {signedIn ? "Theo dõi tiến độ phát triển" : "Đăng ký"}
            <ArrowRight size={18} className="ml-2" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const user = await getCurrentUser();
  return (
    <LandingMotion>
      <SiteHeader user={user} />
      <main>
        <Hero signedIn={user !== null} />
        <LearningLoop />
        <ResearchQuestion />
        <FieldStudyVisual />
        <EvidenceSection />
        <ReusableSystem />
        <NextStep signedIn={user !== null} />
      </main>
      <SiteFooter />
    </LandingMotion>
  );
}
