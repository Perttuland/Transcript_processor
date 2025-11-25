import { AgentLog } from '../types/logging';

class AgentLogger {
    private logs: AgentLog[] = [];
    private listeners: ((logs: AgentLog[]) => void)[] = [];

    /**
     * Log an agent request
     */
    logRequest(
        agentName: string,
        agentRole: string,
        systemPrompt: string,
        userPrompt: string,
        model?: string
    ): string {
        const logId = crypto.randomUUID();
        const log: AgentLog = {
            id: logId,
            timestamp: new Date(),
            agentName,
            agentRole,
            action: 'request',
            prompt: {
                system: systemPrompt,
                user: userPrompt,
            },
            model,
        };

        this.logs.push(log);
        this.notifyListeners();
        return logId;
    }

    /**
     * Log an agent response
     */
    logResponse(
        logId: string,
        response: string,
        duration?: number,
        tokens?: { prompt: number; completion: number; total: number }
    ): void {
        const requestLog = this.logs.find(log => log.id === logId);
        if (!requestLog) return;

        const responseLog: AgentLog = {
            id: crypto.randomUUID(),
            timestamp: new Date(),
            agentName: requestLog.agentName,
            agentRole: requestLog.agentRole,
            action: 'response',
            response,
            model: requestLog.model,
            duration,
            tokens,
        };

        this.logs.push(responseLog);
        this.notifyListeners();
    }

    /**
     * Log an agent error
     */
    logError(
        agentName: string,
        agentRole: string,
        error: string
    ): void {
        const log: AgentLog = {
            id: crypto.randomUUID(),
            timestamp: new Date(),
            agentName,
            agentRole,
            action: 'error',
            error,
        };

        this.logs.push(log);
        this.notifyListeners();
    }

    /**
     * Get all logs
     */
    getLogs(): AgentLog[] {
        return [...this.logs];
    }

    /**
     * Clear all logs
     */
    clearLogs(): void {
        this.logs = [];
        this.notifyListeners();
    }

    /**
     * Subscribe to log updates
     */
    subscribe(listener: (logs: AgentLog[]) => void): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notifyListeners(): void {
        this.listeners.forEach(listener => listener([...this.logs]));
    }
}

export const agentLogger = new AgentLogger();
