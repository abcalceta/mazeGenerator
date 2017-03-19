function Cell(i,j, m,d,h){
	this.mainColor = m;
	this.doneColor = d;
	this.highlightColor = h;
	this.i = i;
	this.j = j;
	this.visited = false;
	this.walls = [true,true,true,true];

	this.checkNeighbors = function() {
		var neighbors = [];

		var top = grid[index(i,j+1)];
		var right = grid[index(i+1,j)];
		var bottom = grid[index(i,j-1)];
		var left = grid[index(i-1,j)];

		if (top && !top.visited){
			neighbors.push(top);
		}
		if (right && !right.visited){
			neighbors.push(right);
		}
		if (bottom && !bottom.visited){
			neighbors.push(bottom);
		}
		if (left && !left.visited){
			neighbors.push(left);
		}

		if (neighbors.length > 0){
			var r = floor(random(0,neighbors.length));
			return neighbors[r];
		} else {
			return undefined;
		}
	}


	this.reset = function(m,d,h){
		this.i = i;
		this.j = j;
		this.visited = false;
		this.walls = [true,true,true,true];
		this.mainColor = m;
		this.doneColor = d;
		this.highlightColor = h
	}

	this.highlight = function() {
		var x = this.i * w;
		var y = this.j * w;
		noStroke();
		fill(this.highlightColor);
		rect(x,y,w,w);
	}
	this.stackColor = function() {
		var x = this.i * w;
		var y = this.j * w;
		noStroke();
		fill(this.mainColor);
		rect(x,y,w,w);
		stroke(255);
		noFill();
		if(this.walls[0]){//top
			line(x,y,x+w,y);
		}
		if(this.walls[1]){//right
			line(x+w,y,x+w,y+w);
		}
		if(this.walls[2]){//bottom
			line(x+w,y+w,x,y+w);
		}
		if(this.walls[3]){//left
			line(x,y+w,x,y);
		}
	}

	this.show = function() {
		var x = this.i * w;
		var y = this.j * w;


		if(this.visited){
			noStroke();
			fill(this.doneColor);
			rect(x,y,w,w);
		}

		stroke(255);
		noFill();
		if(this.walls[0]){//top
			line(x,y,x+w,y);
		}
		if(this.walls[1]){//right
			line(x+w,y,x+w,y+w);
		}
		if(this.walls[2]){//bottom
			line(x+w,y+w,x,y+w);
		}
		if(this.walls[3]){//left
			line(x,y+w,x,y);
		}

	};
}