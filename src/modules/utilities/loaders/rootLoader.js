import { redirect } from 'react-router';
import getCSRFToken from '../auth/getCSRFToken';

export default async function rootLoader() {
    const serverUrl = `${import.meta.env.VITE_API_URL}/posts/me`;
    const response = await fetch(serverUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'X-CSRF-Token': getCSRFToken(),
        },
    }).catch(() => 502);

    // Fetch failed
    // Shows the most likely error to occur
    if (response === 502) {
        return 502;
    }

    if (response.status === 401) {
        return redirect('/login');
    }

    const jsonData = await response.json();

    if (jsonData.success === false) {
        return response.status;
    }

    return { posts: jsonData.posts, author: jsonData.author };
}
