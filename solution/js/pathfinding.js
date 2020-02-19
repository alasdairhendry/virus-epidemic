class Pathfinding {
    static GetTileGridPosition(object) {
        var tileGridPosition = new Phaser.Math.Vector2();
        tileGridPosition.x = Phaser.Math.FloorTo(object.x / 32);
        tileGridPosition.y = Phaser.Math.FloorTo(object.y / 32);
        console.log("Tile Pos: " + object.name + " (" + tileGridPosition.x + ", " + tileGridPosition.y + ")");
        return tileGridPosition;
    }
}