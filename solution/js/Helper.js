class Helper{


    //-------SIMPLE HELPER METHODS-------//


    static NewGroundLayer(map,layerName, setOfTiles, x, y) {
        return map.createStaticLayer(layerName, setOfTiles, x, y);
    }

    static CreateNewGroup(_this){
        return _this.physics.add.group();
    }

   static CreateAnimation(anims,keyName, frameName, frameRate, repeatRate, hide) {
        anims.create({
            key: keyName,
            frames: anims.generateFrameNumbers(frameName),
            frameRate: frameRate,
            repeat: repeatRate,
            hideOnComplete: hide
        });
    }

   static MapSetup(map, mapWidth, mapHeight, tileWidth, tileHeight) {
        map.width = mapWidth;
        map.height = mapHeight;
        map.tileHeight = tileHeight;
        map.tileWidth = tileWidth;
    }

    static NewTileSet(map,layerName, variableName) {
        return map.addTilesetImage(layerName, variableName);
    }


    //--------------ANIMATION AND ZOMBIE MOVEMENT-----------------//
    static UpdateZombieMovement(_zombieSpeed, zombiesInWorld, player) {


        for (let i = 0; i < zombiesInWorld.length; i++) {

            let zombie = zombiesInWorld[i];

            if (zombie.scene === undefined) continue;

            let animationDirection = "idle";
            let direction = new Phaser.Math.Vector2();
            direction.x = player.x - zombie.x;
            direction.y = player.y - zombie.y;

            direction.normalize();

            let angle = (Math.atan2(direction.x, direction.y) * 180) / 3.14;
            if (angle < 0) angle += 360;

            if (angle > 45 && angle < 135) {
                animationDirection = "right";
            } else if (angle >= 135 && angle < 225) {
                animationDirection = "up";
            } else if (angle >= 225 && angle < 315) {
                animationDirection = "left";
            } else {
                animationDirection = "down";
            }

            if (animationDirection !== zombie.animationDirection) {
                zombie.animationDirection = animationDirection;
                this.SetZombieAnimation(zombie);
            }
            zombie.setVelocityX(direction.x * _zombieSpeed);
            zombie.setVelocityY(direction.y * _zombieSpeed);
        }
        }

       static SetZombieAnimation(zombie) {
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

    static PlayAnimation(gameObject, animName, objectName) {
        gameObject.setTexture(objectName);
        gameObject.play(animName);
    }

  static SetPlayerAnimation(movement,player) {
        // Set the player animation based on the movement direction. This is updated only if a new animation is needed, not every frame.
        if (movement === "up") {
            this.PlayAnimation(player, "girl1_walkUp_anim", "girlWalkUp1");
        }
        else if (movement === "down") {
            this.PlayAnimation(player, "girl1_walkDown_anim", "girlWalkDown1");
        }
        else if (movement === "left") {
            this.PlayAnimation(player, "girl1_walkLeft_anim", "girlWalkLeft1");
        }
        else if (movement === "right") {
            this.PlayAnimation(player, "girl1_walkRight_anim", "girlWalkRight1");
        }
        else if (movement === "idle") {
            if (player.animationDirection === "up") {
                this.PlayAnimation(player, "girl1_Up_anim", "girlFaceUp1");
            }
            else if (player.animationDirection === "down") {
                this.PlayAnimation(player, "girl1_Down_anim", "girlFaceDown1");
            }
            else if (player.animationDirection === "left") {
                this.PlayAnimation(player, "girl1_Left_anim", "girlFaceLeft1");
            }
            else if (player.animationDirection === "right") {
                this.PlayAnimation(player, "girl1_Right_anim", "girlFaceRight1");
            }

        }
    }

    //--------REPETITIVE CODE METHODS HERE --------///
    static SetupSpawnLocations(){
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
        return this.SpawnLocations;
    }

    static SetupTileSets(_this,map){

        let tileSet1 =  this.NewTileSet(map,"Ground", "Ground");
        let tileSet2 =  this.NewTileSet(map,"Buildings", "Buildings");
        let tileSet3 =  this.NewTileSet(map,"windows", "Windows");
        let tileSet4 =  this.NewTileSet(map,"StairsRails", "Fences");
        let tileSet5 =  this.NewTileSet(map,"Nature", "Nature");
        let tileSet6 =  this.NewTileSet(map,"CityProps", "Props");
        let tileSet7 =  this.NewTileSet(map,"Cars", "Cars");
        let tileSet8 =  this.NewTileSet(map,"blood", "blood");
        let tileSet9 =  this.NewTileSet(map,"Overlay", "Overlay");
        let tileSet10 = this.NewTileSet(map,"Lights", "Lights");
        let tileSet11 = this.NewTileSet(map,"Cols", "Cols");

        _this.colLayer = this.NewGroundLayer(map,"Cols", tileSet11, 0, 0);
        _this.colLayer.setCollisionBetween(0, 4096);

        this.NewGroundLayer(map,"Ground", tileSet1, 0, 0);
        this.NewGroundLayer(map,"Buildings", tileSet2, 0, 0);
        this.NewGroundLayer(map,"Windows", tileSet3, 0, 0);
       _this.fenceLayer = this.NewGroundLayer(map,"Fences", tileSet4, 0, 0);
        this.NewGroundLayer(map,"Nature", tileSet5, 0, 0);
        this.NewGroundLayer(map,"Props", tileSet6, 0, 0);
        this.NewGroundLayer(map,"Cars", tileSet7, 0, 0);
        this.NewGroundLayer(map,"blood", tileSet8, 0, 0);
        this.NewGroundLayer(map,"Overlay1", tileSet9, 0, 0);
        this.NewGroundLayer(map,"Overlay2", tileSet9, 0, 0);
        this.NewGroundLayer(map,"Lights", tileSet10, 0, 0);
    }

    static SetupAnimations(anims){
        //-----players-----//
        this.CreateAnimation(anims,"girl1_walkLeft_anim", "girlWalkLeft1", 5, -1, false);
        this.CreateAnimation(anims,"girl1_walkRight_anim", "girlWalkRight1", 5, -1, false);
        this.CreateAnimation(anims,"girl1_walkUp_anim", "girlWalkUp1", 5, -1, false);
        this.CreateAnimation(anims,"girl1_walkDown_anim", "girlWalkDown1", 5, -1, false);
        this.CreateAnimation(anims,"girl1_Right_anim", "girlFaceRight1", 5, -1, false);
        this.CreateAnimation(anims,"girl1_Left_anim", "girlFaceLeft1", 5, -1, false);
        this.CreateAnimation(anims,"girl1_Up_anim", "girlFaceUp1", 5, -1, false);
        this.CreateAnimation(anims,"girl1_Down_anim", "girlFaceDown1", 5, -1, false);

        //-----enemies----//
        this.CreateAnimation(anims,"zombie1_walkLeft_anim", "zombieWalkLeft1", 5, -1, false);
        this.CreateAnimation(anims,"zombie1_walkRight_anim", "zombieWalkRight1", 5, -1, false);
        this.CreateAnimation(anims,"zombie1_walkUp_anim", "zombieWalkUp1", 5, -1, false);
        this.CreateAnimation(anims,"zombie1_walkDown_anim", "zombieWalkDown1", 5, -1, false);
        this.CreateAnimation(anims,"zombie1_Right_anim", "zombieFaceRight1", 5, -1, false);
        this.CreateAnimation(anims,"zombie1_Left_anim", "zombieFaceLeft1", 5, -1, false);
        this.CreateAnimation(anims,"zombie1_Up_anim", "zombieFaceUp1", 5, -1, false);
        this.CreateAnimation(anims,"zombie1_Down_anim", "zombieFaceDown1", 5, -1, false);

        //----pickups----//
        this.CreateAnimation(anims,"health_anim", "health", 5, -1, false);
        this.CreateAnimation(anims,"ammo_anim", "ammo", 5, -1, false);
        this.CreateAnimation(anims,"gun_anim", "gun", 5, -1, false);

        //----particles----//
        this.CreateAnimation(anims,"bloodSplat_anim", "bloodSplat", 5, 0, true);

    }

    static SetupSounds(_this){
        //music
        _this.music1 = _this.sound.add('music1');
        _this.music2 = _this.sound.add('music2');
        _this.music3 = _this.sound.add('music3');
        _this.music4 = _this.sound.add('music4');
        _this.music5 = _this.sound.add('music5');
        //sfx
      _this.maleScream1 =  _this.sound.add('maleScream1');
        _this.maleScream2 = _this.sound.add('maleScream2');
        _this.maleScream3 =  _this.sound.add('maleScream3');
        _this.maleScream4 =  _this.sound.add('maleScream4');
        _this.femaleScream1 =  _this.sound.add('femaleScream1');
        _this.femaleScream2 =  _this.sound.add('femaleScream2');
        _this.femaleScream3 = _this.sound.add('femaleScream3');
        _this.femaleScream4 = _this.sound.add('femaleScream4');
        _this.dryFire =  _this.sound.add('dryFire');
        _this.bodyImpact1 =_this.sound.add('bodyImpact1');
        _this.bodyImpact2 = _this.sound.add('bodyImpact2');
        _this.bodyImpact3 = _this.sound.add('bodyImpact3');
        _this.kaChing = _this.sound.add('kaChing');
        _this.gunShot1 = _this.sound.add('gunShot1');
        _this.zombieShout1 =_this.sound.add('zombieShout1');
        _this.zombieShout2 = _this.sound.add('zombieShout2');
        _this.collect1 = _this.sound.add('collect1');
        _this.collect2 = _this.sound.add('collect2');
        _this.collect3 = _this.sound.add('collect3');


    }


}