class TelaInicial extends Phaser.Scene {
    constructor() {
        super({ key: 'TelaInicial' });
    }

    preload() {
        this.load.image('Logo', './assets/game_logo.png'); // Carrega uma imagem 
        this.load.image('BotaoJogar', './assets/buttons/play_button_01.png');
        this.load.image('popupBackground', './assets/panels/PanelPrimeiraVez.png'); //imagem do popup
    }

    create() {
        const logo = this.add.image(270, 210, 'Logo'); // Adiciona a imagem ao centro 
        logo.setDisplaySize(316, 220);

        const botaoJogar = this.add.image(270, 410, 'BotaoJogar');
        botaoJogar.setDisplaySize(195, 48);

        // Interação com a imagem
        botaoJogar.setInteractive();

        // Adiciona um evento de clique
        botaoJogar.on('pointerdown', () => {
            showPopup(this);
        });

        // Inicialmente, o popup está oculto
        let popup = null;

        function showPopup(scene) {
            if (popup) return; // Evita criar múltiplos popups

            // Cria o fundo do popup
            const background = scene.add.image(larguraJogo/2, alturaJogo/2, 'popupBackground').setDisplaySize(368.5, 368.5);

            // Cria o texto do popup
            const text = scene.add.text(200, 380, 'Sim', {
                fontSize: '20px',
                fill: '#000'
            }).setOrigin(0.5).setInteractive();

            text.on('pointerdown', () => {
                scene.scene.start('Tutorial');
            });

            const text2 = scene.add.text(320, 380, 'Não', {
                fontSize: '20px',
                fill: '#000'
            }).setOrigin(0.5).setInteractive();

            text2.on('pointerdown', () => {
                scene.scene.start('Jogo');
            });

        }
        
    }
}