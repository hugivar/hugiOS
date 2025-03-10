const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const cliProgress = require('cli-progress');

async function processImages(inputFolder, outputFolder) {
    try {
        // Create the progress bar
        const progressBar = new cliProgress.SingleBar({
            format: '{bar} {percentage}% | {value}/{total} | Processing Images',
            clearOnComplete: false,
            hideCursor: true
        }, cliProgress.Presets.shades_classic);

        // Get all background images
        const backgroundFiles = await getFilesRecursively(inputFolder);
        console.log(`Found ${backgroundFiles.length} images to process`);
        
        // Create base output directory
        await fs.mkdir(outputFolder, { recursive: true });

        // Initialize progress bar
        progressBar.start(backgroundFiles.length, 0);

        // Group files by their parent folder (apple, pear, etc.)
        const filesByFolder = backgroundFiles.reduce((acc, file) => {
            // Get the parent folder name (apple, pear, etc.)
            const relativePath = path.relative(inputFolder, file);
            const parentFolder = relativePath.split(path.sep)[0];
            
            if (!acc[parentFolder]) {
                acc[parentFolder] = [];
            }
            acc[parentFolder].push(file);
            return acc;
        }, {});

        // Process files maintaining folder structure
        for (const folder of Object.keys(filesByFolder)) {
            // Create folder in output directory
            const folderPath = path.join(outputFolder, folder);
            await fs.mkdir(folderPath, { recursive: true });

            // Process files in this folder
            for (const file of filesByFolder[folder]) {
                const fileName = path.basename(file, path.extname(file));
                const outputPath = path.join(folderPath, `${fileName}.png`);
                
                await processIndividualImage(file, outputPath);
                progressBar.increment();
            }
        }

        progressBar.stop();
        console.log('\nAll processing completed successfully!');
    } catch (error) {
        console.error('Error in main process:', error);
    }
}

async function getFilesRecursively(dir) {
    const files = [];
    const items = await fs.readdir(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            files.push(...await getFilesRecursively(fullPath));
        } else if (/\.(jpg|jpeg|png|webp)$/i.test(item.name)) {
            files.push(fullPath);
        }
    }

    return files;
}

async function processIndividualImage(inputPath, outputPath) {
    try {
        const metadata = await sharp(inputPath).metadata();
        
        // Calculate dimensions for center crop
        const cropSize = Math.min(metadata.width, metadata.height);
        const left = Math.floor((metadata.width - cropSize) / 2);
        const top = Math.floor((metadata.height - cropSize) / 2);

        await sharp(inputPath)
            // Extract square from center
            .extract({
                left,
                top,
                width: cropSize,
                height: cropSize
            })
            // Resize to 256x256
            .resize(256, 256, {
                fit: 'fill'
            })
            // Add rounded corners
            .composite([
                {
                    input: Buffer.from(`<svg>
                        <rect 
                            x="0" 
                            y="0" 
                            width="256" 
                            height="256" 
                            rx="10"
                            ry="10"
                        />
                    </svg>`),
                    blend: 'dest-in'
                }
            ])
            // Save processed image
            .toFile(outputPath);
    } catch (error) {
        console.error(`Error processing individual image ${inputPath}:`, error);
    }
}

// Example usage
const inputFolder = './backgrounds';  // Changed to match your file structure
const outputFolder = './processed-icons';

// Run the script
processImages(inputFolder, outputFolder);