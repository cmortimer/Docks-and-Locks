
"use strict";

var app = app || {};

app.Dock = function(){

	function Dock(x,y, platformHeight , islocked){
		
		this.fallHeight = 1;
		this.platformStartHeight = platformHeight;
		this.platformMinHeight = 10;
		
		this.lock = new Image();
		
		this.lock.src = "media/lock.png";
		
		
		this.locked = islocked || false;
		
		this.startLocked = this.locked;
		
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
		this.pistionH = this.baseY - this.pistionY;
		
		this.platform = new app.Platform(this.platformX,this.platformY,this.platformW,this.platformH,false);
		
	}

	var p = Dock.prototype;
	
	p.draw = function(ctx ,i){
	

		ctx.fillStyle = this.bodyFillStlye;
		
		ctx.fillRect(this.pistionX, this.pistionY, this.pistionW, this.pistionH);
		
		ctx.fillRect(this.platformX, this.platformY, this.platformW, this.platformH);
		
		ctx.fillRect(this.baseX, this.baseY, this.baseW, this.baseH);
	
		//circle 

		if(this.locked) { 
			ctx.fillStyle = this.cirLockFillStyle;
			
		} else {
			ctx.fillStyle = this.cirUnlockFillStyle;
		}
		
		ctx.beginPath();
		ctx.arc(this.cirX,this.cirY, this.cirR,0, Math.PI*2, false);
		ctx.closePath();
		
		ctx.fill();
		
		if(this.locked) { 
			ctx.drawImage(this.lock,this.cirX-this.cirR,this.cirY-this.cirR,this.cirR*2,this.cirR*2);
		}
		
		ctx.save();
		app.drawText(i, this.cirX, this.cirY-(this.cirR/2)+2.5, 20, "#fff");
		ctx.restore();

		
	}
	
	p.reset = function(){
		this.platformHeight = this.platformStartHeight;
		
		this.locked = this.startLocked;
		
		this.platformY = this.baseY - this.platformHeight - this.platformH;
		this.pistionY = this.platformY + this.platformH;
		this.pistionH = this.baseY - this.pistionY;
		
		this.platform.setY(this.platformY);
	
	}
	
	p.setPlatformHeight = function(amount){
	
		if(this.platformHeight +amount <= this.platformMinHeight){
			this.platformHeight = this.platformMinHeight;
			return;
		}
	
		this.platformHeight += amount;
		
		this.platformY = this.baseY - this.platformHeight - this.platformH;
		this.pistionY = this.platformY + this.platformH;
		this.pistionH = this.baseY - this.pistionY;
		
		this.platform.setY(this.platformY);
	
	}
	
	return Dock;

}();