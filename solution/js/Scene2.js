
class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {

        this.speed = 160;
        this.bulletVelX = 0;
        this.bulletVelY = 0;
        // this.scaleX = 1;
        // this.scaleY = 1;
        this.bulletRotation = 0;
        this.canFire = true;
        this.canHurtPlayer = true;






        //---------------------CREATE STUFF------------------------//

        //setup Map
        this.map = this.make.tilemap({ key: "map" });
        this.MapSetup(this.map, 64, 64, 32, 32);

        this.bulletGroup = this.physics.add.group();
        this.zombieGroup = this.physics.add.group();
        this.pickupGroup = this.physics.add.group();
        this.playerGroup = this.physics.add.group();
        this.particleGroup = this.physics.add.group();
        this.UIGroup = this.physics.add.group();

        //----add all spawn location here
        this.spawnLocation1 = [1677, 909];
        this.spawnLocation2 = [1871, 1131];
        this.spawnLocation3 = [1533, 1190];
        this.spawnLocation4 = [1523, 1498];
        this.spawnLocation5 = [1034, 1543];
        this.spawnLocation6 = [538, 1533];
        this.spawnLocation7 = [514, 1197];
        this.spawnLocation8 = [483, 1002];
        this.spawnLocation9 = [530, 581];
        this.spawnLocation10 = [1039, 515];
        //add them all to the array
        this.SpawnLocations = [this.spawnLocation1, this.spawnLocation2, this.spawnLocation3, this.spawnLocation4, this.spawnLocation5,
        this.spawnLocation6, this.spawnLocation7, this.spawnLocation8, this.spawnLocation9, this.spawnLocation10];



        //--------------------TILESETS---------------------//
        let tileSet1 = this.NewTileSet("Ground", "Ground");
        let tileSet2 = this.NewTileSet("Buildings", "Buildings");
        let tileSet3 = this.NewTileSet("windows", "Windows");
        let tileSet4 = this.NewTileSet("StairsRails", "Fences");
        let tileSet5 = this.NewTileSet("Nature", "Nature");
        let tileSet6 = this.NewTileSet("CityProps", "Props");
        let tileSet7 = this.NewTileSet("Cars", "Cars");
        let tileSet8 = this.NewTileSet("blood", "blood");
        let tileSet9 = this.NewTileSet("Overlay", "Overlay");
        let tileSet10 = this.NewTileSet("Lights", "Lights");
        let tileSet11 = this.NewTileSet("Cols", "Cols");

        //--------------------LAYERS---------------------//
        this.colLayer = this.NewGroundLayer("Cols", tileSet11, 0, 0);
        this.colLayer.setCollisionBetween(0, 4096);
        this.groundLayer1 = this.NewGroundLayer("Ground", tileSet1, 0, 0);
        this.NewGroundLayer("Buildings", tileSet2, 0, 0);
        this.NewGroundLayer("Windows", tileSet3, 0, 0);
        this.NewGroundLayer("Fences", tileSet4, 0, 0);
        this.NewGroundLayer("Nature", tileSet5, 0, 0);
        this.NewGroundLayer("Props", tileSet6, 0, 0);
        this.NewGroundLayer("Cars", tileSet7, 0, 0);
        this.NewGroundLayer("blood", tileSet8, 0, 0);
        this.NewGroundLayer("Overlay1", tileSet9, 0, 0);
        this.NewGroundLayer("Overlay2", tileSet9, 0, 0);
        this.NewGroundLayer("Lights", tileSet10, 0, 0);




        //------------------ANIMATION--------------------//
        //-----players-----//
        this.CreateAnimation("girl1_walkLeft_anim", "girlWalkLeft1", 5, -1, false);
        this.CreateAnimation("girl1_walkRight_anim", "girlWalkRight1", 5, -1, false);
        this.CreateAnimation("girl1_walkUp_anim", "girlWalkUp1", 5, -1, false);
        this.CreateAnimation("girl1_walkDown_anim", "girlWalkDown1", 5, -1, false);
        this.CreateAnimation("girl1_Right_anim", "girlFaceRight1", 5, -1, false);
        this.CreateAnimation("girl1_Left_anim", "girlFaceLeft1", 5, -1, false);
        this.CreateAnimation("girl1_Up_anim", "girlFaceUp1", 5, -1, false);
        this.CreateAnimation("girl1_Down_anim", "girlFaceDown1", 5, -1, false);

