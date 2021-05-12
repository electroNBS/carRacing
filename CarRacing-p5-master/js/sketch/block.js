//creating a block object for the blocking cars
function Block(canvas) {
  //assigning some properties to the block object
  this.x = 10; //xPosition
  this.y = -20; //yPosition
  this.w = 40; //width
  this.h = 60; //height
  this.speed = 5; //speed
  this.easyEdge = -3;
  this.r = 255; //r value for rgb
  this.g = 255; //g value for rgb
  this.b = 255; //b value for rgb

  //assigning the block object's image as the first object in the array blockImages.(Refer sketch.js)
  this.image = blockImages[0];

  //giving a random location to the blocking cars
  this.location = () => {
    //var cols refers to columns.
    //the entire canvas is divided into several cols.
    //the no. of cols is equal to the (width of the canvas/width of car)
    //floor function is used to round off to nearest whole no.
    var cols = canvas.floor(canvas.width / this.w);
    //We are using random function to pick out one of the cols to display the blocking car
    var r = canvas.floor(canvas.random(0, cols));
    //we are setting the xPosition of the car to one of the cols by multiplying the col no.,r,
    //by the width of the column
    this.x = r * this.w;
    //One case is possible such that the random col function chooses col no. as 0,
    //so, the xPosition becomes 0. To rectify this, we always change it to col. no 1,
    //when it returns 0.
    if (r == 0) {
      r = 1;
    }
    //we set the yPosition to a random negative value, so that the blocking cars appear from
    //above the visible canvas.
    this.y = -(r * this.h + canvas.random(r * 100, r * 200));
    //we are using a variable called rimg, i.e., randomImage, to choose 1 of the images in the
    //blockImages array
    var rimg = canvas.floor(canvas.random(0, 3));
    this.image = blockImages[rimg];
  };

  //display the blocking car
  this.show = () => {
    canvas.fill(this.r, this.g, this.b);
    canvas.image(this.image, this.x, this.y, this.w, this.h);
  };

  this.crash = (car) => {
    if (
      car.x + car.w > this.x &&
      car.x < this.x + this.w &&
      this.y + this.h > car.y &&
      this.y < car.y + car.h
    ) {
      this.g = 0;
      this.b = 0;
      return true;
    }
    return false;
  };

  this.move = () => {
    if (this.y > canvas.height) {
      this.g = 255;
      this.b = 255;
      userScore++;
      this.location();
    }

    this.y += this.speed;
  };
}
