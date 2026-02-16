import { Modal } from '@mantine/core';

import { useEffect, useState } from 'react';
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
    const [error, setError] = useState(false);

    useEffect(() => {
        const success = fetcher.data?.success;

        if (success === undefined) {
            return;
        }

        if (success === true) {
            close();
            return;
        }

        if (success === false) {
            setError(true);
        }
    }, [fetcher.data, close]);

    return (
        <>
            <Modal
                closeButtonProps={{ 'aria-label': 'cancel logout' }}
                opened={opened}
                onClose={() => {
                    setError(false);
                    close();
                }}
                title='Logout'
                classNames={modalClasses}
            >
                <p
                    className={
                        error === true
                            ? 'logout-modal-notice error-occurred'
                            : 'logout-modal-notice'
                    }
                >
                    {error === true
                        ? 'An error occurred whilst processing your request'
                        : 'End your session?'}
                </p>

                <div className='logout-modal-actions'>
                    <fetcher.Form method='DELETE' action={'/logout'}>
                        <button
                            tabIndex={error === true ? -1 : 0}
                            className={
                                error === true
                                    ? 'logout-modal-logout-button error-occurred'
                                    : 'logout-modal-logout-button'
                            }
                            type={error === true ? 'button' : 'submit'}
                        >
                            {fetcher.state === 'idle' ? (
                                'Logout'
                            ) : (
                                <FormLoader />
                            )}
                        </button>
                    </fetcher.Form>
                </div>
            </Modal>
        </>
    );
}
