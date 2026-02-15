import { Modal } from '@mantine/core';

import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router';

import FormLoader from './FormLoader';

const modalClasses = {
    content: 'deletion-modal-content',
    header: 'deletion-modal-header',
    title: 'deletion-modal-title',
    close: 'deletion-modal-close-button',
};

export default function DeletionModal({ postId, resourceName, opened, close }) {
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
                closeButtonProps={{ 'aria-label': 'cancel deletion' }}
                opened={opened}
                onClose={() => {
                    setError(false);
                    close();
                }}
                title='Delete Article'
                classNames={modalClasses}
            >
                <p
                    className={
                        error === true
                            ? 'deletion-modal-deleted-resource error-occurred'
                            : 'deletion-modal-deleted-resource'
                    }
                >
                    {error === true
                        ? 'An error occurred whilst processing your request'
                        : `Delete: ${resourceName}?`}
                </p>

                <div className='deletion-modal-actions'>
                    <fetcher.Form method='DELETE' action={`/delete/${postId}`}>
                        <button
                            tabIndex={error === true ? -1 : 0}
                            className={
                                error === true
                                    ? 'deletion-modal-delete-button error-occurred'
                                    : 'deletion-modal-delete-button'
                            }
                            type={error === true ? 'button' : 'submit'}
                        >
                            {fetcher.state === 'idle' ? (
                                'Delete'
                            ) : (
                                <FormLoader />
                            )}
                        </button>
                    </fetcher.Form>

                    <button
                        className='deletion-modal-cancel-button'
                        onClick={() => {
                            setError(false);
                            close();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </>
    );
}
