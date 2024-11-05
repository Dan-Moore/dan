import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { YouTubeEmbed } from "@next/third-parties/google";
import { CONTENT_PAGES_DIR, CONTENT_PAGE_PATHS, getPages } from "@/lib/utils";
import Link from "next/link";


export default async function Page() {
  const posts = CONTENT_PAGE_PATHS.map((filePath) => {
    const source = fs.readFileSync(path.join(CONTENT_PAGES_DIR, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg mx-auto">
      <ul>
        {posts.map((post) => (
          <li key={post.filePath}>
            <Link
              as={`/page/${post.filePath.replace(/\.mdx?$/, "")}`}
              href={`/page/[slug]`}
            >
              {post.data.title}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}