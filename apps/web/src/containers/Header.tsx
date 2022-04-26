import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Icon } from "components/Icon";
import { DrawerButton } from "components/DrawerButton";
import { ThemeSwitch } from "components/ThemeSwitch";
import { IPFSSwitch } from "components/IPFSSwitch";

interface IHeader {
  title?: string;
}

interface IRouter {
  pathname: string;
  asPath: string;
}

export const Header = ({ title }: IHeader) => {
  const router: IRouter = useRouter();

  const viewingBase =
    (router?.pathname?.match(/[a-z]*(\.html|$)/gm) || [])?.length > 1;
  const viewingSubPath = router.pathname.match(/[a-z]*\/\[[a-z]*\]/gm);
  const url = router?.asPath.includes("journal") ? "/journal" : "/collection";

  const [opacityValues, setOpacity] = useState({
    text: -1,
    background: 1,
  });

  useEffect(() => {
    if (title) {
      const element = document.getElementById("content");

      element?.addEventListener("scroll", () => {
        setOpacity({
          text: element.scrollTop / 80,
          background:
            element.scrollTop > 0
              ? Number(Math.max(0.95, 1 - element.scrollTop / 1000).toFixed(2))
              : 1,
        });
      });
    }
  }, [setOpacity, title]);

  return (
    <div
      style={{ opacity: opacityValues.background }}
      className={
        "sticky top-0 z-40 h-14 w-auto backdrop-blur flex-none lg:z-50 lg:border-b lg:border-gray-900/10 dark:border-gray-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-mui"
      }
    >
      <div className="max-w-8xl mx-auto">
        <div className="py-4 lg:px-8 mx-4 lg:mx-0 h-14 flex justify-between flex-row">
          {viewingBase ? null : viewingSubPath ? (
            <div className="lg:hidden">
              <Link href={url} passHref>
                <div className="text-black dark:text-white w-5 lg">
                  <Icon name="back" height="16" width="16" />
                </div>
              </Link>
            </div>
          ) : (
            <DrawerButton />
          )}
          <span className="flex items-center space-x-3">
            <p
              style={{
                transform: "translateY(0%)",
                opacity: opacityValues.text,
              }}
              className="text-sm font-bold transform-gpu text-primary line-clamp-1 dark:text-white"
            >
              {title}
            </p>
          </span>
          <div className="w-20 mr-16 flex justify-between">
            <IPFSSwitch />
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </div>
  );
};
