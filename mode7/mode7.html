var canvas, context, surface;
var colors = ["rgb(0,0,255)", "rgb(155,155,155)"];
var mx=64, my=64;
var horizon = 128, scale = 64, fov = 256;
var radians = 0, angle = 0;
var yaw=0, pitch=Math.PI*4/3, roll=0;
var camera = {
	x: 0,
	y: 0,
	//height: 10
};
var vel = 2;
var interval;
var keys = [];

var Surface = function(width, height) {
	this.canvas = document.createElement("canvas");
	this.canvas.width = this.width = width;
	this.canvas.height = this.height = height;
	this.context = this.canvas.getContext("2d");
	this.tile = [];
	for (var x=0;x<width;x++) {
		this.tile[x] = [];
		for (var y=0;y<height;y++) {
			this.tile[x][y] = (x % 2) ? (y % 2) : 1 - (y % 2);
		}
	}
};

Surface.prototype.draw = function() {
	for (var x=0;x<this.width/32;x++) {
		for (var y=0;y<this.height/32;y++) {
			this.context.fillStyle = colors[this.tile[x][y]]; 
			this.context.fillRect(x*32,y*32,32,32);
		}
	}
	this.context.fillStyle = "rgb(0,255,255)";
	this.context.fillRect(0,0,32,32);
	
	this.context.textBaseline = "top";
	this.context.fillStyle = "rgb(255,0,0)";
	this.context.font = "32px monospace bold";
	this.context.fillText("Jeremy", 0, 0);
};

Surface.prototype.getImageData = function() {
	return this.context.getImageData(0, 0, this.width, this.height);	
};

function project() {
	var src = surface.getImageData().data;
	var newimage = context.createImageData(256, 256);
	var dest = newimage.data;
	var dest_pixel_offset, src_pixel_offset;
	var x, y;
	var offsetx = camera.x;
	var offsety = camera.y;
	var s;
	
	for (y=0;y<256;y++) {
		for (x=0;x<256;x++) {
			s = {x:x, y:y, z:0};
			s = rotateX(s, pitch);
			s = rotateZ(s, roll, horizon);
			s = project2d(s, fov, scale);
			
			if (s.x == Infinity) s.x = 255;
			if (s.y == Infinity) s.y = 255;
			
			//because mode7, y-rotation must be after projection
			s = rotateY(s, radians, offsetx, offsety); //yaw
			
			src_pixel_offset = (s.y & 255) * 1024 + (s.x & 255) * 4;
			dest_pixel_offset = y * 1024 + x * 4;
			
			dest[dest_pixel_offset+0] = src[src_pixel_offset+0];
			dest[dest_pixel_offset+1] = src[src_pixel_offset+1];
			dest[dest_pixel_offset+2] = src[src_pixel_offset+2];
			dest[dest_pixel_offset+3] = s.z*16;
		}
	}
	context.putImageData(newimage, 0, 0);
}

function loop() {
	input();
	
	draw();
}

function draw() {
	project();
}

function mouse_move(e) {
	mx = e.offsetX;
	my = e.offsetY;
	//roll = Math.PI * (mx-128)/256 * 2;
	//pitch = Math.PI * (my)/256 * 2;
	horizon = 128;
	document.getElementById("pitch").value = pitch;
}

function key_down(e) {
	keys[e.keyCode] = true;
}

function key_up(e) {
	keys[e.keyCode] = false;
}

function input() {
	if (keys[37]) //left
		angle -= 1/256;
	if (keys[39]) //right
		angle += 1/256;
	if (angle < 0) angle = 1-1/256;
	if (angle > 1-1/256) angle = 0.000;
	
	radians = angle * Math.PI * 2;
	
	if (keys[38]) { //up
		camera.x += Math.sin(radians) * vel;
		camera.y += Math.cos(radians) * vel;
	}
	if (keys[40]) { //down
		camera.x -= Math.sin(radians) * vel;
		camera.y -= Math.cos(radians) * vel;
	}

	document.getElementById("coords").value = 
	"x: " + Math.floor(camera.x) + ", " + "y: " + Math.floor(camera.y);
	document.getElementById("angle").value = angle;
}

function start() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	canvas.onmousemove = mouse_move;
	
	surface = new Surface(256, 256);
	
	canvas.onmousedown = function() {
	};
	canvas.onmouseup = function() {
	};
	document.onkeydown = key_down;
	document.onkeyup = key_up;
	
	surface.draw();
	interval = window.setInterval(loop, 1000/60);
}
