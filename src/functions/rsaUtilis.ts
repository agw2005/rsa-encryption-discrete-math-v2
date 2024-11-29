// Fungsi untuk mengecek apakah bilangan adalah prima
export function isPrime(num: bigint): boolean {
    if (num < 2n) return false; // Bilangan < 2 bukan prima
    if (num === 2n || num === 3n) return true; // 2 dan 3 adalah bilangan prima
    if (num % 2n === 0n || num % 3n === 0n) return false; // Kelipatan 2 atau 3 bukan prima

    // Menggunakan periksa faktor hingga akar kuadrat num
    for (let i = 5n; i * i <= num; i += 6n) {
        if (num % i === 0n || num % (i + 2n) === 0n) return false;
    }
    return true;
}

// Fungsi untuk mendapatkan bilangan prima acak dalam rentang tertentu
export function getRandomPrime(min: bigint, max: bigint): bigint {
    const getRandombigint = (min: bigint, max: bigint): bigint =>
        BigInt(Math.floor(Math.random() * Number(max - min + 1n))) + min;

    if (min > max) throw new Error("Min harus lebih kecil atau sama dengan Max");

    let candidate = getRandombigint(min, max);
    while (!isPrime(candidate)) {
        candidate = getRandombigint(min, max);
    }
    return candidate;
}

// Fungsi untuk menghitung GCD (Greatest Common Divisor)
function gcd(a: bigint, b: bigint): bigint {
    while (b !== 0n) {
        [a, b] = [b, a % b];
    }
    return a;
}

// Extended Euclidean Algorithm untuk invers modular
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

// Fungsi modular exponentiation
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

// Fungsi untuk menghasilkan kunci RSA
export function generateKeys() {
    const min = 100n, max = 500n; // Range bilangan prima
    const p = getRandomPrime(min, max);
    let q = getRandomPrime(min, max);
    while (p === q) {
        q = getRandomPrime(min, max);
    }

    const n = p * q; // Modulus
    const phi = (p - 1n) * (q - 1n); // Euler's totient

    let e = 65537n; // Eksponen publik (standar umum)
    while (gcd(e, phi) !== 1n) {
        e = getRandomPrime(2n, phi - 1n);
    }

    const d = modInverse(e, phi); // Eksponen privat

    return {
        publicKey: { e: e.toString(), n: n.toString() },
        privateKey: { d: d.toString(), n: n.toString() },
    };
}

// Fungsi untuk enkripsi pesan
export function encrypt(message: string, publicKey: { e: string; n: string }): string {
    const e = BigInt(publicKey.e);
    const n = BigInt(publicKey.n);

    return message
        .split("")
        .map(char => modPow(BigInt(char.charCodeAt(0)), e, n).toString())
        .join(" ");
}

// Fungsi untuk dekripsi pesan
export function decrypt(ciphertext: string, privateKey: { d: string; n: string }): string {
    const d = BigInt(privateKey.d);
    const n = BigInt(privateKey.n);

    return ciphertext
        .split(" ")
        .map(num => String.fromCharCode(Number(modPow(BigInt(num), d, n))))
        .join("");
}

// Contoh penggunaan
(function main() {
    const keys = generateKeys();
    console.log("Public Key:", keys.publicKey);
    console.log("Private Key:", keys.privateKey);

    const message = "Hello RSA!";
    console.log("Original Message:", message);

    const encrypted = encrypt(message, keys.publicKey);
    console.log("Encrypted Message:", encrypted);

    const decrypted = decrypt(encrypted, keys.privateKey);
    console.log("Decrypted Message:", decrypted);
})();
