export class Food {
  foodCoords = []
  consructor(snakeCoords, wallsCoords) {
    this.snakeCoords = snakeCoords;
    this.wallsCoords = wallsCoords;
  }

  placeFood() {
    if (this.foodCoords.length === 0) {
      
    }
  }

  eatFood() {
    this.foodCoords.pop();
  }


}