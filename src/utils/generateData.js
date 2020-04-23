const generateUniqueNum = (n) => {
  let arr = [];
  while (arr.length < n) {
    const r = Math.floor(Math.random() * 100) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
};

const generateDuplicateArrayPair = (n) => {
  const uniqueNumArray = generateUniqueNum(n);
  let duplicateUniqueNumArray = [...uniqueNumArray, ...uniqueNumArray];
  duplicateUniqueNumArray.sort(() => 0.5 - Math.random());
  return duplicateUniqueNumArray.map((item, index) => ({ value: item, id: index }));
};

export default generateDuplicateArrayPair;
