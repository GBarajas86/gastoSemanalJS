// variables
const presupuestoUsuario = prompt("¿cual es tu presupuesto semanal?"); 
const formulario = document.getElementById("agregar-gasto");
let cantidadPresupuesto;

console.log(presupuestoUsuario);

// Clases
// Clase de Presupuesto
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
  }

  // Metodo para ir restando del presupuesto actual
  presupuestoRestante(cantidad = 0) {
    return (this.restante -= Number(cantidad));
  }
}

// Clase de Interfaz, maneja todo lo relacionado a el HTML

class Interfaz {
  insertarPresupuesto(cantidad) {
    const presupuestoSpan = document.querySelector("span#total");
    const restanteSpan = document.querySelector("span#restante");

    presupuestoSpan.innerHTML = `${cantidad}`;
    restanteSpan.innerHTML = `${cantidad}`;
  }

  imprimirMensaje(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert");
    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    divMensaje.appendChild(document.createTextNode(mensaje));
    // Insertar en el DOM
    document.querySelector(".primario").insertBefore(divMensaje, formulario);

    // Quitar el alert despues de 3 segundos
    setTimeout(() => {
      document.querySelector(".primario .alert").remove();
      formulario.reset();
    }, 3000);
  }

  // Inserta Los gastos a la Lista
  agregarGastoListado(nombre, cantidad) {
    const gastosListado = document.querySelector("#gastos ul");

    // Crear un li, donde se iran agregando los gastos
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    // Insertar el gasto
    li.innerHTML = `
               ${nombre}
               <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>
          `;
    // Insertar al HTML
    gastosListado.appendChild(li);
  }

  // Comprueba el presupuesto Restante
  presupuestoRestante(cantidad) {
    const restante = document.querySelector("#restante");

    // Leemos el presupuesto restante
    const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(
      cantidad
    );

    restante.innerHTML = `${presupuestoRestanteUsuario}`;
    this.comprobarPresupuesto();
  }

    //Cambia de Color el presupuesto Restante

    comprobarPresupuesto(){
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        // Comprobar el 25% del gasto
        if ((presupuestoTotal / 4) > presupuestoRestante ) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');

        }else if((presupuestoTotal / 2) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }

}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  if (presupuestoUsuario === null || presupuestoUsuario === "") {
    window.location.reload();
  } else {
    // Instanciar un presupuesto
    cantidadPresupuesto = new Presupuesto(presupuestoUsuario);

    // Instanciar la clase de Interfaz
    const ui = new Interfaz();
    ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
  }
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  // Leer del formulario de gastos
  const nombreGasto = document.querySelector("#gasto").value;
  const cantidadGasto = document.querySelector("#cantidad").value;

  // Instanciar la Interfaz
  const ui = new Interfaz();
  // Comprobar que los campos no esten vacios
  if (nombreGasto === "" || cantidadGasto === "") {
    // 2 parametros: mensaje y tipo

    ui.imprimirMensaje("Hubo un error", "error");
  } else {
    // Insertar En el HTML
    ui.imprimirMensaje("Correcto", "correcto");
    ui.agregarGastoListado(nombreGasto, cantidadGasto);
    ui.presupuestoRestante(cantidadGasto);
  }
});
