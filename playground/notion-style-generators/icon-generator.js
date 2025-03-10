const fs = require('fs').promises;
const sharp = require('sharp');
const axios = require('axios');
require('dotenv').config();

async function downloadIcon(iconSlug) {
    try {
        const url = `https://lib.notion.vip/icons/${iconSlug}`;
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return response.data;
    } catch (error) {
        console.error(`Error downloading icon: ${error.message}`);
        throw error;
    }
}

async function generateImage(options = {}) {
    const {
        icon,
        iconLabel = 'Apple',
        iconColor = '',
        width = 1100,
        height = 500,
        outputPath
    } = options;

    try {
        // Download icon
        const iconData = await downloadIcon(icon.slug, iconColor);

        // Create a blank background
        const background = sharp({
            create: {
                width: width,
                height: height,
                channels: 4,
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            }
        });

        // Calculate icon position (centered)
        const iconSize = 170;
        const iconX = Math.floor((width - iconSize) / 2);
        const iconY = Math.floor((height - iconSize) / 2);

        // Resize the icon and overlay it on the background
        const processedIcon = await sharp(iconData)
            .resize(iconSize, iconSize)
            .toBuffer();

        // Composite the icon onto the background
        const finalImage = await background
            .composite([{
                input: processedIcon,
                top: iconY,
                left: iconX
            }])
            .png()
            .toBuffer();

        // Save the image
        const finalOutputPath = outputPath || `${iconLabel}.png`;
        await fs.writeFile(finalOutputPath, finalImage);
        console.log(`Image saved to: ${finalOutputPath}`);

        return finalOutputPath;
    } catch (error) {
        console.error('Error generating image:', error);
        throw error;
    }
}

async function generateIcons(options = {}) {
    const {
        outputDir = 'output',
        iconColor = ''
    } = options;

    try {
        // Parse icons from raw data
        const icons = require('./icons.json');

        console.log(`Loaded ${icons.length} icons configurations`);

        // Create output directory if it doesn't exist
        await fs.mkdir(outputDir, { recursive: true });

        let totalCount = icons.length;
        let currentCount = 0;

        console.log(`Starting generation of ${totalCount} images...`);

        // Process each icon
        for (const icon of icons) {
            // Generate each icon
            currentCount++;
            const fileName = `${icon.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
            const outputPath = `./${outputDir}/${fileName}`;

            try {
                await generateImage({
                    icon,
                    iconLabel: icon.label,
                    iconColor,
                    outputPath
                });

                // Progress update
                const progress = ((currentCount / totalCount) * 100).toFixed(1);
                console.log(`[${progress}%] Generated: ${icon.label}`);
            } catch (error) {
                console.error(`Error generating ${icon.label}:`, error.message);
            }
        }

        console.log('\nGeneration complete!');
        console.log(`Total images generated: ${currentCount}`);
        console.log(`Output directory: ${outputDir}`);

    } catch (error) {
        console.error('Error in batch generation:', error);
        throw error;
    }
}

async function main() {
    try {
        await generateIcons({
            outputDir: 'generated-icons',
            iconColor: '',  // Set to 'White' for white icons
        });
    } catch (error) {
        console.error('Error in main:', error);
    }
}

main();