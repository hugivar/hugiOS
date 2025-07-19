/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { DrawerButton } from 'components/DrawerButton';
import { determineHref } from '@/utils/routing';

interface FrontMatter {
  title: string;
  description: string;
  date: string;
}

interface Item {
  frontmatter: FrontMatter;
  slug: string;
  type: string;
}

interface IItemCard {
  item: Item;
}

interface IItemList {
  title: string;
  items?: [Item];
}

interface ITitle {
  title: string;
}

const ItemCard = ({ item }: IItemCard) => {
  const url = `/${item.type}/${item.slug}/`;

  return (
    <Link href={determineHref(url)}>
      <a className="flex py-3 lg:py-2 px-3.5 space-x-3 border-b lg:border-none border-gray-100 dark:border-gray-900 text-sm lg:rounded-lg sm:hover:bg-gray-200 sm:dark:hover:bg-gray-800">
        <div className="flex flex-col justify-center space-y-1">
          <div className="font-bold line-clamp-3 text-gray-1000 dark:text-gray-100">
            {item?.frontmatter?.title}
          </div>
          <div className="line-clamp-2 text-gray-1000/60 dark:text-white/60">
            {item?.frontmatter?.description}
          </div>
          <div className="line-clamp-1 text-gray-1000/60 dark:text-white/40">
            {item?.frontmatter?.date}
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

const ListView = ({ title, items }: IItemList) => {
  const router = useRouter();

  if (!items || !items.length) return <p>No items found</p>;

  const viewingBase =
    router.asPath === '/journal' || router.asPath === '/collection';

  return (
    <div
      className={classNames(
        'relative min-h-screen flex-none w-full bg-white border-r border-gray-150 md:w-80 lg:block xl:w-96 bg-gray-50 overflow-x-auto h-screen dark:bg-mui dark:border-gray-800',
        {
          hidden: !viewingBase,
        },
      )}
    >
      <Title title={title} />
      {items.map((item, idx) => (
        <ItemCard key={idx} item={item} />
      ))}
    </div>
  );
};

export default ListView;
