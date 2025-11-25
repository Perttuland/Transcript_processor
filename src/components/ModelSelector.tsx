import { useState } from 'react';
import { X, Settings } from 'lucide-react';

interface ModelSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    currentModel: string;
    onModelChange: (model: string) => void;
}

const AVAILABLE_MODELS = [
    { id: 'google/gemini-2.0-flash-001', name: 'Gemini 2.0 Flash', provider: 'Google' },
    { id: 'azure/gpt-4o-mini', name: 'GPT-4o Mini', provider: 'Azure OpenAI' },
    { id: 'azure/gpt-4o', name: 'GPT-4o', provider: 'Azure OpenAI' },
    { id: 'anthropic/claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet', provider: 'Anthropic' },
];

export function ModelSelector({ isOpen, onClose, currentModel, onModelChange }: ModelSelectorProps) {
    const [selectedModel, setSelectedModel] = useState(currentModel);

    const handleSave = () => {
        onModelChange(selectedModel);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-solita-black flex items-center gap-2">
                        <Settings className="w-5 h-5 text-solita-ochre" />
                        Select AI Model
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-solita-mid-grey hover:text-solita-black transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <p className="text-sm text-solita-dark-grey mb-4">
                    Choose which AI model to use for transcript analysis.
                </p>

                <div className="space-y-2 mb-6">
                    {AVAILABLE_MODELS.map((model) => (
                        <label
                            key={model.id}
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${selectedModel === model.id
                                ? 'border-solita-ochre bg-solita-ochre/5'
                                : 'border-solita-light-grey hover:bg-solita-light-grey/30'
                                }`}
                        >
                            <input
                                type="radio"
                                name="model"
                                value={model.id}
                                checked={selectedModel === model.id}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                className="mr-3"
                            />
                            <div>
                                <div className="font-medium text-solita-black">{model.name}</div>
                                <div className="text-xs text-solita-mid-grey">{model.provider}</div>
                            </div>
                        </label>
                    ))}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-solita-light-grey border border-solita-mid-grey text-solita-dark-grey rounded-lg hover:bg-solita-ochre/10 transition-colors"

                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 px-4 py-2 bg-solita-ochre hover:bg-solita-ochre/90 text-white rounded-lg transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
