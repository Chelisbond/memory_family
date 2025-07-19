const emojis = ['🍎', '🍌', '🍇', '🍓'];
let cartas = [...emojis, ...emojis];
let cartasVolteadas = [];
let intentos = 0;

cartas = cartas.sort(() => 0.5 - Math.random());

const tablero = document.getElementById('tablero');
const intentosTexto = document.getElementById('intentos');

cartas.forEach((emoji, i) => {
  const carta = document.createElement('div');
  carta.classList.add('carta');
  carta.dataset.valor = emoji;
  carta.dataset.index = i;
  carta.textContent = '';
  carta.addEventListener('click', () => voltearCarta(carta));
  tablero.appendChild(carta);
});

function voltearCarta(carta) {
  if (carta.classList.contains('volteada') || cartasVolteadas.length === 2) return;

  carta.textContent = carta.dataset.valor;
  carta.classList.add('volteada');
  cartasVolteadas.push(carta);

  if (cartasVolteadas.length === 2) {
    intentos++;
    intentosTexto.textContent = Intentos: ${intentos};

    const [c1, c2] = cartasVolteadas;
    if (c1.dataset.valor === c2.dataset.valor) {
      cartasVolteadas = [];
    } else {
      setTimeout(() => {
        c1.textContent = '';
        c2.textContent = '';
        c1.classList.remove('volteada');
        c2.classList.remove('volteada');
        cartasVolteadas = [];
      }, 1000);
    }
  }
}
