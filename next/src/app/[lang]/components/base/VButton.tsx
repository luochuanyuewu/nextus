import Link from "next/link";
import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "default" | "primary" | "outline" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
  target?: string;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

function Button(props: ButtonProps) {
  const {
    type = "button",
    variant = "default",
    size = "md",
    loading,
    disabled,
    block,
    target,
    href,
    children,
  } = props;

  const buttonClasses = [
    "btn",
    variant === "default" && "btn-default",
    variant === "primary" && "btn-primary",
    variant === "outline" && "btn-outline",
    variant === "danger" && "btn-danger",
    size === "xs" && "btn-xs",
    size === "sm" && "btn-sm",
    size === "md" && "btn-md",
    size === "lg" && "btn-lg",
    size === "xl" && "btn-xl",
    block && "btn-block",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {href && (
        <Link href={href as any} target={target} className={buttonClasses}>
          {children}
        </Link>
      )}
      {!href && (
        <button className={buttonClasses} disabled={disabled} type={type}>
          {children}
        </button>
      )}
    </>
  );
}

export default Button;
