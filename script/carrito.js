// calculo de las cuentas del carrito
const url = "http://127.0.0.1:5500";
class Carrito {
  calcularCuentaCarro() {
    let carrito = [];
    carrito = JSON.parse(localStorage.getItem("item"));
    let subtotal = 0;
    if (carrito.length != 0) {
      $(".alert").css("display", "none");
      $("#carrito").css("display", "block");
      carrito.forEach((item) => {
        let textSubtotal = $("#cart-subtotal").text();
        let precioItem = parseFloat(item.precio) * parseFloat(item.cantidad);
        subtotal =
          textSubtotal == ""
            ? precioItem
            : parseFloat(subtotal) + parseFloat(precioItem);
        //subtotal
        $("#cart-subtotal").html(
          new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "USD",
          }).format(subtotal)
        );

        //impuesto
        $("#cart-tax").html(
          new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "USD",
          }).format(this.calcularImpuesto(subtotal))
        );

        //total
        $("#cart-total").html(
          new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "USD",
          }).format(
            this.calcularTotal(subtotal, this.calcularImpuesto(subtotal))
          )
        );
      });
    } else {
      $(".alert").css("display", "block");
      $("#carrito").css("display", "none");
    }
  }

  calcularImpuesto(precio) {
    let impuesto = 12 / 100;
    return parseFloat(precio) * parseFloat(impuesto);
  }

  calcularTotal(precio, impuesto) {
    return parseFloat(precio) + parseFloat(impuesto);
  }
}

$(document).ready(function () {
  let carro = new Carrito();
  carro.calcularCuentaCarro();

  //Llenado de la tabla de carrito
  let carrito = [];
  carrito = JSON.parse(localStorage.getItem("item"));

  carrito.forEach((item) => {
    carritoSection(
      item.id,
      item.imagen,
      item.titulo,
      item.cantidad,
      new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "USD",
      }).format(item.precio),
      new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "USD",
      }).format(item.precio * item.cantidad)
    );
  });

  // FUNCION PARA VACIAR EL CARRITO
  $("#vaciar--carrito").click(() => {
    localStorage.setItem("item", JSON.stringify([]));
    location.reload();
  });
});

// cambiar link de iniciar sesion a cerrar sesión
let sesion = JSON.parse(localStorage.getItem("sesion"));
if (sesion != null) {
  $(() => {
    $("#nombre-usuario").html(sesion.nombre);
    $(".sesion").css("display", "block");
    $(".link-sesion").css("display", "none");
  });
}

//contador de items en el carrito
$(() => {
  let items = JSON.parse(localStorage.getItem("item"));
  if (items != null) {
    $("#count-items").html(items.length);
  } else {
    $("#count-items").html(0);
  }
});
