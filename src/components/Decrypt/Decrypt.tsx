import { modPow } from "../utils/modPow";

export function decrypt(ciphertext: string, privateKey: { d: number; n: number }): string {
    const { d, n } = privateKey;
    return ciphertext
        .split(" ")
        .map(num => String.fromCharCode(modPow(parseInt(num), d, n)))
        .join("");
}