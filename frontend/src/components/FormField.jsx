import React from "react";

const FormField = ({
    labelName,
    type,
    name,
    placeholder,
    value,
    handleChange,
    isSurpriseMe,
    handleSurpriseMe,
}) => (
    <div>
        <label htmlFor={name} className="block text-lg font-medium text-gray-800">
            {labelName}
        </label>

        <div className="relative flex items-center">
            <input
                type={type}
                id={name}
                name={name}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-[#4C51BF] focus:border-[#4C51BF] text-gray-900 text-md outline-none"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                required
            />

            {isSurpriseMe && (
                <button
                    type="button"
                    onClick={handleSurpriseMe}
                    className="absolute right-2 top-3 bg-[#E2E8F0] text-[#1A202C] py-1 px-3 rounded-lg text-md font-medium hover:bg-[#afcae7] transition duration-400 cursor-pointer"
                >
                    Surprise Me
                </button>
            )}
        </div>
    </div>
);

export default FormField;
