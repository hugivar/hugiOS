---
title: 'Purpose and the technology of this blog'
description: "Outline of how I achieved a decentralized blog covering the toolset used and helpful links"
date: 21 May 2021
---

### Overview

Hello. My name is Nezhivar. I created this blog  to serve as an example to show how a decentralized blog could be created using only the IPFS [https://ipfs.io/](https://ipfs.io/) network.

This blog will cover topics from personal muses on decentralization as well as tutorials that I hope you enjoy.

### Technology

* NextJS - Open source library to create the scaffolding of the blog
* IPFS - Serves as a storage mechanism for the code
* Pinata [https://pinata.cloud/](https://pinata.cloud/) - Pinning service for IPFS nodes
* Cloudlfare - Serves as a conduit by pointing the .com address to the IPFS pinned node

### Helpful Links

* [CLI publish script](https://github.com/nezhivar/nezhivar-site/blob/master/tools/cli/commands/publish.js)
* [Deployment README](https://github.com/nezhivar/nezhivar-site/blob/master/docs/Deployment.md)