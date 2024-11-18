import gcd from "./gcd";
import modInverse from "./modInverse";

function generateKeys(): {
  publicKey: { publicExponent: number; modulus: number };
  privateKey: { privateExponent: number; modulus: number };
} {
  const p = 61; // First prime number
  const q = 53; // Second prime number
  const modulus = p * q;
  const phi = (p - 1) * (q - 1);

  let publicExponent = 3;
  while (gcd(publicExponent, phi) !== 1) {
    publicExponent += 2; // Ensure publicExponent is relatively prime to phi
  }

  const privateExponent = modInverse(publicExponent, phi);

  return {
    publicKey: { publicExponent, modulus },
    privateKey: { privateExponent, modulus },
  };
}

export default generateKeys;
