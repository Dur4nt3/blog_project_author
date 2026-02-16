import { useLoaderData, useParams } from 'react-router';

import ArticleData from '../../utilities/classes/ArticleData';

import EditArticleHeader from './EditArticleHeader';
import EditArticleMain from './EditArticleMain';
import CreationPageError from '../new/CreationPageError';
import ArticleForm from '../new/ArticleForm';
import CreateArticleFooter from '../new/CreateArticleFooter';

export default function EditArticle() {
    const params = useParams();
    const response = useLoaderData();

    const authorUsername = response?.username;
    const authorName = response?.name;
    const post = response?.post;

    if (
        authorUsername === undefined ||
        authorName === undefined ||
        post === undefined
    ) {
        return (
            <EditArticleMain>
                <CreationPageError response={response} />
            </EditArticleMain>
        );
    }

    const article = new ArticleData(
        post.title,
        post.description,
        post.content,
        post.createdAt,
        post.lastModification
    );

    return (
        <>
            <EditArticleHeader />
            <EditArticleMain>
                <ArticleForm
                    actionRoute={`/edit/${params.postId}`}
                    method='PUT'
                    classBase='edit-article'
                    authorName={authorName}
                    articleData={article}
                />
            </EditArticleMain>
            <CreateArticleFooter />
        </>
    );
}
