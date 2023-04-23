let replies = document.querySelector('.replies');
replies.style.visibility = 'hidden';

let toggle_reply = document.querySelector('#toggle_reply');

toggle_reply.addEventListener('click', function () {
  if (replies.style.visibility === 'hidden') {
    replies.style.visibility = 'visible';
  }
  else {
    replies.style.visibility = 'hidden';
  }
});