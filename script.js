
const submit = document.querySelector('.submit');
let gameOver = true;
const answer = [];
let pieces = null;
let parts = null;
let boxes = null;

// Game Settings Start

const start = document.getElementById('start');
const pieceNum = document.getElementById('pieceNum')
const overlay = document.querySelector('.overlay')
const setup = document.getElementById('setup')

start.addEventListener('click', () => {
   overlay.classList.add('started')
   setup.classList.add('started')
   createElements();

})

function createElements() {
   const images = document.querySelectorAll('.image');
   const leftTable = document.getElementById('leftTable')
   const rightTable = document.getElementById('rightTable')

   images.forEach(image => {
      for (let i = 0; i < pieceNum.value; i++) {
         const element = document.createElement('div')
         element.classList.add('box')
         image.append(element);
      }
   })

   boxes = document.querySelectorAll('.box')
   boxes.forEach(box => {
      box.style.width = `${400 / Math.pow(pieceNum.value, 0.5)}px`
      box.style.height = `${400 / Math.pow(pieceNum.value, 0.5)}px`
   })

   for (let child of leftTable.children) {
      const elem = document.createElement('div')
      elem.classList.add('piece')
      child.append(elem)
   }

   for (let child of rightTable.children) {
      child.classList.add('part')
   }

   pieces = document.querySelectorAll('.piece');
   parts = document.querySelectorAll('.part')
   gameSetup();
}




function gameSetup() {

   let flag = 0;
   let size = 400 / Math.pow(pieceNum.value, 0.5)
   for (let i = 0; i > -400; i -= size) {
      for (let j = 0; j > -400; j -= size) {
         var piece = pieces[flag]
         piece.style.width = `${size}px`
         piece.style.height = `${size}px`
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

   for (let box of boxes) {
      box.addEventListener('dragenter', dragEnter)
      box.addEventListener('dragleave', dragLeave)
      box.addEventListener('dragover', dragOver)
      box.addEventListener('drop', dragDrop)
   }


}

// Game Settings End

function checkGame() {
   if (gameOver) {
      console.log('CONGRATSSS!!!!!')
   } else {
      console.log('NOT YET!!!')
   }
}


submit.addEventListener('click', () => {
   for (let i = 0; i < parts.length; i++) {
      if (parts[i].firstChild.style.backgroundPosition !== answer[i]) gameOver = false;
   }
   checkGame();
   gameOver = true;
})



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





