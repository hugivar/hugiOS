export const parsePageIdFromUrl = (url: string) => {
    return url.split('--')?.[1]?.replace(/\?(.*)/,"")
};