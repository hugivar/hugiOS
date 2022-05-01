const completionSpec: Fig.Spec = {
  name: "alias-finder",
  description: "",
  options: [
    {
      name: "-l",
      description:
        "Allow the aliases to be longer than the input (match aliases if they contain the input)",
    },
    {
      name: "-e",
      description: "Avoid matching aliases that are shorter than the input",
    },
  ],
  subcommands: [
    {
      name: "git pull",
    },
    {
      name: "git push",
    },
    {
      name: "git commit",
    },
    {
      name: "git commit -m",
    },
  ],
};
export default completionSpec;
