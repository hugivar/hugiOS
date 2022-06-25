<h3 align="center">NezhOS</h1>
<!-- <h3 align="center">Exploring the world and questioning everything</h3> -->
<p align="center">
  A monorepo that holds all of Nezhivar's open source projects . Bootstrapped with Turborepo.
</p>

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a packages manager. It includes the following packages/apps:

### Apps and Packages

- `notifications`: an electron app built to serve as a notification center for my different services
- `web`: a nextjs app to serve as my personal site
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`) as well as `terminal`, and `vscode` configurations
- `fig`: custom plugins for `fig.io`
- `tools`: a toolkit used throughout the monorepo including the `cli`
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `tools`: `cli`s used throughout the monorepo
- `ui`: a stub React component library shared by both web and docs applications

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup

### Build

To build all apps and packages, run the following command:

```
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm run dev
```
