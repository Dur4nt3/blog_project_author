import { redirect } from 'react-router';

export default async function newLoader() {
    const serverUrl = `${import.meta.env.VITE_API_URL}/users/me/permissions`;
    const response = await fetch(serverUrl, {
        method: 'GET',
        credentials: 'include',
    });

    if (response.status === 401) {
        return redirect('/login');
    }

    const jsonData = await response.json();

    if (jsonData.success === false) {
        return response.status;
    }

    if (jsonData.permissions !== undefined) {
        if (jsonData.permissions.authorAccess === true) {
            return true;
        }

        return 403;
    }

    return false;
}
