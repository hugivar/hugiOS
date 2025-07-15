const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const os = require('os');
const fs = require('fs');
const { execSync } = require('child_process');

class MacEdgeHistoryAnalyzer {
    constructor() {
        this.historyPath = null;
        this.possiblePaths = this.getMacEdgePaths();
    }

    getMacEdgePaths() {
        const homeDir = os.homedir();

        return [
            // Standard Microsoft Edge
            path.join(homeDir, 'Library', 'Application Support', 'Microsoft Edge', 'Default', 'History'),
            path.join(homeDir, 'Library', 'Application Support', 'Microsoft Edge', 'Profile 1', 'History'),
            path.join(homeDir, 'Library', 'Application Support', 'Microsoft Edge', 'Profile 2', 'History'),
            path.join(homeDir, 'Library', 'Application Support', 'Microsoft Edge', 'Profile 3', 'History'),

            // Edge Beta
            path.join(homeDir, 'Library', 'Application Support', 'Microsoft Edge Beta', 'Default', 'History'),
            path.join(homeDir, 'Library', 'Application Support', 'Microsoft Edge Beta', 'Profile 1', 'History'),

            // Edge Dev
            path.join(homeDir, 'Library', 'Application Support', 'Microsoft Edge Dev', 'Default', 'History'),
            path.join(homeDir, 'Library', 'Application Support', 'Microsoft Edge Dev', 'Profile 1', 'History'),

            // Edge Canary
            path.join(homeDir, 'Library', 'Application Support', 'Microsoft Edge Canary', 'Default', 'History'),
            path.join(homeDir, 'Library', 'Application Support', 'Microsoft Edge Canary', 'Profile 1', 'History')
        ];
    }

    checkEdgeInstallation() {
        console.log('🔍 Checking for Microsoft Edge installation on macOS...\\n');

        const edgeApps = [
            '/Applications/Microsoft Edge.app',
            '/Applications/Microsoft Edge Beta.app',
            '/Applications/Microsoft Edge Dev.app',
            '/Applications/Microsoft Edge Canary.app'
        ];

        const installedApps = [];

        for (const appPath of edgeApps) {
            if (fs.existsSync(appPath)) {
                try {
                    const plistPath = path.join(appPath, 'Contents', 'Info.plist');
                    if (fs.existsSync(plistPath)) {
                        try {
                            const versionOutput = execSync(`/usr/libexec/PlistBuddy -c "Print CFBundleShortVersionString" "${plistPath}"`, { encoding: 'utf8' });
                            const version = versionOutput.trim();
                            installedApps.push({
                                name: path.basename(appPath, '.app'),
                                path: appPath,
                                version: version
                            });
                            console.log(`✅ Found: ${path.basename(appPath, '.app')} (v${version})`);
                        } catch (versionError) {
                            installedApps.push({
                                name: path.basename(appPath, '.app'),
                                path: appPath,
                                version: 'Unknown'
                            });
                            console.log(`✅ Found: ${path.basename(appPath, '.app')} (version unknown)`);
                        }
                    }
                } catch (error) {
                    console.log(`⚠️  Found ${path.basename(appPath, '.app')} but couldn't read details`);
                }
            }
        }

        if (installedApps.length === 0) {
            console.log('❌ No Microsoft Edge installations found in /Applications/');
            console.log('\\n💡 To install Microsoft Edge:');
            console.log('1. Visit <https://www.microsoft.com/en-us/edge>');
            console.log('2. Download Edge for macOS');
            console.log('3. Install and open Edge to create browsing history');
            return false;
        }

        console.log(`\\n📱 Found ${installedApps.length} Edge installation(s)\\n`);
        return installedApps;
    }

    checkEdgeProcesses() {
        console.log('🔄 Checking if Microsoft Edge is currently running...\\n');

        try {
            const processes = execSync('ps aux | grep -i "Microsoft Edge" | grep -v grep', { encoding: 'utf8' });
            if (processes.trim()) {
                console.log('⚠️  WARNING: Microsoft Edge is currently running!');
                console.log('🛑 Please quit Edge completely before running this script.\\n');
                console.log('To quit Edge:');
                console.log('1. Right-click Edge icon in Dock → Quit');
                console.log('2. Or press Cmd+Q while Edge is active');
                console.log('3. Or run: killall "Microsoft Edge"\\n');
                return true;
            } else {
                console.log('✅ Microsoft Edge is not running\\n');
                return false;
            }
        } catch (error) {
            console.log('✅ Microsoft Edge appears to not be running\\n');
            return false;
        }
    }

