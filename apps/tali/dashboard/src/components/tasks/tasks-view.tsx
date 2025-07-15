'use client';

import React, { useState } from 'react';
import {
    UniqueIdentifier,
    KeyboardCoordinateGetter,
} from '@dnd-kit/core';
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    SortingStrategy,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Card, Button } from '@chakra-ui/react';

import Item from './task-item';
import DraggableContainer from './draggable-container';
import DroppableContainer from './droppable-container';
import TaskOverlay from './task-overlay';
import { getIndex } from '~/utils/dnd-utils';
import useMountStatus from '~/hooks/useMountStatus';

type Items = Record<UniqueIdentifier, UniqueIdentifier[]>;

interface Props {
    adjustScale?: boolean;
    columns?: number;
    containerStyle?: React.CSSProperties;
    coordinateGetter?: KeyboardCoordinateGetter;
    getItemStyles?(args: {
        value: UniqueIdentifier;
        index: number;
        overIndex: number;
        isDragging: boolean;
        containerId: UniqueIdentifier;
        isSorting: boolean;
        isDragOverlay: boolean;
    }): React.CSSProperties;
    wrapperStyle?(args: { index: number }): React.CSSProperties;
    itemCount?: number;
    items?: Items;
    handle?: boolean;
    strategy?: SortingStrategy;
    scrollable?: boolean;
    vertical?: boolean;
    onEdit?: any
}

export const TRASH_ID = 'void';
const PLACEHOLDER_ID = 'placeholder';

export default function TasksView({
    columns,
    handle = false,
    items: initialItems,
    containerStyle,
    getItemStyles = () => ({}),
    wrapperStyle = () => ({}),
    strategy = verticalListSortingStrategy,
    vertical = false,
    scrollable,
    onEdit
}: Props) {
    const [items, setItems] = useState<Items>(initialItems);
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    const containers = Object.keys(items) as UniqueIdentifier[];
    const isSortingContainer = activeId ? containers.includes(activeId) : false;

    return (
        <DraggableContainer
            items={items}
            setItems={setItems}
            onEdit={onEdit}
            activeId={activeId}
            setActiveId={setActiveId}
            containers={containers}
        >
            <div
                style={{
                    display: 'inline-grid',
                    boxSizing: 'border-box',
                    padding: 20,
                    gridAutoFlow: vertical ? 'row' : 'column',
                }}
            >
                <SortableContext
                    items={[...containers, PLACEHOLDER_ID]}
                    strategy={
                        vertical
                            ? verticalListSortingStrategy
                            : horizontalListSortingStrategy
                    }
                >
                    {containers.map((containerId) => (
                        <DroppableContainer
                            key={containerId}
                            id={containerId}
                            label={containerId}
                            columns={columns}
                            items={items[containerId]}
                            scrollable={scrollable}
                            style={containerStyle}
                        >
                            <Card>
                                <Button>Add a task</Button>
                            </Card>
                            <SortableContext items={items[containerId]} strategy={strategy}>
                                {items[containerId].map((value, index) => {
                                    return (
                                        <SortableItem
                                            disabled={isSortingContainer}
                                            key={value.id}
                                            id={value}
                                            index={index}
                                            items={items}
                                            handle={handle}
                                            style={getItemStyles}
                                            wrapperStyle={wrapperStyle}
                                            containerId={containerId}
                                        />
                                    );
                                })}
                            </SortableContext>
                        </DroppableContainer>
                    ))}
                </SortableContext>
            </div>
            <TaskOverlay
                activeId={activeId}
                items={items}
            />
        </DraggableContainer>
    );
}

interface SortableItemProps {
    containerId: UniqueIdentifier;
    id: UniqueIdentifier;
    index: number;
    items: Items;
    handle: boolean;
    disabled?: boolean;
    style(args: any): React.CSSProperties;
    wrapperStyle({ index }: { index: number }): React.CSSProperties;
}

function SortableItem({
    disabled,
    id,
    index,
    handle,
    style,
    containerId,
    wrapperStyle,
    items
}: SortableItemProps) {
    const {
        setNodeRef,
        setActivatorNodeRef,
        listeners,
        isDragging,
        isSorting,
        over,
        overIndex,
        transform,
        transition,
    } = useSortable({
        id,
    });
    const mounted = useMountStatus();
    const mountedWhileDragging = isDragging && !mounted;

    return (
        <Item
            ref={disabled ? undefined : setNodeRef}
            value={id}
            dragging={isDragging}
            sorting={isSorting}
            handle={handle}
            handleProps={handle ? { ref: setActivatorNodeRef } : undefined}
            index={index}
            wrapperStyle={wrapperStyle({ index })}
            style={style({
                index,
                value: id,
                isDragging,
                isSorting,
                overIndex: over ? getIndex(over.id, items) : overIndex,
                containerId,
            })}
            transition={transition}
            transform={transform}
            fadeIn={mountedWhileDragging}
            listeners={listeners}
        />
    );
}

