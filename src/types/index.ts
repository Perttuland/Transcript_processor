// Agent Types
export interface Agent {
    id: string;
    name: string;
    status: AgentStatus;
    progress: number;
    output?: string;
    error?: string;
}

export enum AgentStatus {
    IDLE = 'idle',
    RUNNING = 'running',
    COMPLETED = 'completed',
    FAILED = 'failed',
}

export enum AgentRole {
    SYSTEM = 'system',
    PLANNER = 'planner',
    WRITER = 'writer',
    CRITIC = 'critic',
}

// Transcript Types
export interface Transcript {
    id: string;
    content: string;
    uploadedAt: Date;
    processedAt?: Date;
}

// Insight Types
export interface Insight {
    id: string;
    theme: string;
    content: string;
    quotes: Quote[];
    generatedAt: Date;
}

export interface Quote {
    text: string;
    context?: string;
    verified: boolean;
}

// Markdown Output Types
export interface MarkdownOutput {
    readme: string;
    insights: Insight[];
    metadata: {
        transcriptId: string;
        processedAt: Date;
        agentCount: number;
    };
}

// Agent Message Types
export interface AgentMessage {
    id: string;
    role: AgentRole;
    content: string;
    timestamp: Date;
}

// Streaming State
export interface StreamingState {
    isStreaming: boolean;
    currentAgent?: string;
    buffer: string;
}

// API Key Configuration
export interface ApiKeyConfig {
    key: string;
    isValid: boolean;
    lastValidated?: Date;
}
