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

// Paths
export const PAGES_PATHS = fs.readdirSync(CONTENT_PAGES_DIR, {recursive: true})
  .filter((path) => /\.mdx?$/.test(path.toString()));

export const POSTS_PATHS = fs.readdirSync(CONTENT_POSTS_DIR, {recursive: true})
  .filter((path) => /\.mdx?$/.test(path.toString()));

export const PROJECTS_PATHS = fs.readdirSync(CONTENT_PROJECTS_DIR, {recursive: true})
  .filter((path) => /\.mdx?$/.test(path.toString()));

// Markdown
export async function getMarkdown(dir: string, slug: string) {
  if(!slug.endsWith(".mdx")){
    slug + ".mdx"
  }

  const markdownFile = fs.readFileSync(
    path.join(dir, slug),
    //path.join(dir, slug),
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