        //-----enemies----//
        this.CreateAnimation("zombie1_walkLeft_anim", "zombieWalkLeft1", 5, -1, false);
        this.CreateAnimation("zombie1_walkRight_anim", "zombieWalkRight1", 5, -1, false);
        this.CreateAnimation("zombie1_walkUp_anim", "zombieWalkUp1", 5, -1, false);
        this.CreateAnimation("zombie1_walkDown_anim", "zombieWalkDown1", 5, -1, false);
        this.CreateAnimation("zombie1_Right_anim", "zombieFaceRight1", 5, -1, false);
        this.CreateAnimation("zombie1_Left_anim", "zombieFaceLeft1", 5, -1, false);
        this.CreateAnimation("zombie1_Up_anim", "zombieFaceUp1", 5, -1, false);
        this.CreateAnimation("zombie1_Down_anim", "zombieFaceDown1", 5, -1, false);

        //----pickups----//
        this.CreateAnimation("health_anim", "health", 5, -1, false);
        this.CreateAnimation("ammo_anim", "ammo", 5, -1, false);
        this.CreateAnimation("gun_anim", "gun", 5, -1, false);

        //----particles----//
        this.CreateAnimation("bloodSplat_anim", "bloodSplat", 5, 0, true);

        //-----UI----//
        let healthUI = this.UIGroup.create(50, 50, 'healthUI');
        healthUI.setScrollFactor(0);
        let ammoUI = this.UIGroup.create(healthUI.x, healthUI.y + 100, 'ammoUI');
        ammoUI.setScrollFactor(0);
        let brainUI = this.UIGroup.create(healthUI.x, healthUI.y + 200, 'brainUI');
        brainUI.setScrollFactor(0);
        let healthText = this.add.text(healthUI.x + 70, healthUI.y - 20, '0', { fontFamily: '"Roboto Condensed"', fontSize: 40, fill: '#ffffff' });
        healthText.setScrollFactor(0);
        let ammoText = this.add.text(healthUI.x + 70, ammoUI.y - 20, '30', { fontFamily: '"Roboto Condensed"', fontSize: 40, fill: '#ffffff' });
        ammoText.setScrollFactor(0);
        let brainText = this.add.text(healthUI.x + 70, brainUI.y - 20, '0', { fontFamily: '"Roboto Condensed"', fontSize: 40, fill: '#ffffff' });
        brainText.setScrollFactor(0);

        // this.girl1 = this.playerGroup.create(this.groundLayer1.width/2,this.groundLayer1.height/2, "girlFaceRight");
        this.girl1 = this.playerGroup.create(312, 1026, "girlFaceRight");
        this.girl1.health = 1;
        this.girl1.ammo = 30;
        this.girl1.weapon = "gun";
        this.girl1.brains = 0;
        this.girl1.canHurtPlayer = true;
        this.girl1.UpdateBrains = function () {
            this.brains++;
            brainText.setText('' + this.brains);
        };
        this.girl1.GainHealth = function (_health) {
            this.health += _health;
            healthText.setText('' + this.health);
        };
        this.girl1.GainAmmo = function (_ammo) {
            this.ammo += _ammo;
            ammoText.setText('' + this.ammo);
        };
        this.girl1.UpdateAmmo = function () {
            this.ammo--;
            ammoText.setText('' + this.ammo);
        };
        this.physics.add.overlap(this.zombieGroup, this.playerGroup, function (zombie, player) {
            if (player.canHurtPlayer) {
                player.canHurtPlayer = false;
                player.GainHealth(-1);
            }
        });

