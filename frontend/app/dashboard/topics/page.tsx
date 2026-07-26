import type { Metadata } from "next";
import { Books } from "@phosphor-icons/react/dist/ssr";

import { ComingSoon } from "../coming-soon";

export const metadata: Metadata = {
  title: "Chủ đề — mentee",
};

export default function TopicsPage() {
  return (
    <ComingSoon
      icon={Books}
      title="Chủ đề"
      description="Chọn khái niệm bạn muốn dạy và đặt mục tiêu cho từng phiên."
      features={[
        "Danh sách chủ đề thuật toán cho pilot (bắt đầu từ môn bạn đang học)",
        "Mục tiêu học tập cụ thể cho từng phiên dạy",
        "Theo dõi chủ đề nào đã dạy, chủ đề nào nên dạy lại",
      ]}
    />
  );
}
