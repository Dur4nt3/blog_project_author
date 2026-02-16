import { redirect } from 'react-router';
import requireAuthorAccess from '../auth/requireAuthorAccess';

export default async function editLoader({ params }) {
    const user = await requireAuthorAccess();

    if (typeof user !== 'object') {
        if (user === 401) {
            return redirect('/login');
        }

        return user;
    }

    const serverUrl = `${import.meta.env.VITE_API_URL}/posts/${params?.postId}`;
    const response = await fetch(serverUrl, {
        method: 'GET',
        credentials: 'include',
    });

    const jsonData = await response.json();

    if (jsonData.success === false) {
        return response.status;
    }

    return {
        username: user.username,
        name: user.name,
        post: jsonData.post,
    };
}
