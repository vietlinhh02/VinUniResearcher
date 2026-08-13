# Literature synthesis cho hướng state-aware questioning

Corpus chi tiết nằm trong `06-evidence-matrix.csv`. Đây là bản tổng hợp để ra
quyết định thiết kế, chưa phải systematic review.

## Learning-by-Teaching cho biết điều gì?

Betty's Brain, nghiên cứu về protégé effect và meta-analysis của Kobayashi cho thấy
việc chuẩn bị để dạy và thực sự dạy có thể làm learner đầu tư nhiều
effort hơn, tổ chức lại kiến thức và cải thiện một số learning outcome. Phần
lớn bằng chứng này có trước LLM hoặc nằm ngoài applied-AI labs.

Vì vậy Mentee giữ vai learner-as-teacher, nhưng không lấy literature làm bằng chứng
rằng prototype hiện tại chắc chắn hiệu quả. Learning outcome vẫn phải được đo
bằng task của learner.

Nguồn chính: Biswas et al. (2005), Chase et al. (2009), Kobayashi (2019).

## AlgoBo/TeachYou là nền tảng gần nhất

Jin et al. dùng pipeline Reflect–Respond để lưu knowledge state ngoài model. AlgoBo luân
phiên giữa help-receiver và questioner mode; ở questioner mode, agent hỏi `why` hoặc `how`
để kéo learner sang knowledge-building.

Paper cho thấy condition TeachYou có knowledge-building density cao hơn trong problem-solving
phase (`d = 0.71`). Con số này không phải learning gain. Condition cũng thay đổi cả
Mode-shifting và Teaching Helper, nên không thể quy toàn bộ khác biệt cho question
policy.

Mentee kế thừa external knowledge state, apprentice persona và active questioning. Study mới
tách riêng cách chọn follow-up question, giữ các scaffold khác giống nhau.

Paper cũng chỉ ra một vấn đề kỹ thuật đáng chú ý: LLM đôi khi ưu tiên kiến
thức đúng phổ biến hơn misconception vừa được learner dạy. Prompt alone chưa
đủ. Vì vậy state update và response đều cần provenance, fidelity test và expert
evaluation.

## Knowledge-building là process outcome

Roscoe và Chi phân biệt knowledge-telling với knowledge-building. Nhắc lại định nghĩa
hoặc thủ tục thuộc knowledge-telling; giải thích cơ chế, tạo kết nối, tự sửa
và suy ra hệ quả thuộc knowledge-building.

Câu hỏi `why/how` là một cách hợp lý để khơi gợi các hành vi này. Nhưng
transcript dài hơn hoặc nhiều câu hỏi hơn chưa chứng minh learner đã học. Pilot có
thể dùng knowledge-building rate làm primary process outcome và đo transfer riêng.

## Câu hỏi thích nghi là khoảng trống hợp lý

AlgoBo dùng chu kỳ hỏi sau mỗi ba learner messages, một heuristic rút ra từ pilot.
Hướng đó cho biết khi nào chuyển mode, nhưng chưa giải quyết đầy đủ câu
hỏi: trong nhiều phần đang thiếu, AI nên hỏi phần nào và dùng clarification,
elaboration, connection hay edge case?

Khoảng trống team theo đuổi là:

> Chưa rõ việc chọn follow-up question từ external knowledge state có tạo ra nhiều
> knowledge-building hơn một policy đi theo lesson path cố định, khi model, persona,
> question budget và các scaffold khác được giữ nguyên.

Đây là extension của AlgoBo, không phải tuyên bố phát minh teachable agent, knowledge
state hoặc active questioning.

## Những paper khác giúp khóa thiết kế

HypoCompass cho thấy một activity lập trình nên nhắm đúng một cognitive skill, như
việc tạo giả thuyết lỗi, thay vì “debugging nói chung”. Mentee vì thế chọn
một objective hẹp và viết teaching map theo workflow thực tế của task.

Các thí nghiệm recursive feedback của Okita và Schwartz cho thấy tutor có thể học từ
việc quan sát pupil áp dụng điều đã được dạy. Cơ chế này vẫn đáng nghiên
cứu, nhưng nó khác với question selection. Đưa cả enactment và adaptive questioning vào
cùng study sẽ khiến intervention khó diễn giải.

MatlabTutee và các LLM teachable-agent gần đây cho thấy khả năng triển khai trong lớp
CS. Novelty của Mentee vì thế không thể chỉ là “dùng LLM làm học trò”.

Các phân tích interaction log cũng nhắc lại một điểm: constructive interaction có
liên hệ với improvement, nhưng correlation không phải causal effect. Số lượt chat,
word count và satisfaction chỉ là process hoặc UX metrics.

## Claims literature chưa hỗ trợ

- AI hỏi nhiều hơn chắc chắn làm learner học tốt hơn.
- Knowledge-building density tự động chuyển thành learning gain.
- LLM-generated knowledge state là ground truth về hiểu biết của learner.
- Một question taxonomy phù hợp với mọi domain.
- AI pass một task nghĩa là learner đã mastery.
- Pilot nhỏ ở một lab có thể khái quát cho toàn bộ chương trình.

## Contribution có thể bảo vệ

Nếu technical evaluation và pilot đạt yêu cầu, contribution nên được mô tả ở
mức:

1. Một pipeline external knowledge state cho teach-back tiếng Việt sau lab.
2. Một state-aware policy chọn question target và strategy có provenance.
3. Fidelity data về extraction, gap detection, grounding và answer leakage.
4. Ước lượng ban đầu về tác động của policy lên knowledge-building; transfer là
   exploratory cho đến khi study được power đầy đủ.

Trước manuscript, team vẫn cần systematic search có protocol, double screening, citation
chaining và risk-of-bias assessment.

### Changes

| Pass | What changed | Examples |
|-|-|-|
| Structure | Bám theo quyết định nghiên cứu | AlgoBo → gap → contribution |
| Inflation | Hạ claim về đúng mức evidence | `d = 0.71` là process outcome |
| Vocabulary | Bỏ câu chữ quảng bá | Dùng “extension của AlgoBo” |
| Rhythm/Style | Nối evidence với quyết định | Tách enactment khỏi study |
