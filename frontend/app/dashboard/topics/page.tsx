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
      description="Mỗi bài thực hành xác định một hoặc một vài kỹ năng quan trọng cần được dạy lại và kiểm chứng."
      features={[
        "Mục tiêu học tập và dữ liệu tóm tắt nhận từ bài thực hành",
        "Cấu trúc giải thích phù hợp riêng với từng loại kỹ năng",
        "Bài toán biến thể, tiêu chí kiểm tra và giới hạn phản hồi",
      ]}
    />
  );
}
