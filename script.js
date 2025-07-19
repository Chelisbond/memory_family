//@ts-nocheck
let cartasVolteadas = [];
let intentos = 0;
let parejasEncontradas = 0;
const totalParejas = 7;

const imagenes = ['Cuy.png', 'Mamamoe.png', 'Kike.png', 'Picky.png', 'Papapopo.png', 'mycopy.png', 'Kika.png'];
let cartas = [...imagenes, ...imagenes];

const sonidoAcierto = new Audio('sound/Memory_Congrat.mp3');
const sonidoFelicitacion = new Audio('sound/felicidades.mp3');
const sonidoReiniciar = new Audio('sound/Memory_Start.mp3');

const tablero = document.getElementById('tablero');
const intentosTexto = document.getElementById('intentos');
const felicitacion = document.getElementById('felicitacion');

// Crear el tablero por primera vez
crearTablero();

// Reiniciar con botón
document.getElementById('reiniciar').addEventListener('click', () => {
  sonidoReiniciar.play();
  reiniciarJuego();
});

function crearTablero() {
  tablero.innerHTML = '';
  cartasVolteadas = [];
  parejasEncontradas = 0;
  cartas = [...imagenes, ...imagenes].sort(() => 0.5 - Math.random());

  cartas.forEach((imagen, i) => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.valor = imagen;
    carta.dataset.index = i;
    carta.innerHTML = '';
    carta.addEventListener('click', () => voltearCarta(carta));
    tablero.appendChild(carta);
  });
}

function voltearCarta(carta) {
  if (carta.classList.contains('volteada') || cartasVolteadas.length === 2) return;

  carta.innerHTML = `<img src="images/${carta.dataset.valor}" alt="">`;
  carta.classList.add('volteada');
  cartasVolteadas.push(carta);

  if (cartasVolteadas.length === 2) {
    intentos++;
    intentosTexto.textContent = `Intentos= ${intentos}`;

    const [c1, c2] = cartasVolteadas;

    if (c1.dataset.valor === c2.dataset.valor) {
      sonidoAcierto.play();
      parejasEncontradas++;

      if (parejasEncontradas === totalParejas) {
        setTimeout(() => {
          mostrarFelicitacion();
        }, 500);
      }

      cartasVolteadas = [];
    } else {
      setTimeout(() => {
        c1.innerHTML = '';
        c2.innerHTML = '';
        c1.classList.remove('volteada');
        c2.classList.remove('volteada');
        cartasVolteadas = [];
      }, 1000);
    }
  }
}

function reiniciarJuego() {
  intentos = 0;
  parejasEncontradas = 0;
  cartasVolteadas = [];
  intentosTexto.textContent = 'Intentos: 0';
  felicitacion.style.display = 'none';
  crearTablero();
}

function mostrarFelicitacion() {
  felicitacion.style.display = 'block';
  sonidoFelicitacion.play();
}