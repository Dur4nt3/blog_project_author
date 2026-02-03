import { redirect } from 'react-router';
import validateSignup from '../validation/validateSignup';
import SignupError from '../classes/SignupError';

function getErrorsObject(errors) {
    const errorsObject = {};
    for (const error of errors) {
        errorsObject[error.path] = error.msg;
    }

    return errorsObject;
}

function formatSignupResults(results, status) {
    if (results.success === true) {
        return true;
    }

    const serverError = new SignupError(
        'Could not process your request, try again later.',
        null,
        null,
        null,
        null,
        null
    );

    // success isn't true but there are no errors?
    // most likely a server-side error
    if (results.errors === undefined || status === 500) {
        return serverError;
    }

    const errorsObject = getErrorsObject(results.errors);

    if (errorsObject.role !== undefined && errorsObject.role.includes('Could not validate')) {
        return serverError;
    }

    return new SignupError(
        'Please fix the below errors.',
        errorsObject.username,
        errorsObject.name,
        errorsObject.password,
        errorsObject.cpassword,
        errorsObject.role
    );
}

export default async function signupAction({ request }) {
    const data = await request.formData();
    const jsonData = Object.fromEntries(data);

    const clientValidation = validateSignup(jsonData);
    if (clientValidation !== null) {
        return { errors: clientValidation };
    }

    // Add the author role
    jsonData.role = 'author';

    const serverUrl = `${import.meta.env.VITE_API_URL}/users`;

    const response = await fetch(serverUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    });

    const results = await response.json();

    const formattedResults = formatSignupResults(results, response.status);

    if (formattedResults === true) {
        return redirect('/login');
    }

    return { errors: formattedResults };
}
