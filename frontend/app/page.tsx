import Image from "next/image";
import {
  Brain,
  ChalkboardTeacher,
  ChatsCircle,
  CheckCircle,
  Lightbulb,
  MagnifyingGlass,
  MapPin,
  PaperPlaneRight,
  Sparkle,
  Student,
  Translate,
} from "@phosphor-icons/react/dist/ssr";

import { getCurrentUser } from "@/lib/auth";
import { ButtonLink } from "@/app/components/button";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";

const FEATURES = [
  {
    icon: Lightbulb,
    title: "Chọn một điều bạn muốn hiểu",
    description:
      "Bắt đầu từ một khái niệm trong môn học của bạn — đạo hàm, con trỏ, cung cầu — bất cứ điều gì bạn nghĩ mình đã hiểu.",
    image: "/images/vinuni-study.jpg",
    alt: "Sinh viên VinUni học nhóm tại ký túc xá",
  },
  {
    icon: ChalkboardTeacher,
    title: "Dạy lại cho AI học trò",
    description:
      "Mentee đóng vai học trò tò mò: hỏi lại, hiểu sai, và yêu cầu bạn giải thích rõ hơn bằng chính ngôn ngữ của bạn.",
    image: "/images/vinuni-stage.jpg",
    alt: "Sinh viên VinUni thuyết trình trong hội trường",
  },
  {
    icon: MagnifyingGlass,
    title: "Phát hiện lỗ hổng kiến thức",
    description:
      "Khi bạn không giải thích được, đó chính là lỗ hổng. Dạy là cách kiểm tra hiểu biết trung thực nhất.",
    image: "/images/vinuni-lab.jpg",
    alt: "Sinh viên VinUni thảo luận trong phòng lab y khoa",
  },
] as const;

const STEPS = [
  {
    icon: Sparkle,
    title: "Mở một phiên dạy",
    description: "Chọn chủ đề và mục tiêu bạn muốn học trò AI nắm được.",
  },
  {
    icon: ChatsCircle,
    title: "Giải thích bằng lời của bạn",
    description:
      "Học trò AI hỏi lại ở đúng chỗ mơ hồ — bạn phải diễn đạt lại cho đến khi thật rõ.",
  },
  {
    icon: Brain,
    title: "Nhìn lại lỗ hổng",
    description:
      "Cuối phiên, bạn thấy được những điểm mình giải thích trơn tru và những điểm còn đứt gãy.",
  },
] as const;

const STATS = [
  { value: "1:1", label: "Một giáo viên — một học trò AI" },
  { value: "3 bước", label: "Mỗi phiên dạy gọn trong ba bước" },
  { value: "100%", label: "Tiếng Việt là ngôn ngữ lớp học" },
  { value: "0đ", label: "Miễn phí trong giai đoạn pilot" },
] as const;

