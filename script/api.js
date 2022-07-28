// USO Archivo .JSON PARA CARGAR LOS PRODUCTOS AL CATALOGO
$(document).ready(function () {
  // DECLARO LA URL DE LA API
  const APIURL = "./json/dataCards.json";
  return $.getJSON(APIURL, respuesta);
});
