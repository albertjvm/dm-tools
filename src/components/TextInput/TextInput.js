import React from "react";
import './TextInput.scss';

export const TextInput = ({
    placeholder,
    type = "text",
    value,
    onChange,
    onEnter,
    className = ''
}) => {
    const handleKeyPress = e => {
        if (e.key === "Enter") {
            onEnter && onEnter();
        }
    };

    return (
        <div className={`TextInput ${className}`}>
            <input 
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
};