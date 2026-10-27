# Content Types & Mock Data Contract — Phase 1

> Contract này dùng cho dữ liệu local TypeScript. Đây chưa phải database schema/API contract; không thêm Supabase/Tiptap trong Phase 1.

## 1. Quy tắc chung

- Types là source of truth tại `app/types/content.ts`; mock fixtures đặt ở `app/data/`.
- Category keys/slugs ổn định, lowercase, dùng được trong URL.
- Dates lưu ISO 8601 dạng date-only (`YYYY-MM-DD`) và format theo locale tại presentation layer.
- Không nhúng HTML/CSS class/style trong records.
- Không bịa thông tin cá nhân, bài viết/địa danh thật, email hoặc social URLs. Dùng sample nội dung có thể thay.
- Ảnh có `src`, `alt` và optional `caption`, `width`, `height`; alt rỗng chỉ dành cho ảnh trang trí.
- Các record hiện tại là mock data phục vụ demo, không phải nội dung đã được Vy xác nhận. Không trình bày chuyến đi, lịch sử công việc, thói quen, ý kiến hoặc trải nghiệm cụ thể như facts của Vy nếu chưa được cung cấp/duyệt.
- Viết theo chuẩn editorial hiện đại: title cụ thể, tự nhiên, dễ scan; excerpt tóm lược giá trị bài (thường 1–2 câu); dùng sentence case nhất quán; tránh clickbait, Lorem ipsum, filler lặp lại và metadata thừa.
- Mỗi bài detail nên có nội dung đủ để minh họa nhịp đọc thực tế, heading/list/quote/image chỉ dùng khi có nội dung phù hợp. Không tạo block rỗng để “đủ component”; `readingTimeMinutes` chỉ cung cấp khi đã tính/ước lượng nhất quán.
- Giao diện quyết định presentation; dữ liệu không mang class, màu, layout hoặc chỉ dẫn trang trí. Home và internal pages dùng chung typography/palette tokens; travel-journal motifs không nằm trong content records để áp dụng toàn site.

## 2. TypeScript contract tham chiếu

```ts
export type CategorySlug =
  | 'travel'
  | 'experiences'
  | 'marketing'
  | 'books'
  | 'life'

export interface Category {
  slug: CategorySlug
  label: string
  description: string
  navVisible: boolean
  journeyVisible: boolean
}

export interface ContentImage {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

export interface Post {
  slug: string
  title: string
  excerpt: string
  category: CategorySlug
  publishedAt: string // ISO date: YYYY-MM-DD
  readingTimeMinutes?: number
  cover: ContentImage
  featured: boolean
  blocks: ArticleBlock[]
}

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'image'; image: ContentImage }
  | { type: 'link'; text: string; href: string }

export interface Profile {
  displayName: string
  shortBio: string
  aboutParagraphs: string[]
  interests: string[]
  email?: string
  socialLinks?: Array<{ label: string; href: string }>
  portrait?: ContentImage
}
```

Implementation được phép điều chỉnh type vì lý do tốt, nhưng phải giữ cùng semantics và cập nhật contract trước khi các page agents code.

## 3. Category rules

| Slug | Label | Nav | Home journey |
| --- | --- | --- | --- |
| `travel` | Travel | Có | Có |
| `experiences` | Experiences | Có | Có |
| `marketing` | Marketing | Có | Có |
| `books` | Books | Có | Có |
| `life` | Life | Filter-only khi có content | Không bắt buộc |

Category list phải khai báo bằng typed data; không duplicate label/map tùy tiện ở page.

## 4. Content helpers/behavior

- `getPostBySlug(slug)` trả `Post | undefined`.
- `filterPosts({ category, query })` trả list mới, giữ data gốc immutable.
- Search không phân biệt hoa/thường và match title + excerpt + category label.
- Sort blog list theo `publishedAt` giảm dần; featured Home ưu tiên `featured`, giới hạn số bài.
- Category không hợp lệ không gây crash; query được chuẩn hóa thành `all`.
- `href` trong block link phải được validate/allowlist protocol (`https:`, `mailto:` hoặc internal relative links); không render `javascript:` URL.

## 5. Mock data checklist

- Tối thiểu 6 bài để chứng minh list/filter và categories (nếu chưa có nội dung thật).
- Ít nhất một bài featured cho Home.
- Bài detail mẫu nên có heading, paragraph, quote, list, image/caption và link block để test renderer.
- Dữ liệu sample phải có copy cụ thể, tự nhiên, ngắn; không dùng Lorem ipsum và không giả danh bài thật của Vy.
- Ảnh dùng file local được cung cấp/license rõ. Không trỏ tới ảnh random bên ngoài.
- Các ví dụ địa danh/đời sống/nghề nghiệp hiện có cần được xem là dữ liệu thử, không đăng như tiểu sử/chuyến đi có thật nếu Vy chưa xác nhận; khi thiếu nội dung approved thì dùng copy giới thiệu chủ đề trung tính hoặc ẩn section optional.
- Trước khi dùng reading time, metadata, caption/byline hoặc related-post link trên UI, xác nhận field có dữ liệu và có ý nghĩa; không render label rỗng hoặc bịa author/updated date.
