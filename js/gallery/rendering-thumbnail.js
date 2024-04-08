import { setDiscussedClick, setRandomClick, setDefaultClick } from './filter-thumbnails.js';

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

const getRenderingThumbnail = (data) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

  setDefaultClick(getThumbnail);
  setRandomClick(getThumbnail);
  setDiscussedClick(getThumbnail);

  getThumbnail(data);
};

export { getRenderingThumbnail };
