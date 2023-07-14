import React from "react";
import BlockContainer from "./BlockContainer";
import TypographyTitle from "../typography/TypographyTitle";
import TypographyHeadline from "../typography/TypographyHeadline";
import { VAccordion } from "../base/VAccordion";

interface Faq {
  title?: string;
  answer?: string;
}

interface FaqsBlockProps {
  id: string;
  title?: string;
  headline?: string;
  faqs?: Faq[];
}

interface Props {
  data: FaqsBlockProps;
}

export function FaqsBlock({ data }: Props) {
  return (
    <BlockContainer className="max-w-screen-xl px-4 py-12 mx-auto sm:py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        {data.title && <TypographyTitle>{data.title}</TypographyTitle>}
        {data.headline && <TypographyHeadline content={data.headline} />}
        <div className="pt-6 mt-6">
          <dl className="space-y-6">
            {data.faqs?.map((item, itemIdx) => (
              <VAccordion key={itemIdx} title={item.title || "title"}>
                {item.answer}
              </VAccordion>
            ))}
          </dl>
        </div>
      </div>
    </BlockContainer>
  );
}
