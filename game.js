var config = {
    type: Phaser.AUTO, // tipo de renderização
    backgroundColor: '#00000000', // cor do fundo
    width: 1000, // largura da tela 
    height: 600, // altura da tela
    scale: {
        mode: Phaser.Scale.FIT // ajustar para caber na tela sem distorcer
    },
    autoCenter: Phaser.Scale.CENTER, // centralizar a tela do jogo
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload() {
    // Carregar a fonte
    this.load.font('DefaultFont', 'fonts/VCR_OSD_MONO_1.001.ttf');
}

function create() {
    // Adicionar texto usando a fonte carregada
    this.add.text(100, 100, 'Utilize WASD para se movimentar e Space para pular.', { fontFamily: 'DefaultFont', fontSize: '30px', fill: '#ffffff', wordWrap: {width: 800}});
    this.background.color
}