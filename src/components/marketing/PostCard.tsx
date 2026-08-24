import Link from 'next/link'
import type { PostSummary } from '@/lib/sanity/types'
import { formatDate } from '@/lib/utils'

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link href={`/blog/${post.slug}/`} className="group block">
      {post.cover?.url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover.url}
          alt={post.cover.alt ?? ''}
          className="mb-4 aspect-[16/10] w-full rounded-xl border border-line object-cover"
          loading="lazy"
        />
      )}
      <p className="text-[12.5px] font-medium uppercase tracking-[0.07em] text-faint">
        {post.category ?? 'Guide'}
        <span aria-hidden> · </span>
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        {post.readingMinutes ? <span> · {post.readingMinutes} min</span> : null}
      </p>
      <h3 className="mt-2.5 text-[19px] font-bold leading-[1.3] tracking-[-0.022em] transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      {post.excerpt && (
        <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-muted">{post.excerpt}</p>
      )}
    </Link>
  )
}
