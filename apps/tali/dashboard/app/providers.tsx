'use client'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { appWithTranslation, SSRConfig } from 'next-i18next';
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app';
import { ComponentProps } from 'react';
import { trpc } from '../src/utils/trpc';

const I18nextAdapter = appWithTranslation<
    AppProps<SSRConfig> & { children: React.ReactNode }
>(({ children }) => <>{children}</>);

const I18nProvider = (props: AppProps) => {
    const _i18n = trpc.i18n.useQuery(undefined, {
        trpc: { context: { skipBatch: true } },
    });

    const locale = _i18n.data?.locale;
    const i18n = _i18n.data?.i18n;

    const passedProps = {
        ...props,
        pageProps: {
            ...props.pageProps,
            ...i18n,
        },
        router: locale ? { locale } : props.router,
    } as unknown as ComponentProps<typeof I18nextAdapter>;
    return <I18nextAdapter {...passedProps} />;
};

const DataLayer = ({ children, pageProps }: any) => {
    return (
        <CacheProvider>
            <ChakraProvider>
                <I18nProvider {...pageProps}>
                    {children}
                    <ReactQueryDevtools initialIsOpen={false} />
                </I18nProvider>
            </ChakraProvider>
        </CacheProvider>
    );
};

export const Providers = trpc.withTRPC(DataLayer);