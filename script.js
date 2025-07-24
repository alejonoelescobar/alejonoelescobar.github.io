// Script carrousel del landing
const carousel = document.getElementById("carousel3d");
const images = carousel.querySelectorAll("img");
let current = 0;
function updateCarousel() {
  images.forEach((img, i) => {
    img.classList.remove("active", "prev", "next");

    if (i === current) {
      img.classList.add("active");
    } else if (i === (current - 1 + images.length) % images.length) {
      img.classList.add("prev");
    } else if (i === (current + 1) % images.length) {
      img.classList.add("next");
    }
  });
}
function startCarousel() {
  updateCarousel();
  setInterval(() => {
    current = (current + 1) % images.length;
    updateCarousel();
  }, 3000);
}
startCarousel();
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.project-card');
  let maxHeight = 0;

  cards.forEach(card => {
    const cardHeight = card.offsetHeight;
    if (cardHeight > maxHeight) maxHeight = cardHeight;
  });

  cards.forEach(card => {
    card.style.minHeight = maxHeight + "px";
  });
});

// Script Modal

document.addEventListener("DOMContentLoaded", function () {
  // Abrir modal
  document.querySelectorAll(".open-modal-btn").forEach(button => {
    button.addEventListener("click", function () {
      const modalId = this.dataset.modal;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove("hidden");
      }
    });
  });

  // Cerrar modal
  document.querySelectorAll(".modal-close").forEach(closeBtn => {
    closeBtn.addEventListener("click", function () {
      const modalId = this.dataset.close;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add("hidden");
      }
    });
  });

  // Cerrar al hacer clic fuera del contenido
  document.querySelectorAll(".gallery-modal").forEach(modal => {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  });
});




// Script de Bootstrap para el memory game

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButton");
  const memoryGameContainer = document.getElementById("memory-game-container");
  const skillsCards = document.getElementById("technologies-skills");

  toggleButton.addEventListener("click", () => {
    memoryGameContainer.classList.toggle("active");

    if (memoryGameContainer.classList.contains("active")) {
      skillsCards.style.display = "none";
      toggleButton.textContent = "Back to skills";
    } else {
      skillsCards.style.display = "flex";
      toggleButton.textContent = "Test your memory!";
    }
  });
});

