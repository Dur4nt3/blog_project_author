import './stylesheets/Signup.css';

import { useFetcher, Link } from 'react-router';

import FormRow from './FormRow';
import FormLoader from '../../utilities/miscUI/FormLoader';
import HelpPopover from '../../utilities/miscUI/HelpPopover';

function SignupPopoverContent() {
    return (
        <>
            <span>
                A special key required in order to create an author account, if
                you don't have this key signup&nbsp;
            </span>
            <a
                href={`${import.meta.env.VITE_READER_APP}/signup`}
                className='signup-popover-link'
            >
                here
            </a>
            <span>&nbsp;instead.</span>
        </>
    );
}

export default function Signup() {
    const fetcher = useFetcher();

    return (
        <fetcher.Form method='POST' className='author-form signup-form'>
            <h1 className='form-heading'>Sign Up</h1>
            <p className='form-description'>
                Create an author account to publish and manage articles.
            </p>

            <FormRow
                labelContent='Username'
                inputType='text'
                fieldName='username'
            />

            <FormRow labelContent='Name' inputType='text' fieldName='name' />

            <FormRow
                labelContent='Password'
                inputType='password'
                fieldName='password'
            />

            <FormRow
                labelContent='Confirm Password'
                inputType='password'
                fieldName='cpassword'
            />

            <FormRow
                labelContent={
                    <>
                        <span>Author Key</span>
                        <HelpPopover content={<SignupPopoverContent />} />
                    </>
                }
                inputType='text'
                fieldName='key'
            />

            <button type='submit'>
                {fetcher.state === 'idle' ? 'Create Account' : <FormLoader />}
            </button>

            <p className='login-notice'>
                Already have an account?&nbsp;
                <Link to='/login'>Log in</Link>
            </p>
        </fetcher.Form>
    );
}
