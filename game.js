var config = {
    type: Phaser.AUTO,
    backgroundColor: '#00000000',
    width: 800,
    height: 600,
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
    this.add.text(100, 100, 'Não', { fontFamily: 'DefaultFont', fontSize: '50px', fill: '#ffffff' });
    this.background.color
}