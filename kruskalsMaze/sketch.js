var cols, rows;
var w = 40;
var grid = [];
var gridPrevColor = [];
var sets = [];
var fadeOut = 0;

var noiseScale = 0.1;

function setup() {
	colorMode(HSB,100);
	rows = 16;
	cols = 16;
	createCanvas(cols*w,rows*w);
	// cells
	// draw walls around cells
	var s = 0;
	for(var y = 0; y<rows; y++){
		for(var x = 0; x<cols; x++){
			var c = color(random(0,100), random(10,50), random(80,100));
			var cell = new Cell(x*w,y*w,s, c);
			if(x==0){
				cell.leftNeighbor=true;
			}
			if(x==cols-1){
				cell.rightNeighbor=true;
			}
			if(y==0){
				cell.topNeighbor=true;
			}
			if(y==rows-1){
				cell.bottomNeighbor=true;
			}
			sets.push(s);
			s += 1;
			gridPrevColor.push([c,0]);
			grid.push(cell);
		}
	}
	// console.log(grid);
}


function reset() {
	var s = 0;
	sets = [];
	gridPrevColor = [];
	for(var y = 0; y<rows; y++){
		for(var x = 0; x<cols; x++){
			var c = color(random(0,100), random(10,40), random(90,100));
			var cell = grid[getIndex(x,y)];
			cell.set = s;
			cell.col = c;
			cell.topNeighbor = false;
			cell.bottomNeighbor = false;
			cell.leftNeighbor = false;
			cell.rightNeighbor = false;
			if(x==0){
				cell.leftNeighbor=true;
			}
			if(x==cols-1){
				cell.rightNeighbor=true;
			}
			if(y==0){
				cell.topNeighbor=true;
			}
			if(y==rows-1){
				cell.bottomNeighbor=true;
			}
			sets.push(s);
			s += 1;
			gridPrevColor.push([c,0]);
		}
	}
	// console.log(grid);
}

function draw() {
	frameRate(20);
	// noLoop();
	// console.log(frameRate());
	background(0,0,100);
	randomKruskals();
	// removeWall(grid[20],grid[12]);
	for(var g = 0; g<grid.length; g++){
		drawColors(grid[g]);
	}
	for(var g = 0; g<grid.length; g++){
		drawLines(grid[g]);
	}
}

function drawColors(cell){
	noStroke();
	// lerpColor(c1,c2,amt);

	// var newcol = color(hue(cell.col) + map(noise(noiseScale),0,1,-5,5), saturation(cell.col), brightness(cell.col));
	// fill(cell.col);
	gridPrevColor[getIndex(cell.x/w,cell.y/w)][1]+=0.01;
	if (gridPrevColor[getIndex(cell.x/w,cell.y/w)][1] >= 1){
		gridPrevColor[getIndex(cell.x/w,cell.y/w)][1] = 0;
	}
	colorMode(RGB);
	// var newcol = lerpColor(gridPrevColor[getIndex(cell.x/w,cell.y/w)][0],cell.col,gridPrevColor[getIndex(cell.x/w,cell.y/w)][1]);
	var newcol = lerpColor(gridPrevColor[getIndex(cell.x/w,cell.y/w)][0],cell.col,0.3);
	gridPrevColor[getIndex(cell.x/w,cell.y/w)][0] = newcol;
	colorMode(HSB);

	fill(newcol);

	rect(cell.x,cell.y,w,w);
}
function drawLines(cell){
	strokeJoin(ROUND);
	// stroke(0,0,35);
	// console.log(noise(noiseScale));
	if (fadeOut!=0){
		stroke(lerpColor(color(25),cell.col,map(fadeOut,5,1,0.2,1)));
	}else{
		stroke(color(25));
	}
	noiseScale += 0.005;
	strokeWeight(8);
	if (!cell.topNeighbor){
		line(cell.x,cell.y,cell.x+w,cell.y);
	}
	if (!cell.bottomNeighbor){
		line(cell.x,cell.y+w,cell.x+w,cell.y+w);
	}
	if (!cell.leftNeighbor){
		line(cell.x,cell.y,cell.x,cell.y+w);
	}
	if (!cell.rightNeighbor){
		line(cell.x+w,cell.y,cell.x+w,cell.y+w);
	}
}

