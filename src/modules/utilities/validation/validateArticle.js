import ArticleError from '../classes/ArticleError';

function validateTitle(title) {
    if (title === undefined) {
        return 'Title must not be empty';
    }

    const trimmedValue = title.trim();

    if (trimmedValue === '') {
        return 'Title must not be empty';
    }

    if (trimmedValue.length < 10 || trimmedValue.length > 70) {
        return 'Title must be between 10 and 70 characters';
    }

    const regex = /^[A-Za-z0-9.,:;?!\-"() ]+$/;

    if (!regex.test(trimmedValue)) {
        const failingChar = trimmedValue.match(/[^A-Za-z0-9.,:;?!\-"() ]/);

        // eslint-disable-next-line @stylistic/max-len
        return `Title must only includes letters, numbers, spaces and basic punctuation only (${JSON.stringify(failingChar[0])} disallowed)`;
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
    const titleValid = validateTitle(jsonData.title);
    const bodyValid = validateBody(jsonData.body);

    const errorsPresent = [titleValid, bodyValid].some(
        (field) => field !== null
    );

    if (errorsPresent) {
        return new ArticleError(
            'Please fix the below errors.',
            titleValid,
            bodyValid
        );
    }

    return null;
}