    async findHistoryFile() {
        console.log('📁 Searching for Edge user data and history files...\\n');

        const homeDir = os.homedir();
        const supportDir = path.join(homeDir, 'Library', 'Application Support');

        // Check if Application Support directory exists
        if (!fs.existsSync(supportDir)) {
            console.log('❌ Application Support directory not found');
            return null;
        }

        // Look for Microsoft Edge directories
        const edgeDirectories = [];
        try {
            const supportContents = fs.readdirSync(supportDir);
            const edgeDirs = supportContents.filter(dir =>
                dir.toLowerCase().includes('microsoft edge')
            );

            console.log('Found Edge data directories:');
            edgeDirs.forEach(dir => {
                const fullPath = path.join(supportDir, dir);
                console.log(`  📂 ${dir}`);
                edgeDirectories.push(fullPath);
            });
            console.log('');
        } catch (error) {
            console.log('❌ Error reading Application Support directory:', error.message);
            return null;
        }

        // Check each Edge directory for profiles and history
        let foundHistoryFile = null;

        for (const edgeDir of edgeDirectories) {
            console.log(`🔍 Examining: ${path.basename(edgeDir)}`);

            try {
                const profiles = fs.readdirSync(edgeDir);
                const profileDirs = profiles.filter(item => {
                    const fullPath = path.join(edgeDir, item);
                    return fs.existsSync(fullPath) &&
                           fs.statSync(fullPath).isDirectory() &&
                           (item === 'Default' || item.startsWith('Profile'));
                });

                if (profileDirs.length === 0) {
                    console.log('  ❌ No user profiles found');
                    continue;
                }

                console.log(`  📋 Found ${profileDirs.length} profile(s):`);

                for (const profile of profileDirs) {
                    const historyPath = path.join(edgeDir, profile, 'History');
                    console.log(`    📁 ${profile}:`);

                    if (fs.existsSync(historyPath)) {
                        const stats = fs.statSync(historyPath);
                        const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
                        console.log(`      ✅ History file found (${sizeMB} MB)`);
                        console.log(`      📅 Last modified: ${stats.mtime.toLocaleString()}`);

                        if (!foundHistoryFile && stats.size > 0) {
                            foundHistoryFile = historyPath;
                            this.historyPath = historyPath;
                            console.log(`      🎯 Using this file for analysis`);
                        }
                    } else {
                        console.log(`      ❌ No history file found`);
                    }
                }
                console.log('');
            } catch (error) {
                console.log(`  ❌ Error reading directory: ${error.message}`);
            }
        }

        return foundHistoryFile;
    }

    async copyHistoryFile() {
        if (!this.historyPath) {
            throw new Error('No history file found. Please run diagnosis first.');
        }

        const tempPath = path.join(__dirname, 'temp_edge_history.db');

        try {
            if (fs.existsSync(tempPath)) {
                fs.unlinkSync(tempPath);
            }

            console.log('📋 Copying history file for analysis...');
            fs.copyFileSync(this.historyPath, tempPath);
            console.log('✅ History file copied successfully\\n');

            return tempPath;
        } catch (error) {
            if (error.code === 'EACCES') {
                throw new Error(`Permission denied. Try running with sudo: sudo node ${process.argv[1]}`);
            } else if (error.code === 'EBUSY') {
                throw new Error('History file is in use. Please make sure Edge is completely closed.');
            } else {
                throw new Error(`Failed to copy history file: ${error.message}`);
            }
        }
    }

    convertEdgeTimestamp(edgeTime) {
        // Edge uses WebKit timestamp (microseconds since Jan 1, 1601)
        const windowsEpoch = new Date('1601-01-01T00:00:00Z').getTime();
        const jsTimestamp = windowsEpoch + (edgeTime / 1000);
        return new Date(jsTimestamp);
    }

