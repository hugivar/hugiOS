const axios = require('axios');
const readline = require('readline');
require('dotenv').config()

const token = process.env.NOTION_TOKEN;

class NotionClient {
    constructor() {
        this.baseUrl = 'https://www.notion.so/api/v3';
        this.headers = {
            'Content-Type': 'application/json',
            'Cookie': `token_v2=${token}`
        };
    }

    async post(endpoint, data) {
        const url = endpoint.startsWith('/api') 
            ? `https://www.notion.so${endpoint}` 
            : `${this.baseUrl}/${endpoint}`;
            
        try {
            const response = await axios.post(url, data, { headers: this.headers });
            return response;
        } catch (error) {
            throw new Error(`Notion API request failed: ${error.message}`);
        }
    }
}

async function getSpaceDict(client) {
    /**
     * Function that returns a mapping from space_id to space_name using
     * a Notion client.
     * 
     * @param {NotionClient} client - Notion client
     * @returns {Object} Mapping space_id to space_name
     */
    const response = await client.post('loadUserContent', {});
    const spaceList = response.data.recordMap.space;
    return Object.fromEntries(
        Object.entries(spaceList).map(([id, dict]) => [id, dict.value.name])
    );
}

async function getTrashedBlockIdList(client, spaceId) {
    /**
     * Function that retrieves a list of block_id in the trash of a specific
     * space_id using a Notion Client.
     * 
     * @param {NotionClient} client - Notion client
     * @param {string} spaceId - Space id
     * @returns {Array<string>} List of block_id that are in the trash
     */
    const query = {
        type: 'BlocksInSpace',
        query: '',
        filters: {
            isDeletedOnly: true,
            excludeTemplates: false,
            isNavigableOnly: true,
            requireEditPermissions: false,
            ancestors: [],
            createdBy: [],
            editedBy: [],
            lastEditedTime: {},
            createdTime: {},
            inTeams: [],
            includePublicPagesWithoutExplicitAccess: false,
            navigableBlockContentOnly: true
        },
        sort: {
            field: 'lastEdited',
            direction: 'desc'
        },
        limit: 1000,
        spaceId: spaceId,
        source: 'trash'
    };

    const results = await client.post('/api/v3/search', query);
    const blockList = results.data.results;
    return blockList.map(block => block.id);
}

function* chunkIterator(list, chunkSize) {
    /**
     * Yield successive n-sized chunks from the list.
     * 
     * @param {Array} list - The input list
     * @param {number} chunkSize - The chunk size
     * @yields {Array} Chunks of size n of the list
     */
    for (let i = 0; i < list.length; i += chunkSize) {
        yield list.slice(i, i + chunkSize);
    }
}

async function deletePermanently(client, blockIdList, chunkSize = 10) {
    /**
     * Delete permanently the pages blockIdList using the notion client
     * 
     * @param {NotionClient} client - Notion client
     * @param {Array<string>} blockIdList - List of the page ids that will be deleted
     * @param {number} chunkSize - Size of the chunks that will be deleted
     * @returns {Object} Statistics about successful and failed deletions
     */
    const stats = {
        successful: 0,
        failed: 0,
        failedIds: []
    };

    if (!blockIdList.length) {
        console.log('\t No pages found.');
        return stats;
    }

    for (const blockIdBatch of chunkIterator(blockIdList, chunkSize)) {
        try {
            const query = {
                blockIds: blockIdBatch,
                permanentlyDelete: true
            };
            await client.post('deleteBlocks', query);
            console.log(`\tDeleted: ${blockIdBatch}`);
            stats.successful += blockIdBatch.length;
        } catch (error) {
            console.log(`\tCouldn't delete: ${blockIdBatch} (${error.message})`);
            stats.failed += blockIdBatch.length;
            stats.failedIds.push(...blockIdBatch);
        }
    }

    return stats;
}

async function promptUser(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            resolve(answer);
        });
    });
}

async function main() {
    // Get the client and the spaces
    const client = new NotionClient();
    const spaceDict = await getSpaceDict(client);

    const answer = await promptUser("Confirm wanting to run the script ? (yes/no) ");
    if (answer !== "yes") {
        return 0;
    }

    // Initialize total statistics
    const totalStats = {
        successful: 0,
        failed: 0,
        failedIds: []
    };

    // Iterating through the spaces to delete the trashed pages
    for (const [spaceId, spaceName] of Object.entries(spaceDict)) {
        const blockIdList = await getTrashedBlockIdList(client, spaceId);
        console.log(`Purging trash in space: ${spaceName} (${blockIdList.length} pages)`);
        
        const spaceStats = await deletePermanently(client, blockIdList);
        
        // Aggregate statistics
        totalStats.successful += spaceStats.successful;
        totalStats.failed += spaceStats.failed;
        totalStats.failedIds.push(...spaceStats.failedIds);
        
        // Log space-specific statistics
        console.log(`\tSpace Statistics:`);
        console.log(`\t- Successfully deleted: ${spaceStats.successful} blocks`);
        console.log(`\t- Failed to delete: ${spaceStats.failed} blocks`);
        console.log();
    }

    // Log total statistics
    console.log('Final Statistics:');
    console.log(`- Total successfully deleted: ${totalStats.successful} blocks`);
    console.log(`- Total failed to delete: ${totalStats.failed} blocks`);
    if (totalStats.failedIds.length > 0) {
        console.log('- Failed block IDs:');
        console.log(totalStats.failedIds);
    }
    console.log('\nScript execution completed.');
    return 0;
}

// Run the script
main()
    .then(exitCode => process.exit(exitCode))
    .catch(error => {
        console.error('Error:', error);
        process.exit(1);
    });