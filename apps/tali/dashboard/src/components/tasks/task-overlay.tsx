import { createPortal } from 'react-dom';
import {
    DragOverlay,
    UniqueIdentifier,
    DropAnimation,
    defaultDropAnimationSideEffects
} from '@dnd-kit/core';

import Item from './task-item';
import { findContainer, getIndex } from '~/utils/dnd-utils';

const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: '0.5',
            },
        },
    }),
};

const TaskOverlay = ({
    activeId,
    items,
    getItemStyles = () => ({}),
    wrapperStyle = () => ({})
}: any) => {
    if (typeof window !== "object") {
        return null;
    }

    return createPortal(
        <DragOverlay adjustScale={false} dropAnimation={dropAnimation}>
            <Item
                value={activeId}
                style={getItemStyles({
                    containerId: findContainer(activeId, items) as UniqueIdentifier,
                    overIndex: -1,
                    index: getIndex(activeId, items),
                    value: activeId,
                    isSorting: true,
                    isDragging: true,
                    isDragOverlay: true,
                })}
                wrapperStyle={wrapperStyle({ index: 0 })}
                dragOverlay
            />
        </DragOverlay>,
        document.body,
    )
};

export default TaskOverlay;
