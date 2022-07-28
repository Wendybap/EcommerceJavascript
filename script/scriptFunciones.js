// FUNCION PARA CREAR ELEMENTOS DINAMICAMENTE "CARD"

function cardSection(imagenes, titulo, precio, id) {
  let cards = document.createElement("div");
  cards.classList.add("col", "col-sm-3", "mx-3", "mb-4");

  let input = document.createElement("input");
  input.type = "hidden";
  input.value = id;
  cards.appendChild(input);

  let cardsContenedor = document.createElement("div");
  cardsContenedor.classList.add("card", "w-18rem");
  cards.appendChild(cardsContenedor);

  let cardsImg = document.createElement("img");
  cardsImg.classList.add("card-img-top");
  cardsImg.src = imagenes;
  cardsContenedor.appendChild(cardsImg);

  let cardsTitulo = document.createElement("div");
  cardsTitulo.classList.add("card-body");

  let nombre_del_titulo = document.createElement("h5");
  nombre_del_titulo.classList.add("card-title");
  nombre_del_titulo.innerHTML = titulo;
  cardsTitulo.appendChild(nombre_del_titulo);
  cardsContenedor.appendChild(cardsTitulo);

  let cardsPrecio = document.createElement("div");
  cardsPrecio.classList.add("card-body");

  let titulo_precio = document.createElement("h6");
  titulo_precio.classList.add("card-title");
  titulo_precio.innerHTML = precio;
  cardsPrecio.appendChild(titulo_precio);
  nombre_del_titulo.appendChild(cardsPrecio);

  let agregar = document.createElement("a");
  agregar.classList.add("btn", "btn-primary");
  agregar.innerHTML = "Agregar al carrito";
  agregar.onclick = () => obtenerCard(id, imagenes, titulo, precio);
  nombre_del_titulo.appendChild(agregar);

  return cards;
}

/**
 * funcion que agrega los items del carrito al localstore
 * item {
 *  id
 *  titulo
 *  imagen
 *  precio
 * }
 */
function agregarAlCarrito(id, titulo, imagen, precio) {
  let result = [];
  result = JSON.parse(localStorage.getItem("item"));
  let valoresItem = {
    id: id,
    titulo: titulo,
    imagen: imagen,
    precio: precio,
    cantidad: 1,
  };
  if (result === null) {
    localStorage.setItem("item", JSON.stringify([valoresItem]));
  } else {
    let existeItem = result.some((item) => {
      return item.id === id;
    });
    if (!existeItem) {
      result.push(valoresItem);
    } else {
      result.forEach((item) => {
        if (item.id === id) {
          item.cantidad = item.cantidad + 1;
        }
      });
    }

    localStorage.setItem("item", JSON.stringify(result));
    $(() => {
      $("#count-items").html(JSON.parse(localStorage.getItem("item")).length);
    });
  }
}

function construirIndex() {
  // Modificaciones en el DOM
  let sesion = JSON.parse(localStorage.getItem("sesion"));
  if (sesion != null) {
    $(() => {
      $("#nombre-usuario").html(sesion.nombre);
      $(".sesion").css("display", "block");
      $(".link-sesion").css("display", "none");

      //contador de items en el carrito
      let items = JSON.parse(localStorage.getItem("item"));
      if (items != null) {
        $("#count-items").html(items.length);
      } else {
        $("#count-items").html(0);
      }
    });
  }
}

// FUNCION PARA CREAR ELEMENTOS DINAMICAMENTE DEL CARRITO

function carritoSection(id, imagenes, producto, cantidad, precio, total) {
  $("#lista--carrito>tbody").append(`<tr>
        <td><img src="${url + imagenes}" width="40" /></td>
        <td>${producto}</td>
        <td>${cantidad}</td>
        <td>${precio}</td>
        <td>${total}</td>
        <td>
        <a href="#" class="btn btn-cicle btn-sm btn-danger" onclick="deleteItem(${id})">x</a>
        </td>
    </tr>`);
}

function obtenerCard(id, imagen, titulo, precio) {
  agregarAlCarrito(id, titulo, imagen, parseFloat(precio.split(" ")[1]));
  Swal.fire(
    "Exito!",
    "Producto agregado al carrito satisfactoriamente!",
    "success"
  );
}

// FUNCION PARA ELIMINAR ITEM
function deleteItem(itemId) {
  carrito = JSON.parse(localStorage.getItem("item"));
  let newItems = carrito.filter((item) => item.id != itemId);
  console.log(newItems);
  if (newItems.length <= 0) {
    localStorage.setItem("item", JSON.stringify([]));
    location.reload();
  } else {
    localStorage.setItem("item", JSON.stringify(newItems));
    location.reload();
  }
  Swal.fire("Error!", "Se produjo un error al eliminar el producto.", "error");
}

// FUNCION PARA COMPRAR
function comprar() {
  let sesion = JSON.parse(localStorage.getItem("sesion"));
  if (sesion != null) {
    alert("Gracias por su compra!");
    localStorage.setItem("item", JSON.stringify([]));
    location.reload();
  } else {
    Swal.fire(
      "Advertencia!",
      "Si quieres proceder con la compra, primero debes iniciar sesión.",
      "warning"
    );
  }
}
