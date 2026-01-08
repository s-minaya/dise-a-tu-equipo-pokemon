"use strict";

// ============================================
// QUERY SELECTORS
// ============================================
const pokemonButtons = document.querySelectorAll(".js_pokemonBtn");
const modal = document.querySelector(".js_modal");
const modalCloseBtn = document.querySelector(".js_modalCloseBtn");
const cards = document.querySelectorAll(".js_card");
const actionBtn = document.querySelector(".js_actionBtn");

// ============================================
// DATOS
// ============================================
const pokemonOptions = {
  umbreon: [
    { name: "Espeon", img: "/images/espeon.png" },
    { name: "Vaporeon", img: "/images/vaporeon.png" },
    { name: "Umbreon", img: "/images/umbreon.png" },
  ],
  mimikyu: [
    { name: "Cyndaquill", img: "/images/cyndaquill.png" },
    { name: "Pichu", img: "/images/pichu.png" },
    { name: "Mimikyu", img: "/images/mimikyu.png" },
  ],
  phantump: [
    { name: "Misdreavus", img: "/images/misdreavus.png" },
    { name: "Lampent", img: "/images/lampent.png" },
    { name: "Phantump", img: "/images/phantump.png" },
  ],
};

// Variable de estado: guarda el botón del footer actualmente activo
let currentFooterButton = null;

// Clave para guardar datos en localStorage
const STORAGE_KEY = "pokemon-team";

// ============================================
// FUNCIONES
// ============================================

// Muestra las 3 opciones de Pokémon en las tarjetas del modal
function renderModalOptions(pokemonSet) {
  cards.forEach((card, index) => {
    const img = card.querySelector("img");
    const pokemon = pokemonSet[index];

    // Actualizar imagen y nombre
    img.src = pokemon.img;
    img.alt = `Imagen de ${pokemon.name}`;
    card.dataset.name = pokemon.name;

    // Seleccionar el primer radio por defecto
    const radio = document.getElementById(`radio-${index + 1}`);
    radio.checked = index === 0;
  });
}

// Abre el modal
function openModal() {
  modal.classList.remove("hidden");
}

// Cierra el modal
function closeModal() {
  modal.classList.add("hidden");
}

// Devuelve el Pokémon que está seleccionado en el modal
function getSelectedPokemon() {
  const selectedRadio = document.querySelector(
    'input[name="slider-1"]:checked'
  );
  const selectedCard = document.querySelector(
    `.card[for="${selectedRadio.id}"]`
  );
  const img = selectedCard.querySelector("img");

  return {
    name: selectedCard.dataset.name,
    imgSrc: img.src,
  };
}

// Cambia la imagen del Pokémon en el footer por la que se ha seleccionado
function updateFooterPokemon(pokemon) {
  if (currentFooterButton) {
    const footerImg = currentFooterButton.querySelector("img");
    footerImg.src = pokemon.imgSrc;
    footerImg.alt = `Imagen de ${pokemon.name}`;
  }
}

// Guarda el equipo Pokémon actual en localStorage
function saveTeamToLocalStorage() {
  const team = {};

  // Recorrer cada botón del footer y guardar su Pokémon actual
  pokemonButtons.forEach((button) => {
    const pokemonType = button.dataset.pokemon; // umbreon, mimikyu, phantump
    const img = button.querySelector("img");

    team[pokemonType] = {
      name: img.alt.replace("Imágen de ", ""), // Extraer nombre del alt
      imgSrc: img.src,
    };
  });

  // Guardar en localStorage como texto JSON
  localStorage.setItem(STORAGE_KEY, JSON.stringify(team));
  console.log("Equipo guardado:", team);
}

// Carga el equipo Pokémon guardado desde localStorage
function loadTeamFromLocalStorage() {
  // Obtener datos guardados
  const savedTeam = localStorage.getItem(STORAGE_KEY);

  // Si no hay datos guardados, no hacer nada
  if (!savedTeam) {
    console.log("No hay equipo guardado");
    return;
  }

  // Convertir el texto JSON a objeto
  const team = JSON.parse(savedTeam);
  console.log("Equipo cargado:", team);

  // Actualizar cada Pokémon del footer con los datos guardados
  pokemonButtons.forEach((button) => {
    const pokemonType = button.dataset.pokemon;
    const savedPokemon = team[pokemonType];

    // Si existe un Pokémon guardado para este botón, actualizarlo
    if (savedPokemon) {
      const img = button.querySelector("img");
      img.src = savedPokemon.imgSrc;
      img.alt = `Imágen de ${savedPokemon.name}`;
    }
  });
}

// ============================================
// EVENT LISTENERS
// ============================================

// Cuando haces click en un Pokémon del footer, se abre el modal con sus opciones
pokemonButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const pokemonType = button.dataset.pokemon;

    // Verificar que existe el set de opciones
    if (!pokemonOptions[pokemonType]) {
      console.error(`No hay opciones para: ${pokemonType}`);
      return;
    }

    // Guardar referencia al botón del footer
    currentFooterButton = button;

    // Renderizar opciones y abrir modal
    renderModalOptions(pokemonOptions[pokemonType]);
    openModal();
  });
});

// Cierra el modal al hacer click en la X
modalCloseBtn.addEventListener("click", closeModal);

// Cuando haces click en "¡Lo quiero!", guarda el Pokémon seleccionado
actionBtn.addEventListener("click", () => {
  const selectedPokemon = getSelectedPokemon();

  // Actualizar el footer con el Pokémon seleccionado
  updateFooterPokemon(selectedPokemon);

  // GUuardar en el Local Storage
  saveTeamToLocalStorage();

  // Cerrar modal
  closeModal();

  // Log para debug
  console.log("Pokémon seleccionado:", selectedPokemon.name);
});

// Cierra el modal al hacer click fuera de él (en el fondo oscuro)
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// ============================================
// INICIALIZACIÓN
// ============================================

loadTeamFromLocalStorage();

console.log("Aplicación Pokémon iniciada correctamente");
