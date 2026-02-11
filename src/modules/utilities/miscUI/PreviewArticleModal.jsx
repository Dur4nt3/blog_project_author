import { Modal } from '@mantine/core';
import Markdown from 'react-markdown';

const modalClasses = {
    content: 'article-modal-content',
    header: 'article-modal-header',
    title: 'article-modal-title',
    close: 'article-modal-close-button',
    body: 'article-modal-body',
};

export default function PreviewArticleModal({
    title,
    description,
    body,
    name,
    opened,
    close,
}) {
    return (
        <>
            <Modal
                closeButtonProps={{ 'aria-label': 'exit preview' }}
                opened={opened}
                onClose={close}
                fullScreen
                title='Article Preview'
                classNames={modalClasses}
                radius={0}
                transitionProps={{ transition: 'fade', duration: 200 }}
            >
                <h2 className='article-modal-article-title'>{title}</h2>
                <h3 className='article-modal-article-description'>
                    {description}
                </h3>
                <h4 className='article-modal-article-author'>
                    By {name}
                </h4>
                <div className='article-modal-markdown-content'>
                    <Markdown
                        components={{
                            br: () => <span className='md-break'></span>,
                        }}
                    >
                        {body}
                    </Markdown>
                </div>
                <button type='button' onClick={close}>
                    End Preview
                </button>
            </Modal>
        </>
    );
}
