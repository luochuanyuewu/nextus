"use client";
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import BlockContainer from "../blocks/BlockContainer";
import VIcon from "./VIcon";
import Image from "next/image";
import { getDirectusMedia } from "../../utils/api-helpers";

interface GalleryProps {
  items: Array<{
    id?: string;
    title?: string;
    description?: string;
    tags?: string;
  }>;
}

function VGallery({ items }: GalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItemIdx, setCurrentItemIdx] = useState(0);

  const currentItem = items[currentItemIdx].id;

  const next = () => {
    setCurrentItemIdx((prevIdx) =>
      prevIdx === items.length - 1 ? 0 : prevIdx + 1
    );
  };

  const prev = () => {
    setCurrentItemIdx((prevIdx) =>
      prevIdx === 0 ? items.length - 1 : prevIdx - 1
    );
  };

  const toggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "Escape") {
      toggle();
    }
    if (e.key === "ArrowRight") {
      next();
    }
    if (e.key === "ArrowLeft") {
      prev();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, []);

  const fileUrl = (itemId: string | undefined) => {
    // Implement your fileUrl function here
    return "";
  };

  return (
    <>
      <BlockContainer>
        {/* Gallery */}
        <div className="gap-4 mt-4 md:columns-3">
          {items.map((item, itemIdx) => (
            <button
              key={itemIdx}
              onClick={() => {
                setCurrentItemIdx(itemIdx);
                toggle();
              }}
              className={`${
                itemIdx % 2 === 0
                  ? "rounded-br-3xl rounded-tl-3xl"
                  : "rounded-bl-3xl rounded-tr-3xl"
              } block relative w-full mb-6 overflow-hidden p-2 group border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition duration-300`}
            >
              <div
                className={`${
                  itemIdx % 2 === 0
                    ? "rounded-br-2xl rounded-tl-2xl"
                    : "rounded-bl-2xl rounded-tr-2xl"
                } block relative w-full overflow-hidden group`}
              >
                <Image
                  src={getDirectusMedia(item.id)}
                  width="800"
                  height="800"
                  alt=""
                  className="object-cover w-full transition duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-white bg-opacity-75 opacity-0 hover:opacity-100 dark:bg-gray-900 dark:bg-opacity-75">
                  <VIcon
                    icon="heroicons:magnifying-glass-plus"
                    className="w-12 h-12 text-gray-500 dark:text-white"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </BlockContainer>
      {/* Gallery Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gray-900 bg-opacity-75">
          {/* Tips for using the gallery */}
          <div className="absolute z-50 hidden font-mono text-white md:block top-4 left-4">
            <div className="p-4 bg-gray-900 rounded-tl-3xl rounded-br-3xl">
              <p>Press 'esc' to close</p>
              <p>Press 'left' or 'right' to navigate</p>
            </div>
          </div>
          <div className="absolute z-50 font-mono text-white bottom-4 right-4">
            {/* {items[currentItemIdx].tags.map((tag, tagIdx) => (
              <VBadge key={tagIdx} size="lg" className="rounded-br-xl">
                {tag}
              </VBadge>
            ))} */}
          </div>
          <div className="relative flex flex-col items-center justify-center w-full h-full max-w-7xl">
            <button
              onClick={toggle}
              className="absolute z-50 p-4 text-2xl text-white transition duration-300 top-4 right-4 bg-accent hover:bg-opacity-75 rounded-tr-xl rounded-bl-xl"
            >
              <div>
                <span className="sr-only">Close</span>
                <VIcon icon="heroicons:x-mark" className="w-6 h-6" />
              </div>
            </button>
            <div className="flex items-center justify-center w-full h-full">
              <button
                onClick={prev}
                className="absolute z-50 p-4 text-2xl text-white transition duration-300 left-4 bg-accent hover:bg-opacity-75 rounded-tr-xl rounded-bl-xl"
              >
                <span className="sr-only">Previous</span>
                <VIcon icon="heroicons:arrow-left" className="w-6 h-6" />
              </button>
              <button
                onClick={next}
                className="absolute z-50 p-4 text-2xl text-white transition duration-300 right-4 bg-accent hover:bg-opacity-75 rounded-br-xl rounded-tl-xl"
              >
                <span className="sr-only">Next</span>
                <VIcon icon="heroicons:arrow-right" className="w-6 h-6" />
              </button>
              {/* Image */}
              <div className="relative flex items-center justify-center">
                <div className="relative w-full h-full p-20">
                  {/* Metadata */}
                  <div className="flex">
                    <p className="inline-block px-6 py-2 font-serif font-bold text-white bg-gray-900 track rounded-tl-3xl">
                      {items[currentItemIdx].title}
                    </p>
                    {items[currentItemIdx].description && (
                      <p className="flex-1 hidden px-6 py-2 font-mono text-white bg-gray-700 md:inline-block">
                        {items[currentItemIdx].description}
                      </p>
                    )}
                  </div>
                  {items.map((item, itemIdx) => (
                    <Image
                      key={itemIdx}
                      width={800}
                      height={800}
                      alt=""
                      style={{
                        display: currentItemIdx === itemIdx ? "block" : "none",
                      }}
                      src={getDirectusMedia(item.id)}
                      className="object-contain w-full rounded-br-3xl"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VGallery;
