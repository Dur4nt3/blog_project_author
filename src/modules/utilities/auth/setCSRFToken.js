export default function setCSRFToken(token) {
    localStorage.setItem('csrfToken', token);
}