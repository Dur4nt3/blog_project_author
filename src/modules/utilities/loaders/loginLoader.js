import { redirect } from 'react-router';

export default async function loginLoader() {
    const serverUrl = `${import.meta.env.VITE_API_URL}/auth/token`;
    const response = await fetch(serverUrl, {
        method: 'GET',
        credentials: 'include',
    });
    
    const json = await response.json();

    if (response.status === 200 && json.success === true) {
        return redirect('/');
    }
}
