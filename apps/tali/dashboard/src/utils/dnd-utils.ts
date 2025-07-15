import {
    UniqueIdentifier,
} from '@dnd-kit/core';

export const findContainer = (id: UniqueIdentifier, items: any) => {
    if (id in items) {
        return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
};

export const getIndex = (id: UniqueIdentifier, items: any) => {
    const container = findContainer(id, items);

    if (!container) {
        return -1;
    }

    const index = items[container].indexOf(id);

    return index;
};