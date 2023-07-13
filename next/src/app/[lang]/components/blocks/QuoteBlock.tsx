import { getDirectusMedia } from "../../utils/api-helpers";
import BlockContainer from "./BlockContainer";

interface Quote {
  id: string;
  headline: string;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  background_color: string;
}

interface QuoteBlockProps {
  data: Quote;
}

export default function QuoteBlock({ data }: QuoteBlockProps) {
  return (
    <BlockContainer className="relative px-6 py-10 text-gray-900 md:px-16 lg:px-28 md:py-16 lg:py-24 dark:text-gray-100">
      {data.image && (
        <div
          className="absolute inset-0 z-0 opacity-25"
          style={{
            backgroundImage: `url(${getDirectusMedia(data.image)})`,
            backgroundColor: data.background_color,
          }}
        />
      )}
      <div className="relative mx-auto max-w-screen-2xl">
        <div className="my-24">
          <div
            className="pl-3 font-serif text-4xl italic leading-tight xl:w-3/4 md:leading-tight indent-3 md:-indent-6 md:pl-6 md:text-6xl"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
          <div className="flex justify-end mt-6">
            <div className="w-full pl-3 font-mono text-sm font-bold tracking-widest text-right uppercase word-spacing-tight lg:text-base sm:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 md:pl-0 sm:text-left">
              <div className="p-4 bg-white rounded-bl-none dark:bg-gray-800 chat rounded-xl">
                {data.title && <div className="text-accent">{data.title}</div>}
                {data.subtitle && <div>{data.subtitle}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlockContainer>
  );
}
