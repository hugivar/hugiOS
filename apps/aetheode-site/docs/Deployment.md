# Deployment with Cloudflare and Pinata - A completely decentralized solution

## Deploying to Pinata
https://pinata.cloud/

View the following code snippets for an automated, CLI based approach to adding the build folder of NextJS to pinata

tools/cli/commands/publish.js 

```js
// Import pinata
const pinataSDK = require('@pinata/sdk');
// Grab the necessary keys from the .env file
const { PINATA_KEY, PINATA_SECRET_KEY } = process.env;

// Establish connection to the pinata SDK
const pinata = pinataSDK(PINATA_KEY, PINATA_SECRET_KEY);
// Define where your NextJS exported files exist
const sourcePath = path.join(__dirname, '../../../out');


// Describe the options pinata pinned folder
const options = {
    pinataMetadata: {
        name: 'web-build',
        keyvalues: {
            customKey: 'customValue',
            customKey2: 'customValue2'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};

// Add the exported files using the Pinata SDK
pinata
    .testAuthentication()
    .then((result) => pinata.pinFromFS(sourcePath,options));
```

## Deploying to Cloudflare

https://developers.cloudflare.com/distributed-web/ipfs-gateway/connecting-website

1. CNAME for your.website pointing to cloudflare-ipfs.com
2. TXT record for _dnslink.your.website with the value dnslink=/ipfs/   <your_hash_here>

