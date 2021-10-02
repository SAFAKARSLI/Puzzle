let piece = document.querySelector('.piece');
const pieces = document.querySelectorAll('.piece');
const parts = document.querySelectorAll('.part');
const submit = document.querySelector('.submit');
let gameOver = true;

submit.addEventListener('click', () => {
   for (let i = 0; i < parts.length; i++) {
      if (pieces[i].style.backgroundPosition !== parts[i].style.backgroundPosition) {
         gameOver = false;
      }
   }
   checkGame();
   gameOver = true;
})

function checkGame() {
   if (gameOver) {
      console.log('CONGRATSSS!!!!!')
   } else {
      console.log('NOT YET!!!')
   }
}

for (let i = 0; i > -400; i -= 200) {
   for (let j = 0; j > -400; j -= 200) {
      piece.style.backgroundImage = 'url(https://images.unsplash.com/photo-1631746363756-c4ad7e5bddb0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjUxMzA2Nw&ixlib=rb-1.2.1&q=80&w=400)'
      piece.style.backgroundPosition = `${j}px ${i}px`;
      piece.draggable = 'true';
      piece.addEventListener('dragstart', dragStart)
      piece.addEventListener('dragend', dragEnd)
      piece = piece.nextElementSibling;
   }
}

for (let piece of pieces) {
   piece.draggable = 'true';
}

for (let part of parts) {
   part.addEventListener('dragstart', dragStart)
   part.addEventListener('dragenter', dragEnter)
   part.addEventListener('dragleave', dragLeave)
   part.addEventListener('dragover', dragOver)
   part.addEventListener('drop', dragDrop)
   part.addEventListener('dragend', dragEnd)
   part.draggable = 'true';

}

let current = null;
const images = [];

function loadImage() {
   console.log(this)
}


function dragStart() {
   setTimeout(() => this.classList.add('invisible'), 0)
   this.removeEventListener('dragstart', () => { })
   current = this;
}

function dragEnd() {

}

function dragEnter(e) {
   e.preventDefault();
   this.classList.add('hovered');
}

function dragLeave() {
   this.classList.remove('hovered');
}

function dragOver(e) {
   e.preventDefault();
}

function dragDrop() {
   this.classList.remove('hovered')
   console.dir(this)
   this.style.backgroundImage = current.style.backgroundImage;
   this.style.backgroundPosition = current.style.backgroundPosition;

}




