import { Link } from 'react-router';

import './stylesheets/DashboardFooter.css';

export default function DashboardFooter({ name }) {
    return (
        <footer className='dashboard-footer'>
            <p>@ {name}</p>
            <Link to='/logout'>Logout</Link>
        </footer>
    );
}
