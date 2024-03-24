const html = document.querySelector("html");

//botoes
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const startPauseBt = document.querySelector("#start-pause");
const continuarPausar = document.querySelector("#start-pause span");
const iconeStartPause = document.querySelector(".app__card-primary-button-icon");
const botoes = document.querySelectorAll(".app__card-button");

//imagem, texto, tempo e musica
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const tempoNaTela = document.querySelector("#timer");

const musicaFoco = document.querySelector("#alternar-musica");
const musica = new Audio ("./sons/luna-rise-part-one.mp3");
musica.loop = true;
const somPlay = new Audio ("./sons/play.wav");
const somPause = new Audio ("./sons/pause.mp3");
const somFim = new Audio ("./sons/beep.mp3");

let tempoemSegundos = 1500;
let intervaloId = null;

musicaFoco.addEventListener("change", () => {
    if(musica.paused) {
        musica.play ();
    } else {
        musica.pause();
    }
})

focoBt.addEventListener("click", () =>  {
    tempoemSegundos = 1500;
    mudarContexto("foco");
    focoBt.classList.add("active");
} )

curtoBt.addEventListener("click", () => {
    tempoemSegundos = 300;
    mudarContexto("descanso-curto");
    curtoBt.classList.add("active");
}  )

longoBt.addEventListener("click", () => {
    tempoemSegundos = 900;
    mudarContexto("descanso-longo");
    longoBt.classList.add("active");
}  )

function mudarContexto (contexto) {
    mostrarTempo();
    botoes.forEach(function(contexto) {
        contexto.classList.remove("active");
    })
    html.setAttribute("data-contexto", contexto);
    banner.setAttribute ("src", `./imagens/${contexto}.png`);
    switch(contexto) {
        case "foco":
            titulo.innerHTML = ` Otimize sua produtividade, <strong class="app__title-strong">mergulhe no que importa.</strong> `
            break;
        case "descanso-curto":
            titulo.innerHTML = ` Respire e relaxe por um tempo, <strong class="app__title-strong">Faça uma pausa curta! </strong> `
            break;
        case "descanso-longo":
            titulo.innerHTML = ` Descanse por maior tempo, <br>
            <strong class="app__title-strong">Faça uma pausa longa! `  
            default:
                break;
    }
}

const contagemRegressiva = () => {
    if (tempoemSegundos <= 0) {
        somFim.play();
        alert("Tempo finalizado.");
        zerar();
        return;
    } 
        tempoemSegundos -= 1;
        mostrarTempo();    
    }

startPauseBt.addEventListener("click", iniciaOuPausa);

function iniciaOuPausa () {
    if (intervaloId) {
        somPause.play();
        zerar();
        return;
    }
    somPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000) 
    continuarPausar.textContent = "Pausar";
    iconeStartPause.setAttribute("src", "./imagens/pause.png");
}

function zerar () {
    clearInterval (intervaloId);
    continuarPausar.textContent = "Iniciar";
    iconeStartPause.setAttribute("src", "./imagens/play_arrow.png");
    intervaloId = null;
}

function mostrarTempo () {
    const tempo = new Date(tempoemSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();