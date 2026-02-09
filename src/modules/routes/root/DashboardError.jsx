import { Link } from 'react-router';

import shieldX from '../../../assets/media/icons/shield-x.svg';
import bug from '../../../assets/media/icons/bug.svg';

function getDashboardErrorContent(statusCode) {
    if (statusCode === undefined || statusCode === null) {
        return (
            <>
                <img src={bug}/>
                <h2 className='error-header'>Error</h2>
                <p className='error-content'>
                    An unexpected error occurred, please try again later.
                </p>
            </>
        );
    }

    if (statusCode === 403) {
        return (
            <>
                <img src={shieldX}/>
                <h2 className='error-header'>Forbidden</h2>
                <p className='error-content'>
                    You're not allowed to access this resource.
                </p>
                <p className="error-in-depth">
                    Only authors can access this page.
                </p>
                <p className="error-in-depth">
                    If you're not an author visit&nbsp;
                    <a href={import.meta.env.VITE_READER_APP}>this page</a>.
                </p>
                <p className="error-in-depth">
                    If you're an author reset your session&nbsp;
                    <Link to='/logout'>here</Link>.
                </p>
            </>
        );
    }

    if (statusCode === 500) {
        return (
            <>
                <img src={bug}/>
                <h2 className='error-header'>Internal Error</h2>
                <p className='error-content'>
                    An error occurred whilst processing your request, please try
                    again later.
                </p>
            </>
        );
    }
}

export default function DashboardError({ statusCode }) {
    return (
        <div className='dashboard-error-cont'>
            {getDashboardErrorContent(statusCode)}
        </div>
    );
}
