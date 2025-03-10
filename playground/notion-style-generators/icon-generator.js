const fs = require('fs').promises;
const axios = require('axios');
const sharp = require('sharp');
const potrace = require('potrace');
const svg2js = require('svgson');
require('dotenv').config();

async function downloadPngIcon(iconSlug) {
    try {
        // Download PNG icon
        const url = `https://lib.notion.vip/icons/${iconSlug}`;
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return response.data;
    } catch (error) {
        console.error(`Error downloading PNG icon: ${error.message}`);
        throw error;
    }
}

function pngToSvg(pngBuffer) {
    return new Promise((resolve, reject) => {
        // Convert to bitmap for tracing
        sharp(pngBuffer)
            .resize(280, 280)
            .flatten({ background: { r: 255, g: 255, b: 255, alpha: 0 } })
            .greyscale()
            .toBuffer()
            .then(data => {
                // Trace the bitmap to create SVG
                potrace.trace(data, (err, svg) => {
                    if (err) reject(err);
                    else resolve(svg);
                });
            })
            .catch(reject);
    });
}

async function makeThemeAdaptive(svgContent) {
    try {
        // Parse SVG into JSON
        const svgJson = await svg2js.parse(svgContent);
        
        // Add style for theme adaptation
        const styleNode = {
            name: 'style',
            type: 'element',
            value: '',
            attributes: {},
            children: [{
                type: 'text',
                value: `
                    :root {
                        --icon-color: #000000;
                    }
                    @media (prefers-color-scheme: dark) {
                        :root {
                            --icon-color: #FFFFFF;
                        }
                    }
                    path {
                        fill: var(--icon-color, currentColor);
                    }
                `
            }]
        };
        
        // Add the style to the SVG
        svgJson.children.unshift(styleNode);
        
        // Convert back to SVG string
        return svg2js.stringify(svgJson);
    } catch (error) {
        console.error('Error making SVG adaptive:', error);
        throw error;
    }
}

async function generateAdaptiveSvgIcon(options = {}) {
    const {
        iconSlug,
        iconLabel = 'Icon',
        outputDir = 'adaptive-icons'
    } = options;

    try {
        // Create output directory if it doesn't exist
        await fs.mkdir(outputDir, { recursive: true });
        
        // Download the PNG
        const pngBuffer = await downloadPngIcon(iconSlug);
        
        // Convert PNG to SVG
        const svgContent = await pngToSvg(pngBuffer);
        
        // Make it theme-adaptive
        const adaptiveSvg = await makeThemeAdaptive(svgContent);
        
        // Base filename
        const fileName = iconLabel.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const outputPath = `${outputDir}/${fileName}.svg`;
        
        // Save the adaptive SVG
        await fs.writeFile(outputPath, adaptiveSvg);
        
        console.log(`Generated adaptive SVG icon: ${iconLabel}`);
        return outputPath;
    } catch (error) {
        console.error('Error generating adaptive SVG icon:', error);
        throw error;
    }
}

async function main() {
    try {
        // Your icon configurations
        const icons = require('./icons.json');
        
        for (const icon of icons) {
            try {
                await generateAdaptiveSvgIcon({
                    iconSlug: icon.slug,
                    iconLabel: icon.label
                });
            } catch (error) {
                console.error(`Error processing ${icon.label}:`, error.message);
            }
        }
        
        console.log('Conversion complete!');
    } catch (error) {
        console.error('Error in main:', error);
    }
}

main();