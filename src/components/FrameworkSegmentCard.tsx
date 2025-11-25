import React from 'react';
import { FrameworkSegment } from '../types/phases';
import { Trash2 } from 'lucide-react';
import { StandardInput } from './ui/StandardInput';
import { StandardTextArea } from './ui/StandardTextArea';

interface FrameworkSegmentCardProps {
    segment: FrameworkSegment;
    onUpdate: (updated: FrameworkSegment) => void;
    onDelete: () => void;
}

export const FrameworkSegmentCard: React.FC<FrameworkSegmentCardProps> = ({
    segment,
    onUpdate,
    onDelete,
}) => {
    return (
        <div className="bg-white border border-solita-light-grey rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
                <div className="flex-1 space-y-3">
                    <StandardInput
                        value={segment.title}
                        onChange={(e) => onUpdate({ ...segment, title: e.target.value })}
                        className="font-semibold text-lg"
                        placeholder="Segment Title"
                    />
                    <div>
                        <StandardTextArea
                            label="Objective"
                            value={segment.objective}
                            onChange={(e) => onUpdate({ ...segment, objective: e.target.value })}
                            variant="filled"
                            className="min-h-[150px]"
                            placeholder="What is the goal of this segment?"
                        />
                    </div>
                    <div>
                        <StandardTextArea
                            label="Guidance"
                            value={segment.guidance}
                            onChange={(e) => onUpdate({ ...segment, guidance: e.target.value })}
                            variant="filled"
                            className="min-h-[150px]"
                            placeholder="Instructions for the writer agent..."
                        />
                    </div>
                </div>
                <button
                    onClick={onDelete}
                    className="p-2 text-solita-mid-grey hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                    title="Delete Segment"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};
