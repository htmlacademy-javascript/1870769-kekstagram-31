import { createElement, getQuerySelector } from '../util';

const bigPictureContainerElement = getQuerySelector(document, '.big-picture');
const buttonCommentsLoader = getQuerySelector(bigPictureContainerElement, '.social__comments-loader');
const commentsList = getQuerySelector(bigPictureContainerElement, '.social__comments');

const fragment = document.createDocumentFragment();

let count = 0;

const createComment = (comment) => {
  const commentLiEl = createElement('li', 'social__comment');
  const commentImgEl = createElement('img', 'social__picture');
  const commentParagraphEl = createElement('p', 'social__text');

  buttonCommentsLoader.classList.add('hidden');

  commentImgEl.alt = comment.name;
  commentImgEl.src = comment.avatar;
  commentParagraphEl.textContent = comment.message;

  commentLiEl.append(commentImgEl);
  commentLiEl.append(commentParagraphEl);
  fragment.append(commentLiEl);
};

const createBigPictureComment = ({ comments }) => {
  commentsList.innerHTML = '';

  comments.slice(0, 5).forEach(createComment);
  count = 5;

  commentsList.append(fragment);

  if (comments.length > 5) {
    buttonCommentsLoader.classList.remove('hidden');
  }

  buttonCommentsLoader.addEventListener('click', () => {
    const remainingComments = comments.slice(count, count + 5);

    remainingComments.forEach((comment) => {
      createComment(comment);
      count++;

      if (count >= comments.length) {
        buttonCommentsLoader.classList.add('hidden');
      }
    });
  });

  return commentsList;
};

export { createBigPictureComment };

