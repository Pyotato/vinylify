/**
 *  배열의 길이를 maxSize 이상일 경우 로 잘라 이중배열로 반환
 */
const splitLengthyList = (items: string[], maxSize: number = 50) => {
  const list = [];
  let temp = [];
  for (const element of items) {
    if (temp.length === maxSize) {
      list.push(temp);
      temp = [];
    } else {
      temp.push(element);
    }
  }
  return list;
};

export default splitLengthyList;
