import { Detail } from "@raycast/api";

export default function AdvancedURIPluginNotInstalled({ vaultName }: { vaultName?: string }) {
  const vaultText = vaultName ? `vault "${vaultName}"` : "any vault";
  const text = `# Advanced URI plugin not installed in ${vaultText}.\nThis command requires the [Advanced URI plugin](https://obsidian.md/plugins?id=obsidian-advanced-uri) for Obsidian.  \n  \n Install it through the community plugins list.`;

  return <Detail navigationTitle="Advanced URI plugin not installed" markdown={text} />;
}
