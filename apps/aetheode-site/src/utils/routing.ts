import settings from 'config/settings';

const sanitizeHref = (href: string) => {
  // href ends in a forward slash
  if (href[href.length - 1] === '/') {
    return href.slice(0, href.length - 1);
  }

  return href;
};
export const determineHref = (href: string) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const hasSiteAddress = window?.location?.origin.includes(
      settings.siteAddress,
    );

    return hasSiteAddress && href !== '/' ? `${sanitizeHref(href)}.html` : href;
  }

  return href;
};
