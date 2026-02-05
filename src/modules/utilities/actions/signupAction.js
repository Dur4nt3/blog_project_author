export default async function signupAction({ request }) {
    const data = await request.formData();
    const jsonData = Object.fromEntries(data);

    const serverUrl = `${import.meta.env.VITE_API_URL}/users`;

    const response = await fetch(serverUrl, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(jsonData),
    });

    const results = await response.json();

    console.log(results);

    await new Promise((resolve) => {
        setTimeout(() => resolve('done'), 2000);
    });
}
