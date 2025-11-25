// Agent logging types

export interface AgentLog {
    id: string;
    timestamp: Date;
    agentName: string;
    agentRole: string;
    action: 'request' | 'response' | 'error';
    prompt?: {
        system: string;
        user: string;
    };
    response?: string;
    error?: string;
    model?: string;
    duration?: number;
    tokens?: {
        prompt: number;
        completion: number;
        total: number;
    };
}

export interface AgentConfig {
    name: string;
    role: string;
    description: string;
    model: string;
    systemPrompt: string;
    codeLocation: string;
    methods: {
        name: string;
        description: string;
        signature: string;
    }[];
}
