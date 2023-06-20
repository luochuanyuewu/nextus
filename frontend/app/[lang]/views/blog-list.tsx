import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";

interface Article {
  id: 4;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}

const createExcerpt = (content: string, maxNumberOfWords: number, trailingIndicator = '...') => {
  const listOfWords = content.trim().split(' ');
  const truncatedContent = listOfWords.slice(0, maxNumberOfWords).join(' ');
  const excerpt = truncatedContent + trailingIndicator;
  const output = listOfWords.length > maxNumberOfWords ? excerpt : content;

  return output;
};

export default function PostList({
  data: articles,
  children,
}: {
  data: Article[];
  children?: React.ReactNode;
}) {
  return (
    <div>
      <section>
        <ul >
          {articles.map((article) => {
            const imageUrl = getStrapiMedia(
              article.attributes.cover.data?.attributes.url
            );

            const category = article.attributes.category.data?.attributes;
            const authorsBio = article.attributes.authorsBio.data?.attributes;

            const avatarUrl = getStrapiMedia(
              authorsBio?.avatar?.data?.attributes?.url
            );

            return (
              <li key={article.id} className="">
                <article className="card card-compact mb-2 shadow-md">
                  <div className="card-body">
                    <div className="flex flex-row items-center">
                      <Link className="hidden md:inline"
                        href={`p/${category?.slug}/${article.attributes.slug}`}
                      >
                        {imageUrl && (
                          <Image
                            alt="presentation"
                            width="208"
                            height="128"
                            className="w-52 h-32 mr-2 rounded-md"
                            src={imageUrl}
                          />
                        )}
                      </Link>
                      <div className="flex flex-col flex-grow mx-1">
                        <div className="mt-3 flex flex-col">
                          <h1 className="text-2xl font-bold">
                            <Link href={`p/${category?.slug}/${article.attributes.slug}`}>
                              <span className="badge badge-secondary mx-1">{article.attributes.category.data.attributes.name}</span>
                              {article.attributes.title}
                            </Link>
                          </h1>
                          <p className="prose mt-2 mx-2">{article.attributes.description}</p>
                        </div>
                        <div className="flex items-center justify-end mt-4 gap-2">
                          <div className="flex gap-1 items-center" >
                            {avatarUrl && (
                              <Image
                                alt="avatar"
                                width="50"
                                height="50"
                                src={avatarUrl}
                                className="object-cover w-10 h-10  rounded-full"
                              />
                            )}
                            {authorsBio && (
                              <span >
                                {authorsBio.name}
                              </span>
                            )}
                          </div>
                          <span className="text-sm dark:text-gray-400">
                            {formatDate(article.attributes.publishedAt)}
                          </span>

                        </div>
                      </div>

                    </div>
                  </div>


                </article>
              </li>
            );
          })}
        </ul>
      </section >
      {children && children
      }
    </div >
  );
}
