import React from "react";

interface HeadingProps {
  variant: "h1" | "h2" | "h3" | "h4";
}

export const Heading: React.FC<HeadingProps> = (props) => {
  switch (props.variant) {
    case "h1":
      return <h1>{props.children}</h1>;
    case "h2":
      return <h2>{props.children}</h2>;
    case "h3":
      return <h3>{props.children}</h3>;
    case "h4":
    default:
      return <h4>{props.children}</h4>;
  }
};
