//creer une nouvelle scene
let gameScene = new Phaser.Scene('Game');

//initialise les paramètres de la scène
gameScene.init = function(){
    //vitesse du joueur
    this.playerSpeed = 3;
};

//charger les assets
gameScene.preload = function(){
    //charger les images
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('enemy', 'assets/dragon.png');
    this.load.image('goal', 'assets/treasure.png');
};

// appelé apres le preload

gameScene.create = function() {
    //creation du fond
    let bg = this.add.sprite(0,0, 'background');     // (positions nom)

        
    //arrivée
    this.goal = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height /2, 'goal');
    this.goal.setScale(0.4);

    //creation du joueur
    this.player = this.add.sprite(40, this.sys.game.config.height /2, 'player');   // (positions nom)
    
    //creation d'un dragon
    this.enemy1 = this.add.sprite(300, 180, 'enemy');
    this.enemy2 = this.add.sprite(450, 180, 'enemy');
     
    //flip de l'ennemi
    this.enemy1.flipX = true;
    this.enemy2.flipX = true;
    
    //gérer les tailles des sprites
    this.player.setScale(0.5);
    this.enemy1.setScale(0.5);
    this.enemy2.setScale(0.5);
     
    //mettre le fond au centre
    bg.setPosition(640/2, 360/2);


    
};

//raffraichir à 60 fps
gameScene.update = function(){

    //vérifier les input actifs

    if(this.input.activePointer.isDown){
        // le joueur avance
        this.player.x += this.playerSpeed;
    }
    // vérifier si on chevauche le tresor
    let playerRect = this.player.getBounds();
    let tresorRect = this.goal.getBounds();

    if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, tresorRect)){
      
        // console.log('Bravo tu es au trésor !');
        // recommence le jeu
        this.scene.restart();
        return;
    }

    // console.log(playerRect); //affiche la position du joueur

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