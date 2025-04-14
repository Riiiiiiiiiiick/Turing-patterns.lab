function setup() {
    createCanvas(windowWidth,windowHeight);
    background(0);
}

function draw() {
    push()
   translate(width/2,height/2)

   const d=map(sin(frameCount*0.051), -1,1,20,150)
   const x= sin(frameCount*0.009)*width*0.3
   const y= sin(frameCount*0.012+0.2)*height*0.3

   noStroke();

   const r= map(sin(frameCount*0.051), -1,1,0,255)
   const b= map(cos(frameCount*0.047), -1,1,0,255)
   const g= map(sin(frameCount*0.072), -1,1,0,255)

   fill(r,g,b);

   ellipse(x,y,d);
   pop()

   push()
   fill(35);
   textSize(50);
   text('Ciao Stelline', 10,50);
   pop()
   
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight)
    background(0);
}