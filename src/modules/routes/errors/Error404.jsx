import { Link } from 'react-router';

import './stylesheets/Error404.css';

export default function Error404() {
    return (
        <div className='error-404-cont'>
            <h1 className='error-code'>404</h1>
            <h2 className='error-header'>Not Found</h2>
            <p className='error-content'>
                The request page was not found.
            </p>
            <p className="error-content">
                Return&nbsp;<Link to='/'>Home</Link>
            </p>
        </div>
    );
}
