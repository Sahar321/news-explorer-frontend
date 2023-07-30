const formatNumberWithLetterShortcut = (inputNumber) => {
  if (!inputNumber) return '';

  const abbreviations = [
    { value: 1e12, symbol: 'Holy Moses' },
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
  ];

  for (let i = 0; i < abbreviations.length; i += 1) {
    if (inputNumber >= abbreviations[i].value) {
      const scaledNumber = inputNumber / abbreviations[i].value;
      const formattedNumber = scaledNumber.toFixed(0);
      if (inputNumber === abbreviations[i].value) {
        return `${formattedNumber}${abbreviations[i].symbol}`; // if the number is exactly 1K, 1M, etc, return it as is
      }
      return `${formattedNumber}${abbreviations[i].symbol}+`; // if the number is exactly 1K/1M, etc, return it with a plus sign
    }
  }

  return inputNumber.toString();
};
/* eslint-disable import/prefer-default-export */
export { formatNumberWithLetterShortcut };
