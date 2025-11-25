import { AgentConfig } from '../types/logging';

/**
 * Agent configuration registry
 * Contains metadata about all agents for debugging purposes
 */
export const agentConfigs: Record<string, AgentConfig> = {
    planner: {
        name: 'Planner Agent',
        role: 'planner',
        description: 'Analyzes transcript context and proposes analysis framework',
        model: 'google/gemini-2.0-flash-001',
        systemPrompt: 'You are a Planner Agent specialized in understanding document context and defining analysis objectives.',
        codeLocation: 'src/services/planner.agent.ts',
        methods: [
            {
                name: 'analyzeContext',
                description: 'Analyzes the first 1000 characters to understand context',
                signature: 'analyzeContext(firstChars: string): Promise<string>',
            },
            {
                name: 'generateMetadata',
                description: 'Generates 3-5 relevant metadata tags',
                signature: 'generateMetadata(transcript: string): Promise<string[]>',
            },
            {
                name: 'proposeObjective',
                description: 'Proposes an analysis objective based on context',
                signature: 'proposeObjective(context: string, transcript: string): Promise<string>',
            },
        ],
    },
    writer: {
        name: 'Writer Agent',
        role: 'writer',
        description: 'Analyzes transcript segments and extracts insights',
        model: 'google/gemini-2.0-flash-001',
        systemPrompt: 'You are a Writer Agent specialized in extracting insights from transcripts based on given frameworks.',
        codeLocation: 'src/services/writer.agent.ts',
        methods: [
            {
                name: 'analyzeSegment',
                description: 'Analyzes a framework segment using transcript data',
                signature: 'analyzeSegment(transcript: string, segment: FrameworkSegment): Promise<string>',
            },
            {
                name: 'rewriteSegment',
                description: 'Rewrites a segment based on critic feedback',
                signature: 'rewriteSegment(original: string, critique: string, segment: FrameworkSegment): Promise<string>',
            },
        ],
    },
    critic: {
        name: 'Critic Agent',
        role: 'critic',
        description: 'Evaluates segment quality and verifies source alignment',
        model: 'google/gemini-2.0-flash-001',
        systemPrompt: 'You are a Critic Agent specialized in evaluating analysis quality and ensuring all statements are grounded in source material.',
        codeLocation: 'src/services/critic.agent.ts',
        methods: [
            {
                name: 'evaluateSegment',
                description: 'Evaluates the quality of a segment analysis',
                signature: 'evaluateSegment(content: string, segment: FrameworkSegment, transcript: string): Promise<string>',
            },
            {
                name: 'verifySourceAlignment',
                description: 'Verifies that all statements are based on the transcript',
                signature: 'verifySourceAlignment(content: string, transcript: string): Promise<boolean>',
            },
        ],
    },
};

export function getAgentConfig(agentRole: string): AgentConfig | undefined {
    return agentConfigs[agentRole.toLowerCase()];
}
