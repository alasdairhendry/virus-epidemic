class intro extends Phaser.Scene {

    constructor() {
        super("intro");
    }

    create(){

        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'promo12');
        let scaleX = this.cameras.main.width / image.width;
        let scaleY = this.cameras.main.height / image.height;
        let scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);


        let button = this.physics.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2,'button');

        button.inputEnabled = true;
        button.on('pointerdown', () => {
            this.scene.start('controls');
        });

        button.setInteractive();

    }



}