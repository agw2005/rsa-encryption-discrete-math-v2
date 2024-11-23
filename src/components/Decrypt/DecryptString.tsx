import { decrypt } from "./Decrypt";

export function decryptString(ciphertext: string, privateKey: { d: number; n: number }): string {
    return decrypt(ciphertext, privateKey);
}