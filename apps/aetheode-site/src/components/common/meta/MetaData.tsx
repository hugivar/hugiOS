import React from 'react';
import { Helmet } from 'react-helmet';

import settings from 'config/settings';

interface IMetaData {
  title: string;
  description?: string;
  bodyClass?: object;
}

const MetaData = ({ title, description, bodyClass }: IMetaData) => {
  title = title || settings.siteTitleMeta || settings.title;
  description =
    description || settings.siteDescriptionMeta || settings.description;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:site_name" content={settings.title} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {settings.twitter && (
        <meta
          name="twitter:site"
          content={`https://twitter.com/${settings.twitter.replace(/^@/, '')}/`}
        />
      )}
      {settings.twitter && (
        <meta name="twitter:creator" content={settings.twitter} />
      )}
      <html lang={settings.lang} />
      <style type="text/css">{`${settings.codeinjection_styles}`}</style>
      <body className={bodyClass?.toString()} />
    </Helmet>
  );
};

MetaData.defaultProps = {
  data: {},
};

export default MetaData;
