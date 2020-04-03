


let config = {
    type: Phaser.AUTO,
    width: 2048,
    height: 2048,
    scale: {
        // mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Scene1,intro,controls,Scene2],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};


let game = new Phaser.Game(config);


