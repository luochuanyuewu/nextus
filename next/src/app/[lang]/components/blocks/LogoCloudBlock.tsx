import React from "react";
import BlockContainer from "@/app/[lang]/components/blocks/BlockContainer";
import TypographyTitle from "@/app/[lang]/components/typography/TypographyTitle";
import TypographyHeadline from "@/app/[lang]/components/typography/TypographyHeadline";
import { getDirectusMedia } from "@/app/[lang]/utils/api-helpers";
import Image from "next/image";

interface LogoCloudBlockProps {
  id: string;
  headline?: string;
  title?: string;
  logos: Array<{
    file: {
      id: string;
    };
  }>;
}

interface Props {
  data: LogoCloudBlockProps;
}

export default function LogoCloudBlock({ data }: Props) {
  return (
    <BlockContainer className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {data.title && <TypographyTitle>{data.title}</TypographyTitle>}
      {data.headline && <TypographyHeadline content={data.headline} />}
      <div className="flow-root mt-8 lg:mt-10">
        <div className="grid gap-4 md:grid-cols-4 md:gap-8">
          {data.logos.map(({ file }, fileIdx) => (
            <div
              key={file.id}
              className="flex items-center justify-center p-8 border-2 border-gray-200 rounded-tr-3xl rounded-bl-3xl dark:border-gray-700 dark:bg-gray-200"
              // style={{
              //     opacity: 0,
              //     y: 100,
              // }}
              // animate={{
              //     opacity: 1,
              //     y: 0,
              // }}
              // transition={{
              //     delay: 250 + 100 * fileIdx,
              // }}
            >
              <img
                className="h-12"
                width={500}
                height={500}
                src={getDirectusMedia(file.id)}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </BlockContainer>
  );
}
