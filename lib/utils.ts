import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { YouTubeEmbed } from "@next/third-parties/google";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Directories
export const CONTENT_DIR = path.join(process.cwd(), "content");
export const CONTENT_PAGES_DIR = path.join(CONTENT_DIR, "pages");
export const CONTENT_POSTS_DIR = path.join(CONTENT_DIR, "posts");
export const CONTENT_PROJECTS_DIR = path.join(CONTENT_DIR, "projects");
export const CONTENT_DOCS_DIR = path.join(CONTENT_DIR, "docs");


export const CONTENT_PAGE_PATHS = fs.readdirSync(CONTENT_PAGES_DIR)
 .filter((path) => /\.mdx?$/.test(path));
export const CONTENT_PROJECT_PATHS = fs.readdirSync(CONTENT_PAGES_DIR)
 .filter((path) => /\.mdx?$/.test(path));


export function getContents(content_dir: string[]) {
  const mdx_file = content_dir.map((filePath: string) => {
    const source = fs.readFileSync(path.join(CONTENT_PAGES_DIR, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { mdx_file } };
}

export async function getMarkdown(dir: string, slug: string) {
  const markdownFile = fs.readFileSync(
    path.join(dir, slug + ".mdx"),
    "utf-8"
  );
  const { data: frontMatter, content } = matter(markdownFile);
  return {
    frontMatter,
    slug,
    content,
  };
}

export async function getPages({ slug }: { slug: string }) {
  return getMarkdown(CONTENT_PAGES_DIR, slug);
}

export async function getPosts({ slug }: { slug: string }) {
  return getMarkdown(CONTENT_POSTS_DIR, slug);
}

export async function getProjects({ slug }: { slug: string }) {
  return getMarkdown(CONTENT_PROJECTS_DIR, slug);
}

export async function getDocs({ slug }: { slug: string }) {
  return getMarkdown(CONTENT_DOCS_DIR, slug);
}