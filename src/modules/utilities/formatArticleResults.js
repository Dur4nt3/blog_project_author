import ArticleError from './classes/ArticleError';
import getErrorsObject from './validation/getErrorsObject';
import { formatArticleFormError } from './formatFormLevelError';

export default function formatArticleResults(results, status) {
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
        formatArticleFormError(
            errorsObject.title !== undefined ? 'Title' : null,
            errorsObject.description !== undefined ? 'Excerpt/Summary' : null,
            errorsObject.body !== undefined ? 'Body' : null
        ),
        errorsObject.title,
        errorsObject.description,
        errorsObject.body
    );
}
