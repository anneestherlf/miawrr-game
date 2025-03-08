const larguraJogo = 540;
const alturaJogo = 540;
const config = {
    type: Phaser.AUTO,
    width: larguraJogo,
    height: alturaJogo,
    backgroundColor: "#8EDEB2",
    pixelArt: true,
    roundPixel: false,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 500 },
           debug: false
        }
    },
    scene: [TelaInicial, Tutorial, Tutorial02, Jogo, Parabens, GameOver],
    antialias: true // Habilita anti-aliasing
};
const game = new Phaser.Game(config);