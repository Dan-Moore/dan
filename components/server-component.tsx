'use server'

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export async function buildCard(markdown: Promise<{
  frontMatter: {
      [key: string]: any;
  };
  slug: string;
  content: string;
}>) {
  
  
  const title = (await markdown).frontMatter.title
  const description = (await markdown).frontMatter.description
  const publish = (await markdown).frontMatter.publish

  return (
    <div>
<Card>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
  </CardHeader>
  <CardContent>
    <p>{description}</p>
  </CardContent>
</Card>
      </div>
  );
}