import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import Tooltip from "./Tooltip";
import { Button } from "components/Button";

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      {resolvedTheme === "light" ? (
        <Tooltip message="Turn off the light">
          <Button
            name="Turn off the light"
            onClick={() => setTheme("dark")}
            className="invert-0"
          >
            <Image
              unoptimized
              height="24"
              width="24"
              src="/icons/darkmode.svg"
              alt="dark mode icon"
            />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip message="Turn on the light">
          <Button
            name="Turn on the light"
            onClick={() => setTheme("light")}
            className="invert"
          >
            <Image
              unoptimized
              height="24"
              width="24"
              src="/icons/lightmode.svg"
              alt="light mode icon"
            />
          </Button>
        </Tooltip>
      )}
    </>
  );
};
