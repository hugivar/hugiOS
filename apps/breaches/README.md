# JupiterOne Coding Challenge

Welcome to the JupiterOne Coding Challenge crafted by Hugo Felkel

I build this project leveraging Turborepo with two main projects, the "breaches" app and the "haveibeenpwned" service

## What's Included
### Breaches
The frontend build with React that leverage Apollo graphql and the apollo link rest utility to query the REST back

### HaveIBeenPwned
A simple REST backend service powered by express hosted through [Heroku](https://www.heroku.com)

## Getting Started
1. Add pnpm if you don't have have it installed ([pnpm installation guide](https://pnpm.io/installation))
2. Install the node_modules - `pnpm i`
3. Run the Breaches web app and the associated express service simulationously using `pnpm dev`