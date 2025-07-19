import React from 'react';
import ReactMarkdown from 'react-markdown';

import CodeBlock from 'components/CodeBlock';

interface IContentBlock {
  body: string;
}

const ContentBlock = ({ body }: IContentBlock) => {
  return <ReactMarkdown components={{ code: CodeBlock }}>{body}</ReactMarkdown>;
};

export default ContentBlock;
