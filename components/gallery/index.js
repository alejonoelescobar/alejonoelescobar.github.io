export function setupGalleryModals() {
    // Abrir modal
    const thumbnails = document.querySelectorAll(".gallery-thumb");
    thumbnails.forEach(thumb => {
      thumb.addEventListener("click", () => {
        const modalId = thumb.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove("hidden");
      });
    });
  
    // Cerrar modal
    const closeButtons = document.querySelectorAll(".modal-close");
    closeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const modalId = btn.getAttribute("data-close");
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add("hidden");
      });
    });
  
    // Cerrar al hacer click fuera del contenido
    const modals = document.querySelectorAll(".gallery-modal");
    modals.forEach(modal => {
      modal.addEventListener("click", e => {
        if (e.target === modal) {
          modal.classList.add("hidden");
        }
      });
    });
  }
  