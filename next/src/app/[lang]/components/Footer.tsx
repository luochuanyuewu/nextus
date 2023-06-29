"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { CgWebsite } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import { AiFillGithub, AiFillTwitterCircle, AiFillYoutube, AiFillZhihuCircle } from "react-icons/ai";

interface FooterLink {
  id: number;
  href: string;
  new_tab: boolean;
  text: string;
  social?: string;
}

interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

function FooterLink({ href, text }: FooterLink) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className="link link-hover"
    >
      {text}
    </Link>
  );
}

function CategoryLink({ attributes }: CategoryLink) {
  return (
    <Link
      href={`/p/${attributes.slug}`}
      className="link link-hover"
    >
      {attributes.name}
    </Link>
  );
}

function RenderSocialIcon({ social }: { social: string | undefined }) {
  const size = 24
  switch (social) {
    case "GITHUB":
      return <AiFillGithub size={size} />;
    case "ZHIHU":
      return <AiFillZhihuCircle size={size} />;
    case "WEBSITE":
      return <CgWebsite size={size} />;
    case "TWITTER":
      return <AiFillTwitterCircle size={size} />;
    case "YOUTUBE":
      return <AiFillYoutube size={size} />;
    case "DISCORD":
      return <FaDiscord size={size} />;
    default:
      return null;
  }
}

export default function Footer({
  logoUrl,
  logoText,
  menuTitle,
  menuLinks,
  categoryTitle,
  categoryLinks,
  legalTitle,
  legalLinks,
  socialTitle,
  socialLinks,
}: {
  logoUrl: string | null;
  logoText: string | null;
  menuTitle: string | null
  menuLinks: Array<FooterLink>;
  categoryTitle: string | null
  categoryLinks: Array<CategoryLink>;
  legalTitle: string | null
  legalLinks: Array<FooterLink>;
  socialTitle?: string | null
  socialLinks: Array<FooterLink>;
}) {

  return (
    <>
      <footer className="footer p-10 bg-base-200 text-base-content ">
        <div>
          <Logo src={logoUrl}>
          </Logo>
          {logoText && <p className="text-2xl font-bold">{logoText}</p>}
          <p>罗传月武<br />Coding since 2011</p>
        </div>
        {categoryLinks && categoryLinks.length > 0 && <div>
          <span className="footer-title">{categoryTitle}</span>
          {categoryLinks.map((link: CategoryLink, i: number) => (
            <CategoryLink key={i} {...link} />
          ))}
        </div>}
        {menuLinks && menuLinks.length > 0 && < div >
          <span className="footer-title">{menuTitle}</span>
          {menuLinks.map((link: FooterLink, i: number) => (
            <FooterLink key={i} {...link} />
          ))}
        </div>}
        {legalLinks && legalLinks.length > 0 && <div>
          <span className="footer-title">{legalTitle}</span>
          {legalLinks.map((link: FooterLink, i: number) => (
            <Link
              href={link.href}
              className="link link-hover"
              key={i}
            >
              {link.text}
            </Link>
          ))}
        </div>}
      </footer >
      <footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
        <div className="items-center grid-flow-col">
          <p>Copyright ©{new Date().getFullYear()} All rights reserved by luochuanyuewu </p>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            {socialLinks.map((link: FooterLink, i: number) => {
              return (
                <a
                  key={i}
                  rel="noopener noreferrer"
                  href={link.href}
                  title={link.text}
                  target={link.new_tab ? "_blank" : "_self"}
                >
                  <RenderSocialIcon social={link.social} />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </>
  )

}
