import { redirect } from 'react-router';
import validateSignup from '../validation/validateSignup';
import SignupError from '../classes/SignupError';

function formatResults(results) {
    if (results.success === true) {
        return true;
    }
}

export default async function signupAction({ request }) {
    const data = await request.formData();
    const jsonData = Object.fromEntries(data);

    const clientValidation = validateSignup(jsonData);
    if (clientValidation !== null) {
        console.log(clientValidation);
        return clientValidation;
    }

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

    const formattedResults = formatResults(results);

    if (formattedResults === true) {
        redirect('/login');
    }
}
