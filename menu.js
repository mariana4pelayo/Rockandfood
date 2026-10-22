
/* =====================================================
   ROCK AND FOOD - FUNCIONES DE PRODUCTOS

   1. Crea 7 productos por categoría.
   2. Controla las flechas de los carruseles.
   3. Activa y desactiva los corazones.
   4. Agrega productos al carrito.
   5. Actualiza el contador y el total.
   6. Abre y cierra la ventana del carrito.
   7. Permite buscar productos.
   8. Adapta los carruseles al tamaño de pantalla.

   Las imágenes se agregan desde la carpeta "images".
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // ===================================================
  // 1. DATOS DE LOS PRODUCTOS
  // ===================================================

  // Cambia los nombres, precios, descripciones y rutas
  // de las imágenes según tu menú real.
  //
  // Cada categoría tiene siete productos.
  // Puedes usar JPG, PNG o WEBP.

  const catalogo = {

    hamburguesas: [
      {
        nombre: "Rock Clásica",
        precio: 35000,
        descripcion: "Carne a la parrilla, queso, vegetales frescos y salsa de la casa.",
        imagen: "images/hamburguesa-1.jpg"
      },
      {
        nombre: "Doble Rock",
        precio: 42000,
        descripcion: "Doble carne, queso fundido y una combinación irresistible.",
        imagen: "images/hamburguesa-2.jpg"
      },
      {
        nombre: "Cheese Burger",
        precio: 32000,
        descripcion: "Carne jugosa, doble queso y nuestra salsa especial.",
        imagen: "images/hamburguesa-3.jpg"
      },
      {
        nombre: "BBQ Burger",
        precio: 38000,
        descripcion: "Carne a la parrilla con salsa BBQ y cebolla crocante.",
        imagen: "images/hamburguesa-4.jpg"
      },
      {
        nombre: "Bacon Burger",
        precio: 40000,
        descripcion: "Hamburguesa con tocineta crujiente y queso.",
        imagen: "images/hamburguesa-5.jpg"
      },
      {
        nombre: "Pollo Crispy",
        precio: 33000,
        descripcion: "Pollo crocante, vegetales y salsa cremosa.",
        imagen: "images/hamburguesa-6.jpg"
      },
      {
        nombre: "Rock Especial",
        precio: 45000,
        descripcion: "Nuestra hamburguesa especial para los amantes del sabor.",
        imagen: "images/hamburguesa-7.jpg"
      }
    ],

    pizzas: [
      {
        nombre: "Pizza Margarita",
        precio: 35000,
        descripcion: "Tomate, mozzarella, albahaca y masa horneada.",
        imagen: "images/pizza-1.jpg"
      },
      {
        nombre: "Pizza Pepperoni",
        precio: 38000,
        descripcion: "Pepperoni, queso mozzarella y salsa de tomate.",
        imagen: "images/pizza-2.jpg"
      },
      {
        nombre: "Pizza Hawaiana",
        precio: 37000,
        descripcion: "Jamón, piña y queso fundido.",
        imagen: "images/pizza-3.jpg"
      },
      {
        nombre: "Pizza Carnes",
        precio: 43000,
        descripcion: "Una mezcla deliciosa de carnes y queso.",
        imagen: "images/pizza-4.jpg"
      },
      {
        nombre: "Pizza Vegetariana",
        precio: 34000,
        descripcion: "Vegetales frescos, queso y salsa de la casa.",
        imagen: "images/pizza-5.jpg"
      },
      {
        nombre: "Pizza BBQ",
        precio: 40000,
        descripcion: "Pollo, salsa BBQ, cebolla y queso mozzarella.",
        imagen: "images/pizza-6.jpg"
      },
      {
        nombre: "Pizza Rock",
        precio: 45000,
        descripcion: "La combinación especial de ingredientes de la casa.",
        imagen: "images/pizza-7.jpg"
      }
    ],

    bebidas: [
      {
        nombre: "Gaseosa",
        precio: 5000,
        descripcion: "Bebida fría para acompañar tu comida favorita.",
        imagen: "images/bebida-1.jpg"
      },
      {
        nombre: "Malteada",
        precio: 12000,
        descripcion: "Malteada cremosa y preparada al momento.",
        imagen: "images/bebida-2.jpg"
      },
      {
        nombre: "Limonada",
        precio: 8000,
        descripcion: "Limonada refrescante, ideal para cualquier ocasión.",
        imagen: "images/bebida-3.jpg"
      },
      {
        nombre: "Té frío",
        precio: 7000,
        descripcion: "Té frío con un toque refrescante.",
        imagen: "images/bebida-4.jpg"
      },
      {
        nombre: "Jugo natural",
        precio: 9000,
        descripcion: "Jugo de fruta para disfrutar bien frío.",
        imagen: "images/bebida-5.jpg"
      },
      {
        nombre: "Agua",
        precio: 4000,
        descripcion: "Agua embotellada para acompañar tu pedido.",
        imagen: "images/bebida-6.jpg"
      },
      {
        nombre: "Malteada Rock",
        precio: 15000,
        descripcion: "Nuestra malteada especial con una presentación única.",
        imagen: "images/bebida-7.jpg"
      }
    ],

    perros: [
      {
        nombre: "Perro Clásico",
        precio: 22000,
        descripcion: "Salchicha, pan suave, salsas y papas crocantes.",
        imagen: "images/perro-1.jpg"
      },
      {
        nombre: "Perro Especial",
        precio: 28000,
        descripcion: "Una combinación especial de ingredientes y salsas.",
        imagen: "images/perro-2.jpg"
      },
      {
        nombre: "Perro BBQ",
        precio: 27000,
        descripcion: "Salchicha con salsa BBQ y cebolla crocante.",
        imagen: "images/perro-3.jpg"
      },
      {
        nombre: "Perro con Queso",
        precio: 25000,
        descripcion: "Salchicha, queso fundido y salsa de la casa.",
        imagen: "images/perro-4.jpg"
      },
      {
        nombre: "Perro Tocineta",
        precio: 29000,
        descripcion: "Tocineta crujiente, salchicha y salsas.",
        imagen: "images/perro-5.jpg"
      },
      {
        nombre: "Perro Mexicano",
        precio: 30000,
        descripcion: "Una combinación con sabor intenso y especial.",
        imagen: "images/perro-6.jpg"
      },
      {
        nombre: "Perro Rock",
        precio: 32000,
        descripcion: "La versión especial de la casa, llena de sabor.",
        imagen: "images/perro-7.jpg"
      }
    ]

  };


  // ===================================================
  // 2. VARIABLES GENERALES
  // ===================================================

  const $ = selector => document.querySelector(selector);

  const $$ = selector => [...document.querySelectorAll(selector)];

  // Cantidad de unidades por producto dentro del carrito.
  const carrito = new Map();

  // Mensajes emergentes.
  const notificacion = $("#notificacion");

  let temporizadorMensaje;


  // ===================================================
  // 3. FORMATO DE PRECIOS COLOMBIANOS
  // ===================================================

  function formatoPrecio(valor) {
    return "$" + valor.toLocaleString("es-CO") + " COP";
  }


  // ===================================================
  // 4. MENSAJES DE CONFIRMACIÓN
  // ===================================================

  function mostrarMensaje(mensaje) {

    notificacion.textContent = mensaje;

    notificacion.classList.add("visible");

    clearTimeout(temporizadorMensaje);

    temporizadorMensaje = setTimeout(() => {
      notificacion.classList.remove("visible");
    }, 2600);

  }


  // ===================================================
  // 5. CREAR LAS TARJETAS DE LOS PRODUCTOS
  // ===================================================

  function crearProducto(producto, categoria, indice) {

    const id = `${categoria}-${indice + 1}`;

    const tarjeta = document.createElement("article");

    tarjeta.className = "tarjeta-producto";

    tarjeta.dataset.id = id;
    tarjeta.dataset.categoria = categoria;
    tarjeta.dataset.nombre = producto.nombre.toLocaleLowerCase("es-CO");

    // Imagen del producto.
    const contenedorImagen = document.createElement("div");

    contenedorImagen.className = "producto-imagen";

    const imagen = document.createElement("img");

    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.loading = "lazy";

    // Si todavía no has colocado la fotografía,
    // aparece un espacio decorativo para tu futura imagen.
    imagen.addEventListener("error", () => {
      imagen.style.display = "none";
      contenedorImagen.classList.add("sin-imagen");
    }, { once: true });

    contenedorImagen.appendChild(imagen);


    // Botón de favorito.
    const botonLike = document.createElement("button");

    botonLike.className = "boton-like";
    botonLike.type = "button";
    botonLike.setAttribute("aria-label", "Agregar a favoritos");
    botonLike.setAttribute("aria-pressed", "false");
    botonLike.textContent = "♡";


    // Nombre del producto.
    const nombre = document.createElement("h3");

    nombre.className = "producto-nombre";
    nombre.textContent = producto.nombre;


    // Descripción.
    const descripcion = document.createElement("p");

    descripcion.className = "producto-descripcion";
    descripcion.textContent = producto.descripcion;


    // Precio.
    const precio = document.createElement("span");

    precio.className = "producto-precio";
    precio.textContent = "$" + producto.precio.toLocaleString("es-CO");


    // Botón de compra.
    const botonComprar = document.createElement("button");

    botonComprar.className = "boton-comprar";
    botonComprar.type = "button";
    botonComprar.textContent = "Comprar";

    botonComprar.setAttribute(
      "aria-label",
      `Agregar ${producto.nombre} al carrito`
    );


    // Fila inferior de la tarjeta.
    const pie = document.createElement("div");

    pie.className = "producto-pie";

    pie.append(precio, botonComprar);

    tarjeta.append(
      contenedorImagen,
      botonLike,
      nombre,
      descripcion,
      pie
    );


    // -----------------------------------------------
    // Evento: dar o quitar like.
    // -----------------------------------------------

    botonLike.addEventListener("click", () => {

      const estaMarcado =
        botonLike.getAttribute("aria-pressed") === "true";

      botonLike.setAttribute(
        "aria-pressed",
        String(!estaMarcado)
      );

      botonLike.textContent = estaMarcado ? "♡" : "♥";

      botonLike.setAttribute(
        "aria-label",
        estaMarcado
          ? "Agregar a favoritos"
          : "Quitar de favoritos"
      );

      mostrarMensaje(
        estaMarcado
          ? `Quitaste ${producto.nombre} de favoritos.`
          : `¡${producto.nombre} agregado a favoritos!`
      );

    });


    // -----------------------------------------------
    // Evento: agregar producto al carrito.
    // -----------------------------------------------

    botonComprar.addEventListener("click", () => {

      agregarAlCarrito(id, producto, categoria);

      mostrarMensaje(
        `¡${producto.nombre} se agregó al carrito!`
      );

    });

    return tarjeta;

  }


  // Crear las siete tarjetas de cada categoría.
  Object.entries(catalogo).forEach(([categoria, productos]) => {

    const pista = document.getElementById(`pista-${categoria}`);

    productos.forEach((producto, indice) => {

      pista.appendChild(
        crearProducto(producto, categoria, indice)
      );

    });

  });


  // ===================================================
  // 6. AGREGAR PRODUCTOS AL CARRITO
  // ===================================================

  function agregarAlCarrito(id, producto, categoria) {

    if (carrito.has(id)) {

      const item = carrito.get(id);

      item.cantidad += 1;

    } else {

      carrito.set(id, {
        id,
        nombre: producto.nombre,
        precio: producto.precio,
        categoria,
        cantidad: 1
      });

    }

    actualizarCarrito();

  }


  // ===================================================
  // 7. CALCULAR EL CONTADOR Y EL TOTAL
  // ===================================================

  function actualizarCarrito() {

    // El contador suma todas las unidades,
    // incluso si son productos del mismo tipo.
    let cantidadTotal = 0;
    let precioTotal = 0;

    carrito.forEach(item => {

      cantidadTotal += item.cantidad;

      precioTotal += item.precio * item.cantidad;

    });

    $("#carrito-contador").textContent = cantidadTotal;

    $("#carrito-contador").setAttribute(
      "aria-label",
      `${cantidadTotal} productos en el carrito`
    );

    $("#carrito-total").textContent = formatoPrecio(precioTotal);

    dibujarCarrito();

  }


  // ===================================================
  // 8. MOSTRAR LOS PRODUCTOS DENTRO DEL CARRITO
  // ===================================================

  function dibujarCarrito() {

    const lista = $("#carrito-lista");

    lista.replaceChildren();

    if (carrito.size === 0) {

      const vacio = document.createElement("p");

      vacio.className = "carrito-vacio";
      vacio.textContent = "Todavía no has agregado productos.";

      lista.appendChild(vacio);

      return;

    }

    carrito.forEach(item => {

      const fila = document.createElement("article");

      fila.className = "carrito-fila";


      // Nombre y subtotal.
      const informacion = document.createElement("div");

      const nombre = document.createElement("h3");

      nombre.textContent = item.nombre;

      const subtotal = document.createElement("p");

      subtotal.textContent = formatoPrecio(
        item.precio * item.cantidad
      );

      informacion.append(nombre, subtotal);


      // Controles de cantidad.
      const cantidad = document.createElement("div");

      cantidad.className = "carrito-cantidad";

      const restar = document.createElement("button");

      restar.type = "button";
      restar.textContent = "−";
      restar.setAttribute(
        "aria-label",
        `Quitar una unidad de ${item.nombre}`
      );

      const numero = document.createElement("span");

      numero.textContent = item.cantidad;

      const sumar = document.createElement("button");

      sumar.type = "button";
      sumar.textContent = "+";
      sumar.setAttribute(
        "aria-label",
        `Agregar otra unidad de ${item.nombre}`
      );


      // Restar unidades.
      restar.addEventListener("click", () => {

        const actual = carrito.get(item.id);

        if (!actual) return;

        actual.cantidad -= 1;

        if (actual.cantidad <= 0) {
          carrito.delete(item.id);
        }

        actualizarCarrito();

      });


      // Sumar unidades.
      sumar.addEventListener("click", () => {

        const actual = carrito.get(item.id);

        if (!actual) return;

        actual.cantidad += 1;

        actualizarCarrito();

      });


      cantidad.append(restar, numero, sumar);

      fila.append(informacion, cantidad);

      lista.appendChild(fila);

    });

  }


  // ===================================================
  // 9. ABRIR Y CERRAR EL CARRITO
  // ===================================================

  const modal = $("#fondo-modal");

  $("#abrir-carrito").addEventListener("click", () => {

    modal.hidden = false;

    dibujarCarrito();

    $("#cerrar-carrito").focus();

  });


  function cerrarCarrito() {

    modal.hidden = true;

    $("#abrir-carrito").focus();

  }


  $("#cerrar-carrito").addEventListener(
    "click",
    cerrarCarrito
  );


  // Cerrar si se pulsa fuera de la ventana.
  modal.addEventListener("click", evento => {

    if (evento.target === modal) {
      cerrarCarrito();
    }

  });


  // Cerrar con Escape.
  document.addEventListener("keydown", evento => {

    if (evento.key === "Escape" && !modal.hidden) {
      cerrarCarrito();
    }

  });


  // Vaciar todos los productos.
  $("#vaciar-carrito").addEventListener("click", () => {

    if (carrito.size === 0) {

      mostrarMensaje("El carrito ya está vacío.");

      return;

    }

    carrito.clear();

    actualizarCarrito();

    mostrarMensaje("Se vació el carrito.");

  });


  // ===================================================
  // 10. FLECHAS PARA EXPLORAR LOS SIETE PRODUCTOS
  // ===================================================

  function configurarCarrusel(categoria) {

    const seccion = document.querySelector(
      `[data-categoria="${categoria}"]`
    );

    const ventana = seccion.querySelector(".carrusel-ventana");

    const pista = seccion.querySelector(".productos-pista");

    const anterior = seccion.querySelector(".flecha-anterior");

    const siguiente = seccion.querySelector(".flecha-siguiente");

    const posicion = seccion.querySelector(".carrusel-posicion");

    let indice = 0;


    // Devuelve solo las tarjetas que coinciden con la búsqueda.
    function tarjetasVisibles() {

      return [...pista.children].filter(
        tarjeta => !tarjeta.hidden
      );

    }


    // Calcula cuántas tarjetas caben en la ventana.
    function cantidadVisible() {

      const tarjetas = tarjetasVisibles();

      if (tarjetas.length === 0) return 1;

      const primera = tarjetas[0];

      const estilos = getComputedStyle(pista);

      const espacio = parseFloat(estilos.columnGap) || 0;

      const anchoTarjeta = primera.getBoundingClientRect().width;

      if (anchoTarjeta <= 0) return 1;

      return Math.max(
        1,
        Math.floor(
          (ventana.clientWidth + espacio) /
          (anchoTarjeta + espacio)
        )
      );

    }


    // Actualiza la posición del carrusel.
    function actualizarCarrusel() {

      const tarjetas = tarjetasVisibles();

      const visibles = cantidadVisible();

      const maximo = Math.max(0, tarjetas.length - visibles);

      // Evita quedarse fuera del rango después de redimensionar.
      indice = Math.max(0, Math.min(indice, maximo));

      if (tarjetas.length === 0) {

        pista.style.transform = "translateX(0px)";

      } else {

        const primera = tarjetas[0];

        const seleccionada = tarjetas[indice];

        const desplazamiento =
          seleccionada.offsetLeft - primera.offsetLeft;

        pista.style.transform =
          `translateX(${-desplazamiento}px)`;

      }

      anterior.disabled = indice <= 0;

      siguiente.disabled = indice >= maximo;

      posicion.textContent = tarjetas.length === 0
        ? "0 productos"
        : `${indice + 1} — ${Math.min(
            indice + visibles,
            tarjetas.length
          )} de ${tarjetas.length}`;

    }


    // Flecha izquierda.
    anterior.addEventListener("click", () => {

      indice = Math.max(0, indice - 1);

      actualizarCarrusel();

    });


    // Flecha derecha.
    siguiente.addEventListener("click", () => {

      indice = Math.min(
        indice + 1,
        Math.max(0, tarjetasVisibles().length - cantidadVisible())
      );

      actualizarCarrusel();

    });


    // Permite deslizar horizontalmente con el dedo.
    let inicioX = 0;

    ventana.addEventListener("touchstart", evento => {

      inicioX = evento.changedTouches[0].clientX;

    }, { passive: true });


    ventana.addEventListener("touchend", evento => {

      const finalX = evento.changedTouches[0].clientX;

      const diferencia = finalX - inicioX;

      if (Math.abs(diferencia) < 40) return;

      if (diferencia < 0) {

        indice++;

      } else {

        indice--;

      }

      actualizarCarrusel();

    }, { passive: true });


    // Recalcular al cambiar el tamaño de la ventana.
    window.addEventListener("resize", actualizarCarrusel);


    // Se devuelve la función para actualizar después de buscar.
    return actualizarCarrusel;

  }


  // Activar los cuatro carruseles.
  const actualizarCarruseles = Object.keys(catalogo).map(
    configurarCarrusel
  );


  // ===================================================
  // 11. BUSCADOR DE PRODUCTOS
  // ===================================================

  const campoBusqueda = $("#buscar-producto");

  function buscarProductos() {

    const texto = campoBusqueda.value
      .trim()
      .toLocaleLowerCase("es-CO");

    $$(".tarjeta-producto").forEach(tarjeta => {

      const nombre = tarjeta.dataset.nombre;

      const descripcion =
        tarjeta.querySelector(".producto-descripcion")
          .textContent.toLocaleLowerCase("es-CO");

      tarjeta.hidden = !(
        nombre.includes(texto) ||
        descripcion.includes(texto)
      );

    });

    // Reiniciar y actualizar los carruseles.
    actualizarCarruseles.forEach(actualizar => actualizar());

  }


  // Buscar mientras se escribe.
  campoBusqueda.addEventListener("input", buscarProductos);


  // Evitar que el formulario recargue la página.
  $("#form-busqueda").addEventListener("submit", evento => {

    evento.preventDefault();

    buscarProductos();

    document.querySelector(".categoria").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });


  // ===================================================
  // 12. INICIAR LA PÁGINA
  // ===================================================

  actualizarCarrito();

  actualizarCarruseles.forEach(actualizar => actualizar());

});
