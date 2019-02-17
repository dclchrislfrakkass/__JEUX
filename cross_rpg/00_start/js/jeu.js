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
    this.enemyMinY = 60;
    this.enemyMaxY = 300;
    
    //nous ne somme pas en mode isTerminating
    this.isTerminating = false;
    
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
    
    //enemmis groupe
    this.enemies = this.add.group({
        key: 'enemy',
        repeat: 3,
        setXY: {
            x: 120,
            y: 100,
            stepX : 125,
            stepY: 20
        }
    });
    
    
    //taille du groupe d'ennemies
    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.4, -0.4)
    
    //flip en X et vitesse
    Phaser.Actions.Call(this.enemies.getChildren(), function(enemy){
        //inversion X
        enemy.flipX = true;
        
        //determine la vitesse de l'ennemi et si l'ennemi part au départ vers le haut ou le bas
        let dir = Math.random() < 0.5 ? 1 : -1;
        let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
        enemy.speed = dir * speed;
        
        
    }, this);    
};

//raffraichir à 60 fps
gameScene.update = function(){
    
    
    //ne pas faire le if si on est en isTerminating
    if(this.isTerminating) return;
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
        // fin du jeu
        return this.gameOver();         
    }
    
    // ennemies 
    let enemies = this.enemies.getChildren();
    let numEnemies = enemies.length;
    
    
    for(let i = 0; i < numEnemies; i++){
        // mouvement ennemi
        enemies[i].y += enemies[i].speed;
        
        
        //vérifie la hauteur minimum ou maximum de y
        let conditionUp = enemies[i].speed < 0 && enemies[i].y <= this.enemyMinY;
        let conditionDown = enemies[i].speed > 0 && enemies[i].y >= this.enemyMaxY;
        
        //si on est audessus ou en dessous, inverse le mouvement 
        if(conditionUp || conditionDown){
            enemies[i].speed *= -1;
        }
        
        // vérifier si on touche un enemie    
        let enemyRect = enemies[i].getBounds();
        
        if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)){
            
            // fin du jeu
            return this.gameOver();
        }
    }
};

gameScene.gameOver = function() {
    
    // initialisation de la séquence du game over
    this.isTerminating = true;
    
    //shake la camera
    this.cameras.main.shake(500);
    
    //ecoute la fin de l'event
    this.cameras.main.on('camerashakecomplete', function(camera, effect){
        
        //fade out 
        this.cameras.main.fade(500);
        
    }, this);
    
    this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){
        
    // recommence le jeu
    this.scene.restart();
    
}, this);
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