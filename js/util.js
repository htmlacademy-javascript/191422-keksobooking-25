const util = {
  getRandomNumberInteger(a, b) {
    const minNum = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
    const maxNum = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
  },

  getRandomNumberFloat(a, b, decimal = 1) {
    const minNum = Math.min(Math.abs(a), Math.abs(b));
    const maxNum = Math.max(Math.abs(a), Math.abs(b));
    return parseFloat((Math.random() * (maxNum - minNum) + minNum).toFixed(decimal));
  },

  getRandomArrayElement(elements) {
    return  elements[this.getRandomNumberInteger(0, elements.length - 1)];
  },

  setEndWord(number, words) {
    const cases = [2, 0, 1, 1, 1, 2];
    if (number % 100 > 4 && number % 100 < 20) {
      return words[2];
    }
    if (number % 10 < 5) {
      return words[cases[number % 10]];
    }
    return words[cases[5]];
  },

  isEscapeKey(evt) {
    return evt.key === 'Escape';
  },

  showAlert(message) {
    const alertContainer = document.createElement('div');
    alertContainer.style.zIndex = 100;
    alertContainer.style.position = 'absolute';
    alertContainer.style.left = 0;
    alertContainer.style.top = 0;
    alertContainer.style.right = 0;
    alertContainer.style.padding = '10px 3px';
    alertContainer.style.fontSize = '20px';
    alertContainer.style.textAlign = 'center';
    alertContainer.style.backgroundColor = 'red';

    alertContainer.textContent = message;

    document.body.append(alertContainer);

    setTimeout(() => {
      alertContainer.remove();
    }, 5000);
  },

  debounce(callback, timeoutDelay = 500) {
    let timeoutId;

    return (...rest) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
    };
  }
};

export {util};
