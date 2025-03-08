class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    preload () {
        this.load.image('PanelGameOver', './assets/panels/PanelGameOver.png');
    }

    create() {
        const PanelGameOver = this.add.image(larguraJogo/2, alturaJogo/2, 'PanelGameOver').setInteractive(); // Adiciona a imagem ao centro 
        PanelGameOver.setDisplaySize(462.5, 462.5);

        PanelGameOver.on('pointerdown', () => {
            this.scene.start('Jogo');
        });

    }

    update () {

    }

    
}