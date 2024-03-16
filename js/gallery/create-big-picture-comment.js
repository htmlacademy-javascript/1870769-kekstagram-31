import { getQuerySelector } from '../util';

let count = 0;
let showMoreCommentsCallback = null;

const STEP_ADD_COMMENT = 5;

const bigPictureContainerElement = getQuerySelector(document, '.big-picture');
const buttonCommentsLoaderElement = getQuerySelector(bigPictureContainerElement, '.social__comments-loader');
const socialCommentTemplate = getQuerySelector(bigPictureContainerElement, '.social__comment');

const createComment = (comment, fragment) => {
  const socialComment = socialCommentTemplate.cloneNode(true);

  getQuerySelector(socialComment, '.social__text').textContent = comment.message;
  getQuerySelector(socialComment, '.social__picture').alt = comment.name;
  getQuerySelector(socialComment, '.social__picture').src = comment.avatar;

  fragment.append(socialComment);
};

const generateShowMoreCallback = ({ comments, fragment, commentsList }) => () => {
  const remainingComments = comments.slice(count, count + STEP_ADD_COMMENT);
  count += STEP_ADD_COMMENT;

  remainingComments.forEach((comment) => {
    createComment(comment, fragment);
    commentsList.append(fragment);
  });

  const commentShowLength = document.querySelectorAll('.social__comment').length;

  getQuerySelector(bigPictureContainerElement, '.social__comment-shown-count').textContent = commentShowLength;

  if (commentShowLength >= comments.length) {
    buttonCommentsLoaderElement.classList.add('hidden');
  } else {
    buttonCommentsLoaderElement.classList.remove('hidden');
  }
};

const createBigPictureComment = ({ comments }) => {
  const commentsList = getQuerySelector(bigPictureContainerElement, '.social__comments');
  const fragment = document.createDocumentFragment();

  commentsList.innerHTML = '';

  count += STEP_ADD_COMMENT;

  const initialComments = comments.slice(0, count);
  initialComments.forEach((comment) => createComment(comment,fragment));
  commentsList.append(fragment);

  if (initialComments.length >= comments.length) {
    buttonCommentsLoaderElement.classList.add('hidden');
  } else {
    buttonCommentsLoaderElement.classList.remove('hidden');
  }

  getQuerySelector(bigPictureContainerElement, '.social__comment-shown-count').textContent = initialComments.length;
  showMoreCommentsCallback = generateShowMoreCallback({ comments, fragment, commentsList, initialComments });
  buttonCommentsLoaderElement.addEventListener('click', showMoreCommentsCallback);

  return commentsList;
};

const clearComments = () => {
  buttonCommentsLoaderElement.removeEventListener('click', showMoreCommentsCallback);
  showMoreCommentsCallback = null;
  count = 0;
};

export { createBigPictureComment, clearComments };

