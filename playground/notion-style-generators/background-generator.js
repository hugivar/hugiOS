const fs = require('fs').promises;
const { createCanvas, loadImage } = require('canvas');
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
        gradientTitle = 'Deep Blue',
        iconLabel = 'Apple',
        iconColor = '',
        width = 1100,
        height = 500,
        outputPath
    } = options;

    try {
        // Create canvas
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Find gradient colors
        const gradient = gradients.find(g => g.title === gradientTitle);
        if (!gradient) {
            throw new Error(`Gradient "${gradientTitle}" not found`);
        }

        // Create gradient
        const canvasGradient = ctx.createLinearGradient(0, 0, width, height);
        canvasGradient.addColorStop(0, gradient.color1);
        canvasGradient.addColorStop(0.5, gradient.color2);

        // Fill background
        ctx.fillStyle = canvasGradient;
        ctx.fillRect(0, 0, width, height);

        // Find icon
        const icon = icons.find(i => i.label === iconLabel);
        if (!icon) {
            throw new Error(`Icon "${iconLabel}" not found`);
        }

        // Download and draw icon
        const iconData = await downloadIcon(icon.slug, iconColor);
        const image = await loadImage(iconData);

        // Calculate icon position (centered)
        const iconSize = 170;
        const iconX = (width - iconSize) / 2;
        const iconY = (height - iconSize) / 2;
        ctx.drawImage(image, iconX, iconY, iconSize, iconSize);

        // Save the image
        const buffer = canvas.toBuffer('image/png');
        const finalOutputPath = outputPath || `${iconLabel}-${gradientTitle}.png`;
        await fs.writeFile(finalOutputPath, buffer);
        console.log(`Image saved to: ${finalOutputPath}`);

        return finalOutputPath;
    } catch (error) {
        console.error('Error generating image:', error);
        throw error;
    }
}

async function generateAllVariants(options = {}) {
    const {
        icons,
        gradients,
        outputDir = 'output',
        iconColor = '',
        includePrivateGradients = false
    } = options;

    try {
        // Parse icons and gradients from raw data
        const icons = require('./icons.json');
        const gradients = require('./gradients.json');
                
        console.log(`Loaded ${icons.length} icons and ${gradients.length} gradients configurations`);
        
        // Create output directory if it doesn't exist
        await fs.mkdir(outputDir, { recursive: true });

        // Filter gradients based on access level
        const availableGradients = includePrivateGradients 
            ? gradients 
            : gradients.filter(g => g.free);

        let totalCount = icons.length * availableGradients.length;
        let currentCount = 0;

        console.log(`Starting generation of ${totalCount} images...`);
        console.log(`Using ${availableGradients.length} gradients for ${icons.length} icons`);

        // Process each icon
        for (const icon of icons) {
            // Create a directory for each icon
            const iconDir = `${outputDir}/${icon.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
            await fs.mkdir(iconDir, { recursive: true });

            // Generate each gradient variant
            for (const gradient of availableGradients) {
                currentCount++;
                const fileName = `${gradient.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
                const outputPath = `${iconDir}/${fileName}`;

                try {
                    await generateImage({
                        gradientTitle: gradient.title,
                        iconLabel: icon.label,
                        iconColor,
                        outputPath
                    });

                    // Progress update
                    const progress = ((currentCount / totalCount) * 100).toFixed(1);
                    console.log(`[${progress}%] Generated: ${icon.label} with ${gradient.title}`);
                } catch (error) {
                    console.error(`Error generating ${icon.label} with ${gradient.title}:`, error.message);
                }
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
        const { icons, gradients } = loadConfig();

        await generateAllVariants({
            icons,
            gradients,
            outputDir: 'generated-icons',
            iconColor: '',  // Set to 'White' for white icons
            includePrivateGradients: true  // Set to false to only use free gradients
        });
    } catch (error) {
        console.error('Error in main:', error);
    }
}

main();