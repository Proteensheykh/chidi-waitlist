import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MdxBody } from "@/components/blog/mdx-body";
import { ShareButtons } from "@/components/blog/share-buttons";
import {
  formatPublishedDate,
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
} from "@/lib/blog";
import { getSiteUrl } from "@/lib/site";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  const { title, description, coverImage } = post.frontmatter;
  const url = `${getSiteUrl()}/blog/${post.slug}`;

  return {
    title: `${title} — Chidi Blog`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url,
      publishedTime: post.frontmatter.publishedAt,
      images: [
        {
          url: coverImage.startsWith("http")
            ? coverImage
            : `${getSiteUrl()}${coverImage}`,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        coverImage.startsWith("http")
          ? coverImage
          : `${getSiteUrl()}${coverImage}`,
      ],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { previous, next } = getAdjacentPosts(post.slug);
  const postUrl = `${getSiteUrl()}/blog/${post.slug}`;
  const coverImageUrl = post.frontmatter.coverImage.startsWith("http")
    ? post.frontmatter.coverImage
    : `${getSiteUrl()}${post.frontmatter.coverImage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: coverImageUrl,
    datePublished: post.frontmatter.publishedAt,
    author: {
      "@type": "Organization",
      name: "Chidi",
    },
    publisher: {
      "@type": "Organization",
      name: "Chidi",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  return (
    <div className="min-h-screen bg-[var(--chidi-surface)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[var(--chidi-text-secondary)] hover:text-[var(--chidi-text-primary)] font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="bg-white rounded-2xl border border-[var(--chidi-border-subtle)] shadow-sm overflow-hidden">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={post.frontmatter.coverImage}
              alt={post.frontmatter.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          <div className="p-8 sm:p-12">
            <header className="mb-8 pb-8 border-b border-[var(--chidi-border-subtle)]">
              <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--chidi-text-muted)] mb-4">
                <time dateTime={post.frontmatter.publishedAt}>
                  {formatPublishedDate(post.frontmatter.publishedAt)}
                </time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime} min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--chidi-text-primary)] mb-4">
                {post.frontmatter.title}
              </h1>
              <p className="text-lg text-[var(--chidi-text-secondary)] leading-relaxed">
                {post.frontmatter.description}
              </p>
            </header>

            <MdxBody source={post.content} />

            <div className="mt-10 pt-8 border-t border-[var(--chidi-border-subtle)]">
              <p className="text-sm font-medium text-[var(--chidi-text-primary)] mb-3">
                Share this post
              </p>
              <ShareButtons url={postUrl} title={post.frontmatter.title} />
            </div>

            {(previous || next) && (
              <nav
                aria-label="Post navigation"
                className="mt-10 pt-8 border-t border-[var(--chidi-border-subtle)] grid gap-4 sm:grid-cols-2"
              >
                {previous ? (
                  <Link
                    href={`/blog/${previous.slug}`}
                    className="rounded-xl border border-[var(--chidi-border-subtle)] p-4 transition-colors hover:border-[var(--chidi-border-default)]"
                  >
                    <p className="text-xs uppercase tracking-wide text-[var(--chidi-text-muted)] mb-1">
                      Previous
                    </p>
                    <p className="font-medium text-[var(--chidi-text-primary)]">
                      {previous.frontmatter.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}

                {next ? (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="rounded-xl border border-[var(--chidi-border-subtle)] p-4 text-right transition-colors hover:border-[var(--chidi-border-default)] sm:col-start-2"
                  >
                    <p className="text-xs uppercase tracking-wide text-[var(--chidi-text-muted)] mb-1">
                      Next
                    </p>
                    <p className="font-medium text-[var(--chidi-text-primary)]">
                      {next.frontmatter.title}
                    </p>
                  </Link>
                ) : null}
              </nav>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
