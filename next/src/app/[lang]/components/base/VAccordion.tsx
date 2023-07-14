"use client";
import React, { useState } from "react";
import VIcon from "./VIcon";

interface Props {
  title: string;
  children?: React.ReactNode;
}

export function VAccordion({ title, children }: Props) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div
        className={`p-2 transition duration-200 border-2 rounded-br-3xl rounded-tl-3xl ${
          open ? "border-gray-500" : "border-transparent"
        }`}
      >
        <div className="relative px-6 py-4 bg-gray-100 dark:bg-gray-800 rounded-br-2xl rounded-tl-2xl">
          <dt className="text-lg leading-7">
            <button
              className="flex items-start justify-between w-full font-mono text-left text-gray-400 focus:outline-none focus:text-gray-900 dark:focus:text-accent"
              onClick={handleToggle}
            >
              <span className="font-bold text-gray-900 dark:text-white">
                {title}
              </span>
              <span className="flex items-center">
                {!open && (
                  <VIcon
                    icon="heroicons:plus"
                    className="w-8 h-8 rounded-full fill-current text-accent"
                  />
                )}
                {open && (
                  <VIcon
                    icon="heroicons:minus"
                    className="w-8 h-8 rounded-full fill-current text-accent"
                  />
                )}
              </span>
            </button>
          </dt>
          {open && (
            <dd className="mt-2">
              <div className="font-serif prose text-left dark:prose-invert">
                {children}
              </div>
            </dd>
          )}
        </div>
      </div>
    </div>
  );
}
