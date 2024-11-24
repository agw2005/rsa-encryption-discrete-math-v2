// Kaidah Menghitung: Check if a number is prime
export function isPrime(num: bigint): boolean {
    if (num <= 1n) return false;
    if (num <= 3n) return true;
    if (num % 2n === 0n || num % 3n === 0n) return false;

    for (let i = 5n; i * i <= num; i += 6n) {
        if (num % i === 0n || num % (i + 2n) === 0n) return false;
    }
    return true;
}

// Kaidah Menghitung: Generate a random prime number within a range
export function getRandomPrime(min: bigint, max: bigint): bigint {
    const getRandombigint = (min: bigint, max: bigint): bigint =>
        BigInt(Math.floor(Math.random() * Number(max - min + 1n))) + min;

    let num = getRandombigint(min, max);
    while (!isPrime(num)) {
        num = getRandombigint(min, max);
    }
    return num;
}

// Relasi Rekursif: Extended Euclidean Algorithm for Modular Inverse
export function modInverse(e: bigint, phi: bigint): bigint {
    const extendedGCD = (a: bigint, b: bigint): [bigint, bigint, bigint] => {
        if (a === 0n) return [b, 0n, 1n];
        const [gcd, x1, y1] = extendedGCD(b % a, a);
        return [gcd, y1 - (b / a) * x1, x1];
    };

    const [gcd, x] = extendedGCD(e, phi);
    if (gcd !== 1n) throw new Error("No modular inverse");
    return (x % phi + phi) % phi;
}

// Kaidah Menghitung & Induksi Matematik: Modular Exponentiation
export function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
    if (modulus === 0n) {
        throw new Error("Modulus cannot be zero");
    }
    if (modulus === 1n) return 0n;
    let result = 1n;
    base = base % modulus;

    while (exponent > 0n) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus;
        }
        base = (base * base) % modulus;
        exponent = exponent / 2n;
    }
    return result;
}

// Permutasi dan Kombinasi: Generate RSA keys
export function generateKeys() {
    // Using smaller primes for testing
    const p = 61n; // Small prime
    const q = 53n; // Small prime

    const n = p * q; // Modulus
    const phi = (p - 1n) * (q - 1n); // Euler's totient

    const e = 65537n; // Standard public exponent
    if (gcd(e, phi) !== 1n) {
        throw new Error("Failed to generate valid RSA keys.");
    }

    const d = modInverse(e, phi);

    return {
        publicKey: { e: e.toString(), n: n.toString() },
        privateKey: { d: d.toString(), n: n.toString() },
    };
}

// Calculate GCD (helper for Permutasi dan Kombinasi)
function gcd(a: bigint, b: bigint): bigint {
    while (b !== 0n) {
        [a, b] = [b, a % b];
    }
    return a;
}

// Encrypt a message
export function encrypt(message: string, publicKey: { e: string; n: string }): string {
    const e = BigInt(publicKey.e);
    const n = BigInt(publicKey.n);

    console.log("Encrypting with e:", e, "n:", n);

    return message
        .split("")
        .map(char => {
            const charCode = BigInt(char.charCodeAt(0));
            console.log("Encrypting charCode:", charCode);
            return modPow(charCode, e, n).toString();
        })
        .join(" ");
}

// Decrypt a message
export function decrypt(ciphertext: string, privateKey: { d: string; n: string }): string {
    const d = BigInt(privateKey.d);
    const n = BigInt(privateKey.n);
    return ciphertext
        .split(" ")
        .map(num => String.fromCharCode(Number(modPow(BigInt(num), d, n))))
        .join("");
}
