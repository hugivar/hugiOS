const { execSync } = require("child_process");
// import changeset from root
const changes = require('../../../output.json');

const hasChanges = changes.changesets.find(item => item.releases.find(releaseItem => releaseItem.name === "@nezhos/web"));

if (hasChanges) {
    execSync("cd ../../packages/tools && pnpm cli publish $PINATA_KEY $PINATA_SECRET_KEY $CLOUDFLARE_TOKEN_ID $CLOUDFLARE_ZONE_ID $CLOUDFLARE_DNS_ID");
}
