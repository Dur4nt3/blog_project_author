import getCSRFToken from '../auth/getCSRFToken';

export default async function deleteAction({ params }) {
    const serverUrl = `${import.meta.env.VITE_API_URL}/posts/${params.postId}`;

    const response = await fetch(serverUrl, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'X-CSRF-Token': getCSRFToken(),
        },
    });

    const results = await response.json();

    return results;
}
