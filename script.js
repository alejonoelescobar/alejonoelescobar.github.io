//! Script carrousel del landing
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

//! Script Modal
function ajustarModalPorVideo(modal) {
  const video = modal.querySelector('video');
  const modalContent = modal.querySelector('.modal-content');

  if (!video || !modalContent) return;

  function updateLayout() {
    const width = window.innerWidth;
    const isTablet = width >= 768 && width <= 1024;

    if (!isTablet) {
      modalContent.style.flexDirection = '';
      return;
    }

    // Video metadata check
    const vw = video.videoWidth;
    const vh = video.videoHeight;

    // Si no hay dimensiones (0), esperar a cargar metadata
    if (vw === 0 || vh === 0) {
      return; // no hacer nada todavía
    }

    if (vh > vw) {
      modalContent.style.flexDirection = 'row'; // vertical video
    } else {
      modalContent.style.flexDirection = 'column'; // horizontal video
    }
  }

  // Escucho el evento loadedmetadata para asegurar dimensiones
  video.addEventListener('loadedmetadata', () => {
    updateLayout();
  }, { once: true });

  // También trato de aplicar si ya estaba cargado
  if (video.readyState >= 1) {
    updateLayout();
  }

  // Escuchar redimensionado, pero con función específica para este modal/video
  // Para evitar agregar varios listeners, lo guardo en modal (atributo custom)
  if (!modal._resizeListener) {
    modal._resizeListener = () => {
      updateLayout();
    };
    window.addEventListener('resize', modal._resizeListener);
  }
}

//* Al cerrar modal, saco el listener de resize para evitar memory leaks
function cerrarModal(modal) {
  modal.classList.add('hidden');
  if (modal._resizeListener) {
    window.removeEventListener('resize', modal._resizeListener);
    modal._resizeListener = null;
  }
  // Reset flexDirection para que no quede pegado
  const modalContent = modal.querySelector('.modal-content');
  if (modalContent) modalContent.style.flexDirection = '';
}
//* Abrir modal
document.querySelectorAll('.open-modal-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.modal;
    const modal = document.getElementById(targetId);
    if (modal) {
      modal.classList.remove('hidden');
      ajustarModalPorVideo(modal);
    }
  });
});
//* Cerrar modal con botón
document.querySelectorAll('.modal-close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    const modal = closeBtn.closest('.gallery-modal');
    if (modal) {
      cerrarModal(modal);
    }
  });
});
//* Cerrar modal al clickear fuera del contenido (overlay)
document.querySelectorAll('.gallery-modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      cerrarModal(modal);
    }
  });
});


//! Script para el memory game
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
//* Script para el cambio de imágenes de MemoryGame
function actualizarIconosPorTema() {
  const isDark = document.body.classList.contains("dark-mode");
  const icons = document.querySelectorAll('#technologies-skills .icon-img');

  icons.forEach(img => {
    const nombreArchivo = img.dataset.base; // por ejemplo "html.png"
    if (!nombreArchivo) return;

    const folder = isDark ? "night-mode" : "";
    img.src = `./public/icons/${folder}/${nombreArchivo}`;
  });
}
function actualizarIconosJuegoMemoria() {
  const isDark = document.body.classList.contains("dark-mode");
  const icons = document.querySelectorAll('#memory-game img[data-base]');

  icons.forEach(img => {
    const nombreArchivo = img.dataset.base;
    const folder = isDark ? "night-mode" : "";
    img.src = `./public/icons/${folder}/${nombreArchivo}`;
  });
}

//! Script para la section de projetcs
function actualizarIconosProyectos() {
  const isDark = document.body.classList.contains("dark-mode");
  const iconos = document.querySelectorAll('#projects .skills-icons .icon-img');

  iconos.forEach(icon => {
    const nombre = icon.dataset.name;
    if (!nombre) return;

    // Ruta base dinámica
    const carpeta = isDark ? "night-mode" : "";
    const ruta = carpeta
      ? `./public/icons/${carpeta}/${nombre}.png`
      : `./public/icons/${nombre}.png`;

    icon.src = ruta;
  });
}


//! Script para el dark mode
const toggleButton = document.getElementById("toggle-theme");
const body = document.body;
const bgVideo = document.getElementById("bg-video");

//* Estado del modo actual (podés guardar en localStorage si querés)
let isDarkMode = false;

toggleButton.addEventListener("click", () => {
  isDarkMode = !isDarkMode;

  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    bgVideo.src = "./public/background/night/night-mode.mp4";
    toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    document.body.classList.remove("dark-mode");
    bgVideo.src = "./public/light-mode.mp4";
    toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }

  bgVideo.load(); // Reinicia el video para aplicar el nuevo
  actualizarIconosPorTema(); // 👉 Llamá acá
  actualizarIconosJuegoMemoria(); // memory game 👈
  actualizarIconosProyectos(); // 👈 ¡ACÁ!
});