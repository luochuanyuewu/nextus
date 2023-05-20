"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { CgWebsite } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import { AiFillGithub, AiFillTwitterCircle, AiFillYoutube, AiFillZhihuCircle } from "react-icons/ai";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
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

function FooterLink({ url, text }: FooterLink) {
  const path = usePathname();
  return (
    <Link
      href={url}
      className="link link-hover"
    >
      {text}
    </Link>
  );
}

function CategoryLink({ attributes }: CategoryLink) {
  return (
    <Link
      href={`/blog/${attributes.slug}`}
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
  menuLinks,
  categoryLinks,
  legalLinks,
  socialLinks,
}: {
  logoUrl: string | null;
  logoText: string | null;
  menuLinks: Array<FooterLink>;
  categoryLinks: Array<CategoryLink>;
  legalLinks: Array<FooterLink>;
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
        <div>
          <span className="footer-title">分类</span>
          {categoryLinks.map((link: CategoryLink) => (
            <CategoryLink key={link.id} {...link} />
          ))}
        </div>
        <div>
          <span className="footer-title">菜单</span>
          {menuLinks.map((link: FooterLink) => (
            <FooterLink key={link.id} {...link} />
          ))}
        </div>
        <div>
          <span className="footer-title">法定权利</span>
          {legalLinks.map((link: FooterLink) => (
            <Link
              href={link.url}
              className="link link-hover"
              key={link.id}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </footer>
      <footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
        <div className="items-center grid-flow-col">
          <p>Copyright ©{new Date().getFullYear()} All rights reserved by luochuanyuewu </p>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            {socialLinks.map((link: FooterLink) => {
              return (
                <a
                  key={link.id}
                  rel="noopener noreferrer"
                  href={link.url}
                  title={link.text}
                  target={link.newTab ? "_blank" : "_self"}
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
