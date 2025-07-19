//@ts-nocheck
const sonidoReinicio=new Audio('sound/Memory_Start.mp3');
const imagenes = ['Cuy.png', 'Mamamoe.png', 'Kike.png', 'Picky.png', 'papapopo.png', 'mycopy.png', 'Kika.png'];
let cartas = [];
let cartasVolteadas = [];
let intentos = 0;

const sonidoAcierto = new Audio('sound/Memory_Congrat.mp3');
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
function verificarFinDelJuego() {
  const cartasTotales = document.querySelectorAll('.carta');
  const cartasVolteadas = document.querySelectorAll('.carta.volteada');

  if (cartasVolteadas.length === cartasTotales.length) {
    setTimeout(() => {
      alert("🎉 ¡Felicidades! Has completado el juego en " + intentos + " intentos.");
      // También puedes reproducir un sonido de victoria si quieres
      // sonidoVictoria.play();
    }, 500);
  }
}
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
document.getElementById('reiniciar').addEventListener('click', () => {
  sonidoReinicio.play();  // 🔊 Sonido de reinicio
  reiniciarJuego();       // Tu función para reiniciar el memorama
});
