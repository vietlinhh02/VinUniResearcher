import type { Metadata } from "next";
import { Exam } from "@phosphor-icons/react/dist/ssr";

import { ComingSoon } from "../coming-soon";

export const metadata: Metadata = {
  title: "Bài toán biến thể của AI — mentee",
};

export default function QuizzesPage() {
  return (
    <ComingSoon
      icon={Exam}
      title="Bài toán biến thể của AI"
      description="AI sử dụng duy nhất trạng thái kiến thức đã xác nhận để xử lý một tình huống mới có tiêu chí kiểm tra rõ ràng."
      features={[
        "Kiểm tra AI có tự sử dụng kiến thức chưa được dạy hay không",
        "Biểu diễn kết quả theo cấu trúc để hệ thống có thể chấm tự động",
        "Chỉ ra phần thiếu hoặc mâu thuẫn mà không tiết lộ đáp án",
      ]}
    />
  );
}
