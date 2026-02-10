import { redirect } from 'react-router';

export default async function rootLoader() {
    const serverUrl = `${import.meta.env.VITE_API_URL}/posts/me`;
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

    const mockPosts = [
        {
            postId: 1,
            title: 'Designing Accessible Forms in React',
            createdAt: '2026-02-10T10:32:18.123Z',
        },
        {
            postId: 2,
            title: 'Designing Accessible Forms in React',
            createdAt: '2026-01-25T07:45:18.123Z',
        },
    ];

    return { posts: mockPosts, author: jsonData.author };
}
