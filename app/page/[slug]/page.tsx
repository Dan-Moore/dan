import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { YouTubeEmbed } from "@next/third-parties/google";
import { getPages } from "@/lib/utils";



// generateStaticParams generates static paths for blog posts.
// This function is called at build time.
// It returns an array of possible values for slug.
// For example, [{ params: { slug: "my-first-post" } }, { params: { slug: "my-second-post" } }]
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("content"));
  const params = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return params;
}

export default async function Page({ params }: { params: { slug: string } }) {
  // Params contains the post `slug`

  // Fetch the post content based on the slug
  const props = await getPages(params);

  // Customize components for MDX rendering.
  // For example, the Code component will render code blocks with syntax highlighting.
  // The YouTube component will render YouTube videos.
  const components = {
    YouTubeEmbed
  };

  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg mx-auto">
      <h1>{props.frontMatter.title}</h1>
      <MDXRemote source={props.content} components={components} />
    </article>
  );
}