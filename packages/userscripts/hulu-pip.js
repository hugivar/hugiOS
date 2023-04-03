// ==UserScript==
// @name        Hulu PIP
// @namespace   Violentmonkey Scripts
// @include     *hulu.com/*
// @grant       none
// @version     1.0
// @author      hugivar
// @icon        https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Hulu_logo_%282014%29.svg/1600px-Hulu_logo_%282014%29.svg.png
// @include     https://www.hulu.com/watch/*
// @description 2/16/2023, 10:51:51 PM
// ==/UserScript==


function matchDomain(domains, hostname) {
    var matched_domain = false;
    if (!hostname)
        hostname = window.location.hostname;
    if (typeof domains === 'string')
        domains = [domains];
    domains.some(domain => (hostname === domain || hostname.endsWith('.' + domain)) && (matched_domain = domain));
    return matched_domain;
}

function huluPIP() {
    setInterval(() => {
        var video = document.getElementsByTagName('video')[0];
        if (video) {
            video.removeAttribute('disablePictureInPicture');
        }
    }, 100)
}


if (matchDomain('hulu.com')) {
    huluPIP();
}