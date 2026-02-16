export default async function authorizationCheck() {
    const serverUrl = `${import.meta.env.VITE_API_URL}/users/me/permissions`;
    const response = await fetch(serverUrl, {
        method: 'GET',
        credentials: 'include',
    }).catch(() => new Response(null, { status: 502 }));

    return response;
}
