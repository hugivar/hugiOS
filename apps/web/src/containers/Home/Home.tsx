/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Header from "src/containers/Header";
import Link from "next/link";
import { useTranslation } from "@hugios/i18n";

const PersonalInfo = ({ t }: any) => (
  <div className="max-w-md">
    <div className="text-lg leading-8 spaced-y-6">
      <p className="mb-4">
        {t("home.me.subtitle1")}{" "}
        <Link href="https://compile.substack.com/" passHref>
          <span className="text-black font-bold cursor-pointer dark:text-slate-100">
            {t("journal.title")}
          </span>
        </Link>
        .
      </p>
      <p>
        {t("home.me.visit")}{" "}
        <Link href="https://compile.substack.com/" passHref>
          <span className="text-black font-bold cursor-pointer dark:text-slate-100">
            {t('journal.title')}
          </span>
        </Link>{" "}
        {t("home.me.subtitle2")}
      </p>
    </div>
  </div>
);

const Quote = ({ t }: any) => (
  <div className="flex flex-col p-8 mt-4 pb-2 mx-auto max-w-3xl text-grey-darkest dark:text-slate-300">
    <h3 className="text-center text-3xl">{t('home.quote.title')}</h3>
    <div className="flex items-center justify-center px-5 py-4">
      <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-800 dark:bg-zinc-800">
        <div className="w-full mb-6">
          <div className="text-3xl text-indigo-500 text-left leading-tight h-3 text-sky-300">
            “
          </div>
          <p className="text-sm text-gray-600 text-center px-5 dark:text-slate-300">
            {t('home.quote.desc')}
          </p>
          <div className="text-3xl text-indigo-600 text-right leading-tight h-3 -mt-2 dark:text-sky-300">
            ”
          </div>
        </div>
        <div className="w-full">
          <p className="text-md text-indigo-600 font-bold text-center dark:text-sky-300">
            {t('home.quote.author')}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Idea = ({ t }: any) => (
  <div className="flex flex-col mx-auto max-w-3xl text-grey-darkest dark:text-slate-300 text-center">
    <div className="max-w-md">
      <div className="text-lg text-grey-darkest leading-8 spaced-y-6">
        <p className="mb-4">
          {t("home.idea.names")}
        </p>
        <p>
          {t("home.idea.anonymity")}
        </p>
      </div>
    </div>
  </div>
);

const Home = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Header />
      <div className="flex flex-col p-8 pb-0 mx-auto mt-8 max-w-3xl text-grey-darkest dark:text-slate-300 text-center">
        <h2 className="text-center text-3xl mb-8">Hey, I'm Hugivar 👋</h2>
        <PersonalInfo t={t} />
      </div>
      <Quote t={t} />
      <Idea t={t} />
    </>
  )
};

export default Home;