const VINUNI_POINTS = [
  "Dự án nghiên cứu thuộc khóa AI thực chiến AI20K tại VinUni",
  "Dựa trên hiệu ứng protégé: dạy người khác giúp chính mình học sâu hơn",
  "Thiết kế đo lường nghiêm túc: literature review, protocol và pilot trước khi mở rộng",
] as const;

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <SiteHeader user={user} />

      <section className="bg-canvas px-6 pb-24 pt-20">
        <div className="mx-auto flex w-full max-w-3xl animate-fade-up flex-col items-center text-center">
          <p className="flex items-center gap-2 rounded-full border border-hairline bg-surface-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-charcoal">
            <Student size={16} weight="bold" className="text-accent" />
            Learning-by-Teaching · VinUni
          </p>
          <h1 className="mt-6 font-display text-5xl font-bold leading-none tracking-tighter text-ink sm:text-6xl lg:text-7xl">
            Bạn giảng. AI hỏi.
            <br />
            Kiến thức ở lại.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-body">
            Mentee là nền tảng Learning-by-Teaching: bạn đóng vai giáo viên, AI
            đóng vai học trò tò mò. Vì cách trung thực nhất để biết mình đã hiểu
            — là giải thích được cho người khác.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            {user ? (
              <ButtonLink href="/dashboard">Vào bảng điều khiển</ButtonLink>
            ) : (
              <>
                <ButtonLink href="/register">Bắt đầu miễn phí</ButtonLink>
                <ButtonLink href="/#cach-hoat-dong" variant="outline">
                  Xem cách hoạt động
                </ButtonLink>
              </>
            )}
          </div>
        </div>

        <div className="mx-auto mt-16 w-full max-w-4xl animate-fade-up overflow-hidden rounded-lg border border-hairline bg-surface-card shadow-soft">
          <div className="flex items-center gap-2 border-b border-hairline bg-surface-bone px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-stone" />
            <span className="h-3 w-3 rounded-full bg-stone" />
            <span className="h-3 w-3 rounded-full bg-stone" />
            <p className="ml-3 font-code text-xs text-charcoal">
              mentee — phiên dạy: Đạo hàm là gì?
            </p>
          </div>
          <div className="flex flex-col gap-4 p-6 text-left sm:p-8">
            <div className="max-w-[80%] self-end rounded-lg rounded-br-none bg-primary px-4 py-3 text-sm text-on-primary">
              Đạo hàm là tốc độ thay đổi tức thời của hàm số.
            </div>
            <div className="max-w-[80%] self-start rounded-lg rounded-bl-none bg-surface-bone px-4 py-3 text-sm text-body">
              Em chưa hiểu ạ. &ldquo;Tức thời&rdquo; nghĩa là trong một khoảnh
              khắc — mà trong một khoảnh khắc thì có gì thay đổi được đâu?
            </div>
            <div className="max-w-[80%] self-end rounded-lg rounded-br-none bg-primary px-4 py-3 text-sm text-on-primary">
              Câu hỏi hay! Vậy thử nghĩ nó là giới hạn của tốc độ trung bình
              khi khoảng thời gian thu nhỏ dần nhé.
            </div>
            <div className="mt-2 flex items-center gap-3 rounded-full border border-hairline bg-surface-card px-5 py-3 text-sm text-ash">
              Giải thích cho học trò của bạn…
              <PaperPlaneRight size={18} weight="fill" className="ml-auto text-primary" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-hairline bg-canvas px-6 py-12">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl font-bold tracking-tight text-primary">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-charcoal">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tinh-nang" className="scroll-mt-[60px] bg-surface-bone px-6 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-4xl font-bold leading-none tracking-tight text-ink sm:text-5xl">
            Học bằng cách dạy
          </h2>
          <p className="mt-4 max-w-2xl text-base text-body">
            Nghiên cứu giáo dục gọi đây là hiệu ứng protégé: người chuẩn bị dạy
            học sâu hơn người chỉ chuẩn bị thi. Mentee đưa hiệu ứng đó vào một
            phiên dạy 1-1 với học trò AI.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group relative min-h-[420px] overflow-hidden rounded-md"
              >
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-surface-deep/90 via-surface-deep/45 to-surface-deep/10" />
                <div className="relative flex h-full min-h-[420px] flex-col justify-end p-6 text-on-dark">
                  <feature.icon size={32} weight="duotone" />
                  <h3 className="mt-3 font-display text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-on-dark-mute">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cach-hoat-dong" className="scroll-mt-[60px] bg-surface-dark px-6 py-24 text-on-dark">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-4xl font-bold leading-none tracking-tight sm:text-5xl">
              Mentee không giả vờ hiểu
            </h2>
            <p className="mt-6 max-w-md text-base text-on-dark-mute">
              Học trò AI được thiết kế để bối rối đúng chỗ. Nếu lời giải thích
              của bạn có lỗ hổng, nó sẽ hỏi lại — và bạn sẽ nhận ra điều mình
              tưởng là đã hiểu.
            </p>
            <ol className="mt-10 flex flex-col gap-6">
              {STEPS.map((step, index) => (
                <li key={step.title} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-divider-dark font-display text-sm font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <p className="flex items-center gap-2 font-semibold">
                      <step.icon size={18} weight="bold" />
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm text-on-dark-mute">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-md bg-surface-deep p-6 font-code text-sm leading-relaxed">
            <p className="text-on-dark-mute">Bạn (giáo viên)</p>
            <p className="mt-1">
              Con trỏ là một biến lưu địa chỉ của biến khác.
            </p>
            <div className="my-4 border-t border-divider-dark" />
            <p className="text-on-dark-mute">Mentee (học trò)</p>
            <p className="mt-1">
              Địa chỉ thì em cất đi đâu cũng được mà — sao phải cần một biến
              riêng để lưu nó ạ?
            </p>
            <div className="my-4 border-t border-divider-dark" />
            <p className="text-on-dark-mute">Bạn (giáo viên)</p>
            <p className="mt-1">
              Vì khi có địa chỉ trong tay, mình thay đổi được giá trị gốc từ
              bất cứ đâu… để thầy lấy ví dụ hàm swap nhé.
            </p>
          </div>
        </div>
      </section>

      <section id="ve-vinuni" className="scroll-mt-[60px] bg-canvas px-6 py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="/images/vinuni-hall.jpg"
              alt="Hội thảo nghiên cứu trong giảng đường VinUniversity"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-charcoal">
              <MapPin size={18} weight="bold" className="text-accent" />
              VinUniversity · Hà Nội
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-none tracking-tight text-ink sm:text-5xl">
              Sinh ra từ một dự án nghiên cứu thật
            </h2>
            <p className="mt-6 text-base text-body">
              Mentee được xây dựng tại VinUni — khuôn viên Vinhomes Ocean Park,
              Hà Nội — dựa trên nền tảng nghiên cứu Learning-by-Teaching dành
              cho sinh viên Việt Nam.
            </p>
            <ul className="mt-8 flex flex-col gap-4">
              {VINUNI_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-base text-body">
                  <CheckCircle
                    size={22}
                    weight="fill"
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-surface-bone px-6 py-24 text-center">
        <div className="mx-auto w-full max-w-3xl">
          <Translate size={32} weight="duotone" className="mx-auto text-accent" />
          <h2 className="mt-4 font-display text-4xl font-bold leading-none tracking-tight text-ink sm:text-5xl">
            Sẵn sàng dạy buổi đầu tiên?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-body">
            Tạo tài khoản trong một phút, chọn một khái niệm bạn vừa học tuần
            này, và thử giải thích cho học trò AI của bạn.
          </p>
          <div className="mt-8 flex justify-center">
            {user ? (
              <p className="text-base text-charcoal">
                Bạn đã đăng nhập với{" "}
                <span className="font-semibold text-ink">{user.email}</span>.
              </p>
            ) : (
              <ButtonLink href="/register">Tạo tài khoản — Đăng ký</ButtonLink>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
