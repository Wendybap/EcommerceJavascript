$(() => {
  let sesion = JSON.parse(localStorage.getItem("sesion"));
  if (sesion != null) {
    location.href = "http://127.0.0.1:5500";

    $("#nombre-usuario").html(sesion.nombre);
    $(".sesion").css("display", "block");
    $(".link-sesion").css("display", "none");

    //contador de items en el carrito
    let items = JSON.parse(localStorage.getItem("item"));
    if (items != null) {
      $("#count-items").html(items.length);
      console.log(items.length);
    } else {
      $("#count-items").html(0);
    }
  }

  $("#buttonGuardar").click((e) => {
    e.preventDefault();
    submit();
  });
});

// clase para guardar el valor de los input localStorage
class Form {
  constructor(usuario) {
    this.usuario = usuario;
  }

  // funcion para guardar en localStorage (en el navegador)
  save() {
    let mensaje = "Su usuario fue guardado satisfactoriamente.";
    let result = [];
    result = JSON.parse(localStorage.getItem("usuarios"));

    if (result === null) {
      localStorage.setItem("usuarios", JSON.stringify([this.usuario]));
      return mensaje;
    } else {
      let result = [];
      result = JSON.parse(localStorage.getItem("usuarios"));
      let existeUsuario = result.some((usuario) => {
        return usuario.email === this.usuario.email;
      });
      if (!existeUsuario) {
        result.push(this.usuario);
        localStorage.setItem("usuarios", JSON.stringify(result));
        $("#formRegistro")[0].reset();
        return mensaje;
      } else {
        return "El usuario ya se encuantra registrado.";
      }
    }
  }
}

// funcion enviar
function submit() {
  $(".alert").hide();
  $("#errores").empty();
  const valor = [];
  let formulario = {
    nombre: $("#nombre").val(),
    apellido: $("#apellido").val(),
    edad: $("#edad").val(),
    email: $("#email").val(),
    password: $("#password").val(),
  };
  let validador = new Validador(formulario);
  let error = validador.registro();
  if (Object.keys(error).length === 0) {
    //   invoco la clase Form
    const form = new Form(formulario);
    //   invoco la funcion save GUARDAR
    alert(form.save());
  } else {
    for (e in error) {
      $("#errores").append(`<li>${Object.values(error[e])}</li>`);
    }
    $(".alert").show();
  }
}

// Funcion que se usa para cuando cargue la pag
function loadPage() {
  let container = document.getElementById("formContainer");
  container.classList.add("init");
}
