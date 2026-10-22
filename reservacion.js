
/*
  ROCK AND FOOD - SISTEMA DE RESERVACIONES

  Este archivo controla:
  1. El calendario.
  2. La validación de los datos.
  3. La barra de progreso.
  4. La cantidad de personas.
  5. El precio de la reserva.
  6. La confirmación final.
*/

document.addEventListener("DOMContentLoaded", () => {

  // =========================================
  // 1. VARIABLES PRINCIPALES
  // =========================================

  // Precio por cada persona en pesos colombianos.
  const precioPorPersona = 10000;

  // Máximo de personas permitidas por reserva.
  const maxPersonas = 6;

  // Estado inicial de la reservación.
  let personas = 1;
  let fechaSeleccionada = "";
  let pasoMaximo = 1;

  // Función corta para buscar elementos HTML por su ID.
  const $ = id => document.getElementById(id);

  // Elementos principales de la página.
  const formulario = $("reservacion-formulario");
  const diasEl = $("reservacion-dias");
  const mesTitulo = $("reservacion-mes-titulo");
  const relleno = $("reservacion-progreso-relleno");

  const pasos = [
    ...document.querySelectorAll(".reservacion-paso")
  ];

  const pantallas = [
    $("reservacion-pantalla-1"),
    $("reservacion-pantalla-2"),
    $("reservacion-pantalla-3")
  ];

  // El calendario comienza mostrando el mes actual.
  let mesVisible = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );


  // =========================================
  // 2. FUNCIONES PARA LAS FECHAS
  // =========================================

  // Agrega un cero a los números menores que 10.
  // Ejemplo: 5 se convierte en 05.
  const dos = numero => String(numero).padStart(2, "0");

  // Convierte una fecha a formato AAAA-MM-DD.
  const iso = fecha => {
    return `${fecha.getFullYear()}-${dos(fecha.getMonth() + 1)}-${dos(fecha.getDate())}`;
  };

  // Devuelve la fecha de hoy sin horas ni minutos.
  function hoy() {
    const fecha = new Date();

    return new Date(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate()
    );
  }

  // Convierte la fecha seleccionada en texto legible.
  function fechaLarga(valor) {
    if (!valor) return "—";

    const [anio, mes, dia] = valor.split("-").map(Number);

    // Se construye la fecha con componentes locales
    // para evitar errores de zona horaria.
    const fecha = new Date(anio, mes - 1, dia);

    return new Intl.DateTimeFormat("es-CO", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(fecha);
  }


  // =========================================
  // 3. CREAR EL CALENDARIO
  // =========================================

  function pintarCalendario() {

    const anio = mesVisible.getFullYear();
    const mes = mesVisible.getMonth();

    // Día de la semana en que empieza el mes.
    // Domingo = 0, lunes = 1, etc.
    const primerDia = new Date(anio, mes, 1).getDay();

    // Cantidad de días del mes.
    const cantidadDias = new Date(anio, mes + 1, 0).getDate();

    // La fecha mínima permitida es mañana.
    const minimo = hoy();
    minimo.setDate(minimo.getDate() + 1);

    // Mostrar el nombre del mes y el año.
    let titulo = new Intl.DateTimeFormat("es-CO", {
      month: "long",
      year: "numeric"
    }).format(mesVisible);

    titulo = titulo.charAt(0).toLocaleUpperCase("es-CO")
      + titulo.slice(1);

    mesTitulo.textContent = titulo;

    // Limpiar los días antes de dibujar el nuevo mes.
    diasEl.innerHTML = "";


    // Agregar espacios antes del primer día del mes.
    for (let i = 0; i < primerDia; i++) {

      const espacio = document.createElement("span");

      espacio.className = "reservacion-dia vacio";
      espacio.setAttribute("aria-hidden", "true");

      diasEl.appendChild(espacio);
    }


    // Crear un botón para cada día del mes.
    for (let dia = 1; dia <= cantidadDias; dia++) {

      const fecha = new Date(anio, mes, dia);
      const valor = iso(fecha);

      const boton = document.createElement("button");
      const numero = document.createElement("span");

      boton.type = "button";
      boton.className = "reservacion-dia";

      numero.textContent = dia;

      boton.appendChild(numero);

      boton.setAttribute("aria-label", fechaLarga(valor));


      // Desactivar hoy y todos los días anteriores.
      if (fecha < minimo) {

        boton.disabled = true;

      } else {

        // Al hacer clic, seleccionar la fecha.
        boton.addEventListener("click", () => {

          fechaSeleccionada = valor;

          $("reservacionFecha").value = valor;

          $("reservacion-mensaje").textContent = "";

          pintarCalendario();

        });

      }


      // Mantener marcado el día elegido.
      if (valor === fechaSeleccionada) {
        boton.classList.add("seleccionado");
      }

      diasEl.appendChild(boton);
    }


    // Impedir que se navegue a meses anteriores al actual.
    const mesActual = new Date(
      hoy().getFullYear(),
      hoy().getMonth(),
      1
    );

    $("reservacion-mes-anterior").disabled =
      mesVisible <= mesActual;

  }


  // Botón para mostrar el mes anterior.
  $("reservacion-mes-anterior").addEventListener("click", () => {

    mesVisible = new Date(
      mesVisible.getFullYear(),
      mesVisible.getMonth() - 1,
      1
    );

    pintarCalendario();

  });


  // Botón para mostrar el mes siguiente.
  $("reservacion-mes-siguiente").addEventListener("click", () => {

    mesVisible = new Date(
      mesVisible.getFullYear(),
      mesVisible.getMonth() + 1,
      1
    );

    pintarCalendario();

  });


  // =========================================
  // 4. VALIDAR LOS CAMPOS
  // =========================================

  // El nombre no permite números.
  $("reservacionNombre").addEventListener("input", evento => {

    evento.target.value = evento.target.value.replace(/[0-9]/g, "");

  });


  // La cédula solo permite números.
  $("reservacionCedula").addEventListener("input", evento => {

    evento.target.value = evento.target.value
      .replace(/\D/g, "")
      .slice(0, 15);

  });


  // El teléfono permite números, espacios, +, paréntesis y guiones.
  $("reservacionCelular").addEventListener("input", evento => {

    evento.target.value = evento.target.value
      .replace(/[^0-9+() -]/g, "")
      .slice(0, 20);

  });


  // Comprobar que los datos sean correctos.
  function validar() {

    const mensaje = $("reservacion-mensaje");


    // Comprobar que se haya elegido una fecha.
    if (!fechaSeleccionada) {

      mensaje.textContent =
        "Selecciona una fecha disponible en el calendario.";

      return false;

    }


    // Volver a comprobar que la fecha sea futura.
    // Esto evita aceptar una fecha antigua si se deja
    // la página abierta durante mucho tiempo.
    const [anio, mes, dia] = fechaSeleccionada
      .split("-")
      .map(Number);

    const fechaElegida = new Date(anio, mes - 1, dia);

    if (fechaElegida <= hoy()) {

      mensaje.textContent =
        "Debes seleccionar una fecha futura. Hoy no está disponible.";

      fechaSeleccionada = "";
      $("reservacionFecha").value = "";

      pintarCalendario();

      return false;

    }


    // Comprobar que todos los campos obligatorios estén completos.
    if (!formulario.checkValidity()) {

      formulario.reportValidity();

      mensaje.textContent =
        "Completa todos los campos correctamente.";

      return false;

    }


    // Validar el nombre y los apellidos.
    // Permite letras, tildes, espacios, apóstrofos,
    // puntos y guiones.
    const nombre = $("reservacionNombre").value.trim();

    const nombreValido =
      /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[ .'-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;

    if (!nombreValido.test(nombre)) {

      $("reservacionNombre").setCustomValidity(
        "Escribe el nombre y los apellidos sin números."
      );

      $("reservacionNombre").reportValidity();

      $("reservacionNombre").setCustomValidity("");

      return false;

    }


    // La cédula debe contener de 5 a 15 dígitos.
    const cedula = $("reservacionCedula").value;

    if (!/^\d{5,15}$/.test(cedula)) {

      $("reservacionCedula").setCustomValidity(
        "La cédula debe tener entre 5 y 15 dígitos, sin letras."
      );

      $("reservacionCedula").reportValidity();

      $("reservacionCedula").setCustomValidity("");

      return false;

    }


    // Comprobar que el teléfono tenga al menos 7 dígitos.
    const celular = $("reservacionCelular").value;

    if (celular.replace(/\D/g, "").length < 7) {

      $("reservacionCelular").setCustomValidity(
        "Escribe un número de contacto válido."
      );

      $("reservacionCelular").reportValidity();

      $("reservacionCelular").setCustomValidity("");

      return false;

    }


    // Si todas las comprobaciones pasan, continuar.
    mensaje.textContent = "";

    return true;

  }


  // =========================================
  // 5. CAMBIAR DE PANTALLA Y PROGRESO
  // =========================================

  function cambiarPaso(numeroPaso) {

    // Mostrar únicamente la pantalla correspondiente.
    pantallas.forEach((pantalla, indice) => {

      pantalla.hidden = indice !== numeroPaso - 1;

    });


    // Actualizar los números de la barra de progreso.
    pasos.forEach((boton, indice) => {

      const numero = indice + 1;

      boton.classList.toggle(
        "activo",
        numero === numeroPaso
      );

      boton.classList.toggle(
        "completo",
        numero < numeroPaso
      );

      // Solo permite entrar a las etapas ya alcanzadas.
      boton.disabled = numero > pasoMaximo;

      if (numero === numeroPaso) {

        boton.setAttribute("aria-current", "step");

      } else {

        boton.removeAttribute("aria-current");

      }

    });


    // Avance visual de la barra:
    // paso 1 = 0%, paso 2 = 50%, paso 3 = 100%.
    relleno.style.width = ((numeroPaso - 1) / 2 * 100) + "%";


    // Llevar la vista al inicio de la página.
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  // Permitir regresar a una etapa visitada desde la barra.
  pasos.forEach(boton => {

    boton.addEventListener("click", () => {

      const numero = Number(boton.dataset.paso);

      if (numero <= pasoMaximo) {
        cambiarPaso(numero);
      }

    });

  });


  // =========================================
  // 6. PASAR LOS DATOS AL RESUMEN
  // =========================================

  function llenarResumen() {

    $("reservacion-resumen-fecha").textContent =
      fechaLarga(fechaSeleccionada)
      + " a las "
      + $("reservacionHora").value;

    $("reservacion-resumen-nombre").textContent =
      $("reservacionNombre").value.trim();

    $("reservacion-resumen-correo").textContent =
      $("reservacionCorreo").value.trim();

    $("reservacion-resumen-cedula").textContent =
      $("reservacionCedula").value;

    $("reservacion-resumen-celular").textContent =
      $("reservacionCelular").value.trim();

    actualizarPrecio();

  }


  // Al enviar el formulario, validar y abrir el resumen.
  formulario.addEventListener("submit", evento => {

    evento.preventDefault();

    if (!validar()) return;

    llenarResumen();

    pasoMaximo = Math.max(pasoMaximo, 2);

    cambiarPaso(2);

  });


  // =========================================
  // 7. CONTADOR DE PERSONAS Y PRECIO
  // =========================================

  function actualizarPrecio() {

    // Mostrar la cantidad actual.
    $("reservacion-personas").textContent = personas;


    // Multiplicar personas por el precio individual.
    const total = personas * precioPorPersona;

    // Mostrar el dinero con formato colombiano.
    $("reservacion-total").textContent =
      "$" + total.toLocaleString("es-CO");


    // Desactivar botones al alcanzar los límites.
    $("reservacion-restar").disabled = personas <= 1;

    $("reservacion-sumar").disabled = personas >= maxPersonas;


    // Mensaje debajo del contador.
    $("reservacion-maximo").textContent =
      personas === maxPersonas
        ? "Máximo alcanzado: 6 personas"
        : "Máximo 6 personas";

  }


  // Restar una persona, sin bajar de una.
  $("reservacion-restar").addEventListener("click", () => {

    if (personas > 1) {

      personas--;

      actualizarPrecio();

    }

  });


  // Sumar una persona, sin superar seis.
  $("reservacion-sumar").addEventListener("click", () => {

    if (personas < maxPersonas) {

      personas++;

      actualizarPrecio();

    }

  });


  // Volver del resumen al formulario.
  $("reservacion-anterior").addEventListener("click", () => {

    cambiarPaso(1);

  });


  // =========================================
  // 8. CONFIRMAR LA RESERVACIÓN
  // =========================================

  $("reservacion-confirmar").addEventListener("click", () => {

    // Comprobar que la fecha todavía sea futura.
    const [anio, mes, dia] = fechaSeleccionada
      .split("-")
      .map(Number);

    if (!fechaSeleccionada ||
        new Date(anio, mes - 1, dia) <= hoy()) {

      $("reservacion-mensaje-resumen").textContent =
        "La fecha seleccionada ya no es válida. Vuelve al calendario y selecciona otra.";

      pasoMaximo = 1;
      cambiarPaso(1);

      fechaSeleccionada = "";
      $("reservacionFecha").value = "";

      pintarCalendario();

      return;

    }


    // Preparar los datos para la pantalla final.
    $("reservacion-final-fecha").textContent =
      fechaLarga(fechaSeleccionada);

    $("reservacion-final-hora").textContent =
      $("reservacionHora").value;

    $("reservacion-final-nombre").textContent =
      $("reservacionNombre").value.trim();

    $("reservacion-final-personas").textContent =
      personas;

    $("reservacion-final-total").textContent =
      "$" + (personas * precioPorPersona)
        .toLocaleString("es-CO") + " COP";


    // Completar la barra y mostrar la confirmación.
    pasoMaximo = 3;

    cambiarPaso(3);

  });


  // =========================================
  // 9. REINICIAR PARA UNA NUEVA RESERVACIÓN
  // =========================================

  $("reservacion-reiniciar").addEventListener("click", () => {

    // Limpiar todos los campos.
    formulario.reset();

    fechaSeleccionada = "";

    personas = 1;

    pasoMaximo = 1;

    // Regresar el calendario al mes actual.
    mesVisible = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    $("reservacion-mensaje").textContent = "";

    $("reservacion-mensaje-resumen").textContent = "";

    pintarCalendario();

    actualizarPrecio();

    cambiarPaso(1);

  });


  // =========================================
  // 10. INICIAR LA PÁGINA
  // =========================================

  pintarCalendario();

  actualizarPrecio();

  cambiarPaso(1);

});
