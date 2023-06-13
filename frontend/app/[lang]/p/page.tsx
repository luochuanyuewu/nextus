"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "../utils/fetch-api";
import { Metadata } from 'next'


import Loader from "../components/Loader";
import BlogList from "../views/blog-list";
import PageHeader from "../components/PageHeader";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}


export default function BlogHomePage() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/articles`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
          cover: { fields: ["url"] },
          category: { populate: "*" },
          authorsBio: {
            populate: "*",
          },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      if (start === 0) {
        setData(responseData.data);
      } else {
        setData((prevData: any[]) => [...prevData, ...responseData.data]);
      }

      setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  function loadMorePosts(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit;
    fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <PageHeader heading="我的文章" text="来看看有趣的东西吧" />

      <section className="container p-4 mx-auto space-y-6 sm:space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
          <div className="col-span-2">
            <BlogList data={data}>
              {meta!.pagination.start + meta!.pagination.limit <
                meta!.pagination.total && (
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="px-6 py-3 text-sm rounded-lg hover:underline dark:bg-gray-900 dark:text-gray-400"
                      onClick={loadMorePosts}
                    >
                      加载更多文章...
                    </button>
                  </div>
                )}
            </BlogList>
          </div>

          <aside className="h-screen sticky top-0">
            <div className="card card-compact bg-base-100 shadow-xl mb-4">
              <div className="card-body">
                <h2 className="card-title">用户中心</h2>
                <p>需要登录才能进入用户中心</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">登录</button>
                  <button className="btn btn-secondary">注册</button>
                </div>
              </div>
            </div>
            <div className="card card-compact bg-base-100 shadow-xl mb-4">
              <div className="card-body">
                <h2 className="card-title">网站公告</h2>
                <p>本网站还在积极开发中，如果发现有什么奇怪的，那就是真的很奇怪。</p>
              </div>
            </div>
          </aside>
        </div>
      </section>



    </div>
  );
}
