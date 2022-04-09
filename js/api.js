const getData = async (onSuccess, onError) => {
  let response;

  try {
    response = await fetch('https://25.javascript.pages.academy/keksobooking/data');

    if (response && response.ok) {
      return onSuccess(await response.json());
    }

    throw new Error(`${response.statusText} - Произошла ошибка, попробуйте перезагрузить страницу`);
  } catch (err) {
    onError(err);
  }
};

const sendData = async (onSuccess, onError, body) => {
  let response;

  try {
    response = await fetch('https://25.javascript.pages.academy/keksobooking', {
      method: 'POST',
      body,
    });

    if (response && response.ok) {
      return onSuccess();
    }

    throw new Error(`${response.statusText} - Не удалось отправить форму. Попробуйте ещё раз`);
  } catch (err) {
    onError(err);
  }
};

export {getData, sendData};
