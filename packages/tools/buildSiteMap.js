// WIP

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const isPageFile = (filename) => {
    return (
        path.extname(filename) === '.md' &&
        !filename.endsWith('404.html')
    );
}

function getPageFiles(directory, files = []) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    entries.forEach(entry => {
        const absolutePath = path.resolve(directory, entry.name);
        if (entry.isDirectory()) {
            getPageFiles(absolutePath, files);
        } else if (isPageFile(absolutePath)) {
            files.push(absolutePath);
        }
    });
    return files;
}



function buildRss(pageFiles, pagesDir) {
    // use the reduce method to collect all RSS data
    const rssData = pageFiles.reduce(
        (data, file) => {
            // the pathname is the relative path from '/pages' to the HTML file
            const pathname = path.relative(pagesDir, file).slice(0, -'.html'.length);
            // collect all RSS top level info in the index page
            if (pathname === 'index') {
                const htmlString = fs.readFileSync(file, 'utf8');
                const $ = cheerio.load(htmlString);
                data.title = $('title').text();
                data.home_page_url = $(`meta[property='og:url']`).attr('content');
                data.feed_url = $(
                    `link[rel='alternate'][type='application/json']`
                ).attr('href');
                data.description = $(`meta[name='description']`).attr('content');
                data.icon = $(`link[sizes='512x512']`).attr('href');
                data.favicon = $(`link[sizes='64x64']`).attr('href');
            }
            // only add to RSS if the pathname is '/blog/*'
            if (pathname.startsWith('blog')) {
                const htmlString = fs.readFileSync(file, 'utf8');
                const $ = cheerio.load(htmlString);
                // remove the placeholder image for lazy loading images
                $(`#Content img[aria-hidden='true']`).remove();
                data.items.push({
                    url: $(`meta[property='og:url']`).attr('content'),
                    id: pathname.substring('blog/'.length),
                    content_html: $('#Content').html(),
                    title: $('article h1').text(),
                    summary: $(`meta[name='description']`).attr('content'),
                    image: $(`meta[property='og:image']`).attr('content'),
                    banner_image: $(`meta[property='og:image']`).attr('content'),
                    date_published: $('time').attr('datetime'),
                    author: {
                        name: $(`a[rel='author']`).text(),
                        url: $(`a[rel='author']`).attr('href'),
                        avatar: $(`img#Avatar`).attr('src'),
                    },
                });
            }
            return data;
        },
        {
            version: 'https://jsonfeed.org/version/1',
            items: [],
        }
    );
    // sort the items by the publishing date
    rssData.items.sort();
    // write to the output static folder
    fs.writeFileSync(
        path.join('./.next/static', 'feed.json'),
        JSON.stringify(rssData, null, 2)
    );
}

function buildSiteMap(pageFiles) {
    // I am using the open graph URL tag as the url
    // but you can simply concat the base Url with the relative path
    const urls = pageFiles.map(file => {
        const htmlString = fs.readFileSync(file, 'utf8');
        const $ = cheerio.load(htmlString);
        return $(`meta[property='og:url']`).attr('content');
    });

    const sitemap = `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
    xmlns:xhtml="http://www.w3.org/1999/xhtml" 
    xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" 
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    ${urls
            .map(
                url => `
      <url>
        <loc>${url}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
      `
            )
            .join('')}  
  </urlset>
  `;
    fs.writeFileSync(path.join('./.next/static', 'sitemap.xml'), sitemap);
}

// Main
const collectionsDir = './data/collections';
const collectionFiles = getPageFiles(collectionsDir);
buildRss(collectionFiles, collectionsDir);
buildSiteMap(collectionFiles);