        this.physics.add.collider(this.girl1, this.colLayer);


        //--text---//

        healthText.setText('' + this.girl1.health);

        ammoText.setText('' + this.girl1.ammo);

        brainText.setText('' + this.girl1.brains);


        console.log("PLAYER HEALTH: " + this.girl1.health);


        this.PlayerSetup(this.girl1);


        this.numberOfZombies = 20;

        //Starting Animation
        this.girl1.play("girl1_Right_anim");


        this.spawnZombie = this.time.addEvent({ delay: 5000, callback: this.SpawnZombie, callbackScope: this, loop: true });

        this.setFireTrue = this.time.addEvent({ delay: 500, callback: this.SetFireTrue, callbackScope: this, loop: true });

        this.HurtPlayerTrue = this.time.addEvent({ delay: 2000, callback: this.CanHurtPlayer, callbackScope: this, loop: true });



        //----------INTERACTION-------------//
        this.girl1.setInteractive();

        //--------------------KEYBOARD INPUT-----------------//
        let keyCodes = Phaser.Input.Keyboard.KeyCodes;
        this.keyW = this.input.keyboard.addKey(keyCodes.W);
        this.keyA = this.input.keyboard.addKey(keyCodes.A);
        this.keyS = this.input.keyboard.addKey(keyCodes.S);
        this.keyD = this.input.keyboard.addKey(keyCodes.D);
        this.keySpace = this.input.keyboard.addKey(keyCodes.SPACE);


    }

    //-----------------UPDATE------------------------------//
    update() {

        this.CheckAnimations();
        this.CheckMovement(this.speed);
        this.CheckFire();
    }

    //----------------------FUNCTONS-----------------------//

    CreateAnimation(keyName, frameName, frameRate, repeatRate, hide) {
        this.anims.create({
            key: keyName,
            frames: this.anims.generateFrameNumbers(frameName),
            frameRate: frameRate,
            repeat: repeatRate,
            hideOnComplete: hide
        });
    }

    MapSetup(map, mapWidth, mapHeight, tileWidth, tileHeight) {
        map.width = mapWidth;
        map.height = mapHeight;
        map.tileHeight = tileHeight;
        map.tileWidth = tileWidth;
    }

    PlayerSetup(player) {
        this.cameras.main.startFollow(player);
        player.setCollideWorldBounds(true);
    }

    NewTileSet(layerName, variableName) {
        return this.map.addTilesetImage(layerName, variableName);
    }

    NewGroundLayer(layerName, setOfTiles, x, y) {
        return this.map.createStaticLayer(layerName, setOfTiles, x, y);
    }

    // NewPhysicsObject(xPos,yPos,spriteName){
    //      return this.physics.add.sprite(xPos,yPos, spriteName);
    // }

    PlayAnimation(gameObject, animName, objectName) {
        gameObject.setTexture(objectName);
        gameObject.play(animName);
    }

    CheckAnimations() {
        return;
        if (Phaser.Input.Keyboard.JustDown(this.keyD)) {
            this.PlayAnimation(this.girl1, "girl1_walkRight_anim", "girlWalkRight1");
            // this.bulletSpeed *= 2;
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyA)) {
            this.PlayAnimation(this.girl1, "girl1_walkLeft_anim", "girlWalkLeft1");
            // this.bulletSpeed *= 2;
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyW)) {
            this.PlayAnimation(this.girl1, "girl1_walkUp_anim", "girlWalkUp1");
            // this.angle = Phaser.Math.CounterClockwise(0);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyS)) {
            this.PlayAnimation(this.girl1, "girl1_walkDown_anim", "girlWalkDown1");
            // this.angle = Phaser.Math.CounterClockwise(180);
        }



        if (Phaser.Input.Keyboard.JustUp(this.keyD)) {
            if (this.keyA.isDown) {
                return;
            }
            if (this.keyW.isDown) {
                return;
            }
            if (this.keyS.isDown) {
                return;
            }
            this.girl1.setVelocityX(0);
            this.PlayAnimation(this.girl1, "girl1_Right_anim", "girlFaceRight1");
        }
        if (Phaser.Input.Keyboard.JustUp(this.keyA)) {
            if (this.keyD.isDown) {
                return;
            }
            if (this.keyW.isDown) {
                return;
            }
            if (this.keyS.isDown) {
                return;
            }
            this.girl1.setVelocityX(0);
            this.PlayAnimation(this.girl1, "girl1_Left_anim", "girlFaceLeft1");
        }

        if (Phaser.Input.Keyboard.JustUp(this.keyW)) {
            if (this.keyA.isDown) {
                return;
            }
            if (this.keyD.isDown) {
                return;
            }
            if (this.keyS.isDown) {
                return;
            }
            this.girl1.setVelocityY(0);
            this.PlayAnimation(this.girl1, "girl1_Up_anim", "girlFaceUp1");
        }
        if (Phaser.Input.Keyboard.JustUp(this.keyS)) {
            if (this.keyA.isDown) {
                return;
            }
            if (this.keyD.isDown) {
                return;
            }
            if (this.keyW.isDown) {
                return;
            }
            this.girl1.setVelocityY(0);
            this.PlayAnimation(this.girl1, "girl1_Down_anim", "girlFaceDown1");
        }


    }

    SetAnimation(movement) {
        // Set the player animation based on the movement direction. This is updated only if a new animation is needed, not every frame.
        if (movement === "up") {
            this.PlayAnimation(this.girl1, "girl1_walkUp_anim", "girlWalkUp1");
        }
        else if (movement === "down") {
            this.PlayAnimation(this.girl1, "girl1_walkDown_anim", "girlWalkDown1");
        }
        else if (movement === "left") {
            this.PlayAnimation(this.girl1, "girl1_walkLeft_anim", "girlWalkLeft1");
        }
        else if (movement === "right") {
            this.PlayAnimation(this.girl1, "girl1_walkRight_anim", "girlWalkRight1");
        }
        else if (movement === "idle") {
            if (this.girl1.animationDirection === "up") {
                this.PlayAnimation(this.girl1, "girl1_Up_anim", "girlFaceUp1");
            }
            else if (this.girl1.animationDirection === "down") {
                this.PlayAnimation(this.girl1, "girl1_Down_anim", "girlFaceDown1");
            }
            else if (this.girl1.animationDirection === "left") {
                this.PlayAnimation(this.girl1, "girl1_Left_anim", "girlFaceLeft1");
            }
            else if (this.girl1.animationDirection === "right") {
                this.PlayAnimation(this.girl1, "girl1_Right_anim", "girlFaceRight1");
            }

        }
    }

    CheckMovement(speedX) {


        // Local variable defining the player movement
        var _speedy = 0;
        var _speedx = 0;

        var newAnimation = "idle";

        // Work out the vertical movement first
        if (this.keyW.isDown) {
            _speedy = -speedX;
            // _speedx = 0;
            newAnimation = "up";
        }
        else if (this.keyS.isDown) {
            _speedy = speedX;
            // _speedx = 0;
            newAnimation = "down";
        }
        else {
            _speedy = 0;
        }

        // Work out the horizontal movement second - this will override the vertical movement
        if (this.keyA.isDown) {
            _speedx = -speedX;
            // _speedy = 0;
            newAnimation = "left";
        }
        else if (this.keyD.isDown) {
            _speedx = speedX;
            // _speedy = 0;
            newAnimation = "right";
        }
        else {
            _speedx = 0;
        }

        var velocity = new Phaser.Math.Vector2();
        velocity.x = _speedx;
        velocity.y = _speedy;
        velocity.normalize();
        this.girl1.setVelocityX(velocity.x * speedX);
        this.girl1.setVelocityY(velocity.y * speedX);

        if (_speedx != 0 || _speedy != 0) {
            // If we are moving, update the bullet velocity
            this.bulletVelX = _speedx * 2;
            this.bulletVelY = _speedy * 2;

            // If we are moving, update the bullet angle
            var angle = ((Math.atan2(Math.sign(_speedx), Math.sign(_speedy)) * 180) / 3.14159) + 90;
            this.bulletRotation = angle;

            if (newAnimation != this.girl1.animationDirection) {
                // If the current animation is different from the new one then we should update it 
                this.SetAnimation(newAnimation);
                this.girl1.animationDirection = newAnimation;
            }
        }
        else {
            this.SetAnimation("idle");
            this.girl1.animationDirection = "idle";
        }
    }

    CheckFire() {
        if (this.keySpace.isDown) {
            this.FireBullet(this.bulletGroup, this.zombieGroup, this.playerGroup, this.pickupGroup, this.particleGroup, this.girl1);
        }
    }

    SpawnZombie() {

        this.numberOfZombies--;
        if (this.numberOfZombies > 0) {
            this.spawnPlaceIndex = Math.floor(Math.random() * Math.floor(this.SpawnLocations.length));
            let zombie = this.zombieGroup.create(this.SpawnLocations[this.spawnPlaceIndex][0], this.SpawnLocations[this.spawnPlaceIndex][1], "zombieFaceLeft1");
            zombie.health = 100;
        }
        else {
            clearInterval(this.SpawnZombie);
        }

    }

    CanHurtPlayer() {
        if (!this.girl1.canHurtPlayer) {
            this.girl1.canHurtPlayer = true;
        }
    }

    FireBullet(bulletGroup, zombieGroup, playerGroup, pickupGroup, particleGroup, player) {

        if (this.canFire) {
            if (this.girl1.ammo > 0) {
                this.canFire = false;
                let posX = this.girl1.x + (this.girl1.width / 2);
                let yPos = this.girl1.y;
                this.girl1.UpdateAmmo();

                let bullet = bulletGroup.create(posX, yPos, 'bullet');
                bullet.damage = 60;
                bullet.setAngle(this.bulletRotation);
                bullet.setVelocityX(this.bulletVelX);
                bullet.setVelocityY(this.bulletVelY);
                this.physics.add.overlap(bulletGroup, zombieGroup,
                    function (bullet, zombie) {

                        //get random in index
                        let index = Math.floor(Math.random() * Math.floor(3));
                        //reduce zombie health
                        zombie.health -= bullet.damage;
                        //spawn blood splatter
                        let bloodSplat = particleGroup.create(zombie.x, zombie.y, 'bloodSplat');
                        bloodSplat.play('bloodSplat_anim');


                        //if zombie health ran out
                        if (zombie.health < 0) {
                            //update brains
                            player.UpdateBrains();
                            switch (index) {
                                case 0:
                                    let health = pickupGroup.create(zombie.x, zombie.y, 'health');
                                    health.Pickup = function (player) {
                                        player.GainHealth(1);
                                        console.log("PLAYER HEALTH: " + player.health);
                                    };
                                    health.play('health_anim');
                                    break;
                                case 1:
                                    let ammo = pickupGroup.create(zombie.x, zombie.y, 'ammo');
                                    ammo.Pickup = function (player) {
                                        player.GainAmmo(10);
                                        console.log("PLAYER AMMO: " + player.ammo);
                                    };
                                    ammo.play('ammo_anim');
                                    break;
                                case 2:
                                    let gun = pickupGroup.create(zombie.x, zombie.y, 'gun');
                                    gun.Pickup = function (player) {
                                        console.log("PLAYER WEAPON: " + player.weapon);
                                    };
                                    gun.play('gun_anim');
                                    break;
                            }
                            zombie.destroy();
                        }
                        bullet.destroy();
                    });
                this.physics.add.collider(pickupGroup, playerGroup, function (pickup, player) {

                    pickup.Pickup(player);
                    pickup.destroy();
                })
            }
        }

    }

    SetFireTrue() {
        if (!this.canFire) {
            this.canFire = true;
        }
    }

}