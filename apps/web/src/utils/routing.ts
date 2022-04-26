import settings from "config/settings";

const sanitizeHref = (href: string) => {
  // href ends in a forward slash
  if (href[href.length - 1] === "/") {
    return href.slice(0, href.length - 1);
  }

  return href;
};

export const determineIPFS = () => {
  if (typeof window !== "undefined" && window.location.hostname) {
    return window?.location?.hostname.includes(settings.siteIPFSAddress);
  }

  return false;
};

export const determineHref = (href: string) => {
  if (typeof window !== "undefined" && window.localStorage) {
    const hasSiteAddress = window?.location?.origin.includes(
      settings.siteAddress
    );

    const ipfsEnabled = determineIPFS();

    return ipfsEnabled && hasSiteAddress && href !== "/"
      ? `${sanitizeHref(href)}.html`
      : href;
  }

  return href;
};
