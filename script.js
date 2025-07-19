//@ts-nocheck
const imagenes = [
  'Cuy.png', 'Mamamoe.png', 'Kike.png',
  'Picky.png', 'Papapopo.png', 'mycopy.png',
  'Nuevo.png' // Agrega más pares aquí si gustas
];

let cartas = [...imagenes, ...imagenes]; // Duplicamos para tener pares
let cartasVolteadas = [];
let intentos = 0;

const sonidoAcierto = new Audio('sounds/acierto.mp3');

cartas = cartas.sort(() => 0.5 - Math.random());

const tablero = document.getElementById('tablero');
const intentosTexto = document.getElementById('intentos');

// Limpia el tablero antes de crear
tablero.innerHTML = '';

cartas.forEach((imagen, i) => {
  const carta = document.createElement('div');
  carta.classList.add('carta');
  carta.dataset.valor = imagen;
  carta.dataset.index = i;
  carta.innerHTML = '';
  carta.addEventListener('click', () => voltearCarta(carta));
  tablero.appendChild(carta);
});

function voltearCarta(carta) {
  if (carta.classList.contains('volteada') || cartasVolteadas.length === 2) return;

  carta.innerHTML = <img src="images/${carta.dataset.valor}" alt="Carta">;
  carta.classList.add('volteada');
  cartasVolteadas.push(carta);

  if (cartasVolteadas.length === 2) {
    intentos++;
    intentosTexto.textContent = Intentos: ${intentos};
    const [c1, c2] = cartasVolteadas;
    if (c1.dataset.valor === c2.dataset.valor) {
      sonidoAcierto.play();
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
  cartas = [...imagenes, ...imagenes].sort(() => 0.5 - Math.random());
  cartasVolteadas = [];
  intentos = 0;
  intentosTexto.textContent = Intentos: ${intentos};
  tablero.innerHTML = '';
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
