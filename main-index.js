const buttons = document.querySelectorAll('button');
const sortedNumber = document.querySelector('#sorted-number');
let fullscreen = false;

const channel = new BroadcastChannel("my_channel");

function animateNumberChange(newNumber) {
  const oldSpan = sortedNumber.querySelector('.number-slide');
  
  // Cria novo número animado entrando pela direita
  const newSpan = document.createElement('span');
  newSpan.classList.add('number-slide', 'slide-in-right');
  newSpan.textContent = newNumber;
  sortedNumber.appendChild(newSpan);

  // Força reflow para ativar a transição
  void newSpan.offsetWidth;

  // Ativa a animação
  newSpan.classList.remove('slide-in-right');
  newSpan.classList.add('slide-active');

  // Se havia número anterior, anima a saída para a esquerda
  if (oldSpan) {
    oldSpan.classList.add('slide-out-left');
    oldSpan.classList.remove('slide-active');

    // Remove o anterior após a animação
    setTimeout(() => oldSpan.remove(), 500);
  }
}

buttons.forEach(element => {
  element.addEventListener('click', (e) => {
    animateNumberChange(e.target.textContent);
    channel.postMessage(e.target.textContent);
  });
});

sortedNumber.addEventListener('click', () => {
  if (fullscreen) {
    document.exitFullscreen();
    fullscreen = false;
  } else {
    document.documentElement.requestFullscreen();
    fullscreen = true;
  }
});

channel.onmessage = (event) => {
  animateNumberChange(event.data);
};
