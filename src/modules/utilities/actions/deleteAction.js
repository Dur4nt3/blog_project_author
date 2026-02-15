export default async function deleteAction({ params }) {
    const serverUrl = `${import.meta.env.VITE_API_URL}/posts/${params.postId}`;
    
    const response = await fetch(serverUrl, {
        method: 'DELETE',
        credentials: 'include',
    });

    const results = await response.json();

    return results;
}