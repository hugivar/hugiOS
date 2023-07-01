// ==UserScript==
// @name         Unhook
// @version      2.0
// @description  Disable uselesss elements from YouTube
// @author       hugivar
// @match        *://www.youtube.com/*
// @run-at       document-idle
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js

// ==/UserScript==
// https://github.com/lawrencehook/remove-youtube-suggestions/blob/main/src/content-script/main.js#L334

/* globals $ */
function uniq(array) { return Array.from(new Set(array)) }
function qs(query, root = document) { return root.querySelector(query) }
function qsa(query, root = document) { return Array.from(root.querySelectorAll(query)) }

const resultsPageRegex = new RegExp('.*://.*youtube\.com/results.*', 'i');
const homepageRegex = new RegExp('.*://(www|m)\.youtube\.com(/)?$', 'i');
const shortsRegex = new RegExp('.*://.*youtube\.com/shorts.*', 'i');
const videoRegex = new RegExp('.*://.*youtube\.com/watch\\?v=.*', 'i');
const subsRegex = new RegExp(/\/feed\/subscriptions$/, 'i');

// Dynamic settings variables
const cache = {};
let url = location.href;
let theaterClicked = false, hyper = false;
let onResultsPage = resultsPageRegex.test(url);
let onHomepage = homepageRegex.test(url);
let onShorts = shortsRegex.test(url);
let onVideo = videoRegex.test(url);
let onSubs = subsRegex.test(url);
let settingsInit = false

/**
 * Wait for an element before resolving a promise
 * @param {String} querySelector - Selector of element to wait for
 * @param {Integer} timeout - Milliseconds to wait before timing out, or 0 for no timeout
 */
function waitForElement(querySelector, timeout) {
    return new Promise((resolve, reject) => {
        var timer = false;
        if (document.querySelectorAll(querySelector).length) return resolve();
        const observer = new MutationObserver(() => {
            if (document.querySelectorAll(querySelector).length) {
                observer.disconnect();
                if (timer !== false) clearTimeout(timer);
                return resolve();
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        if (timeout) timer = setTimeout(() => {
            observer.disconnect();
            reject();
        }, timeout);
    });
}

function hideHomeFeed() {
    waitForElement("ytd-browse", 3000).then(function () {
        document.querySelector("ytd-browse").remove();
    });
};

function hideShorts() {
    waitForElement("#items", 3000).then(function () {
        const shortsBadgeSelector = 'ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]';
        const shortBadges = qsa(shortsBadgeSelector);
        shortBadges?.forEach(badge => {
            const sidebarVid = badge.closest('ytd-compact-video-renderer');
            sidebarVid?.setAttribute('is_short', '');
            const gridVideo = badge.closest('ytd-grid-video-renderer');
            gridVideo?.setAttribute('is_short', '');
            const updatedGridVideo = badge.closest('ytd-rich-item-renderer');
            updatedGridVideo?.setAttribute('is_short', '');
        });

        const shortsShelfSelector = '*[is-shorts]';
        const shortsShelves = qsa(shortsShelfSelector);
        shortsShelves?.forEach(shelf => {
            const shelfContainer = shelf.closest('ytd-rich-section-renderer');
            shelfContainer?.setAttribute('is_short', '');
        });
    });
}

function hideVideoSidebar() {
    waitForElement("#secondary", 3000).then(function () {
        document.querySelector("#secondary").remove();
    });
};

function hideComments() {
    waitForElement("ytd-item-section-renderer", 3000).then(function () {
        document.querySelector("ytd-item-section-renderer").remove();
    });
};

function disableAfterLoad() {
    qs('ytd-channel-video-player-renderer video')?.pause();
};

function handleNewPage() {
    if (onHomepage) {
        hideHomeFeed();
        hideShorts();
    }

    if (onVideo) {
        hideVideoSidebar();
        hideComments();
    }
};

window.onload = function () {
    handleNewPage();
}