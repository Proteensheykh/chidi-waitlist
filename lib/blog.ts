import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const WORDS_PER_MINUTE = 200;

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  coverImage: string;
  draft?: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
  readingTime: number;
}

function isProduction(): boolean {
  return (
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL_ENV === "production"
  );
}

function shouldIncludePost(draft?: boolean): boolean {
  if (!draft) {
    return true;
  }

  return !isProduction();
}

function computeReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function getPostFilenames(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));
}

function parsePostFile(filename: string): BlogPost {
  const slug = filename.replace(/\.mdx$/, "");
  const filePath = path.join(BLOG_DIR, filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as BlogPostFrontmatter;

  return {
    slug,
    frontmatter,
    content,
    readingTime: computeReadingTime(content),
  };
}

function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime(),
  );
}

export function formatPublishedDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getAllPosts(): BlogPost[] {
  return sortPostsByDate(
    getPostFilenames()
      .map(parsePostFile)
      .filter((post) => shouldIncludePost(post.frontmatter.draft)),
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filename = `${slug}.mdx`;
  const filePath = path.join(BLOG_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const post = parsePostFile(filename);

  if (!shouldIncludePost(post.frontmatter.draft)) {
    return null;
  }

  return post;
}

export function getAdjacentPosts(slug: string): {
  previous: BlogPost | null;
  next: BlogPost | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}
