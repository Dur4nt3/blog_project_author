function formInputClass(error) {
    if (error === undefined) {
        return '';
    }

    if (error === null) {
        return 'is-valid';
    }

    return 'has-error';
}

export default function FormRow({ labelContent, inputType, fieldName, error, defaultValue = '' }) {
    return (
        <div className='form-row'>
            <label htmlFor={fieldName}>{labelContent}</label>
            <input
                defaultValue={defaultValue}
                type={inputType}
                name={fieldName}
                id={fieldName}
                className={formInputClass(error)}
            />
            {error !== null && error !== undefined && error !== true && (
                <span className='input-inline-error'>{error}</span>
            )}
        </div>
    );
}
