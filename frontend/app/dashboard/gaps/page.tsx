import type { Metadata } from "next";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

import { ComingSoon } from "../coming-soon";

export const metadata: Metadata = {
  title: "Lỗ hổng kiến thức — mentee",
};

export default function GapsPage() {
  return (
    <ComingSoon
      icon={MagnifyingGlass}
      title="Lỗ hổng kiến thức"
      description="Những chỗ bạn giải thích còn đứt gãy — được AI phát hiện từ chính bài giảng của bạn."
      features={[
        "AI tổng hợp lỗ hổng từ transcript bài giảng (Generate–Retrieve–Rerank)",
        "Nhóm lỗ hổng theo khái niệm để thấy điểm yếu lặp lại",
        "Gợi ý ôn tập trước khi mở phiên dạy tiếp theo",
      ]}
    />
  );
}
