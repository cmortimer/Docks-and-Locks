//Player.js

"use strict"

//Use existing app, otherwise create a new one

var app = app || {};

app.player = {
	//Constants
	gameState: 0,
	x: 15,
	y: 100,
	jumpHeight: 50,
	maxHeight: undefined,
	sourceX: 0,
	sourceY: 0,
	sourceWidth: 0,
	sourceHeight: 0,
	width: 25,
	height: 50,
	speed: 50,
	image: undefined,
	drawLib: undefined,
	
	//States
	STATE_RUNNING: 0,
	STATE_JUMPING: 1, 
	STATE_LOCKING: 2,
	
	init: function(){
		console.log("app.Player.init() called");
	},
	
	moveRight: function(dt){
		this.x += this.speed * dt;
	},
	
	moveLeft: function(dt){
		this.x -= this.speed * dt;
	},
	
	jump: function(){
		maxHeight = this.y + this.jumpHeight;
		gameState = this.STATE_JUMPING;
	},
	
	moveUp: function(dt){
		this.y -= this.speed * dt;
	},
	
	moveDown: function(dt){
		this.y += gravity * dt;
	},
	
	
}