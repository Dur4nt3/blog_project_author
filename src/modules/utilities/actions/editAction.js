import { redirect } from 'react-router';
import validateArticle from '../validation/validateArticle';
import formatArticleResults from '../formatArticleResults';

export default async function editAction({ request, params }) {
    const data = await request.formData();
    const jsonData = Object.fromEntries(data);

    const clientValidation = validateArticle(jsonData);
    if (clientValidation !== null) {
        return { errors: clientValidation };
    }

    const { postId } = params;

    const serverUrl = `${import.meta.env.VITE_API_URL}/posts/${postId}`;

    const response = await fetch(serverUrl, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    });

    const results = await response.json();

    const formattedResults = formatArticleResults(results, response.status);

    if (formattedResults === true) {
        return redirect('/');
    }

    return { errors: formattedResults };
}
