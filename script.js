//@ts-nocheck
const imagenes = ['Cuy.png', 'Mamamoe.png', 'Kike.png', 'Picky.png', 'Papapopo.png', 'mycopy.png'];
let cartas = [...imagenes, ...imagenes];
let cartasVolteadas = [];
let intentos = 0;

// 🔊 Cargar el sonido de acierto
const sonidoAcierto = new Audio('sound/Memory_Congrat.mp3');
const sonidoReiniciar=new Audio('sound/Memory_Start.mp3')

cartas = cartas.sort(() => 0.5 - Math.random());

const tablero = document.getElementById('tablero');
const intentosTexto = document.getElementById('intentos');

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

  carta.innerHTML = `<img src="images/${carta.dataset.valor}" alt="">`;
  carta.classList.add('volteada');
  cartasVolteadas.push(carta);

  if (cartasVolteadas.length === 2) {
    intentos++;
    intentosTexto.textContent = `Intentos: ${intentos}`;
    const [c1, c2] = cartasVolteadas;
    if (c1.dataset.valor === c2.dataset.valor) {
      sonidoAcierto.play(); // 🔊 Sonido de acierto
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
document.getElementById('reiniciar').addEventListener('click', reiniciarJuego);

function reiniciarJuego() {
  sonidoReiniciar.play()
  cartas = [...imagenes, ...imagenes].sort(() => 0.5 - Math.random());
  cartasVolteadas = [];
  intentos = 0;
  intentosTexto.textContent = 'Intentos: 0';
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
