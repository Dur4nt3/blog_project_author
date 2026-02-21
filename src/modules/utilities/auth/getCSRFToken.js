export default function getCSRFToken() {
    console.log(document.cookie);

    return document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrfToken='))
        ?.split('=')[1];
}
