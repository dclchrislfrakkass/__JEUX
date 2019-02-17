//creer une nouvelle scene
let gameScene = new Phaser.Scene('Game');

//charger les assets
gameScene.preload = function(){
    //charger les images
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('enemy', 'assets/dragon.png');
};

// appelé apres le preload

gameScene.create = function() {
    //creation du fond
    let bg = this.add.sprite(0,0, 'background');     // (positions nom)
    
    //creation du joueur
    this.player = this.add.sprite(30, 180, 'player');   // (positions nom)
    
    //creation d'un dragon
    this.enemy1 = this.add.sprite(300, 180, 'enemy');
    // let enemy2 = this.add.sprite(450, 180, 'enemy');
    
    
    // this.enemy1.rotation = Math.PI /4; // test de rotation sans mouvement
    
    //flip de l'ennemi
    this.enemy1.flipX = true;
    // enemy2.flipX = true;
    
    //gérer les tailles des sprites
    this.player.setScale(0.5);
    this.enemy1.setScale(0.5);
    // enemy2.setScale(0.5);
    
    
    
    //mettre le fond au centre
    bg.setPosition(640/2, 360/2);
    
    // let gameW = this.sys.game.config.width;
    // let gameH = this.sys.game.config.height;
    
    ////////////////////////////////////////
    //console.log(gameW, gameH);
    //console.log(bg);
    //console.log(this);
    ///////////////////////////////////////
};

//raffraichir à 60 fps
gameScene.update = function(){



    // ////////////////////////////////////////////////////////////
    // //surveiller la taille du joueur
    // if(this.player.scaleX <2){

    // //faire grandir le joueur
    // this.player.scaleX+= 0.02;
    // this.player.scaleY+= 0.02;
    // }

    // // this.enemy1.angle += 1; //rotation
    // // this.enemy1.x += 1; // déplacement en x
    // ////////////////////////////////////////////////////////
};

//Définir la configuration du jeu
let config = {
    type: Phaser.auto,  //phaser va utiliser WebGL si il peut sinon Canvas
    width: 640,
    height: 360,
    scene: gameScene
};


//Creer un nouveau jeu, prendre la configuration
let game = new Phaser.Game(config);