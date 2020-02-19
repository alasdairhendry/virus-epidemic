


let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Scene1,Scene2],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};


let game = new Phaser.Game(config);


