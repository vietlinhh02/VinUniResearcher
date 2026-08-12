import type { Metadata } from "next";
import { GearSix } from "@phosphor-icons/react/dist/ssr";

import { ComingSoon } from "../coming-soon";

export const metadata: Metadata = {
  title: "Cài đặt — mentee",
};

export default function SettingsPage() {
  return (
    <ComingSoon
      icon={GearSix}
      title="Cài đặt"
      description="Quản lý tài khoản và dữ liệu của bạn."
      features={[
        "Cập nhật họ tên và thông tin hồ sơ",
        "Đổi mật khẩu",
        "Xuất hoặc xóa dữ liệu nghiên cứu theo cam kết đạo đức nghiên cứu",
      ]}
    />
  );
}
