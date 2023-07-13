import React from "react";

import { getDirectusSDK } from "../utils/useDirectusSDK";
import { readItems } from "@directus/sdk";
import PageBuilder from "../components/PageBuilder";

type Props = {
  params: { slug: string; lang: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function PageRoute({ params, searchParams }: Props) {
  const { api } = getDirectusSDK();

  console.log(`请求的slug = ${params.slug}`);

  const pages = await api.request(
    readItems("pages", {
      filter: {
        slug: { _eq: params.slug === "/" ? "home" : params.slug },
      },
      fields: [
        "*",
        "seo.*",
        "blocks.collection",
        "blocks.item.*",
        "blocks.item.testimonials.testimonial.*",
        "blocks.item.logos.file.*",
        "blocks.item.form.*",
        "blocks.item.steps.*",
        "blocks.item.gallery_items.directus_files_id.*",
        "blocks.item.*",
        "blocks.item.rows.*",
        "blocks.item.posts.posts_id.*",
      ],
      limit: 1,
    })
  );

  if (pages.length === 0) return null;

  return (
    <div>
      <PageBuilder page={pages[0]} />
    </div>
  );
}

export default PageRoute;
