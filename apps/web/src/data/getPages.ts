import { Client } from "@notionhq/client";

const notion = new Client({
    auth: 'secret_u31XxrAJFsz1i6XxA4eXTLZvMckJiCyAUAJVMEDQ9lu'
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

const getPages = async (pageId: string): Promise<any> => {
    const blocks = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 50,
    });

    const pages = blocks.results.map(item => ({
        id: item.id,
        title: item.child_page.title,
        link: `journal/${item.id}`
    }));

    return pages;
};

export default getPages;