const getData = async (onSuccess, onError) => {
  let response;

  try {
    response = await fetch('https://25.javascript.pages.academy/keksobooking/data');

    if (response && response.ok) {
      return onSuccess(await response.json());
    } else {
      onError('Произошла ошибка загрузки данных, попробуйте обновить страницу');
    }
  } catch (err) {
    onError(`${err} - Не удалось загрузить данные, попробуйте обновить страницу`);
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
