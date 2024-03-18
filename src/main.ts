function encode(input: Buffer): { output: Buffer, index: number } {
  const rotations: Buffer[] = [];
  for (let i = 0; i < input.byteLength; i++) rotations.push(Buffer.concat([input.subarray(i), input.subarray(0, i)]));
  rotations.sort(Buffer.compare);
  const output: Buffer = Buffer.alloc(input.byteLength);
  for (let i = 0; i < input.byteLength; i++) output.writeUint8(rotations[i].readUint8(input.byteLength - 1), i);
  const index: number = rotations.findIndex((rotation: Buffer) => rotation.equals(input));
  return { output, index };
};

function decode(input: Buffer, index: number): Buffer {
  const rotations: Buffer[] = Array(input.byteLength).fill(Buffer.alloc(0));
  for (let i = 0; i < input.byteLength; i++) {
    for (let j = 0; j < input.byteLength; j++) rotations[j] = Buffer.concat([input.subarray(j, j + 1), rotations[j]]);
    rotations.sort(Buffer.compare);
  };
  return rotations[index];
};

module.exports = { encode, decode };