import { redirect } from 'react-router';
import requireAuthorAccess from '../auth/requireAuthorAccess';

export default async function newLoader() {
    const user = await requireAuthorAccess();

    if (typeof user !== 'object') {
        if (user === 401) {
            return redirect('/login');
        }

        return user;
    }

    return { username: user.username, name: user.name };
}
