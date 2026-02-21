import { useFetcher, Link } from 'react-router';

import FormLevelError from './FormLevelError';
import FormRow from './FormRow';
import FormLoader from '../../utilities/miscUI/FormLoader';

export default function Login() {
    const fetcher = useFetcher();

    console.log('rendered login, fetcher is: ', fetcher);

    return (
        <fetcher.Form method='POST' className='author-form login-form'>
            <h1 className='form-heading'>Log in</h1>
            <p className='form-description'>
                Log in to manage and publish articles.
            </p>

            {fetcher.data?.errors !== undefined && (
                <FormLevelError errorText={fetcher.data.errors} />
            )}

            <FormRow
                labelContent='Username'
                inputType='text'
                fieldName='username'
                error={fetcher.data?.errors !== undefined ? true : undefined}
            />

            <FormRow
                labelContent='Password'
                inputType='password'
                fieldName='password'
                error={fetcher.data?.errors !== undefined ? true : undefined}
            />

            <button type='submit'>
                {fetcher.state === 'idle' ? 'Log in' : <FormLoader />}
            </button>

            <p className='signup-notice'>
                New here?&nbsp;
                <Link to='/signup'>Sign up</Link>
            </p>
        </fetcher.Form>
    );
}
