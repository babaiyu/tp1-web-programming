import React from "react";

export default function InputText({
    label = "",
    errorMessage = "",
    onChange,
    ...props
}) {
    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text font-semibold">{label}</span>
            </label>
            <input
                className="input input-bordered input-md w-full max-w-xs"
                onChange={onChange}
                {...props}
            />
            <label className="label">
                <span className="label-text-alt font-semibold text-red-900">
                    {errorMessage ?? ""}
                </span>
            </label>
        </div>
    );
}
