function Cell(x,y,s,col) {
	this.x = x;
	this.y = y;
	this.set = s;
	this.topNeighbor = false;
	this.bottomNeighbor = false;
	this.leftNeighbor = false;
	this.rightNeighbor = false;
	this.highlight = false;
	this.col = col; //color, may p5 func na color() kasi

	/*
	this.drawWalls = function() {
		noStroke();
		fill(this.col);
		rect(this.x,this.y,w,w);

		// textSize(20);
		// textAlign(CENTER);
		// fill(0,0,0);

		text(this.set, this.x+w/2, this.y+w/2);
		stroke(0);
		strokeWeight(5);
		if (!this.topNeighbor){
			line(x,y,x+w,y);
		}
		if (!this.bottomNeighbor){
			line(x,y+w,x+w,y+w);
		}
		if (!this.leftNeighbor){
			line(x,y,x,y+w);
		}
		if (!this.rightNeighbor){
			line(x+w,y,x+w,y+w);
		}
	};
	*/
}