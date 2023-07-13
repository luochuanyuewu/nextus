import React from "react";
import VButton from "../base/VButton";
import BlockContainer from "./BlockContainer";
import { getDirectusMedia } from "../../utils/api-helpers";
import Image from "next/image";

interface Hero {
  id: string;
  headline: string;
  content: string;
  image: string;
  buttons?: Array<{
    label: string;
    href: string;
    variant: string;
    open_in_new_window: boolean;
  }>;
}

interface HeroBlockProps {
  data: Hero;
}

function HeroBlock({ data }: HeroBlockProps) {
  return (
    <BlockContainer className="relative grid gap-6 md:grid-cols-3">
      {/* Content */}
      <div className="md:pt-12 md:col-span-2">
        <h1
          className="font-serif text-4xl font-extrabold leading-9 text-gray-900 xs:text-5xl sm:text-7xl lg:text-8xl dark:drop-shadow dark:text-gray-100 color-em"
          dangerouslySetInnerHTML={{ __html: data.headline }}
        />
        <p className="w-full py-6 font-serif text-xl lg:leading-loose lg:text-2xl dark:text-gray-200">
          {data.content}
        </p>
        <div className="flex flex-col space-y-4 md:space-x-4 md:flex-row md:space-y-0">
          {data.buttons &&
            data.buttons.map((button, buttonIdx) => (
              <VButton
                key={buttonIdx}
                href={button.href}
                variant={button.variant}
                target={button.open_in_new_window ? "_blank" : "_self"}
                size="lg"
              >
                {button.label}
              </VButton>
            ))}
        </div>
      </div>
      {/* Image */}
      <div className="">
        {data.image && (
          <div className="p-2 border-2 border-gray-300 lg:-mr-48 md:-mr-16 rounded-tl-[64px] lg:relative lg:h-full dark:border-gray-700">
            <Image
              className="w-full overflow-hidden rounded-tl-[56px] dark:brightness-90 max-h-[700px] object-cover"
              width="500"
              height="500"
              src={getDirectusMedia(data.image) as any}
              alt=""
            />
          </div>
        )}
      </div>
    </BlockContainer>
  );
}

export default HeroBlock;
