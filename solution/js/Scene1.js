
class Scene1 extends Phaser.Scene{



    constructor() {
        super("bootGame");

    }

    create(){



        this.add.text(20,20,"Loading game....");
        this.scene.start("playGame");
    }





    preload()
{


    //------environment------//
    this.LoadImage( "Ground", "assets/images/Ground.png", 64, 64);
    this.LoadImage('Buildings', 'assets/images/Buildings.png', {frameWidth: 64, frameHeight: 64});
    this.LoadImage( 'Windows', 'assets/images/windows.png', {frameWidth: 64, frameHeight: 64});
    this.LoadImage('Fences', 'assets/images/Fences.png', {frameWidth: 64, frameHeight: 64});
    this.LoadImage('Nature', 'assets/images/Nature.png', {frameWidth: 64, frameHeight: 64});
    this.LoadImage( 'Props', 'assets/images/CityProps.png', {frameWidth: 64, frameHeight: 64});
    this.LoadImage( 'Cars', 'assets/images/Cars.png', {frameWidth: 64, frameHeight: 64});
    this.LoadImage( 'blood', 'assets/images/Blood.png', {frameWidth: 64, frameHeight: 64});
    this.LoadImage('Overlay', 'assets/images/Overlay.png', {frameWidth: 64, frameHeight: 64});
    this.LoadImage( 'Lights', 'assets/images/Lights.png', {frameWidth: 64, frameHeight: 64});
    this.LoadImage( 'bullet', 'assets/images/bullet.png', {frameWidth:5, frameHeight:3});


    //----UI-----//
    this.LoadImage( 'healthUI', 'assets/images/healthUI.png', {frameWidth:32, frameHeight:32});
    this.LoadImage( 'ammoUI', 'assets/images/ammoUI.png', {frameWidth:32, frameHeight:32});
    this.LoadImage( 'brainUI', 'assets/images/brainUI.png', {frameWidth:32, frameHeight:32});

    this.load.tilemapTiledJSON("map", "assets/map.json");

    //-----players-----//
    this.LoadSpriteSheet("girlWalkLeft1","assets/images/spriteSheets/girl1_walkLeft.png",32,64);
    this.LoadSpriteSheet("girlWalkRight1","assets/images/spriteSheets/girl1_walkRight.png",32,64);
    this.LoadSpriteSheet("girlWalkUp1","assets/images/spriteSheets/girl1_walkUp.png",32,64);
    this.LoadSpriteSheet("girlWalkDown1", "assets/images/spriteSheets/girl1_walkDown.png",32,64);
    this.LoadSpriteSheet("girlFaceLeft1","assets/images/spriteSheets/girls1_left.png",32,64);
    this.LoadSpriteSheet("girlFaceRight1","assets/images/spriteSheets/girls1_right.png",32,64);
    this.LoadSpriteSheet("girlFaceUp1","assets/images/spriteSheets/girls1_Up.png",32,64);
    this.LoadSpriteSheet("girlFaceDown1","assets/images/spriteSheets/girls1_Down.png",32,64);

    //------enemies-----//
    this.LoadSpriteSheet("zombieWalkLeft1","assets/images/spriteSheets/zombie1_walkLeft.png",32,64);
    this.LoadSpriteSheet("zombieWalkRight1","assets/images/spriteSheets/zombie1_walkRight.png",32,64);
    this.LoadSpriteSheet("zombieWalkUp1","assets/images/spriteSheets/zombie1_walkUp.png",32,64);
    this.LoadSpriteSheet("zombieWalkDown1", "assets/images/spriteSheets/zombie1_walkDown.png",32,64);
    this.LoadSpriteSheet("zombieFaceLeft1","assets/images/spriteSheets/zombie1_Left.png",32,64);
    this.LoadSpriteSheet("zombieFaceRight1","assets/images/spriteSheets/zombie1_Right.png",32,64);
    this.LoadSpriteSheet("zombieFaceUp1","assets/images/spriteSheets/zombie1_Up.png",32,64);
    this.LoadSpriteSheet("zombieFaceDown1","assets/images/spriteSheets/zombie1_Down.png",32,64);

    //------pickups------//
    this.LoadSpriteSheet("health","assets/images/spriteSheets/health.png",32,64);
    this.LoadSpriteSheet("ammo","assets/images/spriteSheets/ammo.png",32,64);
    this.LoadSpriteSheet("gun","assets/images/spriteSheets/gun.png",32,64);

    //----particles-----//
    this.LoadSpriteSheet("bloodSplat","assets/images/spriteSheets/bloodSplat.png",64,64);



}


    LoadImage( varName, location, frameWidth,frameHeight)
    {
        this.load.image(varName, location, {frameWidth: frameWidth, frameHeight: frameHeight});
    }

    LoadSpriteSheet(varName, fileLocation, frameWidth, frameHeight){
        this.load.spritesheet(varName, fileLocation, {
            frameWidth: frameWidth,
            frameHeight: frameHeight
        });
    }





}

