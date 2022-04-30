/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Header } from "containers/Header";
import Link from "next/link";

const Quote = () => (
  <div className="flex flex-col p-8 mt-4 pb-2 mx-auto max-w-3xl text-grey-darkest dark:text-slate-300">
    <h3 className="text-center text-3xl">Anonymity</h3>

    <div className="flex items-center justify-center px-5 py-4">
      <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-800">
        <div className="w-full mb-6">
          <div className="text-3xl text-indigo-500 text-left leading-tight h-3">
            “
          </div>
          <p className="text-sm text-gray-600 text-center px-5">
            See that bird? It’s a brown-throated thrush, but in Germany it’s
            called a Halzenfugel, and in Chinese they call it a Chung Ling and
            even if you know all those names for it, you still know nothing
            about the bird. You only know something about people; what they call
            the bird. Now that thrush sings, and teaches its young to fly, and
            flies so many miles away during the summer across the country, and
            nobody knows how it finds its way.
          </p>
          <div className="text-3xl text-indigo-600 text-right leading-tight h-3 -mt-2">
            ”
          </div>
        </div>
        <div className="w-full">
          <p className="text-md text-indigo-600 font-bold text-center">
            Richard Feynman
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Home = () => (
  <>
    <Header />
    <div className="flex flex-col p-8 pb-0 mx-auto mt-8 max-w-3xl text-grey-darkest dark:text-slate-300 text-center">
      <h2 className="text-center text-3xl mb-8">Hey, I'm Nezhivar 👋</h2>
      <div className="max-w-md">
        <div className="text-lg leading-8 spaced-y-6">
          <p className="mb-4">
            I'm a full-stack engineer, explorer, and lifelong learner. I share
            thoughts and learnings through my{" "}
            <Link href="/journal" passHref>
              <span className="text-black font-bold cursor-pointer dark:text-slate-100">
                Journal
              </span>
            </Link>
            .
          </p>
          <p>
            Visit my{" "}
            <Link href="/collection" passHref>
              <span className="text-black font-bold cursor-pointer dark:text-slate-100">
                Collection
              </span>
            </Link>{" "}
            page for a glimpse into the various technologies that I am currently
            using.
          </p>
        </div>
      </div>
    </div>
    <Quote />
    <div className="flex flex-col mx-auto max-w-3xl text-grey-darkest dark:text-slate-300 text-center">
      <div className="max-w-md">
        <div className="text-lg text-grey-darkest leading-8 spaced-y-6">
          <p className="mb-4">
            Names are meaningless. Seek knowledge and understanding. Question
            Everything.
          </p>
          <p>
            Anonymity should be sought after at all costs. Contributions should
            be judge based on content alone. Not based on the gravitas of
            author.
          </p>
        </div>
      </div>
    </div>
  </>
);

export default Home;
