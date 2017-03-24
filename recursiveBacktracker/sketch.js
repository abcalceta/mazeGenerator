var cols, rows;
var w = 40;
var grid = [];
var current;
var stack = [];

function setup() {
	colorMode(HSB, 100);
	var hue = random(10, 90);
	var sat = random(1, 10)*10;
	grid = [];
	stack = [];
	createCanvas(400, 400);
	cols = floor(width/w);
	rows = floor(height/w);

	for (var j = 0; j < rows; j++){
		for (var i = 0; i < rows; i++){
			var cell = new Cell(i,j,color(hue, sat, 40),color(hue, sat, 60),color(hue, sat, 80));
			grid.push(cell);
		}
	}

	// current = grid[0]
	current = grid[floor(random(0,(cols*rows)-1))];
	
}

function reset(){
	stack = [];
	var hue = random(10, 90);
	var sat = random(1, 10)*10;
	for (var j = 0; j < rows; j++){
		for (var i = 0; i < rows; i++){
			grid[index(i,j)].reset(color(hue, sat, 40),color(hue, sat, 60),color(hue, sat, 80));
		}
	}

	// current = grid[0]	
	current = grid[floor(random(0,(cols*rows)-1))];

}

function draw() {
	frameRate(15);
	// console.log(frameRate());
	background(0,0,90);

	for (var i = 0; i < grid.length; i++){
		grid[i].show();
	}
	for (var i = 0; i< stack.length; i++){
		stack[i].stackColor();
	}
	// console.log(stack);
	current.visited = true;
	current.highlight();
	var next = current.checkNeighbors();

	if (next){
		next.visited = true;
		stack.push(current);
		removeWalls(current,next);
		current = next;
	} else if (stack.length>0){
		current = stack.pop()
	} else{
		console.log("FINISHED");
		// setup();
		reset();
	}
}



function index(i,j){
	if (i<0 || j<0 || i>=cols || j>=rows){
		return -1;
	}
	return i+j*cols;
}

function removeWalls(current,next){
	var x = current.i - next.i;
	var y = current.j - next.j;
	if (x === 1){
		current.walls[3] = false;
		next.walls[1] = false;
	} else if (x === -1){
		current.walls[1] = false;
		next.walls[3] = false;
	}
	if (y === 1){
		current.walls[0] = false;
		next.walls[2] = false;
	} else if (y === -1){
		current.walls[2] = false;
		next.walls[0] = false;
	}
}


