import { MarkdownOutput } from '../types';


/**
 * MarkdownService handles all text-based persistence.
 * Generates AI-optimized Markdown files with structured insights.
 */
export class MarkdownService {
    /**
     * Generate a comprehensive Markdown file from insights
     */
    generateMarkdown(output: MarkdownOutput): string {
        const sections: string[] = [];

        // README Section
        sections.push('# Transcript Analysis Report\n');
        sections.push(output.readme);
        sections.push('\n---\n');

        // Metadata Section
        sections.push('## Metadata\n');
        sections.push(`- **Transcript ID**: ${output.metadata.transcriptId}`);
        sections.push(`- **Processed At**: ${output.metadata.processedAt.toISOString()}`);
        sections.push(`- **Agents Used**: ${output.metadata.agentCount}`);
        sections.push('\n---\n');

        // Insights Section
        sections.push('## Key Insights\n');
        output.insights.forEach((insight, index) => {
            sections.push(`### ${index + 1}. ${insight.theme}\n`);
            sections.push(insight.content);
            sections.push('\n');

            if (insight.quotes.length > 0) {
                sections.push('**Supporting Evidence:**\n');
                insight.quotes.forEach((quote) => {
                    const verified = quote.verified ? '✓' : '⚠';
                    sections.push(`- ${verified} "${quote.text}"`);
                    if (quote.context) {
                        sections.push(`  - *Context: ${quote.context}*`);
                    }
                });
                sections.push('\n');
            }
        });

        return sections.join('\n');
    }

    /**
     * Save Markdown to file (using File System Access API)
     */
    async saveToFile(content: string, filename: string): Promise<void> {
        try {
            // @ts-ignore - File System Access API
            const handle = await window.showSaveFilePicker({
                suggestedName: filename,
                types: [
                    {
                        description: 'Markdown Files',
                        accept: { 'text/markdown': ['.md'] },
                    },
                ],
            });

            const writable = await handle.createWritable();
            await writable.write(content);
            await writable.close();
        } catch (error) {
            console.error('Failed to save file:', error);
            throw error;
        }
    }

    /**
     * Download Markdown as a file (fallback method)
     */
    downloadMarkdown(content: string, filename: string): void {
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

export const markdownService = new MarkdownService();
