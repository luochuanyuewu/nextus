"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";


interface NavLink {
  id: number;
  href: string;
  new_tab: boolean;
  text: string;
}


function NavLink({ href, text }: NavLink) {
  const path = usePathname();
  let className = classNames(
    '', path === href
    ? 'btn-activate'
    : ''
  )
  return (
    <li>
      <Link
        key={text}
        href={href}
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

  // https://reacthustle.com/blog/how-to-close-daisyui-dropdown-with-one-click
  const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
      // @ts-ignore
      elem?.blur();
    }
  };

  return (
    <header >
      <div className="navbar bg-base-100 mx-auto max-w-7xl">
        <div className="navbar-start">
          <div className='dropdown'>
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </label>
            <ul tabIndex={0} onClick={handleClick} className="menu menu-compact dropdown-content z-10 mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              {links.map((item: NavLink, index: number) => (
                <NavLink key={index} {...item} />
              ))}
            </ul>
          </div>
          <Link href='/' className="btn btn-ghost normal-case text-xl">{logoText}</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links.map((item: NavLink, index: number) => (
              <NavLink key={index} {...item} />
            ))}
          </ul>
        </div>

        <div className="navbar-end">
          <ThemeSwitcher />
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
            </label>
            <ul tabIndex={0} onClick={handleClick} className="menu menu-compact dropdown-content z-10 mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              {buttons && buttons.map((item: NavLink, index: number) => (
                <NavLink key={index} {...item} />
              ))}
            </ul>
          </div>
        </div>


      </div>
    </header >

  );
}
