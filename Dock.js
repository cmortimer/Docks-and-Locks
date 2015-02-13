
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
		this.baseX = cirX - (baseW/2);
		this.baseY = cirY - (baseH/2);
		
		this.platformW = 150;
		this.platformH = 20;
		this.platformX = cirX - (platformH/2);
		this.platformY = platformHeight;
		
		this.pistionW = 20;
		this.pistionX = cirX - (pistionW/2);
		this.pistionY = platformY - platformH;
		this.pistionH = pistionY - baseY;
	}

	var p = Dock.prototype;
	
	p.draw = function(ctx){
		
	}

}();