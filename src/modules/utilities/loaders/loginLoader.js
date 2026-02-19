import { redirect } from 'react-router';
import requireAuthorAccess from '../auth/requireAuthorAccess';

export default async function loginLoader() {
    const user = await requireAuthorAccess();

    if (typeof user !== 'object') {
        return false;
    }

    return redirect('/');
}
