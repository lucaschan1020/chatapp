const leadingZero = (num: number, size: number) => {
  let leadingZeroNum = num.toString();
  while (leadingZeroNum.length < size) leadingZeroNum = '0' + leadingZeroNum;
  return leadingZeroNum;
};

export default leadingZero;
