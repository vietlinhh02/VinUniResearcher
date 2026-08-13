# Mentee: hướng nghiên cứu hiện hành

Đọc [Hướng chốt của project](HUONG-CHOT-PROJECT.md) trước. File đó là nguồn
quyết định khi tài liệu khác chưa được cập nhật đồng bộ.

Mentee là một AI apprentice mà learner dạy sau khi hoàn thành lab. Hướng nghiên
cứu kế thừa external knowledge state và vai AI học trò từ AlgoBo/TeachYou, nhưng
đặt trọng tâm vào việc khép kín vòng tương tác:

```text
Learner → AI: giải thích
AI cập nhật knowledge state
AI → Learner: phản hồi dựa trên state
Learner làm rõ, sửa hoặc bổ sung
AI cập nhật state mới
```

Phản hồi của AI có thể là câu hỏi làm rõ, yêu cầu giải thích lý do, kiểm tra
mâu thuẫn, yêu cầu ví dụ hoặc phản ánh lại cách AI đang hiểu. Follow-up question
là một phần của loop, không phải toàn bộ research problem.

AI không chạy lại toàn bộ bài lab trong study đầu tiên. Kết quả của bước đó phụ
thuộc cả lời learner dạy lẫn năng lực giải task của model, nên khó dùng để xác
định learner đang thiếu kiến thức ở đâu.

## Tài liệu đang dùng

1. [Hướng chốt của project](HUONG-CHOT-PROJECT.md)
2. [Quyết định nghiên cứu](00-dinh-huong-chot.md)
3. [Tổng quan product và research](01-tong-quan-huong-research.md)
4. [Knowledge state và reciprocal policy](02-learner-model-va-adaptation-policy.md)
5. [PRD cho phiên post-lab](03-prd-engine-xuyen-track.md)
6. [Thiết kế kỹ thuật conversation engine](04-learning-activity-spec.md)
7. [Literature synthesis](05-literature-review-nen-tang.md)
8. [Evidence matrix](06-evidence-matrix.csv)
9. [Prompt và fidelity specification](07-prompt-fidelity-reference-cu.md)
10. [Instrumentation và assessment](08-instruments-reference-cu.md)

Ghi chú paper, protocol và instrument chi tiết nằm trong [`../research/`](../research/).

## Tài liệu cũ

Những file trong [`archive/`](archive/) chỉ để lưu lịch sử. Không dùng chúng để
quyết định product flow hoặc research question hiện tại.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Đưa loop hai chiều lên đầu | Learner → AI → Learner |
| Vocabulary | Mở rộng khỏi question selection | Reciprocal response action |
| Rhythm/Style | Dùng mô tả trực tiếp | Follow-up question chỉ là một phần |