function getIndex(x,y){
	if (x>cols || x<0 || y>rows || y<0){
		return -1;
	}
	return ((y*cols)+x);
}

function removeWall(cell1, cell2) {
	var xPos = cell1.x - cell2.x;
	var yPos = cell1.y - cell2.y;
	// console.log(xPos, yPos);
	if (yPos == 0) {
		if (xPos>0){
			cell1.leftNeighbor = true;
			cell2.rightNeighbor = true;
		} else if (xPos<0){
			cell2.leftNeighbor = true;
			cell1.rightNeighbor = true;
		}
	}else if (xPos == 0){
		if (yPos>0){
			cell1.topNeighbor = true;
			cell2.bottomNeighbor = true;
		} else if (yPos<0){
			cell2.topNeighbor = true;
			cell1.bottomNeighbor = true;
		}
	}
	else{
		noLoop();
		// background(0,50,50);
		noStroke();
		fill(50,100,100,80);
		rect(cell1.x,cell1.y,w,w);
		rect(cell2.x,cell2.y,w,w);
		// prompt("SHOULKDNT HAPPEN");
	}

}

function randomKruskals() {
	/*
	for(var g = 0; g<grid.length; g++){
		grid[g].drawWalls();
	}
	*/
	var fadeDuration = 10;
	if (fadeOut>0){
		console.log(fadeOut);
		fadeOut-=1;
		if(fadeOut == 1){
			reset();
			fadeOut = 0;
		}
	} else{
		while(true){
			if(sets.length == 1 && fadeOut==0){
				// noLoop(); 
				// reset();
				fadeOut = fadeDuration;
				console.log("TAPOS NA");
				break;
			}
			while(true){
				if(sets.length == 1){
					// noLoop(); 
					// frameRate(1);
					// for(var x = 0; x<2;x++){
					// 	//wait
					// }
					// reset();
					// console.log("TAPOS NA");
					break;
				}
				var x = floor(random(cols));
				var y = floor(random(rows));
				var index = getIndex(x,y);
				var cell1 = grid[index];
				var cell2 = null;
				var direction = random([0,1,2,3]);
				var tries = 12;
				while(tries!=0){
					if(direction == 0 && (getIndex(x,y-1)!=-1) && !cell1.topNeighbor){
						cell2 = grid[getIndex(x,y-1)];
					}
					if(direction == 1 && (getIndex(x,y+1)!=-1) && !cell1.bottomNeighbor){
						cell2 = grid[getIndex(x,y+1)];
					}
					if(direction == 2 && (getIndex(x-1,y)!=-1) && !cell1.leftNeighbor){
						cell2 = grid[getIndex(x-1,y)];
					}
					if(direction == 3 && (getIndex(x+1,y)!=-1) && !cell1.rightNeighbor){
						cell2 = grid[getIndex(x+1,y)];
					}
					if (cell2 && typeof cell2 == 'function'){
						// console.log("cell2 xy!",cell2.x/w,cell2.y/w, "try number", tries);
						break;
					}
					direction = random([0,1,2,3]);
					tries -= 1;
				}
				if (cell2 && (cell1.set != cell2.set)) {
					break;
				}
			}
			if(cell2){
				// console.log(cell2);
				var temp = cell2.set;
				if (cell1.set != cell2.set){
					removeWall(cell1,cell2);
					for(var g = 0; g<grid.length; g++){
						if(grid[g].set == temp){
							grid[g].set = cell1.set;
							grid[g].col = cell1.col;
						}
					}
					cell2.set = cell1.set;
					cell2.col = cell1.col;
					sets.pop(temp);
				}
				break;
			}
		}
	}
	// var cell2 = grid[getIndex(index%cols, index/cols)];
}
