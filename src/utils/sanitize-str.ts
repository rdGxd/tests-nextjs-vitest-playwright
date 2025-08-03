import { getFullEnv } from "@/env/configs";

export function sanitizeStr(str: string): string {
  const clean = !str || typeof str !== "string" ? "" : str.trim().normalize();
  return clean;
}

const env = getFullEnv();
console.log(env);
