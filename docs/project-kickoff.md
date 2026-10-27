# Project Kickoff — Phase 1 Public Site

> Mục đích: chuyển prototype HTML hiện có thành code production-ready cho public site. Đây là checklist và quyết định triển khai, không thay thế yêu cầu sản phẩm của Vy.

## 1. Phạm vi bắt đầu

**Làm trong Phase 1**

- Nuxt 4, TypeScript và Tailwind CSS.
- Public routes: `/`, `/about`, `/blog`, `/blog/[slug]`, `/contact`.
- Category filtering qua `/blog?category=<slug>` cho Travel, Experiences, Marketing và Books.
- Header, footer, mobile navigation, responsive layouts, accessibility và SEO cơ bản.
- Typed mock data, ảnh local/placeholder có alt text phù hợp.

**Không làm trong Phase 1**

- Supabase, authentication, API/server routes, database, CMS, Tiptap, uploads, search backend, analytics production.

## 2. Trạng thái repository và cách migration

Repository hiện có là prototype tĩnh: `index.html`, `blog.html`, `article.html`, `about.html`, `contact.html`, `css/style.css`, `js/main.js` và `images/`.

Khi khởi tạo Nuxt:

1. Giữ prototype nguyên vẹn cho đến khi các page Nuxt tương ứng được review.
2. Đưa asset có thể dùng lại vào `public/images/`; tối ưu định dạng/kích thước trước khi dùng thật.
3. Chuyển token từ `css/style.css` sang Tailwind theme hoặc CSS variables trung tâm; không copy các giá trị màu rải rác vào page/component.
4. Chuyển nội dung mock trong `js/main.js` thành typed data theo `docs/content-contract.md` trong `app/data/`.
5. Sau khi Nuxt thay thế toàn bộ public UI và được Vy duyệt, archive hoặc xóa prototype theo một PR riêng.

## 3. Cấu trúc mục tiêu

```text
app/
  components/
    layout/        # SiteHeader, SiteFooter, MobileNavigation
    blog/          # PostCard, CategoryFilter, ArticleContent
    home/          # Hero, JourneyMap, FeaturedStories
  data/            # typed mock posts, categories, profile
  pages/           # public routes
  types/           # Post, Category, Profile types
  assets/css/      # global styles and design tokens
public/images/     # optimized local images and illustrations
docs/              # requirements, feedback, decisions and handoff notes
```

Tên component dùng PascalCase. Route và file data dùng kebab-case khi cần nhiều từ. Không tạo component “generic” nếu chưa được tái sử dụng ít nhất hai nơi hoặc chưa đại diện một khái niệm rõ ràng.

## 4. Design system tối thiểu

Centralize các token sau trước khi xây page:

- Màu: warm canvas, paper, leaf, forest, sky, sun, peach/coral accent, ink, muted, line.
- Typography: editorial display/serif, sans-serif cho UI/body, handwriting chỉ dùng cho note ngắn.
- Layout: content width, article width `680–760px`, spacing scale, breakpoints mobile/tablet/desktop.
- Component states: keyboard focus, hover, disabled/form validation và `prefers-reduced-motion`.

Feedback travel-journal được triển khai bằng `JourneyMap` trên Home và ornament theo ngữ cảnh Travel; không tạo hiệu ứng nền bản đồ toàn site.

## 5. Nội dung mock và asset

- Dùng nội dung Việt hoặc Anh tự nhiên phù hợp Travel, Experiences, Marketing, Books, Life và personal growth.
- Mỗi post cần: `slug`, `title`, `excerpt`, `category`, `publishedAt`, `readingTime`, `coverImage`, `coverAlt`, `featured` và article body mock.
- Không dùng ảnh có bản quyền không rõ nguồn. Ghi nguồn/license cho asset bên thứ ba trong file asset manifest nếu có.
- Ưu tiên AVIF/WebP khi tương thích; khai báo width/height hoặc aspect ratio để hạn chế layout shift; lazy-load ảnh ngoài viewport.

## 6. Trình tự thực hiện

1. Scaffold Nuxt, Tailwind, lint/format/typecheck và scripts rõ ràng.
2. Định nghĩa tokens, global CSS, types, mock data và global layout.
3. Hoàn thành `/` gồm hero, welcome, categories/journey, featured posts, about preview và contact CTA.
4. Hoàn thành `/blog` và `/blog/[slug]`; bảo đảm reading width, heading hierarchy và ảnh/caption.
5. Hoàn thành `/about` và `/contact`; contact form chỉ là UI demo, không gửi dữ liệu.
6. Kiểm tra responsive, keyboard navigation, focus visible, reduced motion, metadata và build production.
7. Deploy preview để Vy review theo `feedback-vy.md`.

Chi tiết dependencies, file ownership và acceptance của từng agent nằm trong `docs/implementation-plan.md` và `docs/agent-work-orders.md`; dùng `docs/architecture.md`, `docs/page-spec.md`, `docs/content-contract.md` làm implementation contracts.

## 7. Definition of done cho Phase 1

- [ ] Tất cả public routes hoạt động trên Nuxt, không phụ thuộc prototype HTML.
- [ ] Home phản ánh đúng garden personality và travel-journal accent đã được Vy duyệt.
- [ ] Blog list có filter/search UI mock; blog detail ưu tiên đọc trên `680–760px` desktop.
- [ ] Navigation, form controls và mobile menu dùng được bằng bàn phím, có focus rõ và ARIA hợp lý.
- [ ] Layout được kiểm tra tại `<768px`, `768–1023px`, và `>=1024px`.
- [ ] Ảnh có alt text thích hợp, non-critical images lazy-load và không dùng asset không rõ license.
- [ ] Chạy thành công format, lint, typecheck và production build theo scripts đã cấu hình.
- [ ] Vy review preview và feedback mới được ghi vào `docs/feedback-vy.md`.

## 8. Cần Vy xác nhận trước khi publish thật

- Tên/wordmark chính thức, quote hero và bio ngắn.
- Email, social links, consent cho ảnh chân dung/ảnh bài viết.
- Danh sách post mở đầu cùng category, cover image và ngày publish.
- Domain và quyền truy cập/deploy khi tới bước launch.