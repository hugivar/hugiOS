import { Client } from "@notionhq/client";

// Create new secret thorugh .env file
const notion = new Client({
    auth: process.env.NOTION_KEY
})

interface IPage {
    title: string;
    description?: string;
    date?: string;
    link: string;
    slug?: string;
    type?: string;
}

interface IPages {
    pages?: [IPage];
}

export const getBlocksByPageId = (pageId: string): Promise<any> => {
    return notion.blocks.children.list({
        block_id: pageId,
        page_size: 50,
    });
};

export const getPage = (pageId: string): Promise<any> => {
    return notion.pages.retrieve({ page_id: pageId })

};

export const getPagesByBlocks = (blocks: any): Promise<any> => {
    return blocks?.results?.filter((item: any) => item.child_page).map((item: any) => ({
        id: item.id,
        title: item.child_page.title,
        link: `journal/${item.id}`
    }));
};