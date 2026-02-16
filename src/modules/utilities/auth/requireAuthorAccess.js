import authorizationCheck from './authorizationCheck';

export default async function requireAuthorAccess() {
    const response = await authorizationCheck();

    if (response.status === 502) {
        return 502;
    }

    if (!response.ok) {
        return response.status;
    }

    const jsonData = await response.json();

    if (jsonData.success === false) {
        return response.status;
    }

    if (jsonData?.permissions?.authorAccess === true) {
        return {
            username: jsonData?.user?.username,
            name: jsonData?.user?.name,
        };
    }

    return 403;
}
