import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatPublishedDate, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Chidi",
  description:
    "Insights, tips, and updates on running your business through chat with Chidi.",
  openGraph: {
    title: "Blog — Chidi",
    description:
      "Insights, tips, and updates on running your business through chat with Chidi.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[var(--chidi-surface)]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--chidi-text-secondary)] hover:text-[var(--chidi-text-primary)] font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--chidi-text-primary)] mb-3">
            Blog
          </h1>
          <p className="text-[var(--chidi-text-secondary)] text-lg">
            Insights on running your business through chat.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[var(--chidi-border-subtle)] p-10 text-center shadow-sm">
            <p className="text-[var(--chidi-text-secondary)]">
              No posts yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl border border-[var(--chidi-border-subtle)] overflow-hidden shadow-sm transition-shadow hover:shadow-md"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="grid sm:grid-cols-[220px_1fr]">
                    <div className="relative aspect-[16/10] sm:aspect-auto sm:min-h-[180px]">
                      <Image
                        src={post.frontmatter.coverImage}
                        alt={post.frontmatter.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 220px"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
                      <time
                        dateTime={post.frontmatter.publishedAt}
                        className="text-sm text-[var(--chidi-text-muted)]"
                      >
                        {formatPublishedDate(post.frontmatter.publishedAt)}
                      </time>
                      <h2 className="mt-2 text-xl sm:text-2xl font-semibold text-[var(--chidi-text-primary)]">
                        {post.frontmatter.title}
                      </h2>
                      <p className="mt-3 text-[var(--chidi-text-secondary)] leading-relaxed">
                        {post.frontmatter.description}
                      </p>
                      <p className="mt-4 text-sm text-[var(--chidi-text-muted)]">
                        {post.readingTime} min read
                      </p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
