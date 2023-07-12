import React from "react";

interface TitleProps {
  children: React.ReactNode;
}

function TypographyTitle(props: TitleProps) {
  const classNames = "font-mono font-bold tracking-wider uppercase text-accent";

  return <h2 className={classNames}>{props.children}</h2>;
}

export default TypographyTitle;
