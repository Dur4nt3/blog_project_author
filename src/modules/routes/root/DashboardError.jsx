import { useFetcher, Link } from 'react-router';

function DashboardErrorContent({statusCode}) {
    // eslint-disable-next-line no-unused-vars
    const fetcher = useFetcher();

    if (statusCode === 502) {
        return (
            <>
                <h1 className='error-code'>502</h1>
                <h2 className='error-header'>Bad Gateway</h2>
                <p className='error-content'>
                    Could not process your request, please try again later.
                </p>
            </>
        );
    }

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
                <div className='error-in-depth'>
                    <fetcher.Form method='DELETE' action='/logout'>
                        <p>If you're an author&nbsp;</p>
                        <button type='submit'>reset your session&nbsp;</button>
                        <p>and,&nbsp;</p>
                        <Link to='/login'>Login</Link>.
                    </fetcher.Form>
                </div>
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
            <DashboardErrorContent statusCode={statusCode} />
        </div>
    );
}
