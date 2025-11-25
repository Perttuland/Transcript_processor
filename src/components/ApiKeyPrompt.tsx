import { useState, useEffect } from 'react';
import { X, Key, Loader2 } from 'lucide-react';
import { liteLLMService } from '../services/litellm.service';
import toast from 'react-hot-toast';
import { StandardInput } from './ui/StandardInput';

interface ApiKeyPromptProps {
    isOpen: boolean;
    onClose: () => void;
    onKeySet: () => void;
}

const API_KEY_STORAGE_KEY = 'litellm_api_key';

export function ApiKeyPrompt({ isOpen, onClose, onKeySet }: ApiKeyPromptProps) {
    const [apiKey, setApiKey] = useState('');
    const [isValidating, setIsValidating] = useState(false);

    useEffect(() => {
        const savedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
        if (savedKey) {
            setApiKey(savedKey);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!apiKey.trim()) {
            toast.error('Please enter an API key');
            return;
        }

        setIsValidating(true);

        try {
            const isValid = await liteLLMService.validateApiKey(apiKey);

            if (isValid) {
                localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
                liteLLMService.initialize(apiKey);
                toast.success('API key validated successfully!');
                onKeySet();
                onClose();
            } else {
                toast.error('Invalid API key. Please check and try again.');
            }
        } catch (error) {
            toast.error('Failed to validate API key');
        } finally {
            setIsValidating(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-solita-black flex items-center gap-2">
                        <Key className="w-5 h-5 text-solita-ochre" />
                        LiteLLM API Key
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-solita-mid-grey hover:text-solita-black transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <p className="text-sm text-solita-dark-grey mb-4">
                    To use AI-powered analysis, please provide your LiteLLM API key.
                </p>

                <form onSubmit={handleSubmit}>
                    <StandardInput
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your LiteLLM API key"
                        className="mb-4"
                        disabled={isValidating}
                    />

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-solita-light-grey border border-solita-mid-grey text-solita-dark-grey rounded-lg hover:bg-solita-ochre/10 transition-colors"

                            disabled={isValidating}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-solita-ochre hover:bg-solita-ochre/90 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                            disabled={isValidating}
                        >
                            {isValidating ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Validating...
                                </>
                            ) : (
                                'Save Key'
                            )}
                        </button>
                    </div>
                </form>

                <p className="text-xs text-solita-mid-grey mt-4">
                    Your API key is stored locally in your browser and never sent to our servers.
                </p>
            </div>
        </div>
    );
}

export function getStoredApiKey(): string | null {
    return localStorage.getItem(API_KEY_STORAGE_KEY);
}

export function clearStoredApiKey(): void {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
}
