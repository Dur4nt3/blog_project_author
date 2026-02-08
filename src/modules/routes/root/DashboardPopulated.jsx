import { Link } from 'react-router';

import { useDisclosure } from '@mantine/hooks';
import DeletionModal from '../../utilities/miscUI/DeletionModal';

import { formatWithNamedMonth } from '../../utilities/formatDate';

function ArticleCard({ postId, title, createdAt }) {
    const [opened, { open, close }] = useDisclosure(false);

    const publishDate = formatWithNamedMonth(createdAt);
    const publishInfo =
        publishDate !== null
            ? `Published on ${publishDate}`
            : 'Publish date unknown';

    return (
        <div className='article-card'>
            <DeletionModal
                postId={postId}
                resourceName={title}
                opened={opened}
                close={close}
            />

            <div className="article-info">
                <h2 className='article-title'>{title}</h2>
                <h3 className='article-date'>{publishInfo}</h3>
            </div>

            <div className='article-actions'>
                <Link
                    className='view-article'
                    to={`${import.meta.env.VITE_READER_APP}/articles/${postId}`}
                >
                    View
                </Link>
                <Link className='edit-article' to={`/edit/${postId}`}>
                    Edit
                </Link>
                <button className='delete-article' type='button' onClick={open}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default function DashboardPopulated({ posts }) {
    return (
        <div className='dashboard-all-articles'>
            <div className='new-article-cont'>
                <div></div>
                <Link to='/new'>New Article</Link>
                <div></div>
            </div>

            <div className='all-article-cards'>
                {posts.map((post) => (
                    <ArticleCard
                        postId={post.postId}
                        title={post.title}
                        createdAt={post.createdAt}
                        key={post.postId}
                    />
                ))}
            </div>
        </div>
    );
}