    // NEW METHOD: Extract top-level domain
    getTopLevelDomain(url) {
        try {
            const urlObj = new URL(url);
            const hostname = urlObj.hostname.toLowerCase();

            // Handle IP addresses
            if (this.isIPAddress(hostname)) {
                return hostname;
            }

            // Split hostname into parts
            const parts = hostname.split('.');

            // Handle special cases and common patterns
            if (parts.length <= 2) {
                return hostname; // Already a top-level domain like "google.com"
            }

            // Handle known multi-part TLDs (like .co.uk, .com.au, etc.)
            const multiPartTLDs = [
                'co.uk', 'com.au', 'co.jp', 'co.kr', 'com.br', 'co.za',
                'com.mx', 'co.in', 'com.sg', 'co.nz', 'com.ar', 'co.il',
                'com.tr', 'co.th', 'com.my', 'co.id', 'com.ph', 'co.ve',
                'com.co', 'co.cr', 'com.pe', 'com.ec', 'co.tz', 'co.ke',
                'ac.uk', 'org.uk', 'net.au', 'org.au', 'gov.au', 'edu.au',
                'github.io', 'herokuapp.com', 'blogspot.com', 'wordpress.com',
                'tumblr.co', 'wixsite.com', 'weebly.com', 'squarespace.com'
            ];

            // Check for multi-part TLDs
            for (let i = 2; i <= Math.min(3, parts.length - 1); i++) {
                const possibleTLD = parts.slice(-i).join('.');
                if (multiPartTLDs.includes(possibleTLD)) {
                    // Return domain + multi-part TLD
                    return parts.slice(-(i + 1)).join('.');
                }
            }

            // Handle common subdomains we want to group together
            const commonSubdomains = [
                'www', 'mail', 'blog', 'shop', 'store', 'news', 'support',
                'help', 'docs', 'api', 'app', 'mobile', 'm', 'en', 'us',
                'cdn', 'static', 'assets', 'images', 'img', 'media',
                'secure', 'login', 'auth', 'account', 'my', 'portal'
            ];

            // For most cases, return last two parts (domain.tld)
            let domain = parts.slice(-2).join('.');

            // But if we have more than 2 parts, check if we should include more
            if (parts.length > 2) {
                const subdomain = parts[parts.length - 3];

                // Keep certain subdomains that represent different services
                const keepSubdomains = [
                    'drive', 'docs', 'sheets', 'slides', 'maps', 'translate',
                    'photos', 'calendar', 'meet', 'chat', 'play', 'store',
                    'music', 'books', 'news', 'finance', 'weather', 'travel'
                ];

                if (keepSubdomains.includes(subdomain)) {
                    domain = parts.slice(-3).join('.');
                }
            }

            return domain;

        } catch (error) {
            // If URL parsing fails, return the original string
            return url;
        }
    }

    // Helper method to check if a string is an IP address
    isIPAddress(str) {
        const ipv4Regex = /^(\\d{1,3}\\.){3}\\d{1,3}$/;
        const ipv6Regex = /^([0-9a-fA-F]*:){2,7}[0-9a-fA-F]*$/;
        return ipv4Regex.test(str) || ipv6Regex.test(str);
    }

