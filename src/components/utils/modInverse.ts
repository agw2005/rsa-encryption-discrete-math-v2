export function modInverse(e: number, phi: number): number {
    const extendedGCD = (a: number, b: number): [number, number, number] => {
        if (a === 0) return [b, 0, 1];
        const [gcd, x1, y1] = extendedGCD(b % a, a);
        return [gcd, y1 - Math.floor(b / a) * x1, x1];
    };

    const [gcd, x] = extendedGCD(e, phi);
    if (gcd !== 1) throw new Error("No modular inverse");
    return (x % phi + phi) % phi;
}