const noticeForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');

const page = {
  setInactive() {
    noticeForm.classList.add('ad-form--disabled');
    this._toggleDisabledElements(noticeForm.children);

    filtersForm.classList.add('map__filters--disabled');
    this._toggleDisabledElements(filtersForm.children);
  },

  setActive() {
    noticeForm.classList.remove('ad-form--disabled');
    this._toggleDisabledElements(noticeForm.children);

    filtersForm.classList.remove('map__filters--disabled');
    this._toggleDisabledElements(filtersForm.children);
  },

  _toggleDisabledElements(elements) {
    for (const element of elements) {
      element.disabled = element.disabled !== true;
    }
  }
};

export {page};
