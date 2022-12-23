import React from "react";

interface IButton {
    children: React.ReactNode;
};

const Button = ({ children }: IButton) => (
    <button>{children}</button>
);

export default Button;