function modInverse(e: number, phi: number): number {
  let [m0, y, x] = [phi, 0, 1];

  while (e > 1) {
    const q = Math.floor(e / phi);
    [e, phi] = [phi, e % phi];
    [x, y] = [y, x - q * y];
  }

  if (x < 0) x += m0;

  return x;
}

export default modInverse;
