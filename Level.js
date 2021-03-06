"use strict";

var app = app || {};

app.Level = function(){

	function Level(_docks,_start,_end, _text, _textX, _textY, _highScore){
	
		this.docks = _docks;
		this.startPlatform = _start;
		this.endPlatform = _end;
		this.text = _text || ' ';
		this.textX = _textX || -1000 ;
		this.textY = _textY || -1000;
		this.timer = 0;
		this.highScore = _highScore || 99999;
		this.endFlag = new Image();
		this.endFlag.src = "media/endflag.png";
	}
	
	var p = Level.prototype;
	
	p.updateTimer = function(dt){
		
		this.timer += dt;
		app.drawText("Timer: " + this.timer.toFixed(2), 1100, 50, 25, "#000");
		
	}

	
	p.drawPlatforms = function(ctx){
			this.startPlatform.draw(app.ctx);
			this.endPlatform.draw(app.ctx);
			ctx.drawImage(this.endFlag, this.endPlatform.x + 20, this.endPlatform.y - 60, 40, 60); 
			this.drawText(app.ctx);
	}
	
	p.drawText = function(ctx){
	
		ctx.save();
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		
		app.drawText(this.text, this.textX, this.textY, 20, "#000");
		
		ctx.restore();
	
	}
	
	p.docksUpdateAndDraw = function(){

		
			var indices = [];
	
			for(var i = this.docks.length -1; i>=0; i--){
				
				//check player collision
			    if (app.collidesTop(app.player, this.docks[i].platform)) {

			        app.player.isOnPlatform = true;
				
					
					
					//player is no longer falling
					app.player.gameState = app.player.STATE_RUNNING;
					
					//check to see if the player wants to lock or unlock the platform
					if(app.keydown[app.keyboard.space]){
						this.docks[i].locked = !this.docks[i].locked;
						app.keydown[32] = false;
						app.playEffect("lock.mp3");
					}
					//if(app.keydown[app.keyboard.f])	this.docks[i].locked = false;
				
					// check to see if colliding platform is at is min height or locked
					if(this.docks[i].platformHeight != this.docks[i].platformMinHeight && !this.docks[i].locked) {
					
						//go though loop and add docks ahead in the list till you hit a lock then break
						for(var j = i +1; j <this.docks.length; j++){
							if(!this.docks[j].locked){
								indices.push(j);
							} else {
								break;
							}
						}
						
						//same as above opposite direction
						for(var j = i -1; j >= 0; j--){
							if(!this.docks[j].locked){
								indices.push(j);
							} else {
								break;
							}
						}
					
						//if can move water the system do so. 
						if(indices.length != 0){
							this.docks[i].setPlatformHeight(-this.docks[i].fallHeight);
							for(var k = indices.length -1; k>=0; k--){
								this.docks[indices[k]].setPlatformHeight(this.docks[i].fallHeight/indices.length);
							}
						}
					}
			        //adjust player height
					app.player.y = this.docks[i].platform.y - app.player.height + 1;
				}
				
				else if (app.collidesBot(app.player, this.docks[i].platform)){
					app.player.y = this.docks[i].platform.y + this.docks[i].platform.height;
					app.player.gameState = app.player.STATE_FALLING;
				}
				this.docks[i].draw(app.ctx,i + 1);
			}
		}
	
	p.checkForCollisions = function(){
		
		
		//Player and start platform
		if(app.collidesTop(app.player, this.startPlatform)){
			app.player.y = this.startPlatform.y - app.player.height +1;
			app.player.gameState = app.player.STATE_RUNNING;
			app.player.isOnPlatform = true;
		}
		
		else if(app.collidesBot(app.player, this.startPlatform)){
			app.player.y = this.startPlatform.y + this.startPlatform.height +1;
			app.player.gameState = app.player.STATE_FALLING;
		}
			
		//Player and end platform
		if(app.collidesTop(app.player, this.endPlatform) ){
		    app.playEffect("win.wav");
		    app.player.isOnPlatform = true;
			app.player.y = this.endPlatform.y - app.player.height;
			app.player.gameState = app.player.STATE_RUNNING;
			//Has the game been won?
			if(app.levelNumber == app.levels.length - 1){
				app.gamestate = app.STATE_WON;
			}
			else{
				app.switchLevel = true;
			}
		}
		
		else if(app.collidesBot(app.player, this.endPlatform)){
			app.player.y = this.endPlatform.y + this.endPlatform.height;
			app.player.gameState = app.player.STATE_FALLING;
		}
	}
	
			//Reset level
	p.reset = function(){
		
		for( var i = this.docks.length -1; i >=0; i--){
			this.docks[i].reset();
		}
		
		this.timer =0;
		
		//Reset Player
		app.player.x = 10;
		app.player.y = 10;
	}
	return Level;
}();