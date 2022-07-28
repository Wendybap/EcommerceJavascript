//
class Validador {
  expresionEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  titulo = "Error al iniciar sesion.";
  subtitulo = "Usuario o contraseña inválido.";
  usuarios = JSON.parse(localStorage.getItem("usuarios"));

  constructor(data) {
    this.data = data;
  }

  validarEmail() {
    return (
      this.data.email == null ||
      this.data.email == "undefined" ||
      this.data.email.length <= 0 ||
      !this.expresionEmail.test(this.data.email)
    );
  }

  validarCustom(valor) {
    return valor == null || valor == "undefined" || valor.length <= 0;
  }
  validarUsuario() {
    return this.usuarios.some((usuario) => {
      return usuario.email !== this.data.email;
    });
  }

  validarEdad() {
    return this.data.edad <= 18;
  }

  validarSession() {
    if (this.validarEmail()) {
      return this.titulo + " " + this.subtitulo;
    }
    if (this.validarCustom(this.data.password)) {
      return this.titulo + " " + this.subtitulo;
    }

    //obtengo el usuario para validarlo
    let email = this.validarUsuario();
    let password = this.usuarios.some((usuario) => {
      return usuario.contrasena !== this.data.password;
    });

    if (!email && !password) {
      return this.titulo + " " + this.subtitulo;
    }
    return null;
  }

  iniciarSesion() {
    let mensaje = this.validarSession();
    let response = {
      status: true,
      payload: {},
    };
    if (mensaje == null) {
      this.usuarios.forEach((usuario) => {
        if (
          usuario.email === this.data.email &&
          usuario.password === this.data.password
        ) {
          response.payload = usuario;
        }
      });
    } else {
      response.status = false;
      response.payload = mensaje;
    }

    if (Object.keys(response.payload).length === 0) {
      response.status = false;
      response.payload = this.titulo + " " + this.subtitulo;
    }

    return response;
  }

  registro() {
    let error = {};
    if (this.validarCustom(this.data.nombre)) {
      error.nombre = {
        requerido: "El nombre es requerido.",
      };
    }

    if (this.validarCustom(this.data.apellido)) {
      error.apellido = {
        requerido: "El apellido es requerido.",
      };
    }

    if (this.validarCustom(this.data.edad)) {
      error.edad = {
        requerido: "La edad es requerida.",
      };
    }

    if (!this.validarCustom(this.data.edad) && this.validarEdad()) {
      error.edad = {
        requerido:
          "Tienes que ser mayor de edad para comprar en la plataforma.",
      };
    }

    if (this.validarEmail()) {
      error.email = {
        requerido:
          "El email es requerido. Tienes que escribir un email válido.",
      };
    } else if (this.usuarios != null && !this.validarUsuario()) {
      error.email = {
        existeUsuario: "El usuario con este email ya existe.",
      };
    }

    if (this.validarCustom(this.data.password)) {
      error.password = {
        requerido: "La contraseña es requerida.",
      };
    }

    return error;
  }
}
