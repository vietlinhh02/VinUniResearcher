import type { Metadata } from "next";
import { ChartLineUp } from "@phosphor-icons/react/dist/ssr";

import { ComingSoon } from "../coming-soon";

export const metadata: Metadata = {
  title: "Tiến độ — mentee",
};

export default function ProgressPage() {
  return (
    <ComingSoon
      icon={ChartLineUp}
      title="Tiến độ"
      description="Bức tranh dài hạn về việc dạy — và học — của bạn qua các phiên."
      features={[
        "Knowledge tracing cho người dạy qua từng phiên",
        "Chất lượng giải thích chấm theo thang SOLO",
        "Biểu đồ số phiên, lỗ hổng đã đóng và chủ đề đã vững",
      ]}
    />
  );
}
