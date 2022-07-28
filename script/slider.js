// CREANDO SLIDER DE LA PAG DE INICIO
window.addEventListener("load", function () {
  // ARRAY PARA CAMBIAR LAS IMAGENES

  let img = [];
  img[0] = "./../img/1.jpg";
  img[1] = "./../img/2.jpg";
  img[2] = "./../img/3.jpg";
  img[3] = "./../img/4.jpg";
  img[4] = "./../img/5.jpg";
  img[5] = "./../img/6.jpg";
  img[6] = "./../img/7.jpg";
  img[7] = "./../img/8.jpg";
  img[8] = "./../img/9.jpg";
  img[9] = "./../img/10.jpg";
  img[10] = "./../img/11.jpg";

  let indiceImg = 0;
  // FUNCION PARA CAMBIAR LAS IMAGENES
  function cambiarImg() {
    document.getElementById("slider").src = img[indiceImg];

    if (indiceImg < 10) {
      indiceImg++;
    } else {
      indiceImg = 0;
    }
  }
  this.setInterval(cambiarImg, 1000);
});
