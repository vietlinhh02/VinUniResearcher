import type { Metadata } from "next";
import { ChalkboardTeacher } from "@phosphor-icons/react/dist/ssr";

import { ComingSoon } from "../coming-soon";

export const metadata: Metadata = {
  title: "Phiên dạy — mentee",
};

export default function SessionsPage() {
  return (
    <ComingSoon
      icon={ChalkboardTeacher}
      title="Phiên dạy"
      description="Mỗi phiên bắt đầu sau khi bạn hoàn thành bài thực hành: dạy lại kỹ năng trọng tâm, xác nhận kiến thức và quan sát AI xử lý bài toán biến thể."
      features={[
        "Nhận dữ liệu tóm tắt an toàn sau khi hoàn thành bài thực hành",
        "Lưu đầy đủ lời dạy cùng nguồn gốc của từng phần kiến thức",
        "Xác nhận trạng thái kiến thức trước khi AI được phép sử dụng",
        "Quan sát kết quả bài toán biến thể và sửa lại phần giải thích còn thiếu",
      ]}
    />
  );
}
