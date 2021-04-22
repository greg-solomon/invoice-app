import React from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant: "h1" | "h2" | "h3" | "h4";
}

export const Heading: React.FC<HeadingProps> = ({ variant, ...props }) => {
  switch (variant) {
    case "h1":
      return <h1 {...props}>{props.children}</h1>;
    case "h2":
      return <h2 {...props}>{props.children}</h2>;
    case "h3":
      return <h3 {...props}>{props.children}</h3>;
    case "h4":
    default:
      return <h4 {...props}>{props.children}</h4>;
  }
};
