
export const truncate = (input: string, length: number) =>
  input.length > 40 ? `${input.substring(0, length)}...` : input;