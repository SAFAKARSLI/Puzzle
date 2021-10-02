const pieces = document.querySelectorAll('.piece');
const parts = document.querySelectorAll('.part');
const submit = document.querySelector('.submit');
let gameOver = true;
const answer = [];

function checkGame() {
   if (gameOver) {
      console.log('CONGRATSSS!!!!!')
   } else {
      console.log('NOT YET!!!')
   }
}


let flag = 0;
for (let i = 0; i > -400; i -= 200) {
   for (let j = 0; j > -400; j -= 200) {
      var piece = pieces[flag]
      piece.style.backgroundImage = 'url(https://source.unsplash.com/random/400x400)'
      piece.style.backgroundPosition = `${j}px ${i}px`;
      piece.draggable = 'true';
      piece.addEventListener('dragstart', dragStart)
      piece.addEventListener('dragend', dragEnd)
      piece = pieces[flag++]

   }
}

for (let piece of pieces) {
   answer.push(piece.style.backgroundPosition)
}

submit.addEventListener('click', () => {
   for (let i = 0; i < parts.length; i++) {
      if (parts[i].firstChild.style.backgroundPosition !== answer[i]) gameOver = false;
   }
   checkGame();
   gameOver = true;
})


for (let part of parts) {
   part.addEventListener('dragenter', dragEnter)
   part.addEventListener('dragleave', dragLeave)
   part.addEventListener('dragover', dragOver)
   part.addEventListener('drop', dragDrop)
}

let current = null;
let lastParent = null;

function dragStart() {
   lastParent = this.parentNode;
   if (this.classList.contains('piece')) {
      setTimeout(() => this.parentNode.removeChild(this), 1)
      current = this;
   }
}

function dragEnd() {
   if (this.parentNode === null) {
      lastParent.append(this)
   }
   lastParent = null;

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
   if (current && this.childElementCount === 0) {
      this.append(current)
   }
   current = null;

}




