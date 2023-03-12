
<br />
<div align="center">
  <h2 align="center">HugiOS CLI</h2>
</div>

## Using the CLI

[HugiOS CLI](https://github.com/hugivar/hugiOS/tree/main/packages/tools/cli)

Once you have the node_modules installed, you can access the monorepo cli using the command `hugios`.

## Clickup Exports

ClickUp provides a solution to create a knowledge base from tasks and docs in a singular location, but it fails to expose the export functionality through the API. This tool seeks to make exporting and storing documents easier

This feature will be archived once an official solution becomes available, https://clickup.canny.io/feature-requests/p/bulk-export-all-docs-to-pdf-ms-word 

### Getting Started

This is an instruction set on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```
- pnpm
  ```sh
  curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
  ```

### Gather Network Calls

1. Open your Developer Tools debugger in the browser. Click on the Network Tab.
2. Enable the ability to persist logs
3. Filter the network logs for the following pattern, https://attachments.clickup.com/exports
4. Navigate to https://app.clickup.com
5. Using the ClickUp interface, go to a document you want to extract, then select the export button
   5a. You can choose to export all pages as either Markdown or HTML. I'd recommended doing both
6. Repeat the above step for any other files you want to export
7. Lastly, within your Network tab of Developer Tools, save the logs as a HAR file.
   7a. Name the HAR file like so, "repo_name/data/network.json"

### Usage

1. Clone the repo
   ```sh
   git clone https://github.com/hugivar/electron-notification.git
   ```
2. Install pnpm packages
   ```sh
   pnpm install
   ```
3. Extract urls from network logs
   ```js
   npm run extract
   ```
4. Export file data to desired structure
   ```js
   npm run export
   ```
## Todoist Exports

