import mammoth from 'mammoth';

/**
 * Service for parsing DOCX files and extracting text content
 */
class DocxParserService {
    /**
     * Parse a DOCX file and extract plain text
     */
    async parseDocx(file: File): Promise<string> {
        try {
            // Convert File to ArrayBuffer
            const arrayBuffer = await file.arrayBuffer();

            // Use mammoth to extract text
            const result = await mammoth.extractRawText({ arrayBuffer });

            if (result.messages && result.messages.length > 0) {
                console.warn('DOCX parsing warnings:', result.messages);
            }

            return result.value;
        } catch (error) {
            console.error('Error parsing DOCX file:', error);
            throw new Error('Failed to parse DOCX file. Please ensure it is a valid Word document.');
        }
    }

    /**
     * Check if a file is a DOCX file based on extension
     */
    isDocxFile(file: File): boolean {
        return file.name.toLowerCase().endsWith('.docx');
    }
}

export const docxParserService = new DocxParserService();
