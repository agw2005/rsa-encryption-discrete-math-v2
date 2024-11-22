import { isPrime } from "./isPrime";

export function getRandomPrime(min: number, max: number): number {
    const getRandomInt = (min: number, max: number) => 
        Math.floor(Math.random() * (max - min + 1)) + min;

    let num = getRandomInt(min, max);
    while (!isPrime(num)) {
        num = getRandomInt(min, max);
    }
    return num;
}