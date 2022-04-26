import React from "react";

interface ITooltip {
  children: any;
  message: string;
}

const Tooltip = ({ children, message }: ITooltip) => (
  <div className="tooltip tooltip-bottom" data-tip={message}>
    {children}
  </div>
);

export default Tooltip;
