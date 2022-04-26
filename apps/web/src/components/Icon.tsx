import React from "react";
import Image from "next/image";

interface IIcon {
  name: string;
  className?: string;
  height?: number | string;
  width?: number | string;
}

export const Icon = ({ name, height = 16, width = 16 }: IIcon): any => {
  return (
    <Image
      unoptimized
      src={`/icons/${name}.svg`}
      width={height}
      height={width}
      alt="icon"
      className="invert-0 dark:invert"
    />
  );
};
