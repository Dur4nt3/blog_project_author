import ArticleError from '../classes/ArticleError';

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
    const titleValid = validateArticleIdentifiers(
        jsonData.title,
        'Title',
        10,
        70
    );
    const descriptionValid = validateArticleIdentifiers(
        jsonData.description,
        'Description',
        100,
        300
    );
    const bodyValid = validateBody(jsonData.body);

    const errorsPresent = [titleValid, descriptionValid, bodyValid].some(
        (field) => field !== null
    );

    if (errorsPresent) {
        return new ArticleError(
            'Please fix the below errors.',
            titleValid,
            descriptionValid,
            bodyValid
        );
    }

    return null;
}
