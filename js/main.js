const getRandomNumberInteger = (minNum, maxNum) => {
  if (minNum < 0 || maxNum < 0) {
    throw new Error('Числа не должны быть отрицательными');
  }
  if (minNum > maxNum) {
    throw new Error('Диапазон "от" и "до" задан неверно');
  }
  minNum = Math.ceil(minNum);
  maxNum = Math.floor(maxNum);
  return Math.floor(minNum + Math.random() * (maxNum - minNum + 1));
};

getRandomNumberInteger(1, 10);

const getRandomNumberFloat = (minNum, maxNum, decimal) => {
  if (minNum < 0 || maxNum < 0) {
    throw new Error('Числа не должны быть отрицательными');
  }
  if (minNum > maxNum) {
    throw new Error('Диапазон "от" и "до" задан неверно');
  }
  return parseFloat((minNum + Math.random() * (maxNum - minNum + 1)).toFixed(decimal));
};

getRandomNumberFloat(1, 10, 5);
