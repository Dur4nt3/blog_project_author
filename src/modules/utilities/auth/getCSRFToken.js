export default function getCSRFToken() {
    return localStorage.getItem('csrfToken');
}
