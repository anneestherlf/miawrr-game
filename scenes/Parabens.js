class Parabens extends Phaser.Scene {
    constructor() {
        super({ key: 'Parabens' });
    }

    preload () {
        this.load.image('PanelParabens', './assets/panels/PanelParabens.png');
    }

    create() {
        const PanelParabens = this.add.image(larguraJogo/2, alturaJogo/2, 'PanelParabens').setInteractive(); // Adiciona a imagem ao centro 
        PanelParabens.setDisplaySize(462.5, 462.5);

        PanelParabens.on('pointerdown', () => {
            this.scene.start('TelaInicial');
        });

    }

    update () {

    }
}