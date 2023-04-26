export default function pad(input: string, length: number): string {
  const { length: inputLength } = input;

  if (inputLength >= length) {
    return input;
  }

  const zeros: string = '0'.repeat(length - inputLength);

  return `${zeros}${input}`;
}
