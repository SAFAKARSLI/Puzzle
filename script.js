
const submit = document.querySelector('.submit');
const helperImage = document.querySelector('.helper-image')
const end = document.querySelector('.end')
let gameContinues = true;
const answer = [];
let pieces = null;
let parts = null;
let boxes = null;
let images = null;
let leftTable = null;
let rightTable = null;

// Game Settings Start

const start = document.querySelector('.start');
const pieceNum = document.getElementById('pieceNum')
const overlay = document.querySelector('.overlay')
const setup = document.getElementById('setup')


start.addEventListener('click', () => {
   overlay.classList.add('started')
   setup.classList.add('started')
   createElements();
})

helperImage.style.backgroundImage = "url(https://source.unsplash.com/random/400x400)";
helperImage.addEventListener('click', (e) => displayImage(e))



function createElements() {
   images = document.querySelectorAll('.image');
   leftTable = document.getElementById('leftTable')
   rightTable = document.getElementById('rightTable')

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
   pieces = document.querySelectorAll('.piece');

   for (let child of rightTable.children) {
      child.classList.add('part')
   }


   parts = document.querySelectorAll('.part')
   gameSetup();

}

function displayImage(elem) {
   elem.target.classList.toggle('bigger')
   overlay.classList.toggle('started')
}

function shuffle() {

   const randNumArr = [];
   let leftTablePieces = [...leftTable.children].map(child => {
      if (child.firstChild) {
         return child.firstChild;
      }
   }).filter(child => child)

   for (let i = 0; i < leftTablePieces.length; i++) {
      let rand = Math.floor(Math.random() * leftTablePieces.length);
      if (!randNumArr.includes(rand)) {
         randNumArr.push(rand);
      } else {
         i--;
      }
   }

   const trainsitionArr = [...leftTablePieces].map(piece => piece.style.backgroundPosition)
   leftTablePieces = leftTablePieces.map((child, index) => {
      child.style.backgroundPosition = trainsitionArr[randNumArr[index]];
   })
}

function gameSetup() {

   let flag = 0;
   let size = 400 / Math.pow(pieceNum.value, 0.5)
   for (let i = 0; i > -400; i -= size) {
      for (let j = 0; j > -400; j -= size) {
         var piece = pieces[flag]
         piece.style.width = `${size}px`
         piece.style.height = `${size}px`
         piece.style.backgroundImage = `${helperImage.style.backgroundImage}`;
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

   shuffle();

   for (let box of boxes) {
      box.addEventListener('dragenter', dragEnter)
      box.addEventListener('dragleave', dragLeave)
      box.addEventListener('dragover', dragOver)
      box.addEventListener('drop', dragDrop)
   }

   startTimer();
}

function getTimer() {
   return timer.innerText
}

let intervalId;
let timer = document.getElementById('timer')
function startTimer() {
   let time = timer.innerText.split(':')
   let min = 0;
   let sec = 0;
   intervalId = setInterval(() => {
      if (sec == 59) {
         sec = 0;
         time[1] = '00'
         min++;
      } else {
         sec++
      }
      time[0] = time[0].slice(0, -(min.toString().length)) + min.toString();
      time[1] = time[1].slice(0, -(sec.toString().length)) + sec.toString();
      timer.innerText = time.join(':')
   }, 1000)
}


function stopTimer(intervalId) {
   clearInterval(intervalId);
}

// Game Settings End

function checkGame(gameContinues) {

   for (let i = 0; i < parts.length; i++) {
      if (parts[i].firstChild) {
         if (parts[i].firstChild.style.backgroundPosition != answer[i]) gameContinues = false;
      } else {
         gameContinues = false;
      }
   }
   if (gameContinues) {
      stopTimer(intervalId);
      overlay.classList.remove('started')
      end.classList.add('active')
      document.querySelector('#duration').innerText += getTimer();
   }
}

document.querySelector('#replay').addEventListener('click', function () { location.reload() });


submit.addEventListener('click', () => {
   shuffle();
   gameContinues = true;
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
   checkGame(gameContinues)
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




// Click answer image and display it bigger
// Double click event for each piece, display bigger

