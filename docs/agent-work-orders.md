# Agent Work Orders — Phase 1

> Mỗi order có một owner/agent. Không giao nhiều agents cùng sửa shared files. WO-01/02/03 hiện đã có implementation trong working tree; WO-04/05 sẵn sàng bắt đầu khi integration owner xác nhận các shared files cần thiết có mặt trong branch/context được giao. Status tại đây mô tả tiến độ local, không xác nhận commit/merge hay QA mới nhất.

## Shared rules for every agent

1. Đọc `.github/copilot-instructions.md` và tài liệu được liệt kê ở order.
2. Chỉ sửa phạm vi file được giao; báo trước nếu cần thay shared config/contracts.
3. Không thêm backend, API, auth, database, CMS, Tiptap, upload, analytics hay paid service.
4. Không dùng `v-html`, dữ liệu user không gửi đi đâu, không bịa facts/links của Vy.
5. Tạo UI bằng semantic HTML, TypeScript props rõ, Tailwind tokens, keyboard support và reduced-motion support.
6. Chạy các checks khả dụng; báo kết quả chính xác, không tuyên bố test chưa chạy.

## WO-01 — Scaffold & integration foundation

**Status:** Implemented locally; verify before integration. **Owner:** integration/lead agent.

**Read:** `project-kickoff.md`, `implementation-plan.md`, `architecture.md`.

**Owns:** root `package.json`, lockfile, `nuxt.config.ts`, TypeScript/Tailwind config, `.gitignore`, `README.md`, minimal `app/app.vue`, `app/layouts/default.vue`, global CSS scaffold.

**Tasks:**

- Khởi tạo Nuxt 4 + TypeScript + Tailwind tương thích; chọn version hiện hành và commit một lockfile.
- Tạo scripts cài/chạy/build/preview/typecheck theo setup thật.
- Thiết lập source path Nuxt 4, default layout, global CSS entry và page shell tối thiểu.
- Viết README: Node version, package manager, setup, dev, checks/build.
- Không di chuyển/xóa static prototype.

**Acceptance:** app chạy local; production build thành công; README commands khớp package scripts; không có backend dependency.

**Handoff:** ghi dependency versions, quyết định Tailwind integration, commands và bất kỳ limitation nào.

## WO-02 — Shared design system, types, content & shell

**Status:** Implemented locally; verify before integration. **Owner:** foundation agent.

**Read:** `architecture.md`, `page-spec.md`, `content-contract.md`, `feedback-vy.md`.

**Owns:** `app/types/**`, `app/data/**`, `app/utils/**`, `app/assets/css/**`, `app/components/layout/**`, shared blog components only; không sửa package/config hoặc page files khác order.

**Tasks:**

- Hoàn thiện CSS/Tailwind tokens cho màu, typography, spacing, container, focus.
- Khai báo types và category/post/profile mock records theo content contract.
- Tạo helpers thuần cho lookup/filter/search/date format khi cần.
- Implement SiteHeader, SiteFooter và PostCard/category controls nếu agreed props.
- Xác nhận component exports/props với page agents trước khi WO-03..05 bắt đầu.

**Acceptance:** types compile; category links đúng query; menu accessible; shared components không phụ thuộc global mutable state; mock assets local/license-safe.

## WO-03 — Home page

**Status:** Implemented locally; latest Home edits need verification. **Owner:** Home agent.

**Read:** `page-spec.md`, `feedback-vy.md`, `content-contract.md`.

**Owns:** `app/pages/index.vue`, `app/components/home/**`, Home-specific data nếu không sửa shared schema.

**Tasks:** hero, welcome, topic/category exploration, 3–4 featured stories, restrained journey map (nếu có artwork original), about preview, contact CTA.

**Acceptance:** Home order/copy hierarchy theo page spec; category links đúng; map motif chỉ ở Home section; không copy reference artwork/composition; responsive và semantic.

## WO-04 — Blog list & detail

**Status:** Ready (xác nhận shared foundation WO-02 trước khi bắt đầu). **Owner:** Blog agent.

**Read:** `feedback-vy.md`, `page-spec.md`, `content-contract.md`, `architecture.md`, `qa-checklist.md`.

**Owns:** `app/pages/blog/**`, `app/components/blog/ArticleBody.vue` và component blog-only cần thiết chưa thuộc WO-02. Không sửa shared `PostCard.vue`, `CategoryFilter.vue`, global CSS/tokens, `app/data/posts.ts`, `app/data/categories.ts`, `app/types/content.ts`, layout/header/footer hoặc Home; nếu cần thay đổi các file này phải đề nghị integration owner/foundation owner.

**Tasks:** list page query-backed category filter, combined local search, empty state/reset, post cards; detail route slug lookup/not-found; render article blocks an toàn; SEO metadata.

