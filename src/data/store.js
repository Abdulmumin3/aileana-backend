import { randomUUID } from "crypto";

export const users = [];
export const wallets = [];
export const calls = [];

export function generateId() {
  return randomUUID();
}
