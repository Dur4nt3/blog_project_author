import { useLoaderData } from 'react-router';

import DashboardHeader from './DashboardHeader';
import DashboardMain from './DashboardMain';
import DashboardFooter from './DashboardFooter';

import DashboardError from './DashboardError';
import DashboardEmpty from './DashboardEmpty';
import DashboardPopulated from './DashboardPopulated';

function getMainContents(response, posts) {
    if (posts === undefined) {
        return <DashboardError statusCode={response} />;
    }

    if (posts.length === 0) {
        return <DashboardEmpty />;
    }

    return <DashboardPopulated posts={posts} />;
}

export default function Root() {
    const response = useLoaderData();

    const posts = response?.posts;
    const author = response?.author;

    if (posts === undefined || author === undefined) {
        return (
            <DashboardMain>{getMainContents(response, posts)}</DashboardMain>
        );
    }

    return (
        <>
            <DashboardHeader />
            <DashboardMain>{getMainContents(response, posts)}</DashboardMain>
            <DashboardFooter name={author.name} />
        </>
    );
}
