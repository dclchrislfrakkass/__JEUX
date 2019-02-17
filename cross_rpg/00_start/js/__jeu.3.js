//creer une nouvelle scene
let gameScene = new Phaser.Scene('Game');

//initialise les paramètres de la scène
gameScene.init = function(){
    //vitesse du joueur
    this.playerSpeed = 3;

    //vitesse de l'ennemi
    this.enemyMinSpeed = 2;
    this.enemyMaxSpeed = 4.5;

    //aller-retour 
    this.enemyMinY = 80;
    this.enemyMaxY = 280;

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
    
   
    //gérer les tailles des sprites
    this.player.setScale(0.5);

     
    //mettre le fond au centre
    bg.setPosition(640/2, 360/2);

    //enemmis

    this.enemy = this.add.sprite(120, this.sys.game.config.height /2, 'enemy');
    this.enemy.flipX = true;
    this.enemy.setScale(0.6);

    //determine la vitesse de l'ennemi et si l'ennemi part au départ vers le haut ou le bas
    let dir = Math.random() < 0.5 ? 1 : -1;
    let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
    this.enemy.speed = dir * speed;
    
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
    // mouvement ennemi
    this.enemy.y += this.enemy.speed;

    
    //vérifie la hauteur minimum ou maximum de y
    let conditionUp = this.enemy.speed < 0 && this.enemy.y <= this.enemyMinY;
    let conditionDown = this.enemy.speed > 0 && this.enemy.y >= this.enemyMaxY;

    //si on est audessus ou en dessous, inverse le mouvement 
    if(conditionUp || conditionDown){
        this.enemy.speed *= -1;
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