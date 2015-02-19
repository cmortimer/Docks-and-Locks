"use strict";

var app = app || {};

app.Level = function(){

	function Level(_player,_docks,_dockPlatforms,_start,_end){
	
		this.docks = _docks;
		this.dockPlatforms = _dockPlatforms;
	}
	
	var p = Level.prototype;
	
	p.update(){
	
		docksUpdate
	
	}
	
	p.docksUpdate = function(){
		
			var indices = [];

			for(var i = this.docks.length -1 ; i>=0; i--){
				
				//check player collision
				if(app.collides(this.player, this.dockPlatforms[i])){
				
					//adjust player height
					this.player.y = this.dockPlatforms[i].y - this.player.height;
					
					//player is no longer falling
					this.player.gameState = this.player.STATE_RUNNING;
					
					//check to see if the player wants to lock or unlock the platform
					if(app.keydown[app.keyboard.space])	this.docks[i].locked = true;
					if(app.keydown[app.keyboard.f])	this.docks[i].locked = false;
				
					// check to see if colliding platform is at is min height or locked
					if(app.docks[i].platformHeight != app.docks[i].platformMinHeight && !app.docks[i].locked) {
					
						//go though loop and add docks ahead in the list till you hit a lock then break
						for(var j = i +1; j <app.docks.length; j++){
							if(!app.docks[j].locked){
								indices.push(j);
							} else {
								break;
							}
						}
						
						//same as above opposite direction
						for(var j = i -1; j >= 0; j--){
							if(!app.docks[j].locked){
								indices.push(j);
							} else {
								break;
							}
						}
					
						//if can move water the system do so. 
						if(indices.length != 0){
							app.docks[i].setPlatformHeight(-app.docks[i].fallHeight);
							for(var k = indices.length -1; k>=0; k--){
								app.docks[indices[k]].setPlatformHeight(app.docks[i].fallHeight/indices.length);
							}
						}
					}
				}
				app.docks[i].draw(app.ctx,i + 1);
			}
		}


}