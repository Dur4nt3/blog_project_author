import { redirect } from 'react-router';
import ArticleError from '../classes/ArticleError';
import validateArticle from '../validation/validateArticle';

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
        },
        body: JSON.stringify(jsonData),
    });

    const results = await response.json();
    
    console.log('server response', results);
}
