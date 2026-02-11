import { useLoaderData } from 'react-router';

import CreateArticleMain from './CreateArticleMain';
import CreationPageError from './CreationPageError';

export default function CreateArticle() {
    const response = useLoaderData();

    if (response !== true) {
        return <CreateArticleMain>
            <CreationPageError response={response} />
        </CreateArticleMain>
    }

    return <h1>Create</h1>
}
