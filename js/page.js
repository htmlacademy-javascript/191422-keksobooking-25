const noticeForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');

const toggleDisabledElements = (elements) => {
  for (const element of elements) {
    element.disabled = element.disabled !== true;
  }
};

const setPageInactive = () => {
  noticeForm.classList.add('ad-form--disabled');
  toggleDisabledElements(noticeForm.children);

  filtersForm.classList.add('map__filters--disabled');
  toggleDisabledElements(filtersForm.children);
};

const setPageActive = () => {
  noticeForm.classList.remove('ad-form--disabled');
  toggleDisabledElements(noticeForm.children);

  filtersForm.classList.remove('map__filters--disabled');
  toggleDisabledElements(filtersForm.children);
};

export {setPageInactive, setPageActive};
