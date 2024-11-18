function encrypt(message: number, publicKey: { e: number; n: number }): number {
  return Math.pow(message, publicKey.e) % publicKey.n;
}

export default encrypt;
