import React from "react";
import './TextInput.scss';

export const TextInput = ({
    placeholder,
    type = "text",
    value,
    onBlur = () => {},
    onChange = () => {},
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
                onChange={e => onChange(type === 'number' ? parseInt(e.target.value) || 0 : e.target.value)}
                onBlur={e => onBlur(type === 'number' ? parseInt(e.target.value) || 0 : e.target.value)}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
};