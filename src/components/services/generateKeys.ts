import { gcd } from "../utils/gcd";
import { getRandomPrime } from "../utils/getRandomPrime";
import { modInverse } from "../utils/modInverse";


export function generateKeys() {
    const min = 100, max = 500; // Range bilangan prima
    const p = getRandomPrime(min, max);
    let q = getRandomPrime(min, max);
    while (p === q) {
        q = getRandomPrime(min, max);
    }

    const n = p * q;
    const phi = (p - 1) * (q - 1);

    let e = 65537; // Public exponent (standar umum)
    while (gcd(e, phi) !== 1) {
        e = getRandomPrime(2, phi - 1);
    }

    const d = modInverse(e, phi);

    return {
        publicKey: { e, n },
        privateKey: { d, n },
    };
}