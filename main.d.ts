declare module 'nodebwt' {
  import { Buffer } from 'buffer';

  export function encode(input: Buffer): { output: Buffer, index: number };
  export function decode(input: Buffer, index: number): Buffer;
}