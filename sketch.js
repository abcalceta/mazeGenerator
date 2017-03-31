// sketch.js
var canvas;
function setup(){
	canvas = createCanvas(windowWidth,windowHeight);
	canvas.position(0,0);
	canvas.style('z-index',-1);
}

function draw(){
	frameRate(10);
	background(240,240,240,10);
	fill(random(200,250),220,220,100); noStroke();
	ellipse(random(1,windowWidth),random(1,windowHeight),300,300);
}