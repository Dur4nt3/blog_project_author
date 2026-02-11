import { Modal } from '@mantine/core';

import { useEffect } from 'react';
import { useFetcher } from 'react-router';

import FormLoader from './FormLoader';

const modalClasses = {
    content: 'logout-modal-content',
    header: 'logout-modal-header',
    title: 'logout-modal-title',
    close: 'logout-modal-close-button',
};

export default function LogoutModal({ opened, close }) {
    const fetcher = useFetcher();

    useEffect(() => {
        if (fetcher.data?.success !== undefined) {
            close();
        }
    }, [fetcher.data, close]);

    return (
        <>
            <Modal
                closeButtonProps={{ 'aria-label': 'cancel logout' }}
                opened={opened}
                onClose={close}
                title='Logout'
                classNames={modalClasses}
            >
                <p className='logout-modal-notice'>End your session?</p>

                <div className='logout-modal-actions'>
                    <fetcher.Form method='DELETE' action={'/logout'}>
                        <button
                            className='logout-modal-logout-button'
                            type='submit'
                        >
                            {fetcher.state === 'idle' ? 'Logout' : <FormLoader />}
                        </button>
                    </fetcher.Form>
                </div>
            </Modal>
        </>
    );
}
