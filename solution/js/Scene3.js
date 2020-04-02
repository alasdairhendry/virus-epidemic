class Scene3 extends Phaser.Scene {

    constructor() {
        super("kevinsLevel");

    }


    create(data) {

        //Class Variables
        this.speed = 160;
        this.bulletVelX = 0;
        this.bulletVelY = 0;
        this.bulletRotation = 0;
        this.canFire1 = true;
        this.canFire2 = true;
        this.canHurtPlayer = true;
        this.zombieNumber = 0;
        this.zombiesInWorld = [];
        this.numberOfZombies = 20;
        this.colLayer = null;
        this.RandomMaleShout = [];
        this.RandomZombieHit = [];
        this.RandomMusic = [];
        this.RandomCollect = [];


        let musicConfig = {
            mute: false,
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        };


        //---------------------MAP START------------------------//

        //setup Map
        this.map = this.make.tilemap({ key: "map" });
        Helper.MapSetup(this.map, 64, 64, 32, 32);

        //Create Spawn Locations
        this.SpawnLocations = Helper.SetupSpawnLocations();

        //Setup Tile Sets
        Helper.SetupTileSets(this,this.map,this.girl1);

        //--------------------MAP END----------------------------//

        //-------------------GROUPS START----------------------------------------//

        //Create Groups
        this.bulletGroup = Helper.CreateNewGroup(this);
        this.zombieGroup = Helper.CreateNewGroup(this);
        this.pickupGroup = Helper.CreateNewGroup(this);
        this.playerGroup = Helper.CreateNewGroup(this);
        this.particleGroup = Helper.CreateNewGroup(this);
        this.UIGroup = Helper.CreateNewGroup(this);

        //------------------------GROUPS END---------------------------------------//

        //----------------------------------------------AUDIO START-------------------------------------------//

        Helper.SetupSounds(this);

        //SFX SETUP
        this.RandomMaleShout.push(this.maleScream1);
        this.RandomMaleShout.push(this.maleScream2);
        this.RandomMaleShout.push(this.maleScream3);
        this.RandomMaleShout.push(this.maleScream4);
        this.RandomZombieHit.push(this.bodyImpact1);
        this.RandomZombieHit.push(this.bodyImpact2);
        this.RandomZombieHit.push(this.bodyImpact3);
        this.RandomMusic.push(this.music1);
        this.RandomMusic.push(this.music2);
        this.RandomMusic.push(this.music3);
        this.RandomMusic.push(this.music4);
        this.RandomMusic.push(this.music5);
        this.RandomCollect.push(this.collect1);
        this.RandomCollect.push(this.collect2);
        this.RandomCollect.push(this.collect3);

        //MUSIC
        let musicIndex =  Math.floor(Math.random() * Math.floor(5));
        this.RandomMusic[musicIndex].play(musicConfig);

        //---------------------------------------------AUDIO END---------------------------------------------//


        //-------------------------------------PLAYER START------------------------------------//

        //Setup Animations
        Helper.SetupAnimations(this.anims);

        //Setup player1 UI
        this.SetupText();

        let time = this.time;

        //---Setup Player
        //Player1
        this.girl1 = this.playerGroup.create(312, 1026, "girlFaceRight");
        console.log(this.girl1.brains);
        this.girl1.brains = data.player1.brains;
        this.brainText2.text = this.girl1.brains +'';
        console.log(this.girl1.brains);
        this.PlayerSetup(this.girl1,this.brainText,this.ammoText,this.healthText,"Player 1");
        this.cameras.main.startFollow(this.girl1);

        //Player2
        this.girl2 = this.playerGroup.create(312,1026, "girlFaceRight");

        this.girl2.visible = false;
        this.girl2IsHere = false;

        //----add Physics Colliders----//
        this.SetupCollisions(time,this.RandomCollect);


        //looping time events
        this.time.addEvent({ delay: 1000, callback: this.SpawnZombie, callbackScope: this, loop: true });
        this.time.addEvent({ delay: 500, callback: this.SetFireTrue1, callbackScope: this, loop: true });
        this.time.addEvent({ delay: 500, callback: this.SetFireTrue2, callbackScope: this, loop: true });

        //--------------------KEYBOARD INPUT-----------------//
        Helper.KeyboardSetup(this);


    }

    //----------------------------------------------------------------PLAYER END----------------------------------//

    //-----------------UPDATE------------------------------//
    update() {
        if (this.girl2IsHere)
        {
            this.CheckMovementPlayer2(this.speed, this.girl2);
            this.CheckFirePlayer2(this.girl2);
        }
        this.CheckMovementPlayer1(this.speed, this.girl1);
        this.CheckFirePlayer1(this.girl1);

        Helper.UpdateZombieMovement(50,this.zombiesInWorld,this.girl1);

        if (this.keyPlayer2.isDown)
        {
            // this.girl2IsHere = true;
            // this.girl2.visible = true;
            // this.PlayerSetup(this.girl2, this.brainText2 ,this.ammoText2,this.healthText2,"Player 2");
            this.scene.start("kevinsLevel", this.girl1);
        }
    }

    //----------------------CLASS METHODS-----------------------//

    PlayerSetup(player,brainText,ammoText,healthText, name) {

        player.setCollideWorldBounds(true);


        player.name = name;
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

    CheckMovementPlayer1(speedX,player) {
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

    CheckMovementPlayer2(speedX,player) {
        // Local variable defining the player movement
        let _speedy;
        let _speedx;

        let newAnimation = "idle";

        // Work out the vertical movement first
        if (this.keyUp.isDown) {
            _speedy = -speedX;
            newAnimation = "up";
        }
        else if (this.keyDown.isDown) {
            _speedy = speedX;
            newAnimation = "down";
        }
        else {
            _speedy = 0;
        }

        // Work out the horizontal movement second - this will override the vertical movement
        if (this.keyLeft.isDown) {
            _speedx = -speedX;
            newAnimation = "left";
        }
        else if (this.keyRight.isDown) {
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
            Helper.SetPlayerAnimation("idle",this.girl2);
            this.girl2.animationDirection = "idle";
        }
    }

    CheckFirePlayer1() {
        if (this.keySpace.isDown && this.canFire1) {
            this.FireBullet1(this.bulletGroup, this.zombieGroup, this.playerGroup, this.pickupGroup, this.particleGroup, this.girl1,this.RandomZombieHit,this.RandomCollect);
        }
    }
    CheckFirePlayer2() {
        if (this.keyRightShift.isDown && this.canFire2) {
            this.FireBullet2(this.bulletGroup, this.zombieGroup, this.playerGroup, this.pickupGroup, this.particleGroup, this.girl2,this.RandomZombieHit,this.RandomCollect);
        }
    }
    SpawnZombie() {
        this.numberOfZombies--;
        if (this.numberOfZombies > 0) {
            this.spawnPlaceIndex = Math.floor(Math.random() * Math.floor(this.SpawnLocations.length));
            let zombie = this.zombieGroup.create(this.SpawnLocations[this.spawnPlaceIndex][0], this.SpawnLocations[this.spawnPlaceIndex][1], "zombieFaceLeft1");
            //******
            zombie.name = "ZOMBIE:" + this.zombieNumber;

            //******
            zombie.health = 100;
            this.zombiesInWorld.push(zombie);
            this.zombieNumber++;
        }
        else {
            clearInterval(this.SpawnZombie);
        }
    }

    FireBullet1(bulletGroup, zombieGroup, playerGroup, pickupGroup, particleGroup, player,RandomZombieHit,RandomCollect) {

        this.gunShot1.play();


        if (this.girl1.ammo > 0) {



            this.canFire1 = false;


            let posX = this.girl1.x + (this.girl1.width / 2);
            let yPos = this.girl1.y;
            this.girl1.UpdateAmmo();

            let bullet = bulletGroup.create(posX, yPos, 'bullet');
            bullet.damage = 60;
            bullet.player = this.girl1;
            bullet.setAngle(this.bulletRotation);
            bullet.setVelocityX(this.bulletVelX);
            bullet.setVelocityY(this.bulletVelY);
            this.physics.add.overlap(bulletGroup, zombieGroup,
                function (bullet, zombie) {

                    //get random in index
                    let index = Math.floor(Math.random() * Math.floor(3));


                    RandomZombieHit[2].play();
                    //reduce zombie health
                    zombie.health -= bullet.damage;


                    //spawn blood splatter
                    let bloodSplat = particleGroup.create(zombie.x, zombie.y, 'bloodSplat');
                    bloodSplat.play('bloodSplat_anim');

                    //if zombie health ran out
                    if (zombie.health < 0) {
                        let zomIndex = Math.floor(Math.random() * Math.floor(2));
                        RandomZombieHit[zomIndex].play();

                        //update brains
                        bullet.player.UpdateBrains();

                        //drop random loot
                        switch (index) {
                            case 0:
                                let health = pickupGroup.create(zombie.x, zombie.y, 'health');
                                health.Pickup = function (player) {
                                    player.GainHealth(1);
                                };
                                health.collect = function(){
                                    RandomCollect[0].play();
                                };
                                health.play('health_anim');
                                break;

                            case 1:
                                let ammo = pickupGroup.create(zombie.x, zombie.y, 'ammo');
                                ammo.Pickup = function (player) {
                                    player.GainAmmo(10);
                                };
                                ammo.collect = function(){
                                    RandomCollect[1].play();
                                };
                                ammo.play('ammo_anim');
                                break;

                            case 2:
                                let gun = pickupGroup.create(zombie.x, zombie.y, 'gun');
                                gun.Pickup = function (player) {
                                    player.GainAmmo(5);
                                };
                                gun.collect = function(){
                                    RandomCollect[2].play();
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
    FireBullet2(bulletGroup, zombieGroup, playerGroup, pickupGroup, particleGroup, player,RandomZombieHit,RandomCollect) {

        this.gunShot1.play();


        if (this.girl2.ammo > 0) {



            this.canFire2 = false;


            let posX = this.girl2.x + (this.girl2.width / 2);
            let yPos = this.girl2.y;
            this.girl2.UpdateAmmo();

            let bullet = bulletGroup.create(posX, yPos, 'bullet');
            bullet.damage = 60;
            bullet.player = this.girl2;
            bullet.setAngle(this.bulletRotation);
            bullet.setVelocityX(this.bulletVelX);
            bullet.setVelocityY(this.bulletVelY);
            this.physics.add.overlap(bulletGroup, zombieGroup,
                function (bullet, zombie) {

                    //get random in index
                    let index = Math.floor(Math.random() * Math.floor(3));


                    RandomZombieHit[2].play();
                    //reduce zombie health
                    zombie.health -= bullet.damage;


                    //spawn blood splatter
                    let bloodSplat = particleGroup.create(zombie.x, zombie.y, 'bloodSplat');
                    bloodSplat.play('bloodSplat_anim');

                    //if zombie health ran out
                    if (zombie.health < 0) {
                        let zomIndex = Math.floor(Math.random() * Math.floor(2));
                        RandomZombieHit[zomIndex].play();

                        //update brains
                        bullet.player.UpdateBrains();

                        //drop random loot
                        switch (index) {
                            case 0:
                                let health = pickupGroup.create(zombie.x, zombie.y, 'health');
                                health.Pickup = function (player) {
                                    player.GainHealth(1);
                                };
                                health.collect = function(){
                                    RandomCollect[0].play();
                                };
                                health.play('health_anim');
                                break;

                            case 1:
                                let ammo = pickupGroup.create(zombie.x, zombie.y, 'ammo');
                                ammo.Pickup = function (player) {
                                    player.GainAmmo(10);
                                };
                                ammo.collect = function(){
                                    RandomCollect[1].play();
                                };
                                ammo.play('ammo_anim');
                                break;

                            case 2:
                                let gun = pickupGroup.create(zombie.x, zombie.y, 'gun');
                                gun.Pickup = function (player) {
                                    player.GainAmmo(5);
                                };
                                gun.collect = function(){
                                    RandomCollect[2].play();
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

    SetFireTrue1(_fireTrue) {
        if (!this.canFire1) {
            this.canFire1 = true;
        }
    }
    SetFireTrue2(_fireTrue) {
        if (!this.canFire2) {
            this.canFire2 = true;
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
        this.physics.add.collider(this.girl2, this.colLayer);
        //Player=>pickup touch each other
        this.physics.add.collider(this.pickupGroup, this.playerGroup, function (pickup, player) {
            pickup.Pickup(player);
            pickup.collect();
            pickup.destroy();
        });

        this.physics.add.collider(this.zombieGroup, this.colLayer);
    }

    SetupText(){
        this.player1Text = this.add.text(100,50, 'Player 1', { fontFamily: '"Roboto Condensed"', fontSize: 60, fill: '#ffffff' });
        this.player1Text.setScrollFactor(0);
        this.healthUI = this.UIGroup.create(100, 200, 'healthUI');
        this.healthUI.setScrollFactor(0);
        this.ammoUI = this.UIGroup.create(this.healthUI.x, this.healthUI.y + 100, 'ammoUI');
        this.ammoUI.setScrollFactor(0);
        this.brainUI = this.UIGroup.create(this.healthUI.x, this.healthUI.y + 200, 'brainUI');
        this.brainUI.setScrollFactor(0);
        this.healthText = this.add.text(this.healthUI.x + 70, this.healthUI.y - 20, '0', { fontFamily: '"Roboto Condensed"', fontSize: 40, fill: '#ffffff' });
        this.healthText.setScrollFactor(0);
        this.ammoText = this.add.text(this.healthUI.x + 70, this.ammoUI.y - 20, '30', { fontFamily: '"Roboto Condensed"', fontSize: 40, fill: '#ffffff' });
        this.ammoText.setScrollFactor(0);
        this.brainText = this.add.text(this.healthUI.x + 70, this.brainUI.y - 20, '0', { fontFamily: '"Roboto Condensed"', fontSize: 40, fill: '#ffffff' });
        this.brainText.setScrollFactor(0);

        this.player2Text = this.add.text(100,650, 'Player 2', { fontFamily: '"Roboto Condensed"', fontSize: 60, fill: '#ffffff' });
        this.player2Text.setScrollFactor(0);
        this.healthUI2 = this.UIGroup.create(100, 800, 'healthUI');
        this.healthUI2.setScrollFactor(0);
        this.ammoUI2 = this.UIGroup.create(this.healthUI2.x, this.healthUI2.y + 100, 'ammoUI');
        this.ammoUI2.setScrollFactor(0);
        this.brainUI2 = this.UIGroup.create(this.healthUI2.x, this.healthUI2.y + 200, 'brainUI');
        this.brainUI2.setScrollFactor(0);
        this.healthText2 = this.add.text(this.healthUI2.x + 70, this.healthUI2.y - 20, '0', { fontFamily: '"Roboto Condensed"', fontSize: 40, fill: '#ffffff' });
        this.healthText2.setScrollFactor(0);
        this.ammoText2 = this.add.text(this.healthUI2.x + 70, this.ammoUI2.y - 20, '30', { fontFamily: '"Roboto Condensed"', fontSize: 40, fill: '#ffffff' });
        this.ammoText2.setScrollFactor(0);
        this.brainText2 = this.add.text(this.healthUI2.x + 70, this.brainUI2.y - 20, '0', { fontFamily: '"Roboto Condensed"', fontSize: 40, fill: '#ffffff' });
        this.brainText2.setScrollFactor(0);


    }




}