function setup(){
  createCanvas(windowWidth,windowHeight);
}

function draw(){
  background(10, 10, 10);
  pixelDensity(4)

  stroke(192,192,192);
  noFill();
  strokeWeight(0.75);

  strokeJoin(ROUND);
  textSize(52.8);
  textLeading(45);
  textStyle(BOLD);
  textFont("Helvetica");
  text('REACTION /\nDIFFUSION',30,height/2);

  fill(192,192,192)
  noStroke();
  text('ORGANICO /\nCOMPUTAZIONALE',width/2+12,height/2);

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(10, 10, 10);
}

