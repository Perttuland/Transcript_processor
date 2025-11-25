import React from 'react';

interface StandardTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    variant?: 'default' | 'filled';
}

export const StandardTextArea: React.FC<StandardTextAreaProps> = ({
    label,
    error,
    variant = 'default',
    className = '',
    ...props
}) => {
    const baseStyles = "w-full p-4 rounded-lg text-solita-black transition-all focus:outline-none focus:ring-2 focus:ring-solita-ochre resize-y";
    const variants = {
        default: "bg-white border border-solita-light-grey focus:border-solita-ochre",
        filled: "bg-solita-light-grey/30 border border-transparent hover:border-solita-light-grey"
    };

    return (
        <div className="w-full">
            {label && (
                <label className="block text-xs font-medium text-solita-mid-grey uppercase mb-1 ml-1">
                    {label}
                </label>
            )}
            <textarea
                className={`${baseStyles} ${variants[variant]} ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
                {...props}
            />
            {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
        </div>
    );
};
