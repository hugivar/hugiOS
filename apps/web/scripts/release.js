const { execSync } = require("child_process");
// import changeset from root
const changes = require('../../../output.json');

const hasChanges = changes.changesets.find(item => item.releases.find(releaseItem => releaseItem.name === "@hugios/web"));

if (hasChanges) {
    execSync("cd ../../packages/tools && pnpm cli publish site");
}
