# Architecture & Technical Decisions — Phase 1

> Phạm vi tài liệu: quyết định kỹ thuật cho public UI. Không mô tả/triển khai backend hoặc CMS.

## 1. Quyết định đã chốt

| Chủ đề | Quyết định | Lý do / giới hạn |
| --- | --- | --- |
| Framework | Nuxt 4 | Theo project brief; ưu tiên routing/SSR/SEO native. |
| Language | TypeScript strict-friendly | Types dùng chung cho category, post, article blocks, profile và component props. |
| Styling | Tailwind CSS + CSS custom properties tập trung | Token garden theme dễ bảo trì; không thêm UI framework lớn. |
| Content | Typed local mock data | Phase 1; không tạo API/database/CMS. |
| Rendering | Semantic Vue components, Nuxt SSR mặc định | Nội dung public và metadata có thể đọc được; không cần client-only app. |
| Assets | Ảnh/illustration local trong `public/images/` | Tốc độ, ownership và quyền sử dụng rõ; lazy-load ảnh không quan trọng. |
| Hosting target | Vercel khi đến bước preview/launch | Không cấu hình credentials hoặc dịch vụ trả phí trong code local. |
| Prototype | HTML/CSS/JS hiện tại chỉ để tham khảo | Không tiếp tục mở rộng song song; giữ nguyên đến khi replacement được review. |

### Quyết định cần xác minh ở WO-01

- Chọn phiên bản Nuxt 4, Tailwind integration/module và Node/npm tương thích theo tài liệu chính thức tại thời điểm setup.
- Repository chưa có package manifest/lockfile. Mặc định dùng npm nếu không có quyết định khác; commit đúng một lockfile.
- Chọn các scripts tối thiểu. Chỉ thêm ESLint/test runner nếu setup tương thích, có nhu cầu rõ và không làm chậm scaffold; ghi lựa chọn trong README.

## 2. Cấu trúc thư mục đích

Dùng cấu trúc Nuxt 4 `app/` cho source. Nuxt project config và package files ở repository root.

```text
app/
  app.vue
  assets/css/main.css
  components/
    layout/
      SiteHeader.vue
      SiteFooter.vue
      MobileNavigation.vue       # chỉ tách riêng nếu menu có logic/markup đủ lớn
    blog/
      PostCard.vue
      CategoryFilter.vue
      ArticleBody.vue
      ArticleBlock.vue           # chỉ khi block renderer cần component riêng
    home/
      HomeHero.vue
      CategoryJourney.vue
      FeaturedStories.vue
  layouts/
    default.vue
  pages/
    index.vue
    about.vue
    blog/
      index.vue
      [slug].vue
    contact.vue
  data/
    categories.ts
    posts.ts
    profile.ts
  types/
    content.ts
  utils/
    content.ts                  # lookup/filter/format helpers thuần, có test nếu logic phát sinh
public/
  images/
  favicon.ico                   # khi có asset
nuxt.config.ts
package.json
package-lock.json
README.md
```

Không tạo folders rỗng hoặc abstraction chưa cần. Các page giữ orchestration; components nhận props rõ, không đọc global mock data trực tiếp trừ khi là content owner chuyên biệt được thống nhất.

## 3. Quy tắc routing và navigation

| Menu label | Route |
| --- | --- |
| Home | `/` |
| About | `/about` |
| Travel | `/blog?category=travel` |
| Experiences | `/blog?category=experiences` |
| Marketing | `/blog?category=marketing` |
| Books | `/blog?category=books` |
| Contact | `/contact` |

- `/blog` là trang Stories/Blog List, có thể truy cập từ CTA “All stories” hoặc featured section dù không phải menu item chính.
- Category filter dùng slug lowercase: `travel`, `experiences`, `marketing`, `books`, và `life` nếu có post Life. `all` là trạng thái mặc định, không phải category.
- Query param `category` là nguồn trạng thái có thể chia sẻ/bookmark. Filter controls phải cập nhật query/router và đọc lại query khi load.
- Search là lọc client-side trên local posts (title, excerpt, category); không request network.
- `/blog/[slug]` dùng slug ổn định; slug không tồn tại phải trả trạng thái Nuxt 404/not-found.

## 4. Data flow

`local typed mock data → page-level filter/lookup → semantic Vue components → HTML SSR`

- Không fetch external content trong Phase 1.
- Không ghi dữ liệu form vào localStorage, console, endpoint hoặc analytics.
- Không dùng `v-html` để render bài; bài viết được biểu diễn bằng discriminated union blocks theo `content-contract.md`.
- Không gắn visual classes/style vào content records; chủ đề/style do components và tokens điều khiển.

## 5. Styling và responsive

- Màu và font dùng CSS custom properties ở `app/assets/css/main.css`, được expose cho Tailwind theo integration đã chọn.
- Garden palette theo Copilot instructions. Coral chỉ là accent pin Travel/Journey; focus ring có màu đảm bảo contrast, không nhất thiết dùng coral.
- Breakpoints yêu cầu: mobile `<768px`, tablet `768–1023px`, desktop `>=1024px`.
- Article body width `680–760px` trên desktop; body text `18px`, line-height `1.7–1.9`; mobile `16–18px`.
- Dùng responsive image sizing/aspect ratio; không đặt chiều cao cố định gây crop nội dung không chủ ý.
- Chuyển động tiết chế; tất cả motion tôn trọng `prefers-reduced-motion`.

## 6. Accessibility và SEO

- Dùng landmark `header`, `nav`, `main`, `footer`, một H1 rõ ràng mỗi page; heading order không nhảy cấp.
- Mobile menu có button name, `aria-expanded`, `aria-controls`; thao tác được bằng keyboard, Escape đóng khi mở, focus không bị mất.
- Form field có label gắn đúng; lỗi validation gắn với field bằng `aria-describedby`.
- Ảnh nội dung có alt mô tả; ảnh trang trí `alt=""`.
- Mỗi route đặt title/description phù hợp bằng Nuxt SEO head; article title/date/category hiển thị semantic.
- Không thêm cookie banner/analytics/tracking vì chưa thuộc scope.

## 7. Environment, secrets, dependencies

- Phase 1 không cần environment secrets. Không tạo `.env` giả hoặc commit secrets.
- Ưu tiên dependency Nuxt/Tailwind và browser APIs; cần thư viện mới thì ghi lý do trong PR/change summary.
- Không thêm backend SDKs (Supabase), auth, editor, UI kit hoặc analytics.
- Node version/package manager ghi vào README dựa theo Nuxt compatibility khi scaffold.

## 8. Decision log

| ID | Decision | Status |
| --- | --- | --- |
| ADR-001 | Nuxt 4 + TypeScript + Tailwind, public UI only | Accepted |
| ADR-002 | Local typed mock data; no backend/CMS in Phase 1 | Accepted |
| ADR-003 | Garden theme + restrained Home/Travel journal motif | Accepted; see `feedback-vy.md` |
| ADR-004 | Category navigation uses `/blog?category=<slug>` | Accepted for implementation |
| ADR-005 | Contact form is demo-only and must never imply successful delivery | Accepted |
| ADR-006 | Nuxt/Tailwind exact compatible versions chosen at scaffold and committed to lockfile | Pending WO-01 |
