function generateBigPrimeNumber(): number{  //bilangan prima
    
    function isPrime(num: number): boolean { //coprime number
        if (num <= 1) return false;
        if (num <= 3) return true;

        if (num % 2 === 0 || num % 3 === 0) return false;

        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }

        return true;
    }

    function generateBigNumber(): number{
        const [max,min] = [100, 300]; //2^8 - 1 = 256
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let x = generateBigNumber();
    while(!isPrime(x)){
        x = generateBigNumber();
    }
    return x;
}

function generatePandQ(): [number, number]{
    let [p,q] = [generateBigPrimeNumber() , generateBigPrimeNumber()];
    while(p*q >= 65535){ //2^16 - 1 = 65535  -----> 16bit RSA keys
        [p,q] = [generateBigPrimeNumber() , generateBigPrimeNumber()]
    }
    return [p,q]
}

function generateN(p: number, q: number){
    return p*q;
}

function generatePhi(p: number, q: number): number{ //phi Euler
    return (p-1)*(q-1)
}

function gcdImportant(a: number, b: number): number { //gcd
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function findCoprime(n: number): number[]{ //coprime number
    let arrCoprime: number[] = [];
    for(let i = 2 ; i < n ; i++){
        if(gcdImportant(n,i) == 1){ //gcd
            arrCoprime.push(i);
        }
    }
    return arrCoprime
}

function findSharedValues(arr1: number[], arr2: number[]): number[] {
    return arr1.filter(value => arr2.includes(value));
}

function findE(n: number, phiN: number): number {
    const coprimeOfN = findCoprime(n);
    const coprimeOfPhiN = findCoprime(phiN);
    const sharedCoprime = findSharedValues(coprimeOfN, coprimeOfPhiN);
    let candidateIndex = Math.floor(Math.random() * (sharedCoprime.length - Math.floor(sharedCoprime.length/2) + 1)) + Math.floor(sharedCoprime.length/2)
    return sharedCoprime[candidateIndex];
}

function findD(e: number, phiN: number): number {
    let [m0, x0, x1] = [phiN, 0, 1];

    while (e > 1) {
        let q = Math.floor(e / phiN);
        [phiN, e] = [e % phiN, phiN];
        [x0, x1] = [x1 - q * x0, x0];
    }

    return x1 < 0 ? x1 + m0 : x1;
}

function generateModulusAndPhiN(): [number, number]{
    const [p,q] = generatePandQ();
    return [generateN(p,q), generatePhi(p,q)];
}

export function generateRSAKeys(): [number, number, number]{
    const [modulus, phiModulus] = generateModulusAndPhiN();
    const publicExponent = findE(modulus, phiModulus);
    const privateExponent = findD(publicExponent, phiModulus);
    return [modulus, publicExponent, privateExponent];
}

function modExp(base: number, exp: number, mod: number): number {
    let result = 1;
    base = base % mod;

    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }

        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }

    return result;
}

function mergeEncryptedMessage(message: number[]){
    return message.map(num => num.toString()).join(':');
}

export function encrypt(message: string, publicKey: { e: string; n: string }): string {
    const e = Number(publicKey.e);
    const n = Number(publicKey.n);
    let encryptedMessage: number[] = [];
    for (let i = 0; i < message.length; i++) {
        const char = Number(message.charCodeAt(i));
        const encrypted = modExp(Number(char), Number(e), Number(n)); 
        encryptedMessage.push(encrypted);
    }
    return mergeEncryptedMessage(encryptedMessage);
}

function reverseEncryptedMessage(message: string): number[] {
    return message.split(':').map(num => parseInt(num, 10));
}

export function decrypt(ciphertext: string, privateKey: { d: string; n: string }): string {
    const d = Number(privateKey.d);
    const n = Number(privateKey.n);
    let encryptedMessage = reverseEncryptedMessage(ciphertext);
    let decryptedMessage = "";
    for (let i = 0; i < encryptedMessage.length; i++) {
        const decrypted = modExp(Number(encryptedMessage[i]), Number(d), Number(n)); 
        decryptedMessage += String.fromCharCode(decrypted); 
    }
    return decryptedMessage;
}

export function generateKeys() {
    const [n, e, d] = generateRSAKeys();
    return {
        publicKey: { e: e.toString(), n: n.toString() },
        privateKey: { d: d.toString(), n: n.toString() },
    };
}