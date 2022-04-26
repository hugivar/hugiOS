import React from "react";

interface IButton {
  className?: string;
  name?: string;
  children: any;
  "aria-label"?: string;
  onClick?: any;
}

export const Button = ({ className, name, children, ...rest }: IButton) => {
  return (
    <button className={className} name={name} {...rest}>
      {children}
    </button>
  );
};
