import { useLoaderData } from 'react-router';

import CreateArticleHeader from './CreateArticleHeader';
import CreateArticleMain from './CreateArticleMain';
import CreationPageError from './CreationPageError';
import CreateArticleForm from './CreateArticleForm';
import CreateArticleFooter from './CreateArticleFooter';

export default function CreateArticle() {
    const response = useLoaderData();

    const authorUsername = response?.username;
    const authorName = response?.name;

    if (authorUsername === undefined || authorName === undefined) {
        return (
            <CreateArticleMain>
                <CreationPageError response={response} />
            </CreateArticleMain>
        );
    }

    return (
        <>
            <CreateArticleHeader />
            <CreateArticleMain>
                <CreateArticleForm name={authorName} />
            </CreateArticleMain>
            <CreateArticleFooter />
        </>
    );
}
