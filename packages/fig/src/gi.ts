const completionSpec: Fig.Spec = {
  name: "gi",
  description: "Create a gitignore file",
  subcommands: [
    {
      name: "list",
      description: "List all the currently supported gitignore.io templates",
    },
    {
      name: "react",
      description: "Generate a .gitignore file for a react project",
    },
    {
      name: "node",
      description: "Generate a .gitignore file for a node project",
    },
    {
      name: "reactnative",
      description: "Generate a .gitignore file for a reactnative project",
    },
  ],
  // Only uncomment if gi takes an argument
  // args: {}
};
export default completionSpec;
