function decrypt(
  encrypted: number,
  privateKey: { d: number; n: number }
): number {
  return Math.pow(encrypted, privateKey.d) % privateKey.n;
}

export default decrypt;
