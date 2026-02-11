import { Link } from 'react-router';

import './stylesheets/CreateArticleFooter.css';

import arrowSvg from '../../../assets/media/icons/arrow-left.svg';

export default function CreateArticleFooter() {
    return (
        <footer className='create-article-footer'>
            <Link className='dashboard-link' to='/'>
                <img src={arrowSvg} />
                <p>Dashboard</p>
            </Link>
        </footer>
    );
}
