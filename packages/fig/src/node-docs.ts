const completionSpec: Fig.Spec = {
  name: "node-docs",
  description: "Open nodejs documentation site",
  subcommands: [
    {
      name: "fs",
      description: "Opens https://nodejs.org/docs/latest-v10.x/api/fs.html",
    },
    {
      name: "path",
      description: "Opens https://nodejs.org/docs/latest-v10.x/api/path.html",
    },
  ],
};
export default completionSpec;
