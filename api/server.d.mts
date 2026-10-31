import type { Server } from "node:http";
export function createLimiter(o: { perHour: number; perDay: number; globalPerDay: number }, now?: () => number): (ip: string) => "ok" | "user" | "global";
export function createServer(o?: { env?: Record<string, string | undefined>; feedback?: (input: any, o: any) => Promise<any> }): Server;
