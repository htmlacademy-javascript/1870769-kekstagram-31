const pictureContainerElement = document.querySelector('.pictures');
const pictureTeamplate = document.querySelector('#picture').content.querySelector('.picture');

const createPicture = ({ url, description, likes, comments }) => {
  const picture = pictureTeamplate.cloneNode(true);

  const pictureImg = picture.querySelector('.picture__img');
  const pictureLikes = picture.querySelector('.picture__likes');
  const pictureComments = picture.querySelector('.picture__comments');

  pictureImg.src = url;
  pictureImg.alt = description;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;

  return picture;
};

const getRenderingThumbnail = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach((dataElement) => {
    fragment.append(createPicture(dataElement));
  });

  pictureContainerElement.append(fragment);
};

export { getRenderingThumbnail };
