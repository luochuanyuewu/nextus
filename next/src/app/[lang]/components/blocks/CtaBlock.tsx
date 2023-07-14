import React from "react";
import BlockContainer from "./BlockContainer";
import TypographyTitle from "../typography/TypographyTitle";
import TypographyHeadline from "../typography/TypographyHeadline";
import TypographyProse from "../typography/TypographyProse";
import VButton from "../base/VButton";

interface CtaBlockProps {
  id: string;
  title?: string;
  headline?: string;
  content?: string;
  buttons?: {
    id: string;
    label: string;
    href: string;
    open_in_new_window: boolean;
    variant: "primary" | "default" | "outline";
  }[];
}

export const CtaBlock: React.FC<{ data: CtaBlockProps }> = ({ data }) => {
  return (
    <BlockContainer className="w-full max-w-5xl mx-auto">
      <div className="relative p-2 overflow-hidden text-gray-900 bg-transparent bg-white border-4 dark:bg-transparent border-accent rounded-br-3xl rounded-tl-3xl">
        <div className="relative px-6 py-8 overflow-hidden rounded-br-2xl rounded-tl-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-accent dark:from-gray-800 dark:via-gray-900 dark:to-gray-600" />
          <div className="absolute inset-0 grain-bg dark:opacity-10" />
          <div className="relative md:flex md:items-center md:justify-between md:space-x-4">
            <div>
              {data.title && <TypographyTitle>{data.title}</TypographyTitle>}
              {data.headline && (
                <TypographyHeadline
                  content={data.headline}
                  className="font-bold"
                />
              )}
              {data.content && (
                <TypographyProse
                  content={data.content}
                  className="mt-2 font-mono"
                />
              )}
            </div>
            <div className="flex-shrink-0 mt-4 md:mt-0">
              {data.buttons &&
                data.buttons.map((button) => (
                  <VButton
                    key={button.id}
                    href={button.href}
                    target={button.open_in_new_window ? "_blank" : "_self"}
                    size="xl"
                    variant="primary"
                    className="block"
                  >
                    {button.label}
                  </VButton>
                ))}
            </div>
          </div>
        </div>
      </div>
    </BlockContainer>
  );
};
