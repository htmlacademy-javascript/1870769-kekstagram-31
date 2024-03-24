import { openUploadForm } from './open-close-form.js';
import './validation-form.js';

document.querySelector('.img-upload__input').addEventListener('change', () => {
  openUploadForm();
});
