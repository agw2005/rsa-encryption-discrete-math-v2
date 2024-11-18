function decryptString(
  encrypted: number[],
  privateKey: { privateExponent: number; modulus: number }
): string {
  return encrypted
    .map((num) => {
      const decryptedCharCode =
        Math.pow(num, privateKey.privateExponent) % privateKey.modulus;
      return String.fromCharCode(decryptedCharCode);
    })
    .join("");
}

export default decryptString;
