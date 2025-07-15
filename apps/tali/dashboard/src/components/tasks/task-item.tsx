import React, { useEffect, useRef } from 'react';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import type { Transform } from '@dnd-kit/utilities';
import { Card, CardBody } from '@chakra-ui/react'

import { Handle } from '../TaskHandle';
import { Remove } from '../TaskRemove';

export interface Props {
    dragOverlay?: boolean;
    color?: string;
    disabled?: boolean;
    dragging?: boolean;
    handle?: boolean;
    handleProps?: any;
    height?: number;
    index?: number;
    fadeIn?: boolean;
    transform?: Transform | null;
    listeners?: DraggableSyntheticListeners;
    sorting?: boolean;
    style?: React.CSSProperties;
    transition?: string | null;
    wrapperStyle?: React.CSSProperties;
    value: React.ReactNode;
    onRemove?(): void;
    renderItem?(args: {
        dragOverlay: boolean;
        dragging: boolean;
        sorting: boolean;
        index: number | undefined;
        fadeIn: boolean;
        listeners: DraggableSyntheticListeners;
        ref: React.Ref<HTMLElement>;
        style: React.CSSProperties | undefined;
        transform: Props['transform'];
        transition: Props['transition'];
        value: Props['value'];
    }): React.ReactElement;
}

const Item = React.memo(
    React.forwardRef<HTMLLIElement, Props>(
        (
            {
                color,
                dragOverlay,
                dragging,
                disabled,
                fadeIn,
                handle,
                handleProps,
                height,
                index,
                listeners,
                onRemove,
                renderItem,
                sorting,
                style,
                transition,
                transform,
                value,
                wrapperStyle,
                ...props
            },
            ref
        ) => {
            const inputRef = useRef<HTMLInputElement>(null);

            useEffect(() => {
                if (!dragOverlay) {
                    return;
                }

                document.body.style.cursor = 'grabbing';

                return () => {
                    document.body.style.cursor = '';
                };
            }, [dragOverlay]);

            return (
                <Card
                    // @ts-ignore
                    ref={ref}
                    marginY={4}
                    marginX={2}
                >
                    <CardBody
                        data-cypress="draggable-item"
                        {...(!handle ? listeners : undefined)}
                        {...props}
                        tabIndex={!handle ? 0 : undefined}
                    >
                        <input
                            className="edit"
                            // @ts-ignore
                            value={value.text}
                            ref={inputRef}
                        // onChange={(e) => {
                        //     const newText = e.currentTarget.value;
                        //     setText(newText);
                        // }}
                        // onKeyPress={(e) => {
                        //     if (e.key === 'Enter') {
                        //         editTask.mutate({
                        //             id: task.id,
                        //             data: { text },
                        //         });
                        //     }
                        // }}
                        />
                        <span>
                            {onRemove ? (
                                <Remove onClick={onRemove} />
                            ) : null}
                            {handle ? <Handle {...handleProps} {...listeners} /> : null}
                        </span>
                    </CardBody>
                </Card>
            );
        }
    )
);

export default Item;