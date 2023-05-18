"use client";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames";


interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

// function NavLink({ url, text }: NavLink) {
//   const path = usePathname();

//   return (
//     <li className="flex">
//       <Link
//         href={url}
//         className={`flex items-center mx-4 -mb-1 border-b-2 dark:border-transparent ${path === url && "dark:text-violet-400 dark:border-violet-400"
//           }}`}
//       >
//         {text}
//       </Link>
//     </li>
//   );
// }

function NavLink({ url, text }: NavLink) {
  const path = usePathname();
  let className = classNames(
    'inline-block rounded font-medium text-gray-900 dark:text-gray-100 py-1 px-2 sm:py-2 sm:px-3',
    path === url
      ? 'bg-gray-200 dark:bg-gray-700'
      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
  )
  return (
    <Link
      key={text}
      href={url}
    // data-umami-event={`nav-${link.href.replace('/', '')}`}
    >
      <span className={className}>{text}</span>
    </Link>
  );
}

export default function Navbar({
  links,
  logoUrl,
  logoText,
}: {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
}) {

  let router = useRouter()
  const pathName = usePathname();


  return (
    <div className="supports-backdrop-blur:bg-white/95 sticky top-0 z-40 overflow-x-hidden bg-white/75 py-3 backdrop-blur dark:bg-dark/75">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-3 xl:max-w-5xl xl:px-0">
        <Logo src={logoUrl}>
          {/* {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>} */}
        </Logo>

        {/* <div className="items-center flex-shrink-0 hidden lg:flex">
          <ul className="items-stretch hidden space-x-3 lg:flex">
            {links.map((item: NavLink) => (
              <NavLink key={item.id} {...item} />
            ))}
          </ul>
        </div> */}

        <div className="flex items-center text-base leading-5">
          <div className="hidden space-x-2 sm:block">
            {links.map((item: NavLink) => (
              <NavLink key={item.id} {...item} />
            ))}
          </div>
        </div>


        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </div >

  );
}
