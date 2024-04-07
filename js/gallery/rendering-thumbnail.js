import { setDiscussedClick, setRandomClick, setDefaultClick } from './filter-thumbnails.js';
import { debounce } from '../util.js';

const TIMEOUT_DELAY = 500;

const pictureContainerElement = document.querySelector('.pictures');
const pictureTeamplate = document.querySelector('#picture').content.querySelector('.picture');

const createPicture = ({ url, description, likes, comments, id }) => {
  const picture = pictureTeamplate.cloneNode(true);

  const pictureImgElement = picture.querySelector('.picture__img');
  const pictureLikesElement = picture.querySelector('.picture__likes');
  const pictureCommentsElement = picture.querySelector('.picture__comments');

  picture.href = url;
  picture.dataset.id = id;

  pictureImgElement.src = url;
  pictureImgElement.alt = description;
  pictureLikesElement.textContent = likes;
  pictureCommentsElement.textContent = comments.length;

  return picture;
};

const getThumbnail = (data) => {
  document.querySelectorAll('.picture').forEach((value) => value.remove());
  const fragment = document.createDocumentFragment();

  data.slice().forEach((dataElement) => {
    fragment.append(createPicture(dataElement));
  });

  pictureContainerElement.append(fragment);
};

const renderThumbnailsDebounced = debounce(getThumbnail, TIMEOUT_DELAY);

const getRenderingThumbnail = (data) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

  getThumbnail(data);

  setDefaultClick((defaultData) => renderThumbnailsDebounced(defaultData));
  setRandomClick((randomData) => renderThumbnailsDebounced(randomData));
  setDiscussedClick((sortedData) => renderThumbnailsDebounced(sortedData));

};

export { getRenderingThumbnail };
