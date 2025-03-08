class Jogo extends Phaser.Scene { // Define a classe Jogo, que herda de Phaser.Scene (uma cena do jogo)
    constructor() {
        super({ key: 'Jogo' }); // Chama o construtor da classe pai (Phaser.Scene) e define a chave da cena como 'Jogo'
    }

    // Função preload (método)
    preload() {
        // Carrega os assets (imagens, sprites, etc.)
        this.load.image('background', './assets/background/bg.png'); // Carrega o fundo do jogo
        this.load.spritesheet('mia', './assets/sprites/PirateCat_Mia.png', {
            frameWidth: 32, // Largura de cada frame do spritesheet
            frameHeight: 32 // Altura de cada frame do spritesheet
        });
        this.load.image('plataforma', './assets/platforms/tileset.png'); // Carrega a imagem das plataformas
        this.load.image('rubi', './assets/items/ruby.png'); // Carrega a imagem dos rubis
        this.load.image('inimigo', './assets/sprites/crab.png'); // Carrega a imagem dos inimigos
        this.load.image('tesouro', './assets/items/treasure.png'); // Carrega a imagem do tesouro
    }

    // FUNÇÃO create (método)
    create() {
        // Configurações iniciais
        this.pontuacao = 0; // Inicializa a pontuação do jogador
        this.larguraJogo = this.sys.game.config.width; // Largura da tela do jogo
        this.alturaJogo = this.sys.game.config.height; // Altura da tela do jogo

        // Define os limites do mundo físico (área onde os objetos podem se mover)
        this.physics.world.setBounds(0, 0, 5000, this.alturaJogo);

        // Cria o fundo do jogo (TileSprite permite repetição horizontal)
        this.fundo = this.add.tileSprite(
            0, // Posição X inicial
            0, // Posição Y inicial
            50000, // Largura do fundo (repetição horizontal)
            this.alturaJogo, // Altura do fundo (igual à altura da tela)
            'background' // Chave da imagem do fundo
        ).setOrigin(0, 0); // Define a origem no canto superior esquerdo

        // Redimensiona o fundo para cobrir toda a tela
        this.fundo.setDisplaySize(50000, this.alturaJogo);

        // Cria o personagem principal (Mia)
        this.mia = this.physics.add.sprite(100, 100, 'mia'); // Adiciona Mia na posição (100, 100)
        this.mia.setCollideWorldBounds(true); // Impede que Mia saia dos limites do mundo
        this.mia.setScale(2.8); // Aumenta o tamanho de Mia
        this.mia.setGravityY(500); // Define a gravidade no eixo Y

        // Cria as plataformas (grupo estático de física)
        this.plataformas = this.physics.add.staticGroup();
        // Adiciona várias plataformas ao jogo
        this.plataformas.create(50, this.alturaJogo - 50, 'plataforma').setScale(2).refreshBody(); // Plataforma inicial
        // ... (outras plataformas são criadas de forma semelhante)

        // Adiciona colisão entre Mia e as plataformas
        this.physics.add.collider(this.mia, this.plataformas);

        // Cria os rubis (grupo de física)
        const rubisConfig = [
            { x: 100, y: this.alturaJogo - 100 }, // Posição do primeiro rubi
            // ... (outros rubis são definidos aqui)
        ];

        this.rubis = this.physics.add.group();
        rubisConfig.forEach(rubi => {
            const novoRubi = this.rubis.create(rubi.x, rubi.y, 'rubi'); // Cria um rubi na posição especificada
            novoRubi.setScale(0.5); // Reduz o tamanho do rubi
        });

        // Adiciona colisão entre rubis e plataformas
        this.physics.add.collider(this.rubis, this.plataformas);

        // Cria os inimigos (grupo de física)
        const inimigosConfig = [
            { x: 600, y: this.alturaJogo - 100 }, // Posição do primeiro inimigo
            // ... (outros inimigos são definidos aqui)
        ];

        this.inimigos = this.physics.add.group();
        inimigosConfig.forEach(inimigo => {
            const novoInimigo = this.inimigos.create(inimigo.x, inimigo.y, 'inimigo'); // Cria um inimigo
            novoInimigo.setScale(5); // Ajusta o tamanho do inimigo
            novoInimigo.setCollideWorldBounds(true); // Impede que o inimigo saia da tela
            novoInimigo.setVelocityX(Phaser.Math.Between(-100, 100)); // Define velocidade aleatória no eixo X
        });

        // Adiciona colisão entre Mia e os inimigos
        this.physics.add.collider(this.mia, this.inimigos, () => {
            this.scene.start('GameOver'); // Muda para a cena de Game Over ao colidir com um inimigo
        });

        // Adiciona colisão entre inimigos e plataformas
        this.physics.add.collider(this.inimigos, this.plataformas);

        // Cria o tesouro no final do mapa
        this.tesouro = this.physics.add.sprite(4900, this.alturaJogo - 100, 'tesouro').setScale(0.6);
        this.tesouro.body.allowGravity = false; // Impede que o tesouro caia

        // Verifica se Mia chegou perto do tesouro
        this.physics.add.overlap(this.mia, this.tesouro, () => {
            this.scene.start('Parabens'); // Muda para a cena de Parabéns ao coletar o tesouro
        });

        // Configura a câmera para seguir Mia
        this.cameras.main.setBounds(0, 0, 5000, this.alturaJogo);
        this.cameras.main.startFollow(this.mia);

        // Configura as animações de Mia
        this.anims.create({
            key: 'correr', // Nome da animação
            frames: this.anims.generateFrameNumbers('mia', { start: 0, end: 3 }), // Frames da animação
            frameRate: 10, // Velocidade da animação
            repeat: -1 // Repete a animação indefinidamente
        });

        this.anims.create({
            key: 'parado', // Animação de parado
            frames: [{ key: 'mia', frame: 0 }], // Frame único
            frameRate: 1
        });

        this.anims.create({
            key: 'pular', // Animação de pulo
            frames: [{ key: 'mia', frame: 4 }], // Frame único
            frameRate: 1
        });

        // Configura os controles do teclado
        this.teclado = this.input.keyboard.createCursorKeys(); // Teclas de seta
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Barra de espaço

        // Configura o placar
        this.placar = this.add.text(50, 50, 'Rubis: ' + this.pontuacao, {
            fontSize: '20px', // Tamanho da fonte
            fill: '#000', // Cor do texto (preto)
            padding: { x: 10, y: 5 } // Espaçamento interno
        })
            .setScrollFactor(0) // Fixa o placar na tela (não rola com a câmera)
            .setBackgroundColor('#ffffff') // Fundo branco
            .setDepth(10); // Garante que o placar fique acima de outros elementos
    }

    // Função update (método)
    update() {
        // Movimentação do fundo em parallax
        this.fundo.tilePositionX += 1;

        // Movimentação de Mia
        if (this.teclado.left.isDown) { // Movimento para a esquerda
            this.mia.setVelocityX(-160);
            this.mia.anims.play('correr', true);
            this.mia.setFlipX(true); // Vira Mia para a esquerda
        } else if (this.teclado.right.isDown) { // Movimento para a direita
            this.mia.setVelocityX(160);
            this.mia.anims.play('correr', true);
            this.mia.setFlipX(false); // Vira Mia para a direita
        } else { // Parado
            this.mia.setVelocityX(0);
            this.mia.anims.play('parado', true);
        }

        // Pulo
        if ((this.teclado.up.isDown || this.spaceKey.isDown) && this.mia.body.blocked.down) {
            this.mia.setVelocityY(-700); // Aplica uma força vertical para cima
            this.mia.anims.play('pular', true); // Reproduz a animação de pulo
        }

        // Movimentação dos inimigos
        this.inimigos.getChildren().forEach(inimigo => {
            if (inimigo.body.blocked.right || inimigo.body.blocked.left) {
                inimigo.setVelocityX(-inimigo.body.velocity.x); // Inverte a direção ao colidir
            }
        });

        // Verifica colisão entre Mia e os rubis
        this.rubis.getChildren().forEach(rubi => {
            this.physics.overlap(this.mia, rubi, (mia, rubiColidido) => {
                rubiColidido.disableBody(true, true); // Remove o rubi colidido
                this.pontuacao += 1; // Incrementa a pontuação
                this.placar.setText('Rubis: ' + this.pontuacao); // Atualiza o placar
            });
        });
    }
}