import { useDisclosure } from '@mantine/hooks';

import LogoutModal from '../../utilities/miscUI/LogoutModal';

import './stylesheets/DashboardFooter.css';

export default function DashboardFooter({ name }) {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <footer className='dashboard-footer'>
            <LogoutModal opened={opened} close={close} />

            <p>@ {typeof name === 'string' ? name : 'Unknown'}</p>
            <button type='button' onClick={open}>
                Logout
            </button>
        </footer>
    );
}
