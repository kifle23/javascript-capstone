import getComments from './getComments.js';

export default class Popup {
  constructor() {
    this.popup = document.createElement('div');
    this.popup.classList.add('popup');
    this.popup.innerHTML = `
        <div class="popup__content">
            <div class="popup__header">
            <h3 class="popup__title"></h3>
            <button type="button" class="close popup__close " aria-label="Close">
                &times;</button>
            </div>
            <div class="popup__body">
            <img class="popup__cover-image" src="" alt="">
            <p class="popup__publish-year"> This book was published on </p>
            <p class="popup__description"></p>
            <h4 class="popup__comments-title">Comments <div class="comment-count"> </div></h4>
            
            <ul class="popup__comments"></ul>
            <div class="popup__new-comment">
            <input type="text" class="popup__new-comment-username" required placeholder="Your name">
            <textarea class="popup__new-comment-textarea" required placeholder="Add a comment..."></textarea>
            <button class="popup__new-comment-button btn" type="submit">Comment</button>
            </div>
            </div>
        </div>
        `;
    this.titleElement = this.popup.querySelector('.popup__title');
    this.coverImageElement = this.popup.querySelector('.popup__cover-image');
    this.commentsList = this.popup.querySelector('.popup__comments');
    this.popup.querySelector('.popup__close').addEventListener('click', () => {
      this.closeCommentsPopup();
    });
    this.popup.querySelector('.popup__new-comment-button').addEventListener('click', () => {
      this.addComment();
    });
  }

  // show the popup for a specific book
  showPopup(book) {
    this.titleElement.textContent = book.title;
    this.coverImageElement.src = book.coverImageUrl;
    this.coverImageElement.alt = book.title;
    this.popup.querySelector('.popup__publish-year').textContent = `This book was published on ${book.publishYear}`;
    this.popup.querySelector('.popup__description').textContent = book.description;
    document.body.appendChild(this.popup);
  }

  // dsplay the comments for a specific book
    displayComments(comments) {
    this.commentsList.innerHTML = '';
    comments.forEach((comment) => {
        const commentElement = document.createElement('li');
        commentElement.classList.add('popup__comment');
        commentElement.innerHTML = `<span>${comment.username}</span>: ${comment.comment}`;
        this.commentsList.appendChild(commentElement);
    });
    this.popup.querySelector('.comment-count').textContent = `...(${comments.length})`;
    }

  // close the popup
  closeCommentsPopup() {
    this.popup.remove();
  }

  // add a comment to the popup with username that swhod be entered by the user
  addComment() {
    const comment = document.querySelector('.popup__new-comment-textarea').value;
    const username = document.querySelector('.popup__new-comment-username').value;
    // check if the user entered a comment and a username
    if (!comment || !username) {
        // show a popup with an error message
        return;
    }
    const commentElement = document.createElement('li');
    commentElement.classList.add('popup__comment');
    commentElement.innerHTML = `<span>${username}</span>: ${comment}`;
    this.popup.querySelector('.popup__comments').appendChild(commentElement);
    document.querySelector('.popup__new-comment-textarea').value = '';
    document.querySelector('.popup__new-comment-username').value = '';
  }
}