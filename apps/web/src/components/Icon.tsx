import React from "react";
import Image, { ImageProps } from "next/image";
import settings from "config/settings";

type NextImage = Omit<ImageProps, "loader" | "src">;
interface IIcon {
  name: string;
  className?: string;
}

interface ILoader {
  src: string
}

export const Icon = ({ name, height = 16, width = 16 }: IIcon & NextImage): any => {
  return (
    <Image
      unoptimized
      src={`https://${settings.siteAddress}/icons/${name}.svg`}
      width={height}
      height={width}
      alt="icon"
      className="invert-0 dark:invert"
    />
  );
};
