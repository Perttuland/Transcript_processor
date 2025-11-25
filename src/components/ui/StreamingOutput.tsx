import React from 'react';
import { Sparkles } from 'lucide-react';

interface StreamingOutputProps {
    content: string;
    isStreaming: boolean;
    label?: string;
    className?: string;
}

export const StreamingOutput: React.FC<StreamingOutputProps> = ({
    content,
    isStreaming,
    label,
    className = ''
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <div className="flex items-center gap-2 mb-2">
                    {isStreaming && <Sparkles className="w-4 h-4 text-solita-ochre animate-pulse" />}
                    <label className="block text-xs font-medium text-solita-mid-grey uppercase">
                        {label}
                    </label>
                </div>
            )}
            <div className="relative p-4 bg-solita-light-grey/30 rounded-lg text-solita-black whitespace-pre-wrap border border-solita-light-grey/50 min-h-[100px] text-lg">
                {content}
                {isStreaming && (
                    <span className="inline-block w-0.5 h-5 bg-solita-ochre ml-0.5 animate-pulse align-middle" />
                )}
            </div>
        </div>
    );
};
