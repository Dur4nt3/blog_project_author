// Gets errors from the server
// Returns an object where a property is the failing field
// and the value is the error message
// This function is dependent on the error object returned by express-validator
export default function getErrorsObject(errors) {
    const errorsObject = {};
    for (const error of errors) {
        errorsObject[error.path] = error.msg;
    }

    return errorsObject;
}