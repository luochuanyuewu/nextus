import React from "react";

import directusApi from "../utils/directus-api";
import { readItems } from "@directus/sdk";
import PageBuilder from "../components/PageBuilder";

type Props = {
  params: { slug: string; lang: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function PageRoute({ params }: Props) {

  console.log(`请求的slug = ${params.slug}`);

  const pages = await directusApi.request(
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
    <>
      <PageBuilder page={pages[0]} />
    </>
  );
}

