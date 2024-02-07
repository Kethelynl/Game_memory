const enter = document.querySelector('.input');
const jogador1 = document.querySelector('.player1');
const jogador2 =document.querySelector('.player2');
const button = document.querySelector('.botao');

 
const validateInput = ({target}) => {
   if(jogador1.value.length > 2 && jogador2.value.length > 2) {
        button.removeAttribute('disabled');

   }if(jogador1.value.length > 8 ){
    button.setAttribute('disabled', '');
   
  }if(jogador2.value.length > 8 ){
    button.setAttribute('disabled', '');
  }if(jogador1.value.length < 2) {
    button.setAttribute('disabled', '');
  }if(jogador2.value.length < 2) {
    button.setAttribute('disabled', '');
  }
}
const handlesubmit = (event) => {
    event.preventDefault();
    
    localStorage.setItem('player1', jogador1.value);
    localStorage.setItem('player2', jogador2.value);
    window.location = 'html/game.html';
    iniciar()
    
}
jogador1.addEventListener('input', validateInput);
jogador2.addEventListener('input', validateInput);
enter.addEventListener('submit', handlesubmit);
