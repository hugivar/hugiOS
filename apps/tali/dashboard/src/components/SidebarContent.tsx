import {
    Box
} from '@chakra-ui/react';

const SidebarContent = ({ children, ...rest }: any) => {
    return (
        <Box
            id="sidebar-content"
            pos="sticky"
            overflowY="auto"
            h="100vh"
            {...rest}>
            {children}
        </Box>
    );
};

export default SidebarContent;