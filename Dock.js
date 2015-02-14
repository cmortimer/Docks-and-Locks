
"use strict";

var app = app || {};

app.Dock = function(){

	function Dock(x,y, platformHeight){
		
		this.fallHeight = 5;
		this.platformStartHeight = platformHeight;
		
		this.cirX = x;
		this.cirY = y;
		this.cirR = 50;

		this.baseW = 100;
		this.baseH = 100;
		this.baseX = this.cirX - (this.baseW/2);
		this.baseY = this.cirY - (this.baseH/2);
		
		this.platformW = 150;
		this.platformH = 20;
		this.platformX = this.cirX - (this.platformH/2);
		this.platformY = platformHeight;
		
		this.pistionW = 20;
		this.pistionX = this.cirX - (this.pistionW/2);
		this.pistionY = this.platformY - this.platformH;
		this.pistionH = this.pistionY - this.baseY;
	}

	var p = Dock.prototype;
	
	p.draw = function(ctx){
	

		
	}
	
	return Dock;

}();