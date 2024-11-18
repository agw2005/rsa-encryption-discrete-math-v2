function encryptString(
  message: string,
  publicKey: { publicExponent: number; modulus: number }
): number[] {
  return message.split("").map((char) => {
    const charCode = char.charCodeAt(0);
    return Math.pow(charCode, publicKey.publicExponent) % publicKey.modulus;
  });
}

export default encryptString;
