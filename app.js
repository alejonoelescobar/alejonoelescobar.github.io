'use strict';

const big = document.querySelector('.big');
const dot = document.querySelectorAll('.dot');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const cardWidth = document.querySelector('.card').offsetWidth;
let currentPosition = 0;

// Función para mover el carrusel hacia la izquierda
const moveCarouselLeft = () => {
    const newPosition = currentPosition === 0 ? 0 : currentPosition - 1;
    updateCarouselPosition(newPosition);
};

// Función para mover el carrusel hacia la derecha
const moveCarouselRight = () => {
    const totalSlides = document.querySelectorAll('.card').length;
    const newPosition = currentPosition === totalSlides - 1 ? currentPosition : currentPosition + 1;
    updateCarouselPosition(newPosition);
};

prev.addEventListener('click', moveCarouselLeft);

next.addEventListener('click', moveCarouselRight);

dot.forEach((dotItem, i) => {
    dotItem.addEventListener('click', () => {
        updateCarouselPosition(i);
    });
});

const updateCarouselPosition = (newPosition) => {
    const slideWidth = -newPosition * cardWidth;
    big.style.transform = `translateX(${slideWidth}px)`;
    currentPosition = newPosition;
    updateDots();
};

const updateDots = () => {
    dot.forEach((dotItem, i) => {
        dotItem.classList.toggle('active', i === currentPosition);
    });
};


document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggleButton");
    const skillsSection = document.getElementById("technologies-skills");
    const memoryGameSection = document.getElementById("memory-game-container");
  
    // Ocultar la memory game inicialmente
    memoryGameSection.style.display = "none";
  
    toggleButton.addEventListener("click", function () {
      if (skillsSection.style.display === "none") {
        // Mostrar la sección de habilidades y ocultar el juego de memoria
        skillsSection.style.display = "block";
        memoryGameSection.style.display = "none";
        toggleButton.textContent = "Test your memory!";
      } else {
        // Mostrar el juego de memoria y ocultar la sección de habilidades
        skillsSection.style.display = "none";
        memoryGameSection.style.display = "block";
        toggleButton.textContent = "Show Skills";
      }
    });
  });
  