//funtion to toggle menu
function openNav() {
    var x = document.getElementById("navbar").querySelector("nav ul");
    if (x.className === "") {
        x.className = "responsive";
    } else {
        x.className = "";
    }
}