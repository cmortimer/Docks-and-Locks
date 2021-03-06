//Player.js

"use strict"

//Use existing app, otherwise create a new one

var app = app || {};

app.Player = function(){
	
	function Player(_x, _y, _w, _h){
		//Constants
		this.gameState = 0;
		this.x = _x;
		this.y = _y;
		this.jumpHeight = 225;
		this.maxHeight;
		this.sourceX = 0;
		this.sourceY = 0;
		this.sourceWidth = 0;
		this.sourceHeight = 0;
		this.width = _w;
		this.height = _h;
		this.speed = 225;
		this.jumpSpeed = 400;
		this.image;
		this.drawLib;

		this.isOnPlatform = false;
		
		//States
		this.STATE_RUNNING = 0;
		this.STATE_JUMPING = 1;
		this.STATE_FALLING = 2;
	}
	
	var p = Player.prototype;
	
	
	p.moveRight = function(dt){
		this.x += this.speed * dt;
	}
	
	p.moveLeft = function(dt){
		this.x -= this.speed * dt;
	}
	
	p.jump = function(){
		if(this.gameState == this.STATE_RUNNING){
			app.playEffect("jump.wav");
			this.maxHeight = this.y - this.jumpHeight;
			this.gameState = this.STATE_JUMPING;
		}
	}
	
	p.moveVertically = function(gravity, dt){
		if(this.gameState == this.STATE_JUMPING){
			this.y -= this.jumpSpeed * dt;
			if(this.y <= this.maxHeight){
				this.gameState = this.STATE_FALLING;
			}
		}
		else
		    if (!this.isOnPlatform) {
		        this.y += gravity * dt;
		    }
		this.isOnPlatform = false;
	}
	
	//Currently just draws a rectangle
	p.draw = function(ctx){
		ctx.save();
		ctx.fillStyle = 'red';
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.restore();
	}
	
	return Player;
}();