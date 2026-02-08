import { useLoaderData } from 'react-router';

import DashboardHeader from './DashboardHeader';
import DashboardMain from './DashboardMain';
import DashboardFooter from './DashboardFooter';

import DashboardError from './DashboardError';
import DashboardEmpty from './DashboardEmpty';
import DashboardPopulated from './DashboardPopulated';

function getMainContents(posts) {
    if (posts === null || posts === undefined || typeof posts === 'number') {
        return <DashboardError statusCode={posts} />;
    }

    if (posts.length === 0) {
        return <DashboardEmpty />;
    }

    return <DashboardPopulated posts={posts} />;
}

export default function Root() {
    const { posts, author } = useLoaderData();

    console.log(posts, author);

    return (
        <>
            <DashboardHeader />
            <DashboardMain>{getMainContents(posts)}</DashboardMain>
            <DashboardFooter name={author !== undefined ? author.name : null} />
        </>
    );
}
