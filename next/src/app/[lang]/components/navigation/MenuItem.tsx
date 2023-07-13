"use client";
import { NavigationItem } from "@/types/schemas";
import { Popover } from "@headlessui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { convertIconName } from "../../utils/strings";

interface MenuItemProps {
  item: NavigationItem;
}

function getUrl(item: NavigationItem) {
  if (item.type === "page") {
    return `/${item.page.slug}`;
  } else {
    return item.url;
  }
}

export default function MenuItem({ item }: MenuItemProps) {
  return (
    <div>
      {!item.has_children && (
        <Link
          href={getUrl(item)}
          className="text-gray-300 hover:bg-gray-700 transition duration-150 uppercase hover:text-white rounded-br-xl rounded-tl-xl py-2 px-3 inline-flex items-center font-bold"
          target={item.open_in_new_tab ? "_blank" : "_self"}
        >
          {item.title}
        </Link>
      )}

      {item.has_children && (
        <Popover.Group>
          <Popover>
            <Popover.Button
              className={[
                "text-gray-300 hover:bg-gray-700 hover:text-white",
                "rounded-br-xl rounded-tl-xl py-2 px-3 inline-flex items-center font-bold uppercase ring-accent ring-offset-2 ring-offset-gray-800 focus:ring-1 outline-none",
              ].join(" ")}
            >
              {item.title}
              <Icon
                icon="heroicons:chevron-down"
                className="flex-none w-5 ml-1 text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Popover.Panel className="absolute z-10 w-screen max-w-md mt-8 overflow-hidden bg-gray-800 shadow-lg top-full rounded-tr-3xl rounded-bl-3xl ring-1 ring-gray-700">
              <div className="p-4">
                {item.children.map((childItem: NavigationItem) => (
                  <div
                    key={childItem.id}
                    className="relative flex p-4 text-sm leading-6 transition duration-150 rounded-tr-xl rounded-bl-xl group gap-x-6 hover:bg-gray-900"
                  >
                    <div className="flex items-center justify-center flex-none p-2 mt-1 border rounded-tr-lg rounded-bl-lg h-11 w-11 border-accent">
                      {childItem.icon && (
                        <Icon
                          icon={convertIconName(childItem.icon)}
                          className="w-10 h-10 text-accent"
                        />
                      )}
                    </div>
                    <div className="flex-auto">
                      <Link
                        href={getUrl(childItem)}
                        className="block font-bold text-white uppercase"
                      >
                        {childItem.title}
                        <span className="absolute inset-0" />
                      </Link>
                      {childItem.label && (
                        <p className="mt-1 text-sm leading-tight text-gray-400">
                          {childItem.label}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Popover.Panel>
          </Popover>
        </Popover.Group>
      )}
    </div>
  );
}
