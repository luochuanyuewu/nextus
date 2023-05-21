"use client";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames";
import { title } from "process";
import { AiOutlineLogin } from "react-icons/ai";


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
    '', path === url
    ? 'btn-activate'
    : ''
  )
  return (
    <li>
      <Link
        key={text}
        href={url}
      // data-umami-event={`nav-${link.href.replace('/', '')}`}
      >
        <span className={className}>{text}</span>
      </Link>
    </li>

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
    <header >
      <div className="navbar bg-base-100 mx-auto max-w-7xl">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              {links.map((item: NavLink) => (
                <NavLink key={item.id} {...item} />
              ))}
            </ul>
          </div>
          <Link href='/' className="btn btn-ghost normal-case text-xl">{logoText}</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links.map((item: NavLink) => (
              <NavLink key={item.id} {...item} />
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          <Link href="/login" className="btn btn-ghost">登录</Link>
          <div className="divider lg:divider-horizontal"></div>
          <Link href="/signup" className="btn btn-ghost">注册</Link>
        </div>

      </div>
    </header >

  );
}
