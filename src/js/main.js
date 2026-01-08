"use strict";

// SECCIÓN DE QUERY-SELECTOR
const pokemonButtons = document.querySelectorAll(".js_pokemonBtn");
const modal = document.querySelector(".js_modal");
const modalCloseBtn = document.querySelector(".js_modalCloseBtn");

// SECCIÓN DE DATOS
// Variables globales que almacenan la información principal de la aplicación
// y se usan por todo el fichero.

// SECCIÓN DE FUNCIONES
// Éstas son funciones:
//   - con código auxiliar
//   - con código que usaremos en los eventos
//   - para pintar (render) en la página.

// SECCIÓN DE FUNCIONES DE EVENTOS
// Aquí van las funciones handler/manejadoras de eventos

// SECCIÓN DE EVENTOS
pokemonButtons.forEach((button) => {
  button.addEventListener("click", (ev) => {
    modal.classList.remove("hidden");
    modal.classList.add("visible");
  });
});
modalCloseBtn.addEventListener("click", (ev) => {
  console.log("click");

  modal.classList.add("hidden");
  modal.classList.remove("visible");
});

// SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA
// Este código se ejecutará cuando se carga la página
// Lo más común es:
//   - Pedir datos al servidor
//   - Pintar (render) elementos en la página
