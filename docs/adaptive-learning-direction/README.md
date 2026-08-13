# Mentee: hướng nghiên cứu hiện hành

Đọc [Hướng chốt của project](HUONG-CHOT-PROJECT.md) trước. File đó là nguồn
quyết định khi các tài liệu khác chưa được cập nhật đồng bộ.

Mentee vẫn là một AI apprentice mà người học dạy sau khi hoàn thành lab. Hướng
nghiên cứu hiện tại kế thừa ba ý từ AlgoBo/TeachYou: AI giữ vai học trò,
knowledge state nằm ngoài model và AI chủ động hỏi để người học giải thích
sâu hơn.

Flow đang dùng:

```text
Hoàn thành lab
→ learner dạy AI apprentice
→ hệ thống cập nhật knowledge state
→ phát hiện phần thiếu, mơ hồ hoặc mâu thuẫn
→ chọn một follow-up question
→ learner làm rõ và knowledge state được cập nhật
→ independent transfer
```

AI không chạy lại toàn bộ bài lab trong study đầu tiên. Kết quả của một bước
như vậy phụ thuộc cả vào năng lực giải task của model, nên khó dùng để kết
luận learner đang thiếu kiến thức ở đâu.

## Tài liệu đang dùng

1. [Hướng chốt của project](HUONG-CHOT-PROJECT.md)
2. [Quyết định nghiên cứu](00-dinh-huong-chot.md)
3. [Tổng quan product và research](01-tong-quan-huong-research.md)
4. [Knowledge state và question policy](02-learner-model-va-adaptation-policy.md)
5. [PRD cho phiên post-lab](03-prd-engine-xuyen-track.md)
6. [Thiết kế kỹ thuật conversation engine](04-learning-activity-spec.md)
7. [Literature synthesis](05-literature-review-nen-tang.md)
8. [Evidence matrix](06-evidence-matrix.csv)
9. [Prompt và fidelity specification](07-prompt-fidelity-reference-cu.md)
10. [Instrumentation và assessment](08-instruments-reference-cu.md)

Các ghi chú paper, protocol và instrument chi tiết nằm trong [`../research/`](../research/).

## Tài liệu cũ

Những file trong [`archive/`](archive/) chỉ để lưu lịch sử. Không dùng chúng để
quyết định product flow hoặc research question hiện tại.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Đưa quyết định lên đầu | Flow hỏi ngược xuất hiện trước |
| Vocabulary | Bỏ cách viết quảng bá | Mô tả trực tiếp AlgoBo và Mentee |
| Rhythm/Style | Rút câu và giảm lặp | Mỗi file chỉ có một vai trò rõ ràng |
