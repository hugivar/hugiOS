import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";

import settings from "config/settings";
import { Icon } from "components/Icon";
import { determineHref } from "utils/routing";

interface INavItem {
  title: string;
  href: string;
  icon: string;
  external?: boolean;
  active?: boolean;
}

const NavItem = ({ title, href, active, icon, external }: INavItem) => (
  <li className="flex items-stretch space-x-1">
    <Link href={determineHref(href)}>
      <a
        target={external ? "_blank" : "_self"}
        className={classNames(
          "flex flex-1 text-gray-700 items-center space-x-3 px-2 py-1.5 text-sm ÷font-medium rounded-md sm:dark:hover:text-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:hover:bg-gray-200 dark:text-white",
          {
            "bg-gray-200 hover:bg-black hover:text-white dark:bg-gray-700 dark:hover:bg-gray-700 dark:hover:text-white":
              active,
          }
        )}
      >
        <span className="flex items-center justify-center">
          <Icon name={icon} className="w-4 h-4" />
        </span>
        <span className="flex items-center justify-center"></span>
        <span className="flex-1 text-gray-900 dark:text-gray-50">{title}</span>
        {external && <Icon name="external" height="12" width="12" />}
      </a>
    </Link>
  </li>
);

export const Drawer = () => {
  const router = useRouter();

  return (
    <ul className=" menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content lg:flex-1 lg:px-3 lg:py-3 lg:space-y-1 lg:bg-transparent dark:bg-mui">
      {settings.navigation.map((item, idx) => (
        <NavItem
          key={idx}
          title={item.title}
          href={item.href}
          active={`/${router?.asPath.split("/")[1]}` === item.href}
          icon={item.icon}
        />
      ))}
      <li className="px-2 pt-5 pb-2 text-xs font-semibold text-gray-1000 dark:text-white text-opacity-40">
        Online
      </li>
      {settings.social.map((item, idx) => (
        <NavItem
          key={idx}
          title={item.title}
          href={item.href}
          icon={item.icon}
          external
        />
      ))}
    </ul>
  );
};
