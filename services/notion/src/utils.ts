export const parsePageIdFromUrl = (url: string) => {
    return url.match(/[0-9a-f]{32}/)?.[0] || ""
};