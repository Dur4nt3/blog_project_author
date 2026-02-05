import './stylesheets/Signup.css';

import { useFetcher, Link } from 'react-router';

import FormLoader from '../../utilities/miscUI/FormLoader';
import HelpPopover from '../../utilities/miscUI/HelpPopover';

function SignupPopoverContent() {
    return (
        <>
            <span>
                A special key required in order to create an author account, if
                you don't have this key signup&nbsp;
            </span>
            <a href={`${import.meta.env.VITE_READER_APP}/signup`} className='signup-popover-link'>here</a>
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

            <div className='form-row'>
                <label htmlFor='username'>Username</label>
                <input type='text' name='username' id='username' />
            </div>

            <div className='form-row'>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' id='name' />
            </div>

            <div className='form-row'>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' id='password' />
            </div>

            <div className='form-row'>
                <label htmlFor='cpassword'>Confirm Password</label>
                <input type='cpassword' name='cpassword' id='cpassword' />
            </div>

            <div className='form-row'>
                <label htmlFor='key'>
                    Author Key{' '}
                    <HelpPopover content={<SignupPopoverContent />} />
                </label>
                <input type='text' name='key' id='key' />
            </div>

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
