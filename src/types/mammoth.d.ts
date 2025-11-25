declare module 'mammoth' {
    export interface ConversionResult {
        value: string;
        messages: Array<{
            type: string;
            message: string;
        }>;
    }

    export interface ConversionOptions {
        arrayBuffer?: ArrayBuffer;
        path?: string;
    }

    export function extractRawText(options: ConversionOptions): Promise<ConversionResult>;
    export function convertToHtml(options: ConversionOptions): Promise<ConversionResult>;
}
