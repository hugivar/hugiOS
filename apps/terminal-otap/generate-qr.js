#!/usr/bin/env node

// Terminal TOTP QR Code Generator
// Save this as generate-qr.js and run with: node generate-qr.js "otpauth://totp/your-url-here"

const qrcode = require('qrcode-terminal');
const fs = require('fs');

// Get the URL from command line arguments
const args = process.argv.slice(2);
let url = args[0] || '';

// Validate URL
if (!url) {
  console.error('\x1b[31mError: Please provide a TOTP authentication URL as an argument\x1b[0m');
  console.log('Usage: node generate-qr.js "otpauth://totp/your-url-here"');
  process.exit(1);
}

if (!url.trim().toLowerCase().startsWith('otpauth://totp')) {
  console.error('\x1b[31mError: URL must start with otpauth://totp\x1b[0m');
  console.log('Usage: node generate-qr.js "otpauth://totp/your-url-here"');
  process.exit(1);
}

// Display info
console.log('\x1b[36m=== TOTP QR Code Generator ===\x1b[0m');
console.log(`\x1b[33mGenerating QR code for:\x1b[0m ${url}`);
console.log('\x1b[33mScanning this code will add the TOTP code to your authenticator app\x1b[0m');
console.log('');

// Generate and display QR code in terminal
qrcode.generate(url, { small: false }, function (qrcode) {
  console.log(qrcode);
});

// Optionally save to file (uncomment to enable)
/*
const outputFilename = 'totp-qrcode.txt';
fs.writeFile(outputFilename, qrcode, (err) => {
  if (err) {
    console.error('\x1b[31mError saving QR code to file\x1b[0m');
  } else {
    console.log(`\x1b[32mQR code saved to ${outputFilename}\x1b[0m`);
  }
});
*/

console.log('\x1b[32m✓ QR code generated successfully!\x1b[0m');
console.log('\x1b[90mTo generate another QR code, run the script with a different URL\x1b[0m');