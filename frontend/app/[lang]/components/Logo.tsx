import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Logo({
  src,
  children,
}: {
  src: string | null;
  children?: React.ReactNode;
}) {
  return (
    // <Link
    //   href="/"
    //   aria-label="Back to homepage"
    //   className="flex items-center p-2"
    // >
    //   {src && <Image src={src} alt="logo" width={45} height={45} />}
    //   <div className="ml-2">{children}</div>
    // </Link>
    <Link href='/'>
      <div className="flex items-center justify-between" data-umami-event="logo">
        <div className="mr-3 flex items-center justify-center">
          {src && <Image
            src={src}
            alt="logo"
            width={45}
            height={45}
            className="rounded-full"
          />}
        </div>
      </div>
    </Link>
  );
}
