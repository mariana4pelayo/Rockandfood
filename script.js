/* ==========================================================
   ROCK AND FOOD — JAVASCRIPT
   Aquí se controla el movimiento del carrusel y la búsqueda.
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".favorites-track");
  const cards = Array.from(document.querySelectorAll(".product-card"));
  const previousButton = document.querySelector(".carousel-arrow.previous");
  const nextButton = document.querySelector(".carousel-arrow.next");
  const searchForm = document.querySelector(".search-form");
  const searchInput = document.querySelector("#site-search");

  if (!track || cards.length === 0) return;

  let currentIndex = 0;

  // Cuántas tarjetas caben en pantalla: 1 en móvil y 2 en pantallas amplias.
  function cardsVisible() {
    return window.matchMedia("(max-width: 620px)").matches ? 1 : 2;
  }

  // Limita el índice para que el carrusel nunca avance a un espacio vacío.
  function maxIndex() {
    return Math.max(0, cards.length - cardsVisible());
  }

  // Mueve la pista según el ancho real de una tarjeta y el espacio entre ellas.
  function updateCarousel() {
    currentIndex = Math.min(currentIndex, maxIndex());
    const cardWidth = cards[0].getBoundingClientRect().width;
    const trackStyles = window.getComputedStyle(track);
    const gap = parseFloat(trackStyles.columnGap) || 0;
    track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;

    // Desactiva las flechas cuando ya no hay más tarjetas en esa dirección.
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= maxIndex();
    previousButton.style.opacity = previousButton.disabled ? "0.55" : "1";
    nextButton.style.opacity = nextButton.disabled ? "0.55" : "1";
  }

  previousButton.addEventListener("click", () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = Math.min(maxIndex(), currentIndex + 1);
    updateCarousel();
  });

  // Recalcula al cambiar el tamaño de la ventana para mantener el diseño responsive.
  window.addEventListener("resize", updateCarousel);
  updateCarousel();

  // Búsqueda sencilla por nombre de producto. Si hay coincidencias,
  // lleva al carrusel y muestra el primer producto coincidente.
  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchInput.value.trim().toLocaleLowerCase("es");

      if (!query) {
        searchInput.focus();
        return;
      }

      const matchIndex = cards.findIndex((card) =>
        card.textContent.toLocaleLowerCase("es").includes(query)
      );

      if (matchIndex >= 0) {
        currentIndex = Math.min(matchIndex, maxIndex());
        updateCarousel();
        document.querySelector("#favoritos").scrollIntoView({ behavior: "smooth" });
      } else {
        // Mensaje básico cuando el texto no coincide con ningún producto.
        searchInput.setCustomValidity("No encontramos ese producto. Prueba con hamburguesa o combo.");
        searchInput.reportValidity();
        searchInput.addEventListener("input", () => searchInput.setCustomValidity(""), { once: true });
      }
    });
  }
});
