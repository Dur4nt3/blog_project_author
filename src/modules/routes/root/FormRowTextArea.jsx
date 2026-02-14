function formInputClass(error) {
    if (error === undefined) {
        return '';
    }

    if (error === null) {
        return 'is-valid';
    }

    return 'has-error';
}

export default function FormRowTextArea({ labelContent, fieldName, error, classes = '' }) {
    return (
        <div className={`form-row ${classes}`}>
            <label htmlFor={fieldName}>{labelContent}</label>
            <textarea
                name={fieldName}
                id={fieldName}
                className={formInputClass(error)}
            ></textarea>
            {error !== null && error !== undefined && error !== true && (
                <span className='input-inline-error'>{error}</span>
            )}
        </div>
    );
}
