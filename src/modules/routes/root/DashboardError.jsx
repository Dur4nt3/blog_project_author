import { Link } from 'react-router';

function getDashboardErrorContent(statusCode) {
    if (statusCode === 403) {
        return (
            <>
                <h1 className='error-code'>403</h1>
                <h2 className='error-header'>Forbidden</h2>
                <p className='error-content'>
                    You're not allowed to access this resource.
                </p>
                <p className='error-in-depth'>
                    Only authors can access this page.
                </p>
                <p className='error-in-depth'>
                    If you're not an author visit&nbsp;
                    <a href={import.meta.env.VITE_READER_APP}>this page</a>.
                </p>
                <p className='error-in-depth'>
                    If you're an author reset your session&nbsp;
                    <Link to='/logout'>here</Link>.
                </p>
            </>
        );
    }

    if (statusCode === 500) {
        return (
            <>
                <h1 className='error-code'>500</h1>
                <h2 className='error-header'>Internal Error</h2>
                <p className='error-content'>
                    An error occurred whilst processing your request, please try
                    again later.
                </p>
            </>
        );
    }

    return (
        <>
            <h1 className='error-code'>400</h1>
            <h2 className='error-header'>Client Error</h2>
            <p className='error-content'>
                An unexpected error occurred, please try again later.
            </p>
        </>
    );
}

export default function DashboardError({ statusCode }) {
    return (
        <div className='dashboard-error-cont'>
            {getDashboardErrorContent(statusCode)}
        </div>
    );
}