    // Helper method to get full hostname (for subdomain tracking)
    getFullHostname(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname.toLowerCase();
        } catch (error) {
            return url;
        }
    }

    async extractHistory() {
        const tempHistoryPath = await this.copyHistoryFile();

        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(tempHistoryPath, sqlite3.OPEN_READONLY, (err) => {
                if (err) {
                    reject(new Error(`Failed to open database: ${err.message}`));
                    return;
                }
            });

            const query = `
                SELECT
                    url,
                    title,
                    visit_count,
                    last_visit_time,
                    typed_count
                FROM urls
                WHERE visit_count > 0
                ORDER BY visit_count DESC
            `;

            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(new Error(`Query failed: ${err.message}`));
                    return;
                }

                db.close();

                // Clean up temp file
                try {
                    fs.unlinkSync(tempHistoryPath);
                } catch (cleanupError) {
                    console.warn('Warning: Could not delete temp file:', cleanupError.message);
                }

                resolve(rows);
            });
        });
    }

    // UPDATED METHOD: Use top-level domain instead of full hostname
    processHistoryData(historyData) {
        const siteStats = new Map();

        historyData.forEach(row => {
            const topLevelDomain = this.getTopLevelDomain(row.url);

            if (siteStats.has(topLevelDomain)) {
                const existing = siteStats.get(topLevelDomain);
                existing.totalVisits += row.visit_count;
                existing.totalTyped += row.typed_count;
                existing.uniqueUrls.add(row.url);
                existing.subdomains.add(this.getFullHostname(row.url));
                existing.urls.push({
                    url: row.url,
                    title: row.title,
                    visits: row.visit_count,
                    lastVisit: this.convertEdgeTimestamp(row.last_visit_time),
                    hostname: this.getFullHostname(row.url)
                });
            } else {
                siteStats.set(topLevelDomain, {
                    domain: topLevelDomain,
                    totalVisits: row.visit_count,
                    totalTyped: row.typed_count,
                    uniqueUrls: new Set([row.url]),
                    subdomains: new Set([this.getFullHostname(row.url)]),
                    urls: [{
                        url: row.url,
                        title: row.title,
                        visits: row.visit_count,
                        lastVisit: this.convertEdgeTimestamp(row.last_visit_time),
                        hostname: this.getFullHostname(row.url)
                    }]
                });
            }
        });

        // Convert Sets to Arrays and sort
        return Array.from(siteStats.values())
            .map(site => ({
                ...site,
                uniqueUrls: Array.from(site.uniqueUrls),
                subdomains: Array.from(site.subdomains).sort(),
                uniqueUrlCount: site.uniqueUrls.size,
                subdomainCount: site.subdomains.size
            }))
            .sort((a, b) => b.totalVisits - a.totalVisits);
    }

    // UPDATED DISPLAY METHOD: Show subdomain information
    displayResults(siteStats, rawData) {
        console.log('📊 MICROSOFT EDGE HISTORY ANALYSIS (Top-Level Domains)');
        console.log('=' .repeat(60));
        console.log(`🏠 User: ${os.userInfo().username}`);
        console.log(`💻 System: macOS ${os.release()}`);
        console.log(`📁 History file: ${this.historyPath}`);
        console.log(`📄 Total unique URLs: ${rawData.length}`);
        console.log(`🌐 Total unique top-level domains: ${siteStats.length}`);
        console.log(`👆 Total visits across all sites: ${rawData.reduce((sum, row) => sum + row.visit_count, 0)}`);

        console.log('\\n🏆 TOP 200 MOST VISITED DOMAINS');
        console.log('-'.repeat(60));

        siteStats.slice(0, 200).forEach((site, index) => {
            console.log(`${(index + 1).toString().padStart(2, ' ')}. ${site.domain}`);
            console.log(`    👆 Visits: ${site.totalVisits} | ⌨️  Typed: ${site.totalTyped}`);
            console.log(`    📄 Unique URLs: ${site.uniqueUrlCount} | 🌐 Subdomains: ${site.subdomainCount}`);

            // Show subdomains if there are multiple
            if (site.subdomainCount > 1) {
                console.log(`    🔗 Subdomains: ${site.subdomains.slice(0, 5).join(', ')}${site.subdomainCount > 5 ? `... (+${site.subdomainCount - 5} more)` : ''}`);
            }

            const topPage = site.urls.sort((a, b) => b.visits - a.visits)[0];
            console.log(`    🔥 Top page: ${topPage.title || 'No title'} (${topPage.visits} visits)`);
            console.log(`    📅 Last visit: ${topPage.lastVisit.toLocaleDateString()}`);
            console.log('');
        });

        this.displayDomainInsights(siteStats, rawData);
    }

    // NEW METHOD: Additional insights for top-level domains
    displayDomainInsights(siteStats, rawData) {
        console.log('\\n📈 DOMAIN INSIGHTS');
        console.log('-'.repeat(40));

        const totalVisits = siteStats.reduce((sum, site) => sum + site.totalVisits, 0);
        const averageVisitsPerDomain = (totalVisits / siteStats.length).toFixed(1);
        console.log(`📊 Average visits per domain: ${averageVisitsPerDomain}`);

        const topDomainPercentage = ((siteStats[0]?.totalVisits || 0) / totalVisits * 100).toFixed(1);
        console.log(`🥇 Top domain represents: ${topDomainPercentage}% of all visits`);

        // Top 50 breakdown
        const top50Total = siteStats.slice(0, 50).reduce((sum, site) => sum + site.totalVisits, 0);
        const top5Percentage = (top50Total / totalVisits * 100).toFixed(1);
        console.log(`🏆 Top 50 domains represent: ${top5Percentage}% of all visits`);

        // Domains with most subdomains
        const mostSubdomains = [...siteStats]
            .filter(site => site.subdomainCount > 1)
            .sort((a, b) => b.subdomainCount - a.subdomainCount)
            .slice(0, 50);

        if (mostSubdomains.length > 0) {
            console.log('\\n🌐 DOMAINS WITH MOST SUBDOMAINS:');
            mostSubdomains.forEach((site, index) => {
                console.log(`${index + 1}. ${site.domain} (${site.subdomainCount} subdomains, ${site.totalVisits} visits)`);
            });
        }

        // Most typed domains
        const mostTyped = [...siteStats]
            .filter(site => site.totalTyped > 0)
            .sort((a, b) => b.totalTyped - a.totalTyped)
            .slice(0, 50);

        if (mostTyped.length > 0) {
            console.log('\\n⌨️  MOST DIRECTLY TYPED DOMAINS:');
            mostTyped.forEach((site, index) => {
                console.log(`${index + 1}. ${site.domain} (${site.totalTyped} times)`);
            });
        }

        // Domains with most unique URLs
        const mostUrls = [...siteStats]
            .sort((a, b) => b.uniqueUrlCount - a.uniqueUrlCount)
            .slice(0, 50);

        console.log('\\n📄 DOMAINS WITH MOST UNIQUE PAGES:');
        mostUrls.forEach((site, index) => {
            console.log(`${index + 1}. ${site.domain} (${site.uniqueUrlCount} unique URLs)`);
        });

        // Domain categories
        this.categorizeDomains(siteStats);
    }

    // NEW METHOD: Categorize domains
    categorizeDomains(siteStats) {
        const categories = {
            'Social Media': ['facebook.com', 'twitter.com', 'x.com', 'instagram.com', 'linkedin.com', 'tiktok.com', 'snapchat.com', 'pinterest.com', 'reddit.com', 'discord.com', 'telegram.org'],
            'Search Engines': ['google.com', 'bing.com', 'yahoo.com', 'duckduckgo.com', 'baidu.com', 'yandex.com'],
            'Video/Entertainment': ['youtube.com', 'netflix.com', 'twitch.tv', 'vimeo.com', 'hulu.com', 'disney.com', 'primevideo.com', 'hbo.com', 'spotify.com'],
            'E-commerce': ['amazon.com', 'ebay.com', 'shopify.com', 'etsy.com', 'alibaba.com', 'walmart.com', 'target.com', 'bestbuy.com'],
            'News/Media': ['cnn.com', 'bbc.com', 'nytimes.com', 'washingtonpost.com', 'reuters.com', 'bloomberg.com', 'npr.org', 'theguardian.com'],
            'Technology': ['github.com', 'stackoverflow.com', 'apple.com', 'microsoft.com', 'developer.mozilla.org', 'techcrunch.com', 'ycombinator.com'],
            'Work/Productivity': ['gmail.com', 'outlook.com', 'slack.com', 'zoom.us', 'dropbox.com', 'notion.so', 'trello.com', 'asana.com'],
            'Education': ['wikipedia.org', 'coursera.org', 'edx.org', 'khanacademy.org', 'udemy.com', 'mit.edu', 'stanford.edu'],
            'Finance': ['paypal.com', 'chase.com', 'bankofamerica.com', 'wellsfargo.com', 'coinbase.com', 'robinhood.com']
        };

        console.log('\\n📂 DOMAIN CATEGORIES:');

        let totalCategorized = 0;
        const uncategorized = [];

        for (const [category, domains] of Object.entries(categories)) {
            const categoryStats = siteStats.filter(site =>
                domains.some(domain => site.domain === domain || site.domain.endsWith('.' + domain))
            );

            if (categoryStats.length > 0) {
                const totalCategoryVisits = categoryStats.reduce((sum, site) => sum + site.totalVisits, 0);
                totalCategorized += totalCategoryVisits;

                console.log(`${category}: ${categoryStats.length} domains, ${totalCategoryVisits} visits`);
                categoryStats.slice(0, 3).forEach(site => {
                    console.log(`  • ${site.domain} (${site.totalVisits} visits)`);
                });
                if (categoryStats.length > 3) {
                    console.log(`  • ... and ${categoryStats.length - 3} more`);
                }
            }
        }

        // Show uncategorized domains in top 200
        const allCategoryDomains = Object.values(categories).flat();
        const topUncategorized = siteStats
            .filter(site => !allCategoryDomains.some(domain =>
                site.domain === domain || site.domain.endsWith('.' + domain)
            ))
            .slice(0, 50);

        if (topUncategorized.length > 0) {
            console.log('\\nOther (Top 50):');
            topUncategorized.forEach(site => {
                console.log(`  • ${site.domain} (${site.totalVisits} visits)`);
            });
        }
    }

    async diagnose() {
        console.log('🔧 MICROSOFT EDGE DIAGNOSTIC FOR macOS\\n');
        console.log('=====================================\\n');

        console.log(`🍎 macOS Version: ${os.release()}`);
        console.log(`👤 User: ${os.userInfo().username}`);
        console.log(`🏠 Home Directory: ${os.homedir()}\\n`);

        // Step 1: Check Edge installation
        const installations = this.checkEdgeInstallation();
        if (!installations) {
            return false;
        }

        // Step 2: Check if Edge is running
        const isRunning = this.checkEdgeProcesses();
        if (isRunning) {
            console.log('⚠️  Please quit Edge and run the script again.');
            return false;
        }

        // Step 3: Find history file
        const foundPath = await this.findHistoryFile();

        if (!foundPath) {
            console.log('❌ NO USABLE HISTORY FILE FOUND\\n');
            console.log('💡 Possible solutions:');
            console.log('1. Open Microsoft Edge and browse some websites');
            console.log('2. Make sure you have the latest version of Edge');
            console.log('3. Check if you have multiple user accounts');
            console.log('4. Try running with sudo if permission issues persist');
            console.log('5. Reset Edge if the problem continues');
            return false;
        }

        console.log('✅ Diagnostic completed successfully!');
        console.log('🚀 Ready to analyze history data.\\n');
        return true;
    }

    async analyzeHistory() {
        // Run diagnostic first
        const ready = await this.diagnose();

        if (!ready) {
            return;
        }

        console.log('═'.repeat(60));
        console.log('🔍 EXTRACTING AND ANALYZING HISTORY...\\n');

        try {
            const historyData = await this.extractHistory();

            if (historyData.length === 0) {
                console.log('📭 No browsing history found in the database.');
                console.log('💡 This might mean:');
                console.log('- Edge history has been cleared');
                console.log('- This is a new Edge installation');
                console.log('- Private browsing was used exclusively');
                return;
            }

            console.log(`📊 Processing ${historyData.length} history entries...\\n`);
            const siteStats = this.processHistoryData(historyData);
            this.displayResults(siteStats, historyData);

        } catch (error) {
            console.error('❌ Analysis failed:', error.message);

            if (error.message.includes('Permission denied')) {
                console.log('\\n🔐 Permission issue detected. Try:');
                console.log('sudo node ' + process.argv.slice(1).join(' '));
            } else if (error.message.includes('file is in use')) {
                console.log('\\n🔒 File in use. Make sure Edge is completely closed:');
                console.log('killall "Microsoft Edge"');
            }
        }
    }

    // Additional utility methods for filtering
    async analyzeHistoryWithFilters(options = {}) {
        const {
            minVisits = 1,
            dateRange = null,
            excludeDomains = [],
            topN = 200,
            includeOnlyDomains = []
        } = options;

        const ready = await this.diagnose();
        if (!ready) return;

        console.log('═'.repeat(60));
        console.log('🔍 EXTRACTING AND ANALYZING HISTORY WITH FILTERS...\\n');

        try {
            const historyData = await this.extractHistory();

            if (historyData.length === 0) {
                console.log('📭 No browsing history found.');
                return;
            }

            // Apply filters
            const filteredData = historyData.filter(row => {
                if (row.visit_count < minVisits) return false;

                if (dateRange) {
                    const lastVisit = this.convertEdgeTimestamp(row.last_visit_time);
                    if (lastVisit < dateRange.start || lastVisit > dateRange.end) return false;
                }

                const domain = this.getTopLevelDomain(row.url);

                if (excludeDomains.length > 0 && excludeDomains.includes(domain)) return false;
                if (includeOnlyDomains.length > 0 && !includeOnlyDomains.includes(domain)) return false;

                return true;
            });

            console.log('🔧 APPLIED FILTERS:');
            console.log('-'.repeat(25));
            console.log(`Minimum visits: ${minVisits}`);
            if (dateRange) {
                console.log(`Date range: ${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`);
            }
            if (excludeDomains.length > 0) {
                console.log(`Excluded domains: ${excludeDomains.join(', ')}`);
            }
            if (includeOnlyDomains.length > 0) {
                console.log(`Include only: ${includeOnlyDomains.join(', ')}`);
            }
            console.log(`Showing top: ${topN} results`);
            console.log(`Filtered results: ${filteredData.length} / ${historyData.length} URLs\\n`);

            const siteStats = this.processHistoryData(filteredData);
            this.displayResults(siteStats.slice(0, topN), filteredData);

        } catch (error) {
            console.error('❌ Analysis failed:', error.message);
        }
    }

    async exportToJson(filename = 'edge-history-analysis.json', options = {}) {
        try {
            const historyData = await this.extractHistory();
            const siteStats = this.processHistoryData(historyData);

            const exportData = {
                exportDate: new Date().toISOString(),
                totalUrls: historyData.length,
                totalDomains: siteStats.length,
                totalVisits: historyData.reduce((sum, row) => sum + row.visit_count, 0),
                topSites: siteStats.slice(0, options.topN || 50),
                rawData: options.includeRawData ? historyData : null
            };

            fs.writeFileSync(filename, JSON.stringify(exportData, null, 2));
            console.log(`📁 Data exported to: ${filename}`);

        } catch (error) {
            console.error('❌ Export failed:', error.message);
        }
    }
}

