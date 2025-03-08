class Tutorial extends Phaser.Scene {
    constructor() {
        super({ key: 'Tutorial' });
    }

    preload() {
        this.load.image('tutorial01', './assets/panels/PanelTutorial_01.png')
    }

    create () {
        const tutorial01 = this.add.image(larguraJogo/2, alturaJogo/2, 'tutorial01'); // Adiciona a imagem ao centro 
        tutorial01.setDisplaySize(462.5, 462.5);

        const botaoContinuar = this.add.text(larguraJogo/2, 420, 'Clique para continuar', {
            fontSize: '20px',
            fill: '#000'
        }).setOrigin(0.5).setInteractive();

        botaoContinuar.on('pointerdown', () => {
            this.scene.start('Tutorial02');
        });
    }

    update () {

    }
}

class Tutorial02 extends Phaser.Scene {
    constructor() {
        super({key: 'Tutorial02'});
    }

    preload() {
        this.load.image('tutorial02', './assets/panels/PanelTutorial_02.png')
    }

    create () {
        const tutorial02 = this.add.image(larguraJogo/2, alturaJogo/2, 'tutorial02'); // Adiciona a imagem ao centro 
        tutorial02.setDisplaySize(462.5, 462.5);

        const botaoSeguir = this.add.text(larguraJogo/2, 420, 'AVANTE! MIAWRR!', {
            fontSize: '20px',
            fill: '#000'
        }).setOrigin(0.5).setInteractive();

        botaoSeguir.on('pointerdown', () => {
            this.scene.start('Jogo');
        });
    }

    update () {

    }

}