class Tutorial extends Phaser.Scene { // Define a classe Tutorial, que é uma cena do jogo (herda de Phaser.Scene)
    constructor() {
        super({ key: 'Tutorial' }); // Chama o construtor da classe pai (Phaser.Scene) e define a chave da cena como 'Tutorial'
    }

    preload() {
        // Carrega a imagem do primeiro painel do tutorial
        this.load.image('tutorial01', './assets/panels/PanelTutorial_01.png');
    }

    create() {
        // Adiciona a imagem do tutorial ao centro da tela
        const tutorial01 = this.add.image(larguraJogo / 2, alturaJogo / 2, 'tutorial01');
        // Define o tamanho da imagem como 462.5x462.5 pixels
        tutorial01.setDisplaySize(462.5, 462.5);

        // Cria um texto interativo para continuar o tutorial
        const botaoContinuar = this.add.text(larguraJogo / 2, 420, 'Clique para continuar', {
            fontSize: '20px', // Define o tamanho da fonte
            fill: '#000' // Define a cor do texto (preto)
        }).setOrigin(0.5).setInteractive(); // Centraliza o texto e o torna interativo

        // Adiciona um evento de clique ao texto "Clique para continuar"
        botaoContinuar.on('pointerdown', () => {
            this.scene.start('Tutorial02'); // Quando clicado, inicia a cena 'Tutorial02'
        });
    }

    update() {
        // Método update: é chamado continuamente durante a execução da cena
        // Neste caso, está vazio, pois não há lógica de atualização necessária
    }
}

class Tutorial02 extends Phaser.Scene { // Define a classe Tutorial02, que é uma cena do jogo (herda de Phaser.Scene)
    constructor() {
        super({ key: 'Tutorial02' }); // Chama o construtor da classe pai (Phaser.Scene) e define a chave da cena como 'Tutorial02'
    }

    preload() {
        // Carrega a imagem do segundo painel do tutorial
        this.load.image('tutorial02', './assets/panels/PanelTutorial_02.png');
    }

    create() {
        // Adiciona a imagem do tutorial ao centro da tela
        const tutorial02 = this.add.image(larguraJogo / 2, alturaJogo / 2, 'tutorial02');
        // Define o tamanho da imagem como 462.5x462.5 pixels
        tutorial02.setDisplaySize(462.5, 462.5);

        // Cria um texto interativo para avançar para o jogo
        const botaoSeguir = this.add.text(larguraJogo / 2, 420, 'AVANTE! MIAWRR!', {
            fontSize: '20px', // Define o tamanho da fonte
            fill: '#000' // Define a cor do texto (preto)
        }).setOrigin(0.5).setInteractive(); // Centraliza o texto e o torna interativo

        // Adiciona um evento de clique ao texto "AVANTE! MIAWRR!"
        botaoSeguir.on('pointerdown', () => {
            this.scene.start('Jogo'); // Quando clicado, inicia a cena 'Jogo'
        });
    }

    update() {
        // Método update: é chamado continuamente durante a execução da cena
        // Neste caso, está vazio, pois não há lógica de atualização necessária
    }
}