// Mac-specific helper functions
function killEdgeProcesses() {
    try {
        console.log('🛑 Attempting to quit Microsoft Edge...');
        execSync('killall "Microsoft Edge"', { stdio: 'inherit' });
        console.log('✅ Edge processes terminated');
    } catch (error) {
        console.log('ℹ️  No Edge processes to terminate');
    }
}

// Main execution
async function main() {
    console.log('🍎 Microsoft Edge History Analyzer for macOS (Top-Level Domains)\\n');

    const analyzer = new MacEdgeHistoryAnalyzer();

    try {
        await analyzer.analyzeHistory();
    } catch (error) {
        console.error('💥 Script failed:', error.message);
    }
}

// Example usage functions
async function exampleFilteredAnalysis() {
    const analyzer = new MacEdgeHistoryAnalyzer();

    // Example: Last 30 days, minimum 5 visits, exclude Google and YouTube
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    await analyzer.analyzeHistoryWithFilters({
        minVisits: 5,
        dateRange: {
            start: thirtyDaysAgo,
            end: new Date()
        },
        excludeDomains: ['google.com', 'youtube.com'],
        topN: 15
    });
}

async function exampleExport() {
    const analyzer = new MacEdgeHistoryAnalyzer();
    await analyzer.exportToJson('my-browsing-stats.json', {
        topN: 100,
        includeRawData: false
    });
}

// Command line options
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.includes('--kill-edge')) {
        killEdgeProcesses();
    } else if (args.includes('--diagnose') || args.includes('-d')) {
        const analyzer = new MacEdgeHistoryAnalyzer();
        analyzer.diagnose().catch(console.error);
    } else if (args.includes('--filtered')) {
        exampleFilteredAnalysis().catch(console.error);
    } else if (args.includes('--export')) {
        exampleExport().catch(console.error);
    } else {
        main().catch(console.error);
    }
}

module.exports = MacEdgeHistoryAnalyzer;
