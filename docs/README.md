# Project Documentation Index

Tài liệu gốc sản phẩm, visual và kế hoạch triển khai cho Vy's personal blog. Đọc theo thứ tự sau để bắt đầu một work order.

## Bắt đầu nhanh cho agents

1. `.github/copilot-instructions.md` — quy tắc chung, scope phase và thứ tự ưu tiên khi có mâu thuẫn.
2. `docs/feedback-vy.md` — feedback đã xác nhận và các giới hạn visual.
3. `docs/project-kickoff.md` — mục tiêu, scope và migration từ prototype.
4. `docs/architecture.md` — stack, routing, data flow và cấu trúc source.
5. `docs/page-spec.md` + `docs/content-contract.md` — yêu cầu page và contract dữ liệu.
6. `docs/agent-work-orders.md` — chọn order, xác nhận dependency/file ownership.
7. `docs/implementation-plan.md` — trình tự, phối hợp, gates và Definition of Done.
8. `docs/qa-checklist.md` — dùng ở lúc implementation và handoff.

## Danh mục

| Document | Dùng cho |
| --- | --- |
| `vy-blog-requirements.md` | Product, content, visual requirements do Vy cung cấp. |
| `feedback-vy.md` | Feedback đã duyệt/đang chờ và quy tắc cập nhật feedback. |
| `project-kickoff.md` | Scope Phase 1, migration và tiêu chí hoàn thành. |
| `implementation-plan.md` | Roadmap, dependency, phối hợp agents, risk và gates. |
| `architecture.md` | Quyết định kỹ thuật Phase 1, routing/data flow, cấu trúc thư mục. |
| `page-spec.md` | Behavior, content hierarchy và visual acceptance theo page. |
| `content-contract.md` | TypeScript data contract và quy tắc mock content. |
| `agent-work-orders.md` | Tasks, quyền sở hữu file, dependencies và agent acceptance. |
| `qa-checklist.md` | Automated/functional/responsive/accessibility QA và report format. |
| `deployment-vercel-plan.md` | Hướng dẫn deploy lần đầu lên Vercel, phân chia AI/người dùng và chia sẻ preview link. |
| `prototype-plan.md` | Mô tả prototype HTML tĩnh hiện tại; chỉ dùng làm visual/interaction reference. |
| `Projectbackground.md` | Bối cảnh kiến trúc dài hạn/CMS; không mở rộng scope Phase 1. |
| `project-proposal-vy.md` | Vai trò, phase, cost constraints và operational expectations. |

## Source-of-truth rules

- Latest direct user request wins.
- Visual/product questions follow approved Vy feedback and requirements; technical execution follows `architecture.md` and `implementation-plan.md`.
- Phase 1 is public UI only. Proposal/background sections discussing CMS are future context, not permission to implement backend now.
- `ui-wireframe.md` chưa có trong repository; không giả định wireframe tồn tại. Dùng `page-spec.md` làm implementation spec cho tới khi wireframe được bổ sung và duyệt.
- Khi docs mâu thuẫn hoặc thiếu quyết định ảnh hưởng contract/shared files, dừng phần liên quan và yêu cầu integration owner cập nhật tài liệu trước khi code.
