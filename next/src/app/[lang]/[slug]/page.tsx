import React from "react";

import { getDirectusSDK } from "../utils/useDirectusSDK";
import { readItems } from "@directus/sdk";
import PageBuilder from "../components/PageBuilder";

type Props = {
  params: { slug: string; lang: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function PageRoute({ params, searchParams }: Props) {
  function getSlug() {
    if (params.slug === "/") {
      return "home";
    } else params.slug;
  }

  console.log(params + "Slug" + params.slug);

  const { api } = getDirectusSDK();

  const page = await api.request(
    readItems("pages", {
      filter: {
        slug: { _eq: params.slug },
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

  if (page == null) return null;

  return (
    <div>
      <PageBuilder page={page as any} />
    </div>
  );
}

export default PageRoute;
