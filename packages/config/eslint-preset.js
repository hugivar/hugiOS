module.exports = {
  extends: ["prettier", "next"],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "no-console": "error",
  },
};
