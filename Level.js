"use strict";

var app = app || {};

app.Level = function(){

	function Level(_docks,_start,_end){
	
		this.docks = _docks;
		this.startPlatform = _start;
		this.endPlatform = _end;
	}
	
	var p = Level.prototype;
	

	
	p.drawPlatforms = function(){
			this.startPlatform.draw(app.ctx);
			this.endPlatform.draw(app.ctx);
	}
	
	p.docksUpdateAndDraw = function(){

		
			var indices = [];
	
			for(var i = this.docks.length -1; i>=0; i--){
				
				//check player collision
				if(app.collides(app.player, this.docks[i].platform)){
				
					//adjust player height
					app.player.y = this.docks[i].platform.y - app.player.height;
					
					//player is no longer falling
					app.player.gameState = app.player.STATE_RUNNING;
					
					//check to see if the player wants to lock or unlock the platform
					if(app.keydown[app.keyboard.space]){
						this.docks[i].locked = !this.docks[i].locked;
						app.keydown[32] = false;
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
				}
				this.docks[i].draw(app.ctx,i + 1);
			}
		}
	
	p.checkForCollisions = function(){
		//Player and start platform
		if(app.collides(app.player, this.startPlatform)){
			app.player.y = this.startPlatform.y - app.player.height;
			app.player.gamestate = app.player.STATE_RUNNING;
		}
			
		//Player and end platform
		if(app.collides(app.player, this.endPlatform) ){
			app.player.y = this.endPlatform.y - app.player.height;
			app.player.gameState = app.player.STATE_RUNNING;
			//Has the game been won?
			if(app.levelNumber == app.levels.length - 1){
				console.log("Won Game");
				app.gamestate = app.STATE_WON;
			}
			else{
				console.log("Next Level");
				app.switchLevel = true;
			}
		}
	}
	
			//Reset level
	p.reset = function(){
		
		for( var i = this.docks.length -1; i >=0; i--){
			this.docks[i].reset();
		}
		
		//Reset Player
		app.player.x = 10;
		app.player.y = 10;
	}
	return Level;
}();