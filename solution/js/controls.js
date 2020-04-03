class controls extends Phaser.Scene {

    constructor() {
        super("controls");
    }


    create(){
        this.p1=  this.add.text(100,50, 'Player 1 Controls', { fontFamily: '"Roboto Condensed"', fontSize: 60, fill: '#ffffff' });
        this.p1.setScrollFactor(0);
        this.p1Up = this.add.text(this.p1.x + 70, this.p1.y + 100, "Press 'W' to Move Up", { fontFamily: '"Roboto Condensed"', fontSize: 40, fill: '#ffffff' });
        this.p1Up.setScrollFactor(0);
        this.p1Down = this.add.text(this.p1.x + 70, this.p1.y + 150, "Press 'S' to Move Down", { fontFamily: '"Roboto Condensed"', fontSize: 40, fill: '#ffffff' });
        this.p1Down.setScrollFactor(0);
        this.p1Left = this.add.text(this.p1.x + 70, this.p1.y + 200, "Press 'A' to Move Left", { fontFamily: '"Roboto Condensed"', fontSize: 40, fill: '#ffffff' });
        this.p1Left.setScrollFactor(0);
        this.p1Right = this.add.text(this.p1.x + 70, this.p1.y + 250, "Press 'D' to Move Right", { fontFamily: '"Roboto Condensed"', fontSize: 40, fill: '#ffffff' });
        this.p1Right.setScrollFactor(0);
        this.p1Shoot = this.add.text(this.p1.x + 70, this.p1.y + 300, "Press 'SPACE' to Shoot", { fontFamily: '"Roboto Condensed"', fontSize: 40, fill: '#ffffff' });
        this.p1Shoot.setScrollFactor(0);


        this.p2=  this.add.text(100,500, 'Player 2 Controls', { fontFamily: '"Roboto Condensed"', fontSize: 60, fill: '#ffffff' });
        this.p2.setScrollFactor(0);
        this.p2Up = this.add.text(this.p2.x + 70, this.p2.y + 100, "Press 'Up Arrow' to Move Up", { fontFamily: '"Roboto Condensed"', fontSize: 40, fill: '#ffffff' });
        this.p2Up.setScrollFactor(0);
        this.p2Down = this.add.text(this.p2.x + 70, this.p2.y + 150, "Press 'Down Arrow' to Move Down", { fontFamily: '"Roboto Condensed"', fontSize: 40, fill: '#ffffff' });
        this.p2Down.setScrollFactor(0);
        this.p2Left = this.add.text(this.p2.x + 70, this.p2.y + 200, "Press 'Left Arrow' to Move Left", { fontFamily: '"Roboto Condensed"', fontSize: 40, fill: '#ffffff' });
        this.p2Left.setScrollFactor(0);
        this.p2Right = this.add.text(this.p2.x + 70, this.p2.y + 250, "Press 'Right Arrow' to Move Right", { fontFamily: '"Roboto Condensed"', fontSize: 40, fill: '#ffffff' });
        this.p2Right.setScrollFactor(0);
        this.p2Shoot = this.add.text(this.p2.x + 70, this.p2.y + 300, "Press 'Right Shift' to Shoot", { fontFamily: '"Roboto Condensed"', fontSize: 40, fill: '#ffffff' });
        this.p2Shoot.setScrollFactor(0);

        this.add.text(100,1000, "Press 'P' to add Player 2" , { fontFamily: '"Roboto Condensed"', fontSize: 60, fill: '#ffffff' });
        this.add.text(100,1100, "Press 'SPACE' while near Player to Revive" , { fontFamily: '"Roboto Condensed"', fontSize: 60, fill: '#ffffff' });


        this.time.addEvent({ delay: 5000, callback: this.loadScene1, callbackScope: this, loop: false });

    }

    loadScene1(){
        this.scene.start('playGame');
    }
}