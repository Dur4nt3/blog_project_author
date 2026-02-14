import { redirect } from 'react-router';
import ArticleError from '../classes/ArticleError';
import validateArticle from '../validation/validateArticle';
import getErrorsObject from '../validation/getErrorsObject';

function formatCreateArticleResults(results, status) {
    if (results.success === true) {
        return true;
    }

    const serverError = new ArticleError(
        'Could not process your request, try again later.',
        null,
        null,
        null
    );

    // success isn't true but there are no errors?
    // this can mean either: 401, 403, or 500
    // in the case of 401 and 403, suspect tempering by the user
    // return 500 anyways
    if (results.errors === undefined || status === 500) {
        return serverError;
    }

    const errorsObject = getErrorsObject(results.errors);

    if (
        errorsObject.role !== undefined &&
        errorsObject.role.includes('Could not validate')
    ) {
        return serverError;
    }

    return new ArticleError(
        'Please fix the below errors.',
        errorsObject.title,
        errorsObject.description,
        errorsObject.body
    );
}

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

    const formattedResults = formatCreateArticleResults(
        results,
        response.status
    );

    if (formattedResults === true) {
        return redirect('/');
    }

    return { errors: formattedResults };
}
