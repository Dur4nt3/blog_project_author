export default function FormRow({ labelContent, inputType, fieldName }) {
    return <div className="form-row">
        <label htmlFor={fieldName}>
            {labelContent}
        </label>
        <input type={inputType} name={fieldName} id={fieldName} />
    </div>
}