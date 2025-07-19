//@ts-nocheck
const imagenes = ['Cuy.png', 'Mamamoe.png', 'Kike.png', 'Picky.png', 'Papapopo.png', 'mycopy.png'];
let cartas = [];
let cartasVolteadas = [];
let intentos = 0;

const sonidoAcierto = new Audio('sounds/acierto.mp3');
const tablero = document.getElementById('tablero');
const intentosTexto = document.getElementById('intentos');

function crearTablero() {
  tablero.innerHTML = '';
  cartas = [...imagenes, ...imagenes].sort(() => 0.5 - Math.random());
  cartas.forEach((img, i) => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.valor = img;
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
    intentosTexto.textContent = `Intentos: ${intentos}`;
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
  intentos = 0;
  intentosTexto.textContent = 'Intentos: 0';
  cartasVolteadas = [];
  crearTablero();
}

reiniciarJuego(); // arranca el juego
