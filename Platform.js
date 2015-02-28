
"use strict";

var app = app || {};

app.Platform = function(){

	function Platform(_x,_y, _w, _h, _draw, _color){
		this.x = _x;
		this.y = _y;
		this.width = _w;
		this.height = _h;
		this.visible = _draw;
		this.color = _color || "#333";
	}

	var p = Platform.prototype;
	
	p.setY = function(val){
		this.y = val;
	}
	
	p.draw = function(ctx){
		if(this.visible){
			ctx.save();
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
			ctx.restore();
		}
	}
	
	return Platform;

}();