
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
        this.zombieNumber = 0;
        this.zombiesInWorld = [];





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
        // this.SpawnLocations = [this.spawnLocation8];



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
        this.NewGroundLayer("Ground", tileSet1, 0, 0);
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

        let time = this.time;

        // this.girl1 = this.playerGroup.create(this.groundLayer1.width/2,this.groundLayer1.height/2, "girlFaceRight");
        this.girl1 = this.playerGroup.create(312, 1026, "girlFaceRight");
        this.girl1.name = "Player 1";
        this.girl1.health = 1;
        this.girl1.ammo = 30;
        this.girl1.weapon = "gun";
        this.girl1.brains = 0;
        this.girl1.canHurtPlayer = true;
        this.girl1.canFire = true;
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
        this.girl1.CanHurtPlayer = function () {
            if (!this.canHurtPlayer) {
                this.canHurtPlayer = true;
            }
        };
        // this.girl1.SetFireTrue = function () {
        //     if (!this.canFire) {
        //         this.canFire = true;
        //     }
        // };
        this.physics.add.overlap(this.zombieGroup, this.playerGroup, function (zombie, player) {
            if (player.canHurtPlayer) {
                player.canHurtPlayer = false;
                player.GainHealth(-1);
                time.addEvent({ delay: 2000, callback: player.CanHurtPlayer, callbackScope: player, loop: false });
                // setTimeout(player.CanHurtPlayer,2000);
            }
        });

        this.physics.add.collider(this.girl1, this.colLayer);


        this.physics.add.collider(this.pickupGroup, this.playerGroup, function (pickup, player) {
            pickup.Pickup(player);
            pickup.destroy();
        });




        //--text---//

        healthText.setText('' + this.girl1.health);

        ammoText.setText('' + this.girl1.ammo);

        brainText.setText('' + this.girl1.brains);


        console.log("PLAYER HEALTH: " + this.girl1.health);


        this.PlayerSetup(this.girl1);


        this.numberOfZombies = 20;

        //Starting Animation
        this.girl1.play("girl1_Right_anim");


        this.time.addEvent({ delay: 1000, callback: this.SpawnZombie, callbackScope: this, loop: true });

        this.time.addEvent({ delay: 500, callback: this.SetFireTrue, callbackScope: this, loop: true });

        // this.HurtPlayerTrue = this.time.addEvent({ delay: 2000, callback: this.CanHurtPlayer, callbackScope: this, loop: true });



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
        this.CheckMovement(this.speed);
        this.CheckFire(this.girl1);
        this.UpdateZombieMovement();
        Pathfinding.GetTileGridPosition(this.girl1);
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

    SetPlayerAnimation(movement) {
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

    SetZombieAnimation(zombie) {
        if (zombie.animationDirection === "up") {
            this.PlayAnimation(zombie, "zombie1_walkUp_anim", "zombieWalkUp1");
        }
        else if (zombie.animationDirection === "down") {
            this.PlayAnimation(zombie, "zombie1_walkDown_anim", "zombieWalkDown1");
        }
        else if (zombie.animationDirection === "left") {
            this.PlayAnimation(zombie, "zombie1_walkLeft_anim", "zombieWalkLeft1");
        }
        else if (zombie.animationDirection === "right") {
            this.PlayAnimation(zombie, "zombie1_walkRight_anim", "zombieWalkRight1");
        }
    }

    CheckMovement(speedX) {
        // Local variable defining the player movement
        let _speedy;
        let _speedx;

        let newAnimation = "idle";

        // Work out the vertical movement first
        if (this.keyW.isDown) {
            _speedy = -speedX;
            newAnimation = "up";
        }
        else if (this.keyS.isDown) {
            _speedy = speedX;
            newAnimation = "down";
        }
        else {
            _speedy = 0;
        }

        // Work out the horizontal movement second - this will override the vertical movement
        if (this.keyA.isDown) {
            _speedx = -speedX;
            newAnimation = "left";
        }
        else if (this.keyD.isDown) {
            _speedx = speedX;
            newAnimation = "right";
        }
        else {
            _speedx = 0;
        }

        let velocity = new Phaser.Math.Vector2();
        velocity.x = _speedx;
        velocity.y = _speedy;
        velocity.normalize();
        this.girl1.setVelocityX(velocity.x * speedX);
        this.girl1.setVelocityY(velocity.y * speedX);

        if (_speedx !== 0 || _speedy !== 0) {
            // If we are moving, update the bullet velocity
            this.bulletVelX = _speedx * 2;
            this.bulletVelY = _speedy * 2;

            // If we are moving, update the bullet angle
            // let angle = ((Math.atan2(Math.sign(_speedx), Math.sign(_speedy)) * 180) / 3.14159) + 90;
            this.bulletRotation = ((Math.atan2(Math.sign(_speedx), Math.sign(_speedy)) * 180) / 3.14159) + 90;

            if (newAnimation !== this.girl1.animationDirection) {
                // If the current animation is different from the new one then we should update it 
                this.SetPlayerAnimation(newAnimation);
                this.girl1.animationDirection = newAnimation;
            }
        }
        else {
            this.SetPlayerAnimation("idle");
            this.girl1.animationDirection = "idle";
        }
    }

    CheckFire() {
        if (this.keySpace.isDown) {
            if (this.canFire) {
                this.FireBullet(this.bulletGroup, this.zombieGroup, this.playerGroup, this.pickupGroup, this.particleGroup, this.girl1);
            }
        }
    }

    UpdateZombieMovement() {
        let zombieSpeed = 50;

        for (let i = 0; i < this.zombiesInWorld.length; i++) {
            const zombie = this.zombiesInWorld[i];

            let animationDirection = "idle";
            let direction = new Phaser.Math.Vector2();
            direction.x = this.girl1.x - zombie.x;
            direction.y = this.girl1.y - zombie.y;
            direction.normalize();

            // zombie.x += direction.x * zombieSpeed;
            // zombie.y += direction.y * zombieSpeed;

            let angle = (Math.atan2(direction.x, direction.y) * 180) / 3.14;
            if (angle < 0) angle += 360;

            if (angle > 45 && angle < 135) {
                animationDirection = "right";
            }
            else if (angle >= 135 && angle < 225) {
                animationDirection = "up";
            }
            else if (angle >= 225 && angle < 315) {
                animationDirection = "left";
            }
            else {
                animationDirection = "down";
            }

            if (animationDirection !== zombie.animationDirection) {
                zombie.animationDirection = animationDirection;
                this.SetZombieAnimation(zombie);
            }
            zombie.setVelocityX(direction.x * zombieSpeed);
            zombie.setVelocityY(direction.y * zombieSpeed)
        }

    }

    SpawnZombie() {
        this.numberOfZombies--;
        if (this.numberOfZombies > 0) {
            this.spawnPlaceIndex = Math.floor(Math.random() * Math.floor(this.SpawnLocations.length));
            let zombie = this.zombieGroup.create(this.SpawnLocations[this.spawnPlaceIndex][0], this.SpawnLocations[this.spawnPlaceIndex][1], "zombieFaceLeft1");
            //******
            zombie.name = "zombie" + this.zombieNumber;
            this.zombieNumber++;
            Pathfinding.GetTileGridPosition(zombie);
            this.zombiesInWorld.push(zombie);
            this.physics.add.collider(zombie, this.colLayer);
            //******
            zombie.health = 100;
        }
        else {
            clearInterval(this.SpawnZombie);
        }

    }

    // CanHurtPlayer(player) {
    //     if (!player.canHurtPlayer) {
    //         player.canHurtPlayer = true;
    //     }
    // }

    FireBullet(bulletGroup, zombieGroup, playerGroup, pickupGroup, particleGroup, player) {


        if (this.girl1.ammo > 0) {
            // setTimeout(this.SetFireTrue,500);
            this.canFire = false;
            // this.time.addEvent({ delay: 500, callback: player.SetFireTrue(), callbackScope: player, loop: false });

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

                        //drop random loot
                        switch (index) {
                            case 0:
                                let health = pickupGroup.create(zombie.x, zombie.y, 'health');
                                health.Pickup = function (player) {
                                    player.GainHealth(1);
                                };
                                health.play('health_anim');
                                break;

                            case 1:
                                let ammo = pickupGroup.create(zombie.x, zombie.y, 'ammo');
                                ammo.Pickup = function (player) {
                                    player.GainAmmo(10);
                                };
                                ammo.play('ammo_anim');
                                break;

                            case 2:
                                let gun = pickupGroup.create(zombie.x, zombie.y, 'gun');
                                gun.Pickup = function (player) {
                                    player.GainAmmo(5);
                                };
                                gun.play('gun_anim');
                                break;
                        }
                        //destroy zombie
                        zombie.destroy();
                    }
                    //destroy bullet
                    bullet.destroy();
                });
        }
    }



    SetFireTrue() {
        if (!this.canFire) {
            this.canFire = true;
        }
    }

}