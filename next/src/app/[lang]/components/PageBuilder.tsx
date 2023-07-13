import React from "react";

import { Page } from "@/types/schemas";
import RichTextBlock from "./blocks/RichTextBlock";
import HeroBlock from "./blocks/HeroBlock";
import GalleryBlock from "./blocks/GalleryBlock";
import QuoteBlock from "./blocks/QuoteBlock";

function PageBuilder({ page }: { page: Page }) {
  return (
    <div className="mx-auto" id="content">
      {page.blocks &&
        page.blocks.map((block) => {
          switch (block.collection) {
            case "block_richtext":
              return <RichTextBlock data={block.item as any}></RichTextBlock>;
            case "block_hero":
              return <HeroBlock data={block.item as any}></HeroBlock>;
            case "block_gallery":
              return <GalleryBlock data={block.item as any}></GalleryBlock>;
            case "block_quote":
              return <QuoteBlock data={block.item as any}></QuoteBlock>;
          }
        })}
    </div>
  );
}

export default PageBuilder;
