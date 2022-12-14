import React from "react";
import { Flex } from "@chakra-ui/react"

import { MetaData } from "components/MetaData";
import Drawer from "src/containers/Drawer";

interface ILayout {
  children: React.ReactNode;
  bodyClass?: object;
  pageTitle?: string;
}

const Layout = ({ children, bodyClass, pageTitle }: ILayout) => {
  return (
    <Flex>
      <MetaData title={pageTitle} bodyClass={bodyClass} />
      <div className="drawer w-full">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content transition-none dark:bg-mui">
          <div className="flex flex-1 flex-col text-black">{children}</div>
        </div>
        <div className="drawer-side lg:w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <Drawer />
        </div>
      </div>
    </Flex>
  );
};

export default Layout;
