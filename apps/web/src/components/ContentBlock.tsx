import React from "react";
import ReactMarkdown from "react-markdown";

import CodeBlock from "components/CodeBlock";

interface IContentBlock {
  body: string;
}

const ContentBlock = ({ body }: IContentBlock) => {
  return (
    <ReactMarkdown
      components={{ code: CodeBlock }}
      className="dark:text-slate-300"
    >
      {body}
    </ReactMarkdown>
  );
};

export default ContentBlock;
