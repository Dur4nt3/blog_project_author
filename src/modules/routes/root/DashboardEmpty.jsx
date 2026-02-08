import { Link } from 'react-router';

export default function DashboardEmpty() {
    return (
        <div className='dashboard-empty-notice'>
            <h2>No articles yet</h2>
            <p>Get started by creating your first article.</p>
            <div className="empty-notice-action-cont">
                <div></div>
                <Link to='/new'>New Article</Link>
                <div></div>
            </div>
        </div>
    );
}
