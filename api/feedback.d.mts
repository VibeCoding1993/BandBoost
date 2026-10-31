export function parseInput(body: unknown): any;
export function buildRequest(input: any): any;
export function parseFeedback(text: string): any;
export function overallFrom(bands: number[]): number;
export function getFeedback(input: any, options?: { fetch?: typeof fetch; env?: Record<string, string | undefined>; delays?: number[] }): Promise<any>;
export const RESPONSE_SCHEMA: object;
export const PRIMARY_MODEL: string;
export const FALLBACK_MODEL: string;
