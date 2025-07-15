import { Box, Button, Text, VStack, StackDivider, Card, CardBody } from '@chakra-ui/react';
import { useRouter } from 'next/navigation'
import useServiceStore from '../hooks/useServiceStore';
import { TodoistApi } from '@doist/todoist-api-typescript'
import { LinearClient } from '@linear/sdk'
import refresh from '../../public/images/refresh.svg';
import Image from 'next/image';
import SidebarContent from './SidebarContent';

const addService = (service: string, router: any) => {
    if (service === 'todoist') {
        router.push('https://todoist.com/oauth/authorize?client_id=0ac0076a7b1044299c3b00cde86f5844&scope=data:read,data:delete&state=1223412412');
    }
    if (service === 'linear') {
        router.push('https://linear.app/oauth/authorize?client_id=df129d1361fe2df84303be8139d2497a&scope=read,write&redirect_uri=https://tali.so/api/linear-redirect&state=1223412412&response_type=code&prompt=consent&actor=user')
    }
};

const refreshService = async (service: string, callback: (items: any[]) => void): Promise<void> => {
    if (service === 'todoist') {
        const token = localStorage.getItem('todoistAccessToken') || "";
        const api = new TodoistApi(token);

        api.getTasks()
            .then((items) => {
                callback(items);
            })
            .catch((error) => console.log(error))
    }
    if (service === 'linear') {
        const token = localStorage.getItem('linearAccessToken') || "";;
        const client = new LinearClient({
            accessToken: token
        });

        const me = await client.viewer;
        const myIssues = await me.assignedIssues();

        if (myIssues.nodes.length) {
            callback(myIssues.nodes);
        } else {
            console.log(`${me.displayName} has no issues`);
        }

    }
}

const TaskList = () => {
    const router = useRouter()
    const { service, serviceData, setServiceData } = useServiceStore();

    const handleRefresh = (items: any) => {
        setServiceData('todoist', items);
    };

    // const token = service === 'todoist'
    //     ? window?.localStorage?.getItem('todoistAccessToken')
    //     : service === 'linear'
    //         ? window?.localStorage?.getItem('linearAccessToken')
    //         : null;
    const token = null;

    const { tasks } = serviceData.find((data: any) => data.service === service)

    return (
        <SidebarContent>
            {!token ? <Button onClick={() => addService(service, router)}>Add {service}</Button> : null}
            <Button colorScheme='teal' size='xs' onClick={() => refreshService(service, handleRefresh)}>
                <Image src={refresh} alt="refresh" width="14" />
                <Box m={2}><Text>Refresh</Text></Box>
            </Button>

            <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch'
            >
                {tasks.map((item: any) => (
                    <Card key={item.id} size="sm">
                        <CardBody>
                            <Text>{item.content}</Text>
                        </CardBody>
                    </Card>
                ))}
            </VStack>
        </SidebarContent>
    );
};

export default TaskList;