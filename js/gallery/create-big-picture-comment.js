const STEP_ADD_COMMENT = 5;

const bigPictureContainerElement = document.querySelector('.big-picture');
const buttonCommentsLoaderElement = bigPictureContainerElement.querySelector('.social__comments-loader');
const socialCommentTemplate = bigPictureContainerElement.querySelector('.social__comment');

let count = 0;
let showMoreCommentsCallback = null;

const createComment = (comment, fragment) => {
  const socialComment = socialCommentTemplate.cloneNode(true);

  socialComment.querySelector('.social__text').textContent = comment.message;
  socialComment.querySelector('.social__picture').alt = comment.name;
  socialComment.querySelector('.social__picture').src = comment.avatar;

  fragment.append(socialComment);
};

const generateShowMoreCallback = ({ comments, fragment, commentsList }) => () => {
  const remainingComments = comments.slice(count, count + STEP_ADD_COMMENT);
  count += STEP_ADD_COMMENT;

  remainingComments.forEach((comment) => {
    createComment(comment, fragment);
    commentsList.append(fragment);
  });

  const commentShowLengthElements = bigPictureContainerElement.querySelectorAll('.social__comment').length;
  bigPictureContainerElement.querySelector('.social__comment-shown-count').textContent = commentShowLengthElements;

  if (commentShowLengthElements >= comments.length) {
    buttonCommentsLoaderElement.classList.add('hidden');
  } else {
    buttonCommentsLoaderElement.classList.remove('hidden');
  }
};

const createBigPictureComment = ({ comments }) => {
  const commentsList = bigPictureContainerElement.querySelector('.social__comments');
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

  bigPictureContainerElement.querySelector('.social__comment-shown-count').textContent = initialComments.length;
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

