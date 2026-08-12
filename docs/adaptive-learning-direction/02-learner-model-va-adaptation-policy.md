# Teaching Schema, knowledge state và adaptation policy

## 1. Teaching Schema là gì?

Teaching Schema là cấu trúc reasoning của một loại công việc, được course author
chọn theo learning objective. Nó giúp learner không phải bắt đầu từ trang trắng và
giúp runner xác định phần nào có thể kiểm chứng.

Schema không phải đáp án mẫu. Label không được ngầm tiết lộ thứ tự hoặc quyết định
đúng của scenario.

## 2. Schema family ban đầu

### Debugging

```text
Observed failure
→ candidate hypotheses
→ discriminating test
→ observed result
→ conclusion
→ fix and regression check
```

### RAG và evaluation

```text
Failure slice/query class
→ hypothesized failure source
→ proposed intervention
→ evaluation design
→ quality/latency/cost evidence
→ ship/reject decision
```

### Prompt engineering

```text
Target behavior
→ observed failure
→ prompt change
→ expected effect
→ evaluation evidence
→ regression risk
```

### Agent/tool workflow

```text
Current state
→ selected tool/action
→ expected observation
→ guardrail
→ recovery/termination condition
```

### Safety, privacy và PII

```text
Data class
→ threat/failure mode
→ control
→ verification evidence
→ residual risk/escalation
```

### Incident investigation

```text
Signal
→ hypotheses
→ investigation action
→ evidence chain
→ conclusion
→ remediation/prevention
```

### System design

```text
Requirement/constraint
→ decision
→ rejected alternative
→ trade-off
→ validation evidence
```

## 3. Knowledge-state contract

Knowledge state chỉ chứa điều learner đã cung cấp và xác nhận:

```json
{
  "schemaVersion": 1,
  "objectiveId": "rag.retrieval.failure_analysis",
  "claims": [
    {
      "id": "claim-1",
      "field": "hypothesized_failure_source",
      "content": "Exact product identifiers may be missed by dense retrieval",
      "sourceTurn": 2,
      "sourceText": "...",
      "learnerConfirmed": true
    }
  ]
}
```

Không tự thêm “kiến thức chuẩn” vào state learner. Reference knowledge và ground
truth thuộc runner/spec, không được đưa cho apprentice.

## 4. Confirmation loop

```text
Learner input
→ extractor tạo claims
→ UI hiển thị claim + đoạn nguồn
→ learner xác nhận/sửa/xóa
→ state mới được dùng cho enactment
```

Extraction confidence không thay thế learner confirmation. Mọi sửa tự động phải
có audit trail.

## 5. Enactment contract

Spec định nghĩa output có cấu trúc. Apprentice:

- chỉ điền slot được claim bao phủ;
- dẫn `claimIds` đã dùng cho mỗi action/kết luận;
- để `unknown` khi state chưa đủ;
- không được đọc runner assertions hoặc transfer answer;
- không tự sửa state.

Ví dụ:

```json
{
  "action": "run_hybrid_retrieval_eval",
  "claimIds": ["claim-1", "claim-3"],
  "parameters": {"slice": "queries_with_product_ids"},
  "expectedEvidence": ["recall_at_10", "p95_latency"]
}
```

## 6. Feedback và repair policy

Runner trả verdict theo assertion. Feedback chỉ mô tả discrepancy ở mức đủ để
learner biết phần lời dạy cần xem lại.

| Verdict | Feedback | Hoạt động tiếp theo |
| --- | --- | --- |
| Missing coverage | Nêu schema field/claim chưa đủ | Bổ sung lời dạy |
| Unsupported action | Nêu action không có claim nguồn | Sửa hoặc thêm reasoning |
| Contradiction | Chỉ ra hai claim mâu thuẫn | Learner chọn/sửa dựa trên evidence |
| Wrong application | Nêu assertion thất bại, không lộ expected value | Repair rồi enact lại |
| Pass | Xác nhận phạm vi scenario đã pass | Kết thúc hoặc micro-transfer |

Số vòng repair do spec quy định; mặc định 2 để kiểm soát thời gian, không phải quy
tắc sư phạm phổ quát.

## 7. Learner model: triển khai tối thiểu

Ở alpha, chỉ lưu evidence ledger, chưa suy diễn state phức tạp:

```text
participant × objective
  -> lab evidence
  -> teaching claims
  -> enactment verdicts
  -> repairs
  -> transfer verdict
```

Nếu cần UI progress, dùng nhãn mô tả evidence:

- `lab_completed`
- `teaching_submitted`
- `enactment_completed`
- `transfer_completed`

Không dùng `mastered` cho đến khi có transfer rule được reviewer duyệt. Scheduler
adaptive xuyên track là phase sau và phải có policy versioned, rationale và audit.
