import { useLoaderData } from 'react-router';

import CreateArticleHeader from './CreateArticleHeader';
import CreateArticleMain from './CreateArticleMain';
import CreationPageError from './CreationPageError';
import CreateArticleForm from './CreateArticleForm';
import CreateArticleFooter from './CreateArticleFooter';

export default function CreateArticle() {
    const response = useLoaderData();

    if (response !== true) {
        return <CreateArticleMain>
            <CreationPageError response={response} />
        </CreateArticleMain>
    }

    return <>
        <CreateArticleHeader />
        <CreateArticleMain>
            <p>placeholder</p>
        </CreateArticleMain>
        <CreateArticleFooter />
    </>
}
