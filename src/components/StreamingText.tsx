import { StreamingState } from '../hooks/useStreamingText';

interface StreamingTextProps {
    text: string;
    state: StreamingState;
    className?: string;
    showCursor?: boolean;
}

export function StreamingText({ text, state, className = '', showCursor = true }: StreamingTextProps) {
    const isStreaming = state === 'streaming';

    return (
        <div className={`relative ${className}`}>
            <span className="whitespace-pre-wrap">{text}</span>
            {isStreaming && showCursor && (
                <span className="inline-block w-0.5 h-5 bg-solita-ochre ml-0.5 animate-pulse" />
            )}
        </div>
    );
}
