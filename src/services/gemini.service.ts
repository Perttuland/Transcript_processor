import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * GeminiService handles all interactions with the Gemini API
 */
export class GeminiService {
    private genAI: GoogleGenerativeAI | null = null;
    private model: any = null;

    /**
     * Initialize the Gemini API with an API key
     */
    initialize(apiKey: string): void {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    }

    /**
     * Check if the service is initialized
     */
    isInitialized(): boolean {
        return this.model !== null;
    }

    /**
     * Extract themes from a transcript
     */
    async generateThemes(transcript: string): Promise<string[]> {
        if (!this.model) {
            throw new Error('Gemini API not initialized. Please provide an API key.');
        }

        const prompt = `Analyze the following transcript and extract 3-5 key themes or topics discussed. 
Return ONLY a JSON array of theme names (strings), nothing else.

Transcript:
${transcript}

Example response format: ["Theme 1", "Theme 2", "Theme 3"]`;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Parse JSON response
            const themes = JSON.parse(text.trim());
            return Array.isArray(themes) ? themes : [];
        } catch (error) {
            console.error('Error generating themes:', error);
            // Fallback to generic themes
            return ['Main Topics', 'Key Insights', 'Important Points'];
        }
    }

    /**
     * Analyze a specific theme in the transcript
     */
    async analyzeTheme(transcript: string, theme: string): Promise<string> {
        if (!this.model) {
            throw new Error('Gemini API not initialized. Please provide an API key.');
        }

        const prompt = `Analyze the following transcript focusing on the theme: "${theme}".

Provide a detailed analysis including:
1. Key points related to this theme
2. Relevant quotes from the transcript (with exact text)
3. Insights and patterns

Format your response as clear, structured text.

Transcript:
${transcript}`;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Error analyzing theme:', error);
            throw error;
        }
    }

    /**
     * Stream analysis for real-time updates
     */
    async *streamAnalysis(transcript: string, theme: string): AsyncGenerator<string> {
        if (!this.model) {
            throw new Error('Gemini API not initialized. Please provide an API key.');
        }

        const prompt = `Analyze the following transcript focusing on the theme: "${theme}".

Provide a detailed analysis including:
1. Key points related to this theme
2. Relevant quotes from the transcript
3. Insights and patterns

Transcript:
${transcript}`;

        try {
            const result = await this.model.generateContentStream(prompt);

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                yield chunkText;
            }
        } catch (error) {
            console.error('Error streaming analysis:', error);
            throw error;
        }
    }

    /**
     * Validate an API key
     */
    async validateApiKey(apiKey: string): Promise<boolean> {
        try {
            const testAI = new GoogleGenerativeAI(apiKey);
            const testModel = testAI.getGenerativeModel({ model: 'gemini-pro' });

            // Try a simple generation to validate
            const result = await testModel.generateContent('Hello');
            await result.response;

            return true;
        } catch (error) {
            console.error('API key validation failed:', error);
            return false;
        }
    }
}

export const geminiService = new GeminiService();
