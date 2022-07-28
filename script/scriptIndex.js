// incorporacion del logo en el navbar
let logo = document.getElementById("logo");
Image.src = "./img/logo.png";
// Creación dinamica de elementos y detectar componentes
let cardDecoraciones = document.getElementById("cardDecoraciones1");
let cardArreglos = document.getElementById("cardArreglos");
let cardWaffles = document.getElementById("cardWaffles");
let cardSet_decorativos = document.getElementById("cardSet_decorativos");

// FUNCION PARA OBTENER RESPESTA DEL ARCHIVO JSON Y CARGAR IMAGEN, TITULO, PRECIO Y ID EN LAS CARDS
function respuesta(respuesta) {
  for (i in respuesta) {
    cardDecoraciones.appendChild(
      cardSection(
        respuesta[i].url,
        respuesta[i].titulo,
        "$ " + respuesta[i].precio,
        respuesta[i].id
      )
    );
  }
}
construirIndex();
