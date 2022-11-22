import { extendTheme } from '@chakra-ui/react';

const colors = {
    brand: {
        900: '#1a365d',
        800: '#153e75',
        700: '#2a69ac',
    },
}

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const components = {
    Text: {
        sizes: {
            xl: {
                fontSize: 'xl',
                lineHeight: '8'
            },
        },
    }
};

const theme = extendTheme({ config, colors, components })

export default theme;