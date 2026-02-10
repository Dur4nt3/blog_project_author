import { Modal } from '@mantine/core';

import { useFetcher } from 'react-router';

const modalClasses = {
    content: 'deletion-modal-content',
    header: 'deletion-modal-header',
    title: 'deletion-modal-title',
    close: 'deletion-modal-close-button',
};

export default function DeletionModal({ postId, resourceName, opened, close }) {
    // eslint-disable-next-line no-unused-vars
    const fetcher = useFetcher();

    return (
        <>
            <Modal
                closeButtonProps={{ 'aria-label': 'cancel deletion' }}
                opened={opened}
                onClose={close}
                title='Delete Article'
                classNames={modalClasses}
            >
                <p className='deletion-modal-deleted-resource'>
                    Delete: {resourceName}?
                </p>

                <div className="deletion-modal-actions">
                    <fetcher.Form method='DELETE' action={`/delete/${postId}`}>
                        <button className='deletion-modal-delete-button' type='submit' onClick={close}>Delete</button>
                    </fetcher.Form>

                    <button className='deletion-modal-cancel-button' onClick={close}>Cancel</button>
                </div>
            </Modal>
        </>
    );
}
