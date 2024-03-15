import {createElement, isEscapeKey} from '../util.js';

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const bigPictureContainerElement = document.querySelector('.big-picture');

const createBigPictureComment = (profile) => {
  const commentsList = bigPictureContainerElement.querySelector('.social__comments');

  commentsList.innerHTML = '';
  const commentElLi = createElement('li', 'social__comment');
  const commentElImg = createElement('img', 'social__picture');
  const commentElP = createElement('p', 'social__text');

  profile.comments.forEach(({avatar, name, message}) => {
    const fragment = document.createDocumentFragment();

    commentElImg.src = avatar;
    commentElImg.alt = name;
    commentElP.textContent = message;

    commentElLi.append(commentElImg);
    commentElLi.append(commentElP);
    fragment.append(commentElLi);
    commentsList.append(fragment);
  });

  return commentsList;
};

const createBigPictureSocial = (profile) => {
  const commentShowCount = bigPictureContainerElement.querySelector('.social__comment-shown-count');
  const commentTotalCount = bigPictureContainerElement.querySelector('.social__comment-total-count');
  const commentList = bigPictureContainerElement.querySelectorAll('.social__comment');
  const likesCount = bigPictureContainerElement.querySelector('.likes-count');
  const socialCaption = bigPictureContainerElement.querySelector('.social__caption');

  socialCaption.textContent = profile.description;
  likesCount.textContent = profile.likes;
  commentShowCount.textContent = commentList.length;
  commentTotalCount.textContent = profile.comments.length;

  createBigPictureComment(profile);
};

const renderBigPicture = (photo) => {
  const bigPictureImg = bigPictureContainerElement.querySelector('.big-picture__img > img');

  bigPictureImg.src = photo.url;

  createBigPictureSocial(photo);
};

function openBigPicture (photoProfile) {
  bigPictureContainerElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureContainerElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureContainerElement.querySelector('.comments-loader').classList.add('hidden');


  document.addEventListener('keydown', onDocumentKeydown);

  renderBigPicture(photoProfile);
}

function closeBigPicture () {
  bigPictureContainerElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureContainerElement.querySelector('.social__comment-count').classList.remove('hidden');
  bigPictureContainerElement.querySelector('.comments-loader').classList.remove('hidden');
}

export { openBigPicture, closeBigPicture };
