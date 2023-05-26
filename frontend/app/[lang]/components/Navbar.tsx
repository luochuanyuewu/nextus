"use client";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import classnames and useOnClickOutside
import classNames from "classnames";
import { useState } from "react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";


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
  buttons,
  logoUrl,
  logoText,
}: {
  links: Array<NavLink>;
  buttons?: Array<NavLink>
  logoUrl: string | null;
  logoText: string | null;
}) {


  // add a state to toggle the dropdown
  const [open, setOpen] = useState<boolean>();
  //onclick handler when clicking a menu item

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <header >
      <div className="navbar bg-base-100 mx-auto max-w-7xl">
        <div className="navbar-start">
          <div className={classNames({
            dropdown: true,
            'dropdown-open': open,
          })}>
            <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={() => setOpen((prev) => !prev)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} onClick={handleClick} className={classNames({ 'menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52': true, hidden: !open })}>
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
          <div className="btn-group btn-group-horizontal">
            {buttons && buttons.map((item: NavLink) => (
              <Link key={item.id} href={item.url} className="btn  btn-ghost">{item.text}</Link>
            ))}
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </header >

  );
}
