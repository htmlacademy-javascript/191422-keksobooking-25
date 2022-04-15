import {util} from './util.js';

const modalSuccessTemplateNode = document.querySelector('#success').content.querySelector('.success');
const modalErrorTemplateNode = document.querySelector('#error').content.querySelector('.error');

class FormModal {
  constructor(modalTemplate) {
    this._modal = modalTemplate.cloneNode(true);
    this._onEscPressed = (evt) => {
      if (util.isEscapeKey(evt)) {
        evt.preventDefault();
        this.close();
      }
    };
    this._modal.style.display = 'none';
    this._modal.addEventListener('click', () => this.close());
    document.body.appendChild(this._modal);
  }

  open() {
    this._modal.style.display = '';
    document.addEventListener('keydown', this._onEscPressed);
  }

  close() {
    this._modal.style.display = 'none';
    document.removeEventListener('keydown', this._onEscPressed);
  }
}

const modalSuccess = new FormModal(modalSuccessTemplateNode);
const modalError = new FormModal(modalErrorTemplateNode);

export {modalSuccess, modalError};
