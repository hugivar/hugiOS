
// ==UserScript==
// @name Medium Redirector
// @author Hugivar
// @include *medium.com/*
// @include *gitconnected.com/*
// @include *plainenglish.io/*
// @run-at document-start
// @license GPL-3.0-or-later
// @url https://github.com/forLoop42/open-source-alternative-redirector/blob/main/src/index.js
// @icon https://icons.iconarchive.com/icons/itweek/knob-toolbar/32/Knob-Shuffle-Off-icon.png
// @grant none
// ==/UserScript==

const url = new URL(location.href);
const pathname = location.pathname;

function matchDomain(domains, hostname) {
  var matched_domain = false;
  if (!hostname)
    hostname = window.location.hostname;
  if (typeof domains === 'string')
    domains = [domains];
  domains.some(domain => (hostname === domain || hostname.endsWith('.' + domain)) && (matched_domain = domain));
  return matched_domain;
}

if (matchDomain('medium.com')) {
  const article = pathname.split('/').filter(item => item)[0]
  console.log(article);

  if (article && article !== 'tag') {
    location.replace('https://' + "scribe.rip" + location.pathname + location.search)
  }
}

if (matchDomain('gitconnected.com')) {
  location.replace('https://' + "scribe.rip" + location.pathname + location.search)
}

if (matchDomain('plainenglish.io')) {
  location.replace('https://' + "scribe.rip" + location.pathname + location.search)
}