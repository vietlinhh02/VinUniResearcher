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
      description="Nơi bạn đứng lớp: mở một phiên, giảng bằng lời của bạn, và để học trò AI hỏi ngược."
      features={[
        "Mở phiên dạy với học trò AI hỏi ngược kiểu Socratic",
        "Transcript đầy đủ từng lượt giảng — hỏi trong phiên",
        "Hai chế độ học trò (active / passive) theo protocol pilot",
        "Kết thúc phiên bằng phần tổng kết những gì học trò đã nắm được",
      ]}
    />
  );
}
