// Define a largura e altura do jogo (em pixels)
const larguraJogo = 540;
const alturaJogo = 540;

// Configurações do jogo usando Phaser
const config = {
    type: Phaser.AUTO, // Define o tipo de renderização (WebGL ou Canvas, dependendo do suporte do navegador)
    width: larguraJogo, // Largura do jogo
    height: alturaJogo, // Altura do jogo
    backgroundColor: "#8EDEB2", // Cor de fundo do jogo (um tom de verde claro)
    pixelArt: true, // Habilita o modo pixel art (evita suavização de imagens)
    roundPixel: false, // Define se os pixels devem ser arredondados (neste caso, não)
    scale: {
        mode: Phaser.Scale.FIT, // Ajusta o jogo para caber na tela mantendo a proporção
        autoCenter: Phaser.Scale.CENTER_BOTH // Centraliza o jogo horizontal e verticalmente
    },
    physics: {
        default: "arcade", // Usa o sistema de física Arcade (simples e eficiente para jogos 2D)
        arcade: {
            gravity: { y: 500 }, // Define a gravidade no eixo Y (500 pixels por segundo ao quadrado)
            debug: false // Desativa o modo de debug (útil para visualizar hitboxes e físicas)
        }
    },
    scene: [TelaInicial, Tutorial, Tutorial02, Jogo, Parabens, GameOver], // Lista de cenas do jogo
    antialias: true // Habilita anti-aliasing (suavização de bordas)
};

// Cria uma nova instância do jogo com as configurações definidas
const game = new Phaser.Game(config);