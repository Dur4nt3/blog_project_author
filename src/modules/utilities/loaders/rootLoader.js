import { redirect } from 'react-router';

export default async function rootLoader() {
    const serverUrl = `${import.meta.env.VITE_API_URL}/posts/me`;
    const posts = await fetch(serverUrl, {
        method: 'GET',
        credentials: 'include',
    });
    
    if (posts.status !== 200) {
        return redirect('/login');
    }
    
    const postsJson = await posts.json();

    return postsJson;
}
