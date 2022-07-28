$(document).ready(() => {
  $("#iniciar").click((e) => {
    let sesion = {
      email: $("#usuario").val(),
      password: $("#pass").val(),
    };
    let validador = new Validador(sesion);
    let respuesta = validador.iniciarSesion();
    if (!respuesta.status) {
      alert(respuesta.payload);
    } else {
      localStorage.setItem("sesion", JSON.stringify(respuesta.payload));
      location.reload();
    }
  });

  //   Cerrar sesion
  $("#cerrar-sesion").click(() => {
    localStorage.removeItem("sesion");
    location.href = "http://127.0.0.1:5500";
  });
});

//contador de items en el carrito
$(() => {
  let items = JSON.parse(localStorage.getItem("item"));
  if (items != null) {
    $("#count-items").html(items.length);
  } else {
    $("#count-items").html(0);
  }
});
