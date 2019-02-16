//creer une nouvelle scene
let gameScene = new Phaser.Scene('Game');

//charger les assets
gameScene.preload = function(){
    //charger les images
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('dragon', 'assets/dragon.png');
};

// appelé apres le preload

gameScene.create = function() {
    //creation du fond
    let bg = this.add.sprite(0,0, 'background');     // (positions nom)

    //creation du joueur
    let player = this.add.sprite(30, 180, 'player');   // (positions nom)

    //creation du dragon
    let dragon = this.add.sprite(300, 180, 'dragon');

    player.setScale(0.5)

    //mettre le fond au centre
    bg.setPosition(640/2, 360/2);

    let gameW = this.sys.game.config.width;
    let gameH = this.sys.game.config.height;

    ///////////////////////////////////
    console.log(gameW, gameH);
    console.log(bg);
    console.log(this);
    ///////////////////////////////////
}

//Définir la configuration du jeu
let config = {
    type: Phaser.auto,  //phaser va utiliser WebGL si il peut sinon Canvas
    width: 640,
    height: 360,
    scene: gameScene
};


//Creer un nouveau jeu, prendre la configuration
let game = new Phaser.Game(config);