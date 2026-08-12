import type { Metadata } from "next";
import { Inter, Inter_Tight, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const displaySans = Manrope({
  variable: "--font-display-sans",
  subsets: ["latin", "vietnamese"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "mentee — Bạn giảng. AI hỏi. Kiến thức ở lại.",
  description: "Nền tảng Learning-by-Teaching: bạn đóng vai giáo viên, AI đóng vai học trò.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${displaySans.variable} ${inter.variable} ${interTight.variable} h-full scroll-smooth antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            unstyled: true,
            classNames: {
              toast:
                "flex w-full items-center gap-3 rounded-md border border-hairline bg-surface-card px-4 py-3 font-sans text-sm text-ink shadow-soft",
              title: "font-semibold",
              description: "text-charcoal",
              success: "[&_[data-icon]]:text-badge-success",
              error: "[&_[data-icon]]:text-danger",
            },
          }}
        />
      </body>
    </html>
  );
}
