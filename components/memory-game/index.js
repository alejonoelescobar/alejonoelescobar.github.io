// Variables
const totalCards = 30;
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
currentAttempts = 0;

let skillsUsed = [
  "Jest",
  "Python",
  "Git",
  "PostgreSQL",
  "Cloudinary",
  "Tailwind",
  "HTML",
  "CSS",
  "Next",
  "Node.js",
  "React",
  "Redux",
  "MongoDB",
  "Typescript",
  "Javascript",
];
let imagesUsed = [
  "jest.png",
  "Python.png",
  "github.png",
  "PostgreSQL.png",
  "Cloudinary.png",
  "Tailwind.png",
  "HTML.png",
  "CSS.png",
  "Next.js.png",
  "Node.js.png",
  "React.png",
  "Redux.png",
  "MongoDB.png",
  "Typescrypt.png",
  "JavaScript.png",
];

let cardtemplate =
  '<div class="card"><div class="back"></div><div class="face"></div></div>';


function activate(e) {
    if (currentMove < 2) {
        if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
            e.target.classList.add('active');
            selectedCards.push(e.target);

            if (++currentMove == 2) {
                currentAttempts++;
                document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

                const text1Element = selectedCards[0].querySelector('.hidden');
                const text2Element = selectedCards[1].querySelector('.hidden');

                if (text1Element && text2Element) {
                    const text1 = text1Element.innerText.trim();
                    const text2 = text2Element.innerText.trim();

                    if (text1 === text2) {
                        selectedCards = [];
                        currentMove = 0;
                    } else {
                        setTimeout(() => {
                            selectedCards[0].classList.remove('active');
                            selectedCards[1].classList.remove('active');
                            selectedCards = [];
                            currentMove = 0;
                        }, 600);
                    }
                } else {
                    console.error('Error: Element with class .hidden not found in selected cards');
                }
            }
        }
    }
}

for (let i = 0; i < totalCards; i++) {
  let div = document.createElement("div");
  div.innerHTML = cardtemplate;
  cards.push(div);
  document.querySelector("#memory-game").append(cards[i]);
  if (i < 15) {
    // Agerega las imagenes de las primeras 15 cartas con imágenes
    cards[i].querySelectorAll(
      ".face"
    )[0].innerHTML = `<img src="./public/icons/${imagesUsed[i]}" alt="${skillsUsed[i]}">`;
  } else {
    // Agrega los textos de las últimas 15 cartas con texto
    let index = i - 15;
    cards[i].querySelectorAll(
      ".face"
    )[0].innerHTML = `<div class="hidden" id="${skillsUsed[index]}">${skillsUsed[index]}</div>`;
  }

  cards[i].querySelectorAll(".card")[0].addEventListener("click", activate);
}

// Renderiza las cards con imagenes
for (let i = 0; i < 15; i++) {
  let div = document.createElement("div");
  div.innerHTML = cardtemplate;
  cards.push(div);
  document.querySelector("#memory-game").append(cards[i]);
  cards[i].querySelectorAll(
    ".face"
  )[0].innerHTML = `<div class="hidden" id=${skillsUsed[i]}>${skillsUsed[i]}</div ><img src="./public/icons/${imagesUsed[i]}", alt= "${skillsUsed[i]}">`;
  cards[i].querySelectorAll(".card")[0].addEventListener("click", activate);
}

// Renderiza las cards con textos
for (let i = 0; i < 15; i++) {
  let index = i + 15;
  let div = document.createElement("div");
  div.innerHTML = cardtemplate;
  cards.push(div);
  document.querySelector("#memory-game").append(cards[index]);
  cards[index].querySelectorAll(
    ".face"
  )[0].innerHTML = `<div class="hidden" id=${skillsUsed[i]}>${skillsUsed[i]}</div >${skillsUsed[i]}`;
  cards[index].querySelectorAll(".card")[0].addEventListener("click", activate);
}

// Función para mezclar las cartas
function shuffleCards() {
    console.log(1)
    const container = document.querySelector('#memory-game');
    console.log(container);
    for (let i = container.children.length; i >= 0; i--) {
        container.appendChild(container.children[Math.random() * i | 0]);
    }
}

shuffleCards()