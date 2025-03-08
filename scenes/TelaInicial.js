class TelaInicial extends Phaser.Scene { // Define a classe TelaInicial, que é uma cena do jogo (herda de Phaser.Scene)
    constructor() {
        super({ key: 'TelaInicial' }); // Chama o construtor da classe pai (Phaser.Scene) e define a chave da cena como 'TelaInicial'
    }

    preload() {
        // Carrega a imagem do logo do jogo
        this.load.image('Logo', './assets/game_logo.png'); 
        // Carrega a imagem do botão "Jogar"
        this.load.image('BotaoJogar', './assets/buttons/play_button_01.png');
        // Carrega a imagem de fundo do popup
        this.load.image('popupBackground', './assets/panels/PanelPrimeiraVez.png');
    }

    create() {
        // Adiciona a imagem do logo na posição (270, 210) e define seu tamanho como 316x220 pixels
        const logo = this.add.image(270, 210, 'Logo');
        logo.setDisplaySize(316, 220);

        // Adiciona a imagem do botão "Jogar" na posição (270, 410) e define seu tamanho como 195x48 pixels
        const botaoJogar = this.add.image(270, 410, 'BotaoJogar');
        botaoJogar.setDisplaySize(195, 48);

        // Torna o botão "Jogar" interativo (permite que ele responda a eventos de clique/toque)
        botaoJogar.setInteractive();

        // Adiciona um evento de clique ao botão "Jogar"
        botaoJogar.on('pointerdown', () => {
            showPopup(this); // Quando o botão é clicado, chama a função showPopup para exibir o popup
        });

        // Variável para armazenar o popup (inicialmente null, pois o popup não foi criado ainda)
        let popup = null;

        // Função para exibir o popup
        function showPopup(scene) {
            if (popup) return; // Se o popup já existir, não faz nada (evita criar múltiplos popups)

            // Cria o fundo do popup (imagem de fundo) e a posiciona no centro da tela
            const background = scene.add.image(larguraJogo/2, alturaJogo/2, 'popupBackground').setDisplaySize(368.5, 368.5);

            // Cria o texto "Sim" dentro do popup, na posição (200, 380)
            const text = scene.add.text(200, 380, 'Sim', {
                fontSize: '20px', // Define o tamanho da fonte
                fill: '#000' // Define a cor do texto (preto)
            }).setOrigin(0.5).setInteractive(); // Centraliza o texto e o torna interativo

            // Adiciona um evento de clique ao texto "Sim"
            text.on('pointerdown', () => {
                scene.scene.start('Tutorial'); // Quando clicado, inicia a cena 'Tutorial'
            });

            // Cria o texto "Não" dentro do popup, na posição (320, 380)
            const text2 = scene.add.text(320, 380, 'Não', {
                fontSize: '20px', // Define o tamanho da fonte
                fill: '#000' // Define a cor do texto (preto)
            }).setOrigin(0.5).setInteractive(); // Centraliza o texto e o torna interativo

            // Adiciona um evento de clique ao texto "Não"
            text2.on('pointerdown', () => {
                scene.scene.start('Jogo'); // Quando clicado, inicia a cena 'Jogo'
            });

            // Atualiza a variável popup para evitar que outro popup seja criado
            popup = background;
        }
    }
}