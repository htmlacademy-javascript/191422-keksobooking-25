const getRandomNumber = (minNum, maxNum) => {
  if (minNum < 0 || maxNum < 0) {
    throw new Error('Числа не должны быть отрицательными');
  }
  if (minNum > maxNum) {
    throw new Error('Диапазон "от" и "до" задан неверно');
  }
  return minNum + Math.random() * (maxNum - minNum + 1);
};

const getRandomNumberInteger = (minNum, maxNum) => {
  minNum = Math.ceil(minNum);
  maxNum = Math.floor(maxNum);
  return Math.floor(getRandomNumber(minNum, maxNum));
};

getRandomNumberInteger(1, 10);

const getRandomNumberFloat = (minNum, maxNum, decimal = 1) => parseFloat(getRandomNumber(minNum, maxNum).toFixed(decimal));

getRandomNumberFloat(1, 10, 5);
