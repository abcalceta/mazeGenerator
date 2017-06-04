// sketch.js
var canvas;
var count;
function setup(){
	canvas = createCanvas(windowWidth,windowHeight);
	canvas.position(0,0);
	canvas.style('z-index',-1);
	background(240,240,240);
	count = 0;
}

function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
}

function draw(){
	frameRate(10);
	background(240,240,240,10);
	if (count%5 == 0){
		var dark = random(150,250)
		fill(random(200,250),dark,dark,80); noStroke();
		var ellipseSize = random(200,350)
		ellipse(random(1,windowWidth),random(1,windowHeight),ellipseSize,ellipseSize);
	}
	count+=1;
}