<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h2 align="center">Electron Notification</h2>

  <p align="center">
     A simple electron app built to serve as a notification center for my different services such as Protonmail
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

![Electron Notification Screen Shot][product-screenshot]

### Built With

- [ElectronJS](https://www.electronjs.org/)

<!-- GETTING STARTED -->

## Getting Started

This is an instruction set on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nezhivar/electron-notification.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Rename config.json.sample to config.json

   ```sh
   mv config.json.sample config.json
   ```

4. Add the tabs you want to serve notifications from inside the newly created config.json
5. Build the app
   ```js
   npm run package && npm run make
   ```

Open the newly built app inside the out folder

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

[product-screenshot]: images/screenshot.png
