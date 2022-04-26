import React from "react";
import dynamic from "next/dynamic";
import ContentLoader from "react-content-loader";

interface IFrontMatter {
  title: string;
  date: string;
}
interface IPost {
  frontmatter: IFrontMatter;
  body: string;
}

const ContentBlock = dynamic(() => import("components/ContentBlock"), {
  loading: () => (
    <ContentLoader viewBox="0 0 380 70">
      <rect x="0" y="0" width="67" height="11" rx="3" />
      <rect x="76" y="0" width="140" height="11" rx="3" />
      <rect x="127" y="48" width="53" height="11" rx="3" />
      <rect x="187" y="48" width="72" height="11" rx="3" />
      <rect x="18" y="48" width="100" height="11" rx="3" />
      <rect x="0" y="71" width="37" height="11" rx="3" />
      <rect x="18" y="23" width="140" height="11" rx="3" />
      <rect x="166" y="23" width="173" height="11" rx="3" />
    </ContentLoader>
  ),
});

const ContentItem = ({ frontmatter, body }: IPost) => {
  if (!frontmatter) return <p>loading...</p>;

  return (
    <div className="w-full max-w-3xl px-4 py-6 pb-10 mx-auto md:px-8 dark:text-slate-300">
      <div className="w-full flex">
        <div>
          <h1 className="font-sans text-2xl font-bold xl:text-3xl text-primary dark:text-slate-300">
            {frontmatter.title}
          </h1>
          <p className="inline-block leading-snug text-tertiary mt-4 dark:text-slate-300">
            {frontmatter.date}
          </p>
          <div className="mt-8 prose dark:text-slate-300">
            <ContentBlock body={body} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentItem;
