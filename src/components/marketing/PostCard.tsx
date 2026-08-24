import Link from 'next/link'
import type { Article } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

export function PostCard({ post }: { post: Article }) {
  return (
    <Link href={`/blog/${post.slug}/`} className="group block">
      <p className="text-[12.5px] font-medium uppercase tracking-[0.07em] text-faint">
        {post.category}
        <span aria-hidden> · </span>
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span> · {post.readingMinutes} min</span>
      </p>
      <h3 className="mt-2.5 text-[19px] font-bold leading-[1.3] tracking-[-0.022em] transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-muted">{post.excerpt}</p>
    </Link>
  )
}
