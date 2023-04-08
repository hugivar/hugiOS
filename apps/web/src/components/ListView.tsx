/* eslint-disable react/forbid-prop-types */
import React from "react";
import Link from "next/link";

import { DrawerButton } from "components/DrawerButton";
import { determineHref } from "src/utils/routing";

interface IItemCard {
  title: string;
  description?: string;
  created: string;
  link: string;
}

interface IItemList {
  title: string;
  pages?: [IItemCard];
}

interface ITitle {
  title: string;
}

const ItemCard = ({ title, link, created }: IItemCard) => {
  const pageLink = determineHref(link);
  const date = new Date(created);

  return (
    <Link href={pageLink} passHref legacyBehavior>
      <a>
        <div className="flex flex-col justify-center space-y-1 m-4">
          <div className="font-bold line-clamp-3 text-gray-1000 dark:text-gray-100">
            {title}
          </div>
          <div className="line-clamp-1 text-gray-1000/60 dark:text-white/40">
            {date?.toLocaleDateString("en-US")}
          </div>
        </div>
      </a>
    </Link>
  );
};

const Title = ({ title }: ITitle) => (
  <div className="sticky border-b top-0 h-14 z-10 flex justify-center flex-col dark:bg-gray-900 dark:bg-opacity-80 bg-white bg-opacity-90 filter-blur dark:border-b dark:border-gray-900">
    <div className="flex items-center justify-between flex-none">
      <div className="flex items-center space-x-3">
        <div className="py-4 px-4 lg:hidden">
          <DrawerButton />
        </div>
        <p className="m-0 text-sm font-bold transform-gpu text-primary line-clamp-1 dark:text-white lg:py-4 lg:px-4">
          {title}
        </p>
      </div>
    </div>
  </div>
);

const ListView = ({ title, pages }: IItemList) => {
  if (!pages || !pages.length) return <p>No pages found</p>;

  return (
    <div
      className={"relative min-h-screen flex-none w-full bg-white border-r border-gray-150 md:w-80 lg:block xl:w-96 bg-gray-50 overflow-x-auto h-screen dark:bg-mui dark:border-gray-800"}
    >
      <Title title={title} />
      {pages.map((page, idx) => (
        <ItemCard key={idx} title={page.title} link={page.link} created={page.created} />
      ))}
    </div>
  );
};

export default ListView;
