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

