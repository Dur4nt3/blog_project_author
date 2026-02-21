import getCSRFToken from '../auth/getCSRFToken';

export default async function logoutAction() {
    const serverUrl = `${import.meta.env.VITE_API_URL}/auth/token`;
    const response = await fetch(serverUrl, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'X-CSRF-Token': getCSRFToken(),
        },
    });

    const jsonData = await response.json();

    return jsonData;
}
