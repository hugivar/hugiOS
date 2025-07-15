import React, { forwardRef } from 'react';
import { Flex } from '@chakra-ui/react'

export interface Props {
    children: React.ReactNode;
    columns?: number;
    label?: string;
    style?: React.CSSProperties;
    horizontal?: boolean;
    hover?: boolean;
    handleProps?: React.HTMLAttributes<any>;
    scrollable?: boolean;
    shadow?: boolean;
    placeholder?: boolean;
    unstyled?: boolean;
    onClick?(): void;
    onRemove?(): void;
}

const Container = forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            columns = 1,
            handleProps,
            horizontal,
            hover,
            onClick,
            onRemove,
            label,
            placeholder,
            style,
            scrollable,
            shadow,
            unstyled,
            ...props
        }: Props,
        ref
    ) => {

        return (
            <Flex
                {...props}
                ref={ref}
                style={
                    {
                        ...style,
                        '--columns': columns,
                    } as React.CSSProperties
                }
                onClick={onClick}
                tabIndex={onClick ? 0 : undefined}
                css={{
                    flexDirection: 'column',
                    overflow: 'hidden',
                    outline: 'none',
                    minWidth: 350,
                    margin: 10,
                    borderRadius: 5,
                    minHeight: 200,
                    backgroundColor: 'rgba(246, 246, 246, 1)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    fontSize: '1em'
                }}
            >
                {
                    label ? (
                        <Flex
                            css={{
                                padding: '5px 20px',
                                paddingRight: 8,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: '#fff',
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                                borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
                            }}
                        >
                            {label}
                        </Flex >
                    ) : null}
                {placeholder ? null : <>{children}</>}
            </Flex >
        );
    }
);

export default Container;