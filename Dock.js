
"use strict";

var app = app || {};

app.Dock = function(){

	function Dock(x,y, platformHeight){
		
		this.fallHeight = 5;
		this.platformStartHeight = platformHeight;
		
		var lock = false;
		
		this.platformHeight = platformHeight;
		
		this.cirX = x;
		this.cirY = y;
		this.cirR = 25;
		this.cirUnlockFillStyle = "#00f";
		this.cirLockFillStyle = "#f00";

		
		this.bodyFillStlye = "#666";
		this.baseW = 100;
		this.baseH = 100;
		this.baseX = this.cirX - (this.baseW/2);
		this.baseY = this.cirY - (this.baseH/2);
		
		this.platformW = 150;
		this.platformH = 20;
		this.platformX = this.cirX - (this.platformW/2);
		this.platformY = this.baseY - this.platformHeight - this.platformH;
		
		this.pistionW = 20;
		this.pistionX = this.cirX - (this.pistionW/2);
		
		this.pistionY = this.platformY + this.platformH;
		this.pistionH = this.baseY - this.pistionY ;
		
	}

	var p = Dock.prototype;
	
	p.draw = function(ctx){
	
	
		ctx.fillStyle = this.bodyFillStlye;
		
		ctx.fillRect(this.pistionX, this.pistionY, this.pistionW, this.pistionH);
		
		ctx.fillRect(this.platformX, this.platformY, this.platformW, this.platformH);
		
		ctx.fillRect(this.baseX, this.baseY, this.baseW, this.baseH);
	
		//circle 
		ctx.beginPath();
		ctx.arc(this.cirX,this.cirY, this.cirR,0, Math.PI*2, false);
		ctx.closePath();
		ctx.fillStyle = this.cirUnlockFillStyle;
		ctx.fill();
		



		
	}
	
	p.setPlatformHeight = function(amount){
	
		this.platformHeight += amount;
		
		this.platformY = this.baseY - this.platformHeight - this.platformH;
		this.pistionY = this.platformY + this.platformH;
	
	}
	
	return Dock;

}();