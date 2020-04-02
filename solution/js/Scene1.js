
class Scene1 extends Phaser.Scene {



    constructor() {
        super("bootGame");
    }

    create() {

        this.add.text(20, 20, "Loading game....");
        this.scene.start("playGame");
    }





    preload() {

        //------environment------//
        this.LoadImage("Cols", "assets/images/Col.png", 64, 64);
        this.LoadImage("Ground", "assets/images/Ground.png", 64, 64);
        this.LoadImage('Buildings', 'assets/images/Buildings.png', { frameWidth: 64, frameHeight: 64 });
        this.LoadImage('Windows', 'assets/images/windows.png', { frameWidth: 64, frameHeight: 64 });
        this.LoadImage('Fences', 'assets/images/Fences.png', { frameWidth: 64, frameHeight: 64 });
        this.LoadImage('Nature', 'assets/images/Nature.png', { frameWidth: 64, frameHeight: 64 });
        this.LoadImage('Props', 'assets/images/CityProps.png', { frameWidth: 64, frameHeight: 64 });
        this.LoadImage('Cars', 'assets/images/Cars.png', { frameWidth: 64, frameHeight: 64 });
        this.LoadImage('blood', 'assets/images/Blood.png', { frameWidth: 64, frameHeight: 64 });
        this.LoadImage('Overlay', 'assets/images/Overlay.png', { frameWidth: 64, frameHeight: 64 });
        this.LoadImage('Lights', 'assets/images/Lights.png', { frameWidth: 64, frameHeight: 64 });
        this.LoadImage('bullet', 'assets/images/bullet.png', { frameWidth: 5, frameHeight: 3 });


        //----UI-----//
        this.LoadImage('healthUI', 'assets/images/healthUI.png', { frameWidth: 32, frameHeight: 32 });
        this.LoadImage('ammoUI', 'assets/images/ammoUI.png', { frameWidth: 32, frameHeight: 32 });
        this.LoadImage('brainUI', 'assets/images/brainUI.png', { frameWidth: 32, frameHeight: 32 });

        this.load.tilemapTiledJSON("map", "assets/mapNew.json");

        //-----players-----//
        this.LoadSpriteSheet("girlWalkLeft1", "assets/images/spriteSheets/girl1_walkLeft.png", 32, 64);
        this.LoadSpriteSheet("girlWalkRight1", "assets/images/spriteSheets/girl1_walkRight.png", 32, 64);
        this.LoadSpriteSheet("girlWalkUp1", "assets/images/spriteSheets/girl1_walkUp.png", 32, 64);
        this.LoadSpriteSheet("girlWalkDown1", "assets/images/spriteSheets/girl1_walkDown.png", 32, 64);
        this.LoadSpriteSheet("girlFaceLeft1", "assets/images/spriteSheets/girls1_left.png", 32, 64);
        this.LoadSpriteSheet("girlFaceRight1", "assets/images/spriteSheets/girls1_right.png", 32, 64);
        this.LoadSpriteSheet("girlFaceUp1", "assets/images/spriteSheets/girls1_Up.png", 32, 64);
        this.LoadSpriteSheet("girlFaceDown1", "assets/images/spriteSheets/girls1_Down.png", 32, 64);

        //------enemies-----//
        this.LoadSpriteSheet("zombieWalkLeft1", "assets/images/spriteSheets/zombie1_walkLeft.png", 32, 64);
        this.LoadSpriteSheet("zombieWalkRight1", "assets/images/spriteSheets/zombie1_walkRight.png", 32, 64);
        this.LoadSpriteSheet("zombieWalkUp1", "assets/images/spriteSheets/zombie1_walkUp.png", 32, 64);
        this.LoadSpriteSheet("zombieWalkDown1", "assets/images/spriteSheets/zombie1_walkDown.png", 32, 64);
        this.LoadSpriteSheet("zombieFaceLeft1", "assets/images/spriteSheets/zombie1_Left.png", 32, 64);
        this.LoadSpriteSheet("zombieFaceRight1", "assets/images/spriteSheets/zombie1_Right.png", 32, 64);
        this.LoadSpriteSheet("zombieFaceUp1", "assets/images/spriteSheets/zombie1_Up.png", 32, 64);
        this.LoadSpriteSheet("zombieFaceDown1", "assets/images/spriteSheets/zombie1_Down.png", 32, 64);

        //------pickups------//
        this.LoadSpriteSheet("health", "assets/images/spriteSheets/health.png", 32, 64);
        this.LoadSpriteSheet("ammo", "assets/images/spriteSheets/ammo.png", 32, 64);
        this.LoadSpriteSheet("gun", "assets/images/spriteSheets/gun.png", 32, 64);

        //----particles-----//
        this.LoadSpriteSheet("bloodSplat", "assets/images/spriteSheets/bloodSplat.png", 64, 64);

        //-----Audio------//
        //music
        this.load.audio('music1','assets/sounds/music/music1.mp3');
        this.load.audio('music2','assets/sounds/music/music2.mp3');
        this.load.audio('music3','assets/sounds/music/music3.mp3');
        this.load.audio('music4','assets/sounds/music/music4.mp3');
        this.load.audio('music5','assets/sounds/music/music5.mp3');
        //sfx
        this.load.audio('maleScream1','assets/sounds/maleScream1.mp3');
        this.load.audio('maleScream2','assets/sounds/maleScream2.mp3');
        this.load.audio('maleScream3','assets/sounds/maleScream3.mp3');
        this.load.audio('maleScream4','assets/sounds/maleScream4.mp3');
        this.load.audio('femaleScream1','assets/sounds/femaleScream1.mp3');
        this.load.audio('femaleScream2','assets/sounds/femaleScream2.mp3');
        this.load.audio('femaleScream3','assets/sounds/femaleScream3.mp3');
        this.load.audio('femaleScream4','assets/sounds/femaleScream4.mp3');
        this.load.audio('bodyImpact1','assets/sounds/bodyImpact1.mp3');
        this.load.audio('bodyImpact2','assets/sounds/bodyImpact2.mp3');
        this.load.audio('bodyImpact3','assets/sounds/bodyImpact3.mp3');
        this.load.audio('dryFire','assets/sounds/dryFire.mp3');
        this.load.audio('kaChing','assets/sounds/kaChing.mp3');
        this.load.audio('zombieShout1','assets/sounds/zombieShout1.mp3');
        this.load.audio('zombieShout2','assets/sounds/zombieShout2.mp3');
        this.load.audio('gunShot1','assets/sounds/gunShot1.mp3');
        this.load.audio('collect1','assets/sounds/collect1.mp3');
        this.load.audio('collect2','assets/sounds/collect2.mp3');
        this.load.audio('collect3','assets/sounds/collect3.mp3');


    }


    LoadImage(varName, location, frameWidth, frameHeight) {
        this.load.image(varName, location, { frameWidth: frameWidth, frameHeight: frameHeight });
    }

    LoadSpriteSheet(varName, fileLocation, frameWidth, frameHeight) {
        this.load.spritesheet(varName, fileLocation, {
            frameWidth: frameWidth,
            frameHeight: frameHeight
        });
    }





}

