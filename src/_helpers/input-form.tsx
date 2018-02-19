import * as React from 'react';

const InputForm = ({ field, value, label, error, type, onChange }: any) => {
    return (
        <div className={error ? "form-group has-error" : "form-group"}>
            <label className="control-label">{label}</label>
            <input
                value={value}
                onChange={onChange}
                type={type}
                name={field}
                className="form-control"
            />
            {error && <span className="text-danger">{error}</span>}
        </div>
    );
}

export default InputForm;