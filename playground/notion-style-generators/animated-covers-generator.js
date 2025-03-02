async function downloadNotionSVGs(configPath = './animated-covers.json') {
    // Load configuration from JSON file
    let config;
    try {
        // In browser environment
        if (typeof window !== 'undefined') {
            const response = await fetch(configPath);
            if (!response.ok) {
                throw new Error(`Failed to load config: ${response.status} ${response.statusText}`);
            }
            config = await response.json();
        } 
        // In Node.js environment
        else {
            const fs = require('fs');
            const configData = fs.readFileSync(configPath, 'utf8');
            config = JSON.parse(configData);
        }
    } catch (error) {
        console.error('Error loading configuration:', error);
        throw error;
    }
    
    const { baseUrl, totalFiles } = config;
    console.log(`Using baseUrl: ${baseUrl}, totalFiles: ${totalFiles}`);
    
    const svgCollection = [];
    
    // Function to fetch a single SVG file
    async function fetchSVG(number) {
        const paddedNumber = number.toString().padStart(2, '0');
        const url = `${baseUrl}${paddedNumber}.svg`;
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch SVG ${paddedNumber}: ${response.status} ${response.statusText}`);
            }
            
            const svgContent = await response.text();
            return {
                number: paddedNumber,
                url: url,
                content: svgContent
            };
        } catch (error) {
            console.error(`Error fetching SVG ${paddedNumber}:`, error);
            return null;
        }
    }
    
    // Fetch all SVGs in sequence
    console.log("Starting download of Notion SVGs...");
    
    for (let i = 1; i <= totalFiles; i++) {
        const svg = await fetchSVG(i);
        if (svg) {
            svgCollection.push(svg);
            console.log(`Downloaded SVG ${svg.number}`);
        }
    }
    
    console.log(`Download complete. Retrieved ${svgCollection.length} of ${totalFiles} SVGs.`);
    return svgCollection;
}

// Optional: Function to save the SVGs to file (in a Node.js environment)
function saveSVGsToFiles(svgCollection, outputDir = './notion-svgs') {
    const fs = require('fs');
    const path = require('path');
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    svgCollection.forEach(svg => {
        const filePath = path.join(outputDir, `animated-notion-cover_${svg.number}.svg`);
        fs.writeFileSync(filePath, svg.content);
        console.log(`Saved ${filePath}`);
    });
    
    console.log(`All SVGs saved to ${outputDir}`);
}

downloadNotionSVGs('./animated-covers.json').then(svgCollection => {
    saveSVGsToFiles(svgCollection);
});