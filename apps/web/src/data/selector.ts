export const getRichText = (block: any) => {
    const { type } = block;

    return {
        ...block[type]?.rich_text[0],
        type
    }
};