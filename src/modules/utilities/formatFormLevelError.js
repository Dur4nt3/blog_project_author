// Arguments are to be null or the field's name
// null indicates no error
// field name indicates an error
export function formatArticleFormError(...errors) {
    const invalidFields = [];
    errors.forEach((error) => {
        if (error !== null) {
            invalidFields.push(error);
        }
    });

    let errorString = invalidFields.join(', ');
    errorString = `Please correct: ${errorString}.`;

    return errorString;
}
