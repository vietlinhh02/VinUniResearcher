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
      description="Những phần còn thiếu hoặc mâu thuẫn được xác định từ lỗi của AI khi áp dụng chính trạng thái kiến thức bạn đã xác nhận."
      features={[
        "Đối chiếu lời dạy với lỗi quan sát được trong bài toán biến thể",
        "Nhóm các phần kiến thức còn thiếu theo từng kỹ năng trọng tâm",
        "Theo dõi cách bạn sửa lời dạy qua nhiều lần thử có kiểm chứng",
      ]}
    />
  );
}
