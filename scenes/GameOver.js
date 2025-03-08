// Define a classe GameOver, que herda de Phaser.Scene (uma cena do jogo)
class GameOver extends Phaser.Scene {
    // Construtor da classe
    constructor() {
        // Chama o construtor da classe pai (Phaser.Scene) e define a chave da cena como 'GameOver'
        super({ key: 'GameOver' });
    }

    // Método preload: carrega recursos (imagens, áudios, etc.) antes da cena ser criada
    preload () {
        // Carrega a imagem 'PanelGameOver' a partir do caminho especificado
        this.load.image('PanelGameOver', './assets/panels/PanelGameOver.png');
    }

    // Método create: é chamado quando a cena é criada, configurando os elementos visuais e interativos
    create() {
        // Adiciona a imagem 'PanelGameOver' ao centro da tela
        const PanelGameOver = this.add.image(larguraJogo/2, alturaJogo/2, 'PanelGameOver').setInteractive(); 
        // Define o tamanho da imagem para 462.5x462.5 pixels
        PanelGameOver.setDisplaySize(462.5, 462.5);

        // Adiciona um evento de clique/toque (pointerdown) à imagem
        PanelGameOver.on('pointerdown', () => {
            // Quando a imagem for clicada, inicia a cena 'Jogo'
            this.scene.start('Jogo');
        });
    }

    // Método update: é chamado continuamente durante a execução da cena (usado para lógica em tempo real)
    update () {
    }
}