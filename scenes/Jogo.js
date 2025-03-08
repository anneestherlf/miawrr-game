class Jogo extends Phaser.Scene {
    constructor() {
        super({ key: 'Jogo' });
    }

    preload() {
        // Carrega os assets
        this.load.image('background', './assets/background/bg.png');
        this.load.spritesheet('mia', './assets/sprites/PirateCat_Mia.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.image('plataforma', './assets/platforms/tileset.png');
        this.load.image('rubi', './assets/items/ruby.png');
        this.load.image('inimigo', './assets/sprites/crab.png'); // Carrega o sprite do inimigo
        this.load.image('tesouro', './assets/items/treasure.png'); // Carrega o sprite do tesouro
    }

    create() {
        // Configurações iniciais
        this.pontuacao = 0;
        this.larguraJogo = this.sys.game.config.width;
        this.alturaJogo = this.sys.game.config.height;

        this.physics.world.setBounds(0, 0, 5000, this.alturaJogo);

        // Cria um TileSprite para o fundo
        this.fundo = this.add.tileSprite(
            0, // Posição X
            0, // Posição Y
            50000, // Largura do TileSprite (repetição horizontal)
            this.alturaJogo, // Altura do TileSprite (igual à altura da tela)
            'background' // Chave da imagem
        ).setOrigin(0, 0);

        // Redimensiona o fundo para cobrir toda a tela
        this.fundo.setDisplaySize(50000, this.alturaJogo);

        // Cria o personagem (Mia)
        this.mia = this.physics.add.sprite(100, 100, 'mia');
        this.mia.setCollideWorldBounds(true);
        this.mia.setScale(2.8); // Aumenta para o tamanho original
        this.mia.setGravityY(500);

        // Cria as plataformas
        this.plataformas = this.physics.add.staticGroup();
        this.plataformas.create(50, this.alturaJogo - 50, 'plataforma').setScale(2).refreshBody(); // Plataforma inicial
        this.plataformas.create(150, this.alturaJogo - 50, 'plataforma').setScale(2).refreshBody();
        this.plataformas.create(250, this.alturaJogo - 50, 'plataforma').setScale(2).refreshBody();
        this.plataformas.create(350, this.alturaJogo - 50, 'plataforma').setScale(2).refreshBody();
        this.plataformas.create(450, this.alturaJogo - 50, 'plataforma').setScale(2).refreshBody();
        this.plataformas.create(550, this.alturaJogo - 200, 'plataforma').setScale(2).refreshBody(); // Plataforma mais alta
        this.plataformas.create(750, this.alturaJogo - 300, 'plataforma').setScale(2).refreshBody(); // Plataforma alta e distante
        this.plataformas.create(950, this.alturaJogo - 50, 'plataforma').setScale(2).refreshBody(); // Retorno ao chão
        this.plataformas.create(1150, this.alturaJogo - 400, 'plataforma').setScale(2).refreshBody(); // Plataforma muito alta
        this.plataformas.create(1350, this.alturaJogo - 50, 'plataforma').setScale(2).refreshBody(); // Retorno ao chão
        this.plataformas.create(1550, this.alturaJogo - 250, 'plataforma').setScale(2).refreshBody(); // Plataforma média
        this.plataformas.create(1750, this.alturaJogo - 50, 'plataforma').setScale(2).refreshBody(); // Retorno ao chão
        this.plataformas.create(1950, this.alturaJogo - 350, 'plataforma').setScale(2).refreshBody(); // Plataforma alta
        this.plataformas.create(2150, this.alturaJogo - 50, 'plataforma').setScale(2).refreshBody(); // Retorno ao chão
        this.plataformas.create(2350, this.alturaJogo - 450, 'plataforma').setScale(2).refreshBody(); // Plataforma muito alta
        this.plataformas.create(2550, this.alturaJogo - 50, 'plataforma').setScale(2).refreshBody(); // Retorno ao chão
        this.plataformas.create(2750, this.alturaJogo - 300, 'plataforma').setScale(2).refreshBody(); // Plataforma alta
        this.plataformas.create(2950, this.alturaJogo - 50, 'plataforma').setScale(2).refreshBody(); // Retorno ao chão
        this.plataformas.create(3150, this.alturaJogo - 400, 'plataforma').setScale(2).refreshBody(); // Plataforma muito alta
        this.plataformas.create(3350, this.alturaJogo - 50, 'plataforma').setScale(2).refreshBody(); // Retorno ao chão

        // Adiciona colisão entre Mia e as plataformas
        this.physics.add.collider(this.mia, this.plataformas);

        // Cria os rubis
        const rubisConfig = [
            { x: 100, y: this.alturaJogo - 100 },
            { x: 150, y: this.alturaJogo - 250 },
            { x: 300, y: this.alturaJogo - 150 },
            { x: 450, y: this.alturaJogo - 300 },
            { x: 600, y: this.alturaJogo - 200 },
            { x: 750, y: this.alturaJogo - 350 },
            { x: 900, y: this.alturaJogo - 100 },
            { x: 1050, y: this.alturaJogo - 250 },
            { x: 1200, y: this.alturaJogo - 150 },
            { x: 1350, y: this.alturaJogo - 300 },
            { x: 1500, y: this.alturaJogo - 200 },
            { x: 1650, y: this.alturaJogo - 350 },
            { x: 1800, y: this.alturaJogo - 100 },
            { x: 1950, y: this.alturaJogo - 250 },
            { x: 2100, y: this.alturaJogo - 150 },
            { x: 2250, y: this.alturaJogo - 300 },
            { x: 2400, y: this.alturaJogo - 200 },
            { x: 2550, y: this.alturaJogo - 350 },
            { x: 2700, y: this.alturaJogo - 100 },
            { x: 2850, y: this.alturaJogo - 250 },
            { x: 3000, y: this.alturaJogo - 150 },
            { x: 3150, y: this.alturaJogo - 300 },
            { x: 3300, y: this.alturaJogo - 200 },
            { x: 3450, y: this.alturaJogo - 350 },
            { x: 3600, y: this.alturaJogo - 100 },
            { x: 3750, y: this.alturaJogo - 250 },
            { x: 3900, y: this.alturaJogo - 150 },
            { x: 4050, y: this.alturaJogo - 300 },
            { x: 4200, y: this.alturaJogo - 200 },
            { x: 4350, y: this.alturaJogo - 350 },
            { x: 4500, y: this.alturaJogo - 100 },
            { x: 4650, y: this.alturaJogo - 250 },
            { x: 4800, y: this.alturaJogo - 150 },
            { x: 4950, y: this.alturaJogo - 300 },
            { x: 500, y: this.alturaJogo - 200 },
            { x: 650, y: this.alturaJogo - 350 },
            { x: 800, y: this.alturaJogo - 100 },
            { x: 950, y: this.alturaJogo - 250 },
            { x: 1100, y: this.alturaJogo - 150 },
            { x: 1250, y: this.alturaJogo - 300 },
            { x: 1400, y: this.alturaJogo - 200 },
            { x: 1550, y: this.alturaJogo - 350 },
            { x: 1700, y: this.alturaJogo - 100 },
            { x: 1850, y: this.alturaJogo - 250 },
            { x: 2000, y: this.alturaJogo - 150 },
            { x: 2150, y: this.alturaJogo - 300 },
            { x: 2300, y: this.alturaJogo - 200 },
            { x: 2450, y: this.alturaJogo - 350 },
            { x: 2600, y: this.alturaJogo - 100 },
            { x: 2750, y: this.alturaJogo - 250 }
        ];

        this.rubis = this.physics.add.group();
        rubisConfig.forEach(rubi => {
            const novoRubi = this.rubis.create(rubi.x, rubi.y, 'rubi');
            novoRubi.setScale(0.5); // Reduz o tamanho do rubi
        });

        // Adiciona colisão entre rubis e plataformas
        this.physics.add.collider(this.rubis, this.plataformas);

        // Cria um grupo de inimigos
        this.inimigos = this.physics.add.group();

        // Adiciona inimigos ao jogo
        const inimigosConfig = [
            { x: 600, y: this.alturaJogo - 100 },
            { x: 1200, y: this.alturaJogo - 250 },
            { x: 1800, y: this.alturaJogo - 100 },
            { x: 2400, y: this.alturaJogo - 350 },
            { x: 3000, y: this.alturaJogo - 100 },
            { x: 3600, y: this.alturaJogo - 250 }
        ];

        inimigosConfig.forEach(inimigo => {
            const novoInimigo = this.inimigos.create(inimigo.x, inimigo.y, 'inimigo');
            novoInimigo.setScale(5); // Ajusta o tamanho do inimigo
            novoInimigo.setCollideWorldBounds(true); // Impede que o inimigo saia da tela
            novoInimigo.setVelocityX(Phaser.Math.Between(-100, 100)); // Movimento aleatório
        });

        // Adiciona colisão entre Mia e os inimigos
        this.physics.add.collider(this.mia, this.inimigos, () => {
            this.scene.start('GameOver'); // Muda para a cena de Game Over
        });

        // Adiciona colisão entre inimigos e plataformas
        this.physics.add.collider(this.inimigos, this.plataformas);

        // Cria o tesouro no final do mapa
        this.tesouro = this.physics.add.sprite(4900, this.alturaJogo - 100, 'tesouro').setScale(0.6);
        this.tesouro.body.allowGravity = false; // Impede que o tesouro caia

        // Verifica se Mia chegou perto do tesouro
        this.physics.add.overlap(this.mia, this.tesouro, () => {
            this.scene.start('Parabens'); // Muda para a cena de Parabéns
        });

        // Configura a câmera para seguir Mia
        this.cameras.main.setBounds(0, 0, 5000, this.alturaJogo);
        this.cameras.main.startFollow(this.mia);

        // Configura as animações de Mia
        this.anims.create({
            key: 'correr',
            frames: this.anims.generateFrameNumbers('mia', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'parado',
            frames: [{ key: 'mia', frame: 0 }],
            frameRate: 1
        });

        this.anims.create({
            key: 'pular',
            frames: [{ key: 'mia', frame: 4 }],
            frameRate: 1
        });

        // Configura os controles
        this.teclado = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Configura o placar
        this.placar = this.add.text(50, 50, 'Rubis: ' + this.pontuacao, {
            fontSize: '20px',
            padding: { x: 10, y: 5 } // Espaçamento interno
        })
            .setScrollFactor(0) // Fixa o placar na tela
            .setBackgroundColor('#ffffff') // Fundo branco
            .setStroke('#000000', 4) // Borda preta com 4px de espessura
            .setDepth(10); // Garante que o placar fique acima de outros elementos
    }

    update() {
        // Movimentação do fundo em parallax
        this.fundo.tilePositionX += 1;

        // Configura os controles WASD
        this.teclado = {
            W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W), // Pulo
            A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A), // Esquerda
            S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S), // Baixo (não usado no exemplo)
            D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)  // Direita
        };

        // Movimentação de Mia
        if (this.teclado.A.isDown) {
            this.mia.setVelocityX(-160);
            this.mia.anims.play('correr', true);
            this.mia.setFlipX(true); // Vira Mia para a esquerda
        } else if (this.teclado.D.isDown) {
            this.mia.setVelocityX(160);
            this.mia.anims.play('correr', true);
            this.mia.setFlipX(false); // Vira Mia para a direita
        } else {
            this.mia.setVelocityX(0);
            this.mia.anims.play('parado', true);
        }

        // Pulo
        if ((this.teclado.W.isDown || this.spaceKey.isDown) && this.mia.body.blocked.down) {
            this.mia.setVelocityY(-700);
            this.mia.anims.play('pular', true);
        }

        // Movimentação dos inimigos
        this.inimigos.getChildren().forEach(inimigo => {
            if (inimigo.body.blocked.right || inimigo.body.blocked.left) {
                inimigo.setVelocityX(-inimigo.body.velocity.x); // Inverte a direção ao colidir
            }
        });

        // Verifica colisão entre Mia e rubis
        this.physics.overlap(this.mia, this.rubis, (mia, rubi) => {
            rubi.disableBody(true, true); // Remove o rubi
            this.pontuacao += 1;
            this.placar.setText('Rubis: ' + this.pontuacao); // Atualiza o placar
        });
    }
}