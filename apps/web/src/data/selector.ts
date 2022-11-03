export const getRichText = (block: any) => {
    const { type } = block;
    // console.log('selector line:2', block?.paragraph, block?.paragraph?.rich_text[0]);

    // return '';
    return {
        ...block[type]?.rich_text[0],
        type
    }
};