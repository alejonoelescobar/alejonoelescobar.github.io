// Variables
const totalPairs = 20;
let selectedCards = [];
let currentMove = 0;
let currentAttempts = 0;

const skillsUsed = [
  "Jest", "Python", "Git", "PostgreSQL", "Cloudinary", "Tailwind", "HTML", "CSS", "Next", "Node.js", "React", "Redux", "MongoDB", "TypeScript", "Javascript", "Illustrator", "Photoshop", "Canva", "After Effects", "Premiere Pro"
];

const imagesUsed = [
  "Jest.png", "Python.png", "GitHub.png", "PostgreSQL.png", "Cloudinary.png", "Tailwind.png",
  "HTML.png", "CSS.png", "NextJS.png", "NodeJS.png", "React.png", "Redux.png",
  "MongoDB.png", "TypeScript.png", "JavaScript.png", "Illustrator.png", "Photoshop.png",
  "Canva.png", "After-effects.png", "PremierePro.png"
];


// Crear una carta (imagen o texto) con el nombre de la skill
const createCard = (content, skillName) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-skill", skillName);

  const back = document.createElement("div");
  back.classList.add("back");

  const face = document.createElement("div");
  face.classList.add("face");
  face.innerHTML = content;

  card.appendChild(back);
  card.appendChild(face);

  card.addEventListener("click", activate);
  return card;
};

// Lógica al hacer clic en una carta
function activate(e) {
  const card = e.currentTarget;

  if (currentMove < 2 && !card.classList.contains('active') && !selectedCards.includes(card)) {
    card.classList.add('active');
    selectedCards.push(card);
    currentMove++;

    if (currentMove === 2) {
      currentAttempts++;
      document.getElementById("stats").innerText = `${currentAttempts} attempts`;

      const skill1 = selectedCards[0].getAttribute("data-skill");
      const skill2 = selectedCards[1].getAttribute("data-skill");

      if (skill1 === skill2) {
        selectedCards = [];
        currentMove = 0;

        const allActive = document.querySelectorAll(".card.active").length;
        if (allActive === totalPairs * 2) {
          setTimeout(() => {
            document.getElementById("win-popup").classList.remove("hidden");
          }, 300);
        }
      } else {
        setTimeout(() => {
          selectedCards[0].classList.remove("active");
          selectedCards[1].classList.remove("active");
          selectedCards = [];
          currentMove = 0;
        }, 600);
      }
    }
  }
}

// Renderizar todas las cartas
function renderCards() {
  const memoryGame = document.getElementById("memory-game");
  memoryGame.innerHTML = "";
  const allCards = [];

  for (let i = 0; i < totalPairs; i++) {
    const skill = skillsUsed[i];

    const imgCard = createCard(
      `<img src="./public/icons/${imagesUsed[i]}" alt="${skill}" data-base="${imagesUsed[i]}" />`,
      skill
    );    

    const textCard = createCard(
      `<div class="hidden">${skill}</div>${skill}`,
      skill
    );

    allCards.push(imgCard, textCard);
  }

  shuffle(allCards).forEach(card => memoryGame.appendChild(card));
  actualizarIconosJuegoMemoria();
}

// Mezclar array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  renderCards();

  // Cierra el popup
  document.getElementById("popup-close").addEventListener("click", () => {
    document.getElementById("win-popup").classList.add("hidden");
  });

  // Botón de reinicio
  document.getElementById("resetButton").addEventListener("click", () => {
    currentAttempts = 0;
    currentMove = 0;
    selectedCards = [];
    document.getElementById("stats").innerText = `${currentAttempts} attempts`;
    renderCards();
    document.getElementById("win-popup").classList.add("hidden");
  });
});
