import Link from "next/link";
import React from "react";
import VIcon from "./VIcon";

interface BreadcrumbItem {
  title: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className="flex flex-wrap items-baseline pb-4 space-x-2 font-mono text-base dark:text-gray-200">
      {items.map((item, itemIdx) => (
        <React.Fragment key={itemIdx}>
          {itemIdx !== items.length - 1 ? (
            <Link href={item.href} className="hover:text-accent">
              {item.title}
            </Link>
          ) : (
            <span>{item.title}</span>
          )}
          {itemIdx !== items.length - 1 && (
            <div className="">
              <VIcon name="heroicons:chevron-right" className="h-5 mb-1" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
