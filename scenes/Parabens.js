// Define a classe Parabens, que herda de Phaser.Scene (uma cena do jogo)
class Parabens extends Phaser.Scene {
    // Construtor da classe
    constructor() {
        // Chama o construtor da classe pai (Phaser.Scene) e define a chave da cena como 'Parabens'
        super({ key: 'Parabens' });
    }

    // Método preload: carrega recursos (imagens, áudios, etc.) antes da cena ser criada
    preload () {
        // Carrega a imagem 'PanelParabens' a partir do caminho especificado
        this.load.image('PanelParabens', './assets/panels/PanelParabens.png');
    }

    // Método create: é chamado quando a cena é criada, configurando os elementos visuais e interativos
    create() {
        // Adiciona a imagem 'PanelParabens' ao centro da tela
        const PanelParabens = this.add.image(larguraJogo/2, alturaJogo/2, 'PanelParabens').setInteractive(); 
        // Define o tamanho da imagem para 462.5x462.5 pixels
        PanelParabens.setDisplaySize(462.5, 462.5);

        // Adiciona um evento de clique/toque (pointerdown) à imagem
        PanelParabens.on('pointerdown', () => {
            // Quando a imagem for clicada, inicia a cena 'TelaInicial'
            this.scene.start('TelaInicial');
        });
    }

    // Método update: é chamado continuamente durante a execução da cena (usado para lógica em tempo real)
    update () {

    }
}