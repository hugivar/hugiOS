import React from 'react';

import settings from 'config/settings';
import { MetaData } from 'components/common/meta';
import { Drawer } from 'components/Drawer';

interface ILayout {
  children: React.ReactNode;
  bodyClass?: object;
  pageTitle: string;
}

const SiteTitle = () => (
  <div className="flex items-center justify-between flex-none">
    <span className="flex items-center space-x-3">
      <span className="flex items-center justify-center p-2 rounded-md cursor-pointer lg:hidden hover:bg-gray-200 dark:hover:bg-gray-800"></span>
      <p className="text-sm font-bold transform-gpu text-primary line-clamp-1 text-gray-900 dark:text-white">
        {settings.shortTitle}
      </p>
    </span>
  </div>
);

const Layout = ({ children, bodyClass, pageTitle }: ILayout) => {
  return (
    <div className="relative flex w-full h-full min-h-screen">
      <MetaData title={pageTitle} bodyClass={bodyClass} />
      <nav className="absolute -translate-x-full lg:relative flex flex-none flex-col lg:translate-x-0 w-3/4 sm:w-1/2 md:w-1/3 lg:w-56 2xl:w-72 3xl:w-80 z-30 lg:z-auto max-h-screen h-full min-h-screen transition duration-200 ease-in-out transform bg-white border-r pb-10 sm:pb-0 border-gray-150 dark:bg-mui dark:border-gray-800">
        <div
          style={{ boxShadow: '0 1px 3px rgba(0,0,0,0)', minHeight: 48 }}
          className="sticky top-0 z-10 flex justify-center flex-col px-3 py-2 dark:bg-gray-900 dark:bg-opacity-80 bg-white bg-opacity-90 filter-blur dark:border-b dark:border-gray-900"
        >
          <SiteTitle />
          <nav className="hidden lg:flex">
            <Drawer />
          </nav>
        </div>
      </nav>
      <div className="drawer w-full">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content dark:bg-mui">
          <div className="flex flex-1 flex-col text-black">{children}</div>
        </div>
        <div className="drawer-side lg:w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <Drawer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
