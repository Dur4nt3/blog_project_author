import { useLoaderData } from 'react-router';

import DashboardHeader from './DashboardHeader';
import DashboardMain from './DashboardMain';
import DashboardFooter from './DashboardFooter';

import DashboardError from './DashboardError';
import DashboardEmpty from './DashboardEmpty';
import DashboardPopulated from './DashboardPopulated';

function getMainContents(response, posts) {
    if (posts === null || posts === undefined) {
        return <DashboardError statusCode={response} />;
    }

    if (posts.length === 0) {
        return <DashboardEmpty />;
    }

    return <DashboardPopulated posts={posts} />;
}

export default function Root() {
    const response = useLoaderData();

    const posts =
        typeof response === 'object' && response !== null
            ? response.posts
            : undefined;
    const author =
        typeof response === 'object' && response !== null
            ? response.author
            : undefined;

    return (
        <>
            {posts !== undefined && author !== undefined && <DashboardHeader />}
            <DashboardMain>{getMainContents(response, posts)}</DashboardMain>
            {posts !== undefined && author !== undefined && (
                <DashboardFooter name={author.name} />
            )}
        </>
    );
}
