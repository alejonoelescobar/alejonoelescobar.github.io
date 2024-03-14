// Función para alternar la clase responsive en el nav
function openNav() {
    var nav = document.querySelector("#navbar nav");
    nav.classList.toggle("responsive");
}

// Función para ocultar la barra de navegación después de un período de inactividad
function hideNavbar() {
    let navbar = document.getElementById("navbar");
    navbar.style.display = "none";
}

// Función para reiniciar el temporizador cada vez que el usuario interactúa con la página
function resetNavbarTimeout() {
    clearTimeout(navbarTimeout);
    navbarTimeout = setTimeout(hideNavbar, 3000); // Ocultar la barra después de 3 segundos de inactividad
}

// Event listeners para reiniciar el temporizador cuando el usuario interactúa con la página
document.addEventListener("mousemove", resetNavbarTimeout);
document.addEventListener("keypress", resetNavbarTimeout);
