const intro = document.getElementById("introScreen");
const content = document.getElementById("mainContent");

// Verificar si ya se mostró antes
const alreadySeen = localStorage.getItem("intro_seen");

if (alreadySeen) {
    // Si ya se vio, ocultamos el overlay y mostramos contenido
    intro.style.display = "none";
    content.classList.remove("hidden");
} else {
    // Si NO se ha visto antes, esperamos al clic
    intro.addEventListener("click", () => {
        intro.classList.add("hidden");
        content.classList.remove("hidden");

        // Guardar que ya se mostró
        localStorage.setItem("intro_seen", "true");
    });
}
