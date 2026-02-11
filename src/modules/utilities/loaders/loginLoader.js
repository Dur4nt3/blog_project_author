import { redirect } from 'react-router';

export default async function loginLoader() {
    const serverUrl = `${import.meta.env.VITE_API_URL}/users/me/permissions`;
    const response = await fetch(serverUrl, {
        method: 'GET',
        credentials: 'include',
    });

    const jsonData = await response.json();

    if (jsonData.success === false) {
        return response.status;
    }

    if (
        jsonData.permissions !== undefined &&
        jsonData.permissions.authorAccess === true
    ) {
        return redirect('/');
    }

    return false;
}
