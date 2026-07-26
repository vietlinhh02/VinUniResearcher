import type { Metadata } from "next";
import { Exam } from "@phosphor-icons/react/dist/ssr";

import { ComingSoon } from "../coming-soon";

export const metadata: Metadata = {
  title: "Bài kiểm tra của AI — mentee",
};

export default function QuizzesPage() {
  return (
    <ComingSoon
      icon={Exam}
      title="Bài kiểm tra của AI"
      description="Sau khi được bạn dạy, học trò AI đi làm bài kiểm tra — điểm của nó phản ánh chất lượng bài giảng của bạn."
      features={[
        "Học trò AI làm quiz về khái niệm bạn vừa dạy",
        "Điểm trước / sau phiên dạy để thấy học trò tiến bộ nhờ bạn",
        "Xem lại câu học trò làm sai để biết phần nào bạn giảng chưa tới",
      ]}
    />
  );
}
