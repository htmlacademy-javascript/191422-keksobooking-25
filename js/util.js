const getRandomNumberInteger = (a, b) => {
  const minNum = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const maxNum = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
};

const getRandomNumberFloat = (a, b, decimal = 1) => {
  const minNum = Math.min(Math.abs(a), Math.abs(b));
  const maxNum = Math.max(Math.abs(a), Math.abs(b));
  return parseFloat((Math.random() * (maxNum - minNum) + minNum).toFixed(decimal));
};

const getRandomArrayElement = (elements) => elements[getRandomNumberInteger(0, elements.length - 1)];

const setEndWord = (number, words) => words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomNumberInteger, getRandomNumberFloat, getRandomArrayElement, setEndWord, isEscapeKey};
