const noticeFormNode = document.querySelector('.ad-form');
const filtersFormNode = document.querySelector('.map__filters');

const page = {
  setInactive() {
    noticeFormNode.classList.add('ad-form--disabled');
    this._toggleDisabledElements(noticeFormNode.children);

    filtersFormNode.classList.add('map__filters--disabled');
    this._toggleDisabledElements(filtersFormNode.children);
  },

  setActive() {
    noticeFormNode.classList.remove('ad-form--disabled');
    this._toggleDisabledElements(noticeFormNode.children);

    filtersFormNode.classList.remove('map__filters--disabled');
    this._toggleDisabledElements(filtersFormNode.children);
  },

  _toggleDisabledElements(elements) {
    for (const element of elements) {
      element.disabled = element.disabled !== true;
    }
  }
};

export {page};
