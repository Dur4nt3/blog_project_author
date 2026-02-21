import { redirect } from 'react-router';
import getCSRFToken from '../auth/getCSRFToken';
import validateArticle from '../validation/validateArticle';
import formatArticleResults from '../formatArticleResults';

export default async function newAction({ request }) {
    const data = await request.formData();
    const jsonData = Object.fromEntries(data);

    const clientValidation = validateArticle(jsonData);
    if (clientValidation !== null) {
        return { errors: clientValidation };
    }

    const serverUrl = `${import.meta.env.VITE_API_URL}/posts`;

    const response = await fetch(serverUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': getCSRFToken(),
        },
        body: JSON.stringify(jsonData),
    });

    const results = await response.json();

    const formattedResults = formatArticleResults(
        results,
        response.status
    );

    if (formattedResults === true) {
        return redirect('/');
    }

    return { errors: formattedResults };
}
