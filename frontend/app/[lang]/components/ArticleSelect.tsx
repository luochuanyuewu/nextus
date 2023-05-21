import React from "react";
import Link from "next/link";

interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    articles: {
      data: Array<{}>;
    };
  };
}

interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
  };
}

function selectedFilter(current: string, selected: string) {
  return current === selected
    ? "link link-hover px-3 py-1 dark:bg-violet-700 dark:text-gray-100"
    : "link link-hover px-3 py-1 dark:bg-violet-400 dark:text-gray-900";
}

export default function ArticleSelect({
  categories,
  articles,
  params,
}: {
  categories: Category[];
  articles: Article[];
  params: {
    slug: string;
    category: string;
  };
}) {

  return (
    <>
      <div className="card card-compact w-96 bg-base-100 shadow-xl my-3">
        <div className="card-body">
          <h2 className="card-title">分类浏览</h2>
          <div className="flex flex-wrap py-6 space-x-2">
            {categories.map((category: Category) => {
              if (category.attributes.articles.data.length === 0) return null;
              return (
                <Link
                  key={category.id}
                  href={`/blog/${category.attributes.slug}`}
                  className={selectedFilter(
                    category.attributes.slug,
                    params.category
                  )}
                >
                  #{category.attributes.name}
                </Link>
              );
            })}
            <Link href={"/blog"} className={selectedFilter("", "filter")}>
              #所有
            </Link>
          </div>
        </div>
      </div>

      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            相关内容
          </h2>
          <ul className="ml-4 space-y-1 list-disc">
            {articles.map((article: Article) => {
              return (
                <li key={article.id}>
                  <Link
                    rel="noopener noreferrer"
                    href={`/blog/${params.category}/${article.attributes.slug}`}
                    className={`${params.slug === article.attributes.slug &&
                      "text-violet-400"
                      }  hover:underline hover:text-violet-400 transition-colors duration-200`}
                  >
                    {article.attributes.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  )

  return (
    <div className="p-4 rounded-lg dark:bg-gray-900 min-h-[365px] relative">
      <h4 className="text-xl font-semibold">通过分类浏览</h4>

      <div>
        <div className="flex flex-wrap py-6 space-x-2 dark:border-gray-400">
          {categories.map((category: Category) => {
            if (category.attributes.articles.data.length === 0) return null;
            return (
              <Link
                key={category.id}
                href={`/blog/${category.attributes.slug}`}
                className={selectedFilter(
                  category.attributes.slug,
                  params.category
                )}
              >
                #{category.attributes.name}
              </Link>
            );
          })}
          <Link href={"/blog"} className={selectedFilter("", "filter")}>
            #所有
          </Link>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold">类似文章</h4>
          <ul className="ml-4 space-y-1 list-disc">
            {articles.map((article: Article) => {
              return (
                <li key={article.id}>
                  <Link
                    rel="noopener noreferrer"
                    href={`/blog/${params.category}/${article.attributes.slug}`}
                    className={`${params.slug === article.attributes.slug &&
                      "text-violet-400"
                      }  hover:underline hover:text-violet-400 transition-colors duration-200`}
                  >
                    {article.attributes.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
