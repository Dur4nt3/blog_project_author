import ArticleError from '../classes/ArticleError';
import { formatArticleFormError } from '../formatFormLevelError';

function validateArticleIdentifiers(
    fieldValue,
    fieldName,
    minLength,
    maxLength
) {
    if (fieldValue === undefined) {
        return `${fieldName} must not be empty`;
    }

    const trimmedValue = fieldValue.trim();

    if (trimmedValue === '') {
        return `${fieldName} must not be empty`;
    }

    if (trimmedValue.length < minLength || trimmedValue.length > maxLength) {
        // eslint-disable-next-line @stylistic/max-len
        return `${fieldName} must be between ${minLength} and ${maxLength} characters`;
    }

    const regex = /^[A-Za-z0-9.,:;?!\-"() ]+$/;

    if (!regex.test(trimmedValue)) {
        const failingChar = trimmedValue.match(/[^A-Za-z0-9.,:;?!\-"() ]/);

        // eslint-disable-next-line @stylistic/max-len
        return `${fieldName} must only includes letters, numbers, spaces and basic punctuation only (${JSON.stringify(failingChar[0])} disallowed)`;
    }

    return null;
}

function validateBody(body) {
    if (body === undefined) {
        return 'Body must not be empty';
    }

    const trimmedValue = body.trim();

    if (trimmedValue === '') {
        return 'Body must not be empty';
    }

    if (trimmedValue.length < 500 || trimmedValue.length > 10000) {
        return 'Body must be between 500 and 10000 characters';
    }

    return null;
}

// Gets article form data
// Returns null if data is valid (no errors)
// Returns an instance of "ArticleError" if it isn't
export default function validateArticle(jsonData) {
    const titleError = validateArticleIdentifiers(
        jsonData.title,
        'Title',
        10,
        70
    );
    const descriptionError = validateArticleIdentifiers(
        jsonData.description,
        'Description',
        100,
        300
    );
    const bodyError = validateBody(jsonData.body);

    if (!titleError && !descriptionError && !bodyError) {
        return null;
    }

    return new ArticleError(
        formatArticleFormError(
            titleError !== null ? 'Title' : null,
            descriptionError !== null ? 'Excerpt/Summary' : null,
            bodyError !== null ? 'Body' : null
        ),
        titleError,
        descriptionError,
        bodyError
    );
}
