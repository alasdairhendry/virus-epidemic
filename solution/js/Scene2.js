
class Scene2 extends Phaser.Scene {

    constructor() {
        super("playGame");
    }

    create() {

        //Class Variables
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
        this.numberOfZombies = 20;
        this.colLayer = null;

        //---------------------CREATE STUFF------------------------//

        //setup Map
        this.map = this.make.tilemap({ key: "map" });
        Helper.MapSetup(this.map, 64, 64, 32, 32);

        //Create Groups
        this.bulletGroup = Helper.CreateNewGroup(this);
        this.zombieGroup = Helper.CreateNewGroup(this);
        this.pickupGroup = Helper.CreateNewGroup(this);
        this.playerGroup = Helper.CreateNewGroup(this);
        this.particleGroup = Helper.CreateNewGroup(this);
        this.UIGroup = Helper.CreateNewGroup(this);
        this.CollidersGroup = Helper.CreateNewGroup(this);


        //Create Spawn Locations
       this.SpawnLocations = Helper.SetupSpawnLocations();

        //Setup Tile Sets
        Helper.SetupTileSets(this,this.map,this.girl1);

        //Setup Animations
        Helper.SetupAnimations(this.anims);


        //Setup UI
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

        //---Setup Player
        this.girl1 = this.playerGroup.create(312, 1026, "girlFaceRight");
        this.PlayerSetup(this.girl1,brainText,ammoText,healthText);

        //----add Physics Colliders----//
        this.SetupCollisions(time);




        //looping time events
        this.time.addEvent({ delay: 1000, callback: this.SpawnZombie, callbackScope: this, loop: true });
        this.time.addEvent({ delay: 500, callback: this.SetFireTrue, callbackScope: this, loop: true });

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
        this.CheckMovement(this.speed, this.girl1);
        this.CheckFire(this.girl1);
        Helper.UpdateZombieMovement(50,this.zombiesInWorld,this.girl1);
    }

    //----------------------CLASS METHODS-----------------------//

    PlayerSetup(player,brainText,ammoText,healthText) {
        this.cameras.main.startFollow(player);
        player.setCollideWorldBounds(true);


        player.name = "Player 1";
        player.health = 1;
        player.ammo = 30;
        player.weapon = "gun";
        player.brains = 0;
        player.canHurtPlayer = true;
        player.canFire = true;
        player.UpdateBrains = function () {
            this.brains++;
            brainText.setText('' + this.brains);
        };
        player.GainHealth = function (_health) {
            this.health += _health;
            healthText.setText('' + this.health);
        };
        player.GainAmmo = function (_ammo) {
            this.ammo += _ammo;
            ammoText.setText('' + this.ammo);
        };
        player.UpdateAmmo = function () {
            this.ammo--;
            ammoText.setText('' + this.ammo);
        };
        player.CanHurtPlayer = function () {
            if (!this.canHurtPlayer) {
                this.canHurtPlayer = true;
            }
        };
        player.setInteractive();
        player.play("girl1_Right_anim");
        healthText.setText('' + player.health);
        ammoText.setText('' +player.ammo);
        brainText.setText('' + player.brains);
    }

    CheckMovement(speedX,player) {
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
        player.setVelocityX(velocity.x * speedX);
        player.setVelocityY(velocity.y * speedX);

        if (_speedx !== 0 || _speedy !== 0) {
            // If we are moving, update the bullet velocity
            this.bulletVelX = _speedx * 2;
            this.bulletVelY = _speedy * 2;

            // If we are moving, update the bullet angle
            // let angle = ((Math.atan2(Math.sign(_speedx), Math.sign(_speedy)) * 180) / 3.14159) + 90;
            this.bulletRotation = ((Math.atan2(Math.sign(_speedx), Math.sign(_speedy)) * 180) / 3.14159) + 90;

            if (newAnimation !== player.animationDirection) {
                // If the current animation is different from the new one then we should update it
                Helper.SetPlayerAnimation(newAnimation,player);
                player.animationDirection = newAnimation;
            }
        }
        else {
           Helper.SetPlayerAnimation("idle",this.girl1);
            this.girl1.animationDirection = "idle";
        }
    }

    CheckFire() {
        if (this.keySpace.isDown && this.canFire) {
            this.FireBullet(this.bulletGroup, this.zombieGroup, this.playerGroup, this.pickupGroup, this.particleGroup, this.girl1, this.zombiesInWorld);
        }
    }
    SpawnZombie() {
        this.numberOfZombies--;
        if (this.numberOfZombies > 0) {
            this.spawnPlaceIndex = Math.floor(Math.random() * Math.floor(this.SpawnLocations.length));
            let zombie = this.zombieGroup.create(this.SpawnLocations[this.spawnPlaceIndex][0], this.SpawnLocations[this.spawnPlaceIndex][1], "zombieFaceLeft1");
            //******
            zombie.name = "ZOMBIE:" + this.zombieNumber;
            this.zombiesInWorld.push(zombie);
            this.zombieNumber++;
            //******
            zombie.health = 100;
        }
        else {
            clearInterval(this.SpawnZombie);
        }
    }

    FireBullet(bulletGroup, zombieGroup, playerGroup, pickupGroup, particleGroup, player) {


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

    SetFireTrue(_fireTrue) {
        if (!this.canFire) {
            this.canFire = true;
        }
    }

    SetupCollisions(time){
        //Zombie=>Player overlap each other
        this.physics.add.overlap(this.zombieGroup, this.playerGroup, function (zombie, player) {
            if (player.canHurtPlayer) {
                player.canHurtPlayer = false;
                player.GainHealth(-1);
                time.addEvent({ delay: 2000, callback: player.CanHurtPlayer, callbackScope: player, loop: false });
            }
        });

        //Player=>Collider Layer touch each other
        this.physics.add.collider(this.girl1, this.colLayer);
        //Player=>pickup touch each other
        this.physics.add.collider(this.pickupGroup, this.playerGroup, function (pickup, player) {
            pickup.Pickup(player);
            pickup.destroy();
        });

        this.physics.add.collider(this.zombieGroup, this.colLayer);
        this.physics.add.collider(this.bulletGroup, this.fenceLayer);
    }

}