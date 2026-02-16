import { Modal } from '@mantine/core';
import Markdown from 'react-markdown';
import { formatWithNamedMonth } from '../formatDate';

const modalClasses = {
    content: 'article-modal-content',
    header: 'article-modal-header',
    title: 'article-modal-title',
    close: 'article-modal-close-button',
    body: 'article-modal-body',
};

export default function PreviewArticleModal({
    article,
    authorName,
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
                <h2 className='article-modal-article-title'>{article.title}</h2>
                <h3 className='article-modal-article-description'>
                    {article.description}
                </h3>
                <h4 className='article-modal-article-author'>
                    By {authorName} @{' '}
                    {formatWithNamedMonth(
                        article.createdAt !== undefined
                            ? article.createdAt
                            : new Date().toISOString()
                    )}
                </h4>
                <div className='article-modal-markdown-content'>
                    <Markdown
                        components={{
                            br: () => <span className='md-break'></span>,
                        }}
                    >
                        {article.body}
                    </Markdown>
                </div>
                {article.lastModification !== undefined && (
                    <p className='article-modal-latest-edit'>
                        Latest edit @{' '}
                        {formatWithNamedMonth(article.lastModification)}
                    </p>
                )}
                <button type='button' onClick={close}>
                    End Preview
                </button>
            </Modal>
        </>
    );
}
