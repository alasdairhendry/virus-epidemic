class intro extends Phaser.Scene {

    constructor() {
        super("intro");
    }

    create(){

        this.background = this.add.image(512,512,'promo12');

    }
}