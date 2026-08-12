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
      description="Theo dõi khả năng giải thích, sửa suy luận và tự vận dụng kiến thức qua nhiều bài thực hành."
      features={[
        "Theo dõi trạng thái kiến thức đã được xác nhận qua từng phiên",
        "So sánh chất lượng lời dạy trước và sau khi quan sát lỗi của AI",
        "Đo kết quả bằng bài toán mới được giải khi không có AI hỗ trợ",
      ]}
    />
  );
}
