// Settings service for persisting user preferences using localStorage

export type AgentType = 'planner' | 'writer' | 'critic' | 'gapAnalysis';

export interface AgentSettings {
    model: string;
    instructions: Record<string, string>;
}

export interface AppSettings {
    apiKey?: string;
    agents: {
        planner: AgentSettings;
        writer: AgentSettings;
        critic: AgentSettings;
        gapAnalysis: AgentSettings;
    };
}

const STORAGE_KEY = 'transcript_processor_settings';

const DEFAULT_SETTINGS: AppSettings = {
    agents: {
        planner: {
            model: 'google/gemini-2.0-flash-001',
            instructions: {}
        },
        writer: {
            model: 'google/gemini-2.0-flash-001',
            instructions: {}
        },
        critic: {
            model: 'google/gemini-2.0-flash-001',
            instructions: {}
        },
        gapAnalysis: {
            model: 'google/gemini-2.0-flash-001',
            instructions: {}
        }
    }
};

class SettingsService {
    /**
     * Load settings from localStorage
     */
    load(): AppSettings {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) {
                return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
            }
            const parsed = JSON.parse(stored);

            // Merge with defaults to ensure all agents exist
            const merged: AppSettings = {
                apiKey: parsed.apiKey,
                agents: {
                    planner: {
                        model: parsed.agents?.planner?.model || DEFAULT_SETTINGS.agents.planner.model,
                        instructions: parsed.agents?.planner?.instructions || {}
                    },
                    writer: {
                        model: parsed.agents?.writer?.model || DEFAULT_SETTINGS.agents.writer.model,
                        instructions: parsed.agents?.writer?.instructions || {}
                    },
                    critic: {
                        model: parsed.agents?.critic?.model || DEFAULT_SETTINGS.agents.critic.model,
                        instructions: parsed.agents?.critic?.instructions || {}
                    },
                    gapAnalysis: {
                        model: parsed.agents?.gapAnalysis?.model || DEFAULT_SETTINGS.agents.gapAnalysis.model,
                        instructions: parsed.agents?.gapAnalysis?.instructions || {}
                    }
                }
            };
            return merged;
        } catch (error) {
            console.error('Failed to load settings:', error);
            return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
        }
    }

    /**
     * Save settings to localStorage
     */
    save(settings: AppSettings): void {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    }

    /**
     * Clear all settings
     */
    clear(): void {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Failed to clear settings:', error);
        }
    }

    /**
     * Save API key
     */
    saveApiKey(apiKey: string): void {
        const settings = this.load();
        settings.apiKey = apiKey;
        this.save(settings);
    }

    /**
     * Get saved API key
     */
    getApiKey(): string | undefined {
        return this.load().apiKey;
    }

    /**
     * Get model for a specific agent
     */
    getAgentModel(agent: AgentType): string {
        return this.load().agents[agent].model;
    }

    /**
     * Save model for a specific agent
     */
    saveAgentModel(agent: AgentType, model: string): void {
        const settings = this.load();
        settings.agents[agent].model = model;
        this.save(settings);
    }

    /**
     * Get custom instruction for a specific agent and method
     */
    getAgentInstruction(agent: AgentType, method: string): string | undefined {
        return this.load().agents[agent].instructions[method];
    }

    /**
     * Save custom instruction for a specific agent and method
     */
    saveAgentInstruction(agent: AgentType, method: string, instruction: string): void {
        const settings = this.load();
        settings.agents[agent].instructions[method] = instruction;
        this.save(settings);
    }

    /**
     * Reset a specific agent to defaults (model and instructions)
     */
    resetAgent(agent: AgentType): void {
        const settings = this.load();
        settings.agents[agent] = {
            model: DEFAULT_SETTINGS.agents[agent].model,
            instructions: {}
        };
        this.save(settings);
    }

    /**
     * Reset all agents to defaults
     */
    resetAllAgents(): void {
        const settings = this.load();
        settings.agents = JSON.parse(JSON.stringify(DEFAULT_SETTINGS.agents));
        this.save(settings);
    }

    /**
     * Export settings as JSON string
     */
    export(): string {
        return JSON.stringify(this.load(), null, 2);
    }

    /**
     * Import settings from JSON string
     */
    import(jsonString: string): boolean {
        try {
            const settings = JSON.parse(jsonString);
            this.save(settings);
            return true;
        } catch (error) {
            console.error('Failed to import settings:', error);
            return false;
        }
    }
}

export const settingsService = new SettingsService();
