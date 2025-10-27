export const splitLengthyText = (text: string, splitIndex: number = 16) => {
  return text.slice(0, splitIndex) + (text.length > splitIndex ? '...' : '');
};