**Visual/content direction:** internal pages phải nhìn thuộc cùng publication với Home. Reuse shared tokens/components, warm garden palette, DM Serif Display/Georgia heading + sans body/UI và whitespace; giữ treatment gọn, hiện đại, nội dung dễ scan. Home hiện đang có card markup riêng, không dùng `PostCard`; Blog List dùng component shared hiện có nhưng match tinh thần card Home, không sửa Home hay shared component. Không bê hero full-bleed, map/postcard/pin/handwriting Home vào Blog; travel motif chỉ là accent trong nội dung Travel nếu có lý do.

**Acceptance:** filter/query reload đúng; search và category kết hợp; sort bài mới nhất trước; cards/meta/grid/responsive theo `page-spec.md`; invalid slug 404; detail có breadcrumb/back link, metadata chỉ khi dữ liệu có, semantic article blocks và width/readability đúng spec; mọi route có title/description phù hợp; không `v-html`; không thêm pagination/backend/share-counter.

**Handoff:** báo rõ shared components đã reuse, data gaps cần owner bổ sung, direct-route/refresh checks và viewport đã kiểm tra. Không tự thêm claim cá nhân vào mock post.

## WO-05 — About & Contact

**Status:** Ready (xác nhận shared foundation WO-02 trước khi bắt đầu). **Owner:** About/Contact agent.

**Read:** `feedback-vy.md`, `page-spec.md`, `content-contract.md`, `architecture.md`, `qa-checklist.md`.

**Owns:** `app/pages/about.vue`, `app/pages/contact.vue`, `app/components/about/**`, `app/components/contact/**` nếu abstraction có ích. Không sửa `app/data/profile.ts`, `app/types/content.ts`, global CSS/tokens, layout/header/footer, navigation hay Home; cần bổ sung profile fields thì yêu cầu integration owner cập nhật contract trước.

**Tasks:** About dạng personal/light portfolio với intro, topics/interests và contact CTA; chỉ render experience/projects/portrait nếu có dữ liệu/asset được Vy duyệt. Contact có copy thân thiện, links có thật khi được duyệt, form Name/Email/Message có client validation và thông báo demo không gửi.

**Visual/content direction:** dùng default layout và shared shell, đúng typography/palette/spacing của Home; layout editorial 1–2 cột có chủ đích, tránh dashboard/CV template, card dày hoặc visual motif Travel. Nội dung gọn, thật, có heading hierarchy và để khoảng trắng phục vụ đọc. Không public đoạn note trong `PROFILE.aboutParagraphs` tự ghi đây là sample nội bộ; chỉ dùng copy trung tính đã được rà soát, và không đưa thông tin cá nhân chưa được Vy xác nhận.

**Acceptance:** không CV corporate, skill bars, projects/employers/milestones hoặc facts bịa; không hiển thị nhãn placeholder thô; email/social/portrait chỉ render khi có giá trị/asset được duyệt; form keyboard-accessible, validate và báo rõ đây là demo; không submit network request/lưu/log dữ liệu, không báo gửi thành công. Cả hai page có metadata, responsive và CTA/nav đúng.

**Handoff:** nêu các content slots còn chờ Vy cung cấp và xác nhận cách UI xử lý khi optional profile fields vắng mặt.

## WO-06 — Integration QA & review preparation

**Status:** Blocked by WO-03, WO-04, WO-05. **Owner:** integration/QA agent.

**Read:** `qa-checklist.md`, tất cả source specs và app README.

**Owns:** integration fixes đã điều phối, tests/checks và QA notes; shared layout/config chỉ sửa qua integration owner.

**Tasks:** chạy install/build/typecheck/lint/tests hiện hữu; test route/query; rà desktop/tablet/mobile; keyboard/reduced motion/contrast/alt/metadata; sửa lỗi Phase 1 và chuẩn bị preview review.

**Acceptance:** mọi checkbox bắt buộc trong `qa-checklist.md` hoàn thành hoặc limitation được ghi rõ; prototype vẫn nguyên; không thêm scope.

## Trạng thái cập nhật

Integration owner cập nhật bảng dưới khi bắt đầu/merge order:

| Order | Status | Owner | PR/commit | Checks |
| --- | --- | --- | --- | --- |
| WO-01 | Implemented locally | — | — | Re-run before integration |
| WO-02 | Implemented locally | — | — | Re-run before integration |
| WO-03 | Implemented locally; latest Home edit needs verification | — | — | Re-run before integration |
| WO-04 | Ready (confirm WO-02 context) | — | — | — |
| WO-05 | Ready (confirm WO-02 context) | — | — | — |
| WO-06 | Blocked | — | — | — |
