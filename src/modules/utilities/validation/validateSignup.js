import SignupError from '../classes/SignupError';

function validateUsernameOrName(value, fieldName) {
    if (value === undefined) {
        return `${fieldName} must not be empty`;
    }

    const trimmedValue = value.trim();

    if (trimmedValue === '') {
        return `${fieldName} must not be empty`;
    }

    if (trimmedValue.length < 3 || trimmedValue.length > 30) {
        return `${fieldName} must be between 3 and 30 characters`;
    }

    const regex = /^[a-z0-9]+$/;

    if (!regex.test(trimmedValue)) {
        // eslint-disable-next-line @stylistic/max-len
        return `${fieldName} must only contain letters and numbers (lowercase only)`;
    }

    return null;
}

function validatePassword(value) {
    if (value === undefined) {
        return 'Password must not be empty';
    }

    const trimmedValue = value.trim();

    if (trimmedValue === '') {
        return 'Password must not be empty';
    }

    if (trimmedValue.length < 8) {
        return 'Password must be at least 8 characters long';
    }

    return null;
}

function validateCPassword(value, passwordValue) {
    if (value === undefined) {
        return 'Password confirmation must not be empty';
    }

    const trimmedValue = value.trim();

    if (trimmedValue === '') {
        return 'Password confirmation must not be empty';
    }

    if (value !== passwordValue) {
        return 'Passwords do not match';
    }

    return null;
}

function validateKey(value) {
    if (value === undefined) {
        return 'Author key must not be empty';
    }

    const trimmedValue = value.trim();

    if (trimmedValue === '') {
        return 'Author key must not be empty';
    }

    return null;
}

// Gets signup form data
// Returns null if data is valid (no errors)
// Returns an instance of "SignupError" if it isn't
export default function validateSignup(jsonData) {
    const usernameValid = validateUsernameOrName(jsonData.username, 'Username');
    const nameValid = validateUsernameOrName(jsonData.name, 'Name');
    const passwordValid = validatePassword(jsonData.password);
    const cpasswordValid = validateCPassword(
        jsonData.cpassword,
        jsonData.password
    );
    const keyValid = validateKey(jsonData.key);

    const errorsPresent = [
        usernameValid,
        nameValid,
        passwordValid,
        cpasswordValid,
        keyValid,
    ].some((field) => field !== null);

    if (errorsPresent) {
        return new SignupError(
            'Please fix the below errors',
            usernameValid,
            nameValid,
            passwordValid,
            cpasswordValid,
            keyValid
        );
    }

    return null;
}
