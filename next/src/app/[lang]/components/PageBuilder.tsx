import React from "react";

import { Page } from "@/types/schemas";
import RichTextBlock from "./blocks/RichText";

function PageBuilder({ page }: { page: Page }) {
  return (
    <div className="mx-auto" id="content">
      {page.blocks &&
        page.blocks.map((block) => {
          switch (block.collection) {
            case "block_richtext":
              return <RichTextBlock data={block.item as any}></RichTextBlock>;
          }
        })}
    </div>
  );
}

export default PageBuilder;
