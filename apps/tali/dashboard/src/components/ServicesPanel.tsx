import Image from 'next/image'
import { IconButton } from '@chakra-ui/react'
import useServiceStore from '../hooks/useServiceStore';

import todoistLogo from '../../public/images/todoist.png'
import linearLogo from '../../public/images/linear.png'


const ServicesPanel = () => {
    const { service, setService } = useServiceStore();

    return (
        <div>
            <IconButton
                isActive={service === "todoist"}
                aria-label='Todoist Service'
                icon={<Image src={todoistLogo} alt="todoist" width={30} />}
                onClick={() => setService('todoist')}
            />
            <IconButton
                isActive={service === "linear"}
                aria-label='Linear Service'
                icon={<Image src={linearLogo} alt="linear" width={30} />}
                onClick={() => setService('linear')}
            />
        </div>
    );
};

export default ServicesPanel;