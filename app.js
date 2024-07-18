// El document. se utiliza para conectar el js con los elementos de la pagina html
// y el  metodo querySelector se utiliza para seleccionar el elemento..
//  El metodo innerHTML permite modificar el constendio del elemento seleccionado

let numeroSecreto;
let intentos;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
}

function verificarIntento() {
  //El metodo getElementById sledciona al elemento por el id que se le coloco
  let numeroDeUsuario = parseInt(
    document.getElementById("valorDeUsuario").value
  );

  if (numeroDeUsuario === numeroSecreto) {
    asignarTextoElemento(
      "p",
      `Acertaste el número en ${intentos} ${intentos == 1 ? "vez" : "veces"}`
    );
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    //El usuario no acerto
    if (numeroDeUsuario > numeroSecreto) {
      asignarTextoElemento("p", "El número es menor");
    } else {
      asignarTextoElemento("p", "El número es mayor");
    }
    intentos++;
    limpiarCaja();
  }
  return;
}

//Obtener el elemento y la limpia
function limpiarCaja() {
  // El value obtiene el  valor del elemento HTML
  document.getElementById("valorDeUsuario").value = "";
}
//En esta funcion vamos a retonar un valor de la caja
function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

  // Si ya soteamos todos los números
  if (listaNumerosSorteados.length == numeroMaximo) {
    asignarTextoElemento("p", "Ya se sortearon todos los números");
    document.getElementById("valorDeUsuario").setAttribute("disabled", "true");
  } else {
    //Si el número  generado esta incluido en la lista
    //El metodo innclude busca en el arreglo para verificar si al ya existe y devuelve un boleano
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      //El metodo push agrega un contenido al arreglo
      listaNumerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

function codicionesIniciales() {
  asignarTextoElemento("h1", "¡Juego del número secreto!"); //Llamar a la funcion en eventos
  asignarTextoElemento("p", `Digita un número de 1 a ${numeroMaximo}`);
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
}

function reiniciarJuego() {
  //Limpiar la caja
  limpiarCaja();
  //Indicar mensaje de intervalos de números
  //Generar el numero aleatorio nuevamente
  //Inicializar el número de intentos
  codicionesIniciales();
  //Desabilitar el boton del nuevo juego
  document.getElementById("reiniciar").setAttribute("disabled", "true");
}

codicionesIniciales();
