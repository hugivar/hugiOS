interface ISettings {
  title: string;
  lang: string;
  siteUrl: string;
  siteAddress: string;
  siteIPFSAddress: string;
  siteTitleMeta: string;
  siteDescriptionMeta: string;
  shareImageWidth: number;
  shareImageHeight: number;
  shortTitle: string;
  siteIcon: string;
  navigation: {
    title: string;
    href: string;
    icon: string;
  }[];
  social: {
    title: string;
    href: string;
    icon: string;
  }[];
}

const settings: ISettings = {
  title: "Hugivar",
  lang: "en",
  siteUrl: "http://localhost:3000", // Site domain. Do not include a trailing slash!
  siteAddress: "hugivar.com",
  siteIPFSAddress: "ipfs.hugivar.com",
  siteTitleMeta: "Hugivar", // This allows an alternative site title for meta data for pages.
  siteDescriptionMeta:
    "A site about my personal philosophy and thoughts on engineering",

  shareImageWidth: 1000,
  shareImageHeight: 523,

  shortTitle: "Hugivar",
  siteIcon: "favicon.png",
  navigation: [
    { title: "Home", href: "/", icon: "home" }
  ],
  social: [
    {
      title: "Github",
      href: "https://github.com/hugivar",
      icon: "github",
    },
  ],
};

export default settings;
