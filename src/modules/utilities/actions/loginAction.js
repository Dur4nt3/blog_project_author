import { redirect } from 'react-router';
import setCSRFToken from '../auth/setCSRFToken';

function formatLoginResults(results, status) {
    if (results.success === true) {
        return true;
    }

    // If the action isn't successful
    // It should only be due to an authentication failure
    // Any other error is a server error
    if (results.success === undefined || status !== 401) {
        return 'Could not process your request, try again later.';
    }

    return 'Invalid username or password.';
}

export default async function loginAction({ request }) {
    const data = await request.formData();
    const jsonData = Object.fromEntries(data);

    const serverUrl = `${import.meta.env.VITE_API_URL}/auth/token`;

    const response = await fetch(serverUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    });

    const results = await response.json();

    const formattedResults = formatLoginResults(results, response.status);

    if (formattedResults === true) {
        setCSRFToken(results.csrfToken);
        return redirect('/');
    }

    return { errors: formattedResults };
}
