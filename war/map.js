var tiletypes = {
	"grass": {
		"color": [50, 200, 75],
		"blocked": false
	},
	"water": {
		"color": [0, 0, 200],
		"blocked": true
	},
	"tree": {
		"color": [0, 100, 0],
		"blocked": true
	},
	"mountain": {
		"color": [100, 100, 100],
		"blocked": true
	}
}

function wrap(val, max) {
	if (val < 0) return max + val;
	if (val >= max) return val - max;
	return val;
}

function add_noise(val, range) {
	val = val + Math.floor(Math.random() * range) - Math.floor(Math.random() * range);
	if (val < 0) val = 0;
	if (val > 255) val = 255;
	return val;
}

function make_pretty(colorarr, range) {
	var r = add_noise(colorarr[0], range);
	var g = add_noise(colorarr[1], range);
	var b = add_noise(colorarr[2], range);
	return "rgb(" + r + "," + g + "," + b + ")";
}

var Tile = function(type, range) {
	this.type = type;
	this.color = make_pretty(tiletypes[type]["color"], range);
	this.blocked = tiletypes[type]["blocked"]
};

function create_elements(map, width, height, type, range) {
	var bx = Math.floor(Math.random() * 256);
	var by = Math.floor(Math.random() * 256);
	
	var xmove = [0, -1, 0, 1];
	var ymove = [-1, 0, 1, 0];
	for (var i=1; i<20000; i++) {
		map[bx][by] = new Tile(type, range);
		
		var j = Math.floor(Math.random() * 4);
		
		bx = wrap(bx + xmove[j], width);
		by = wrap(by + ymove[j], height);
		
		if (i % 1000 == 0) {
			bx = Math.floor(Math.random() * 256);
			by = Math.floor(Math.random() * 256);
		}
	}
	
}

function create_map() {
	var map = [];
	for (var x=0;x<256;x++) {
		map[x] = [];
		for (var y=0;y<256;y++) {
			map[x][y] = new Tile("grass", 30);
		}
	}
	
	create_elements(map, 256, 256, "water", 15);
	create_elements(map, 256, 256, "tree", 60);
	create_elements(map, 256, 256, "mountain", 15);
	
	return map;
}

function draw_map(context, map, mapx, mapy, mapwidth, mapheight) {
	var tx, ty, m;
	for (var x=0;x<mapwidth;x++) {
		for (var y=0;y<mapheight;y++) {
			tx = mapx + x;
			ty = mapy + y;
			m = map[tx][ty];
			context.fillStyle = m.color;
			context.fillRect(x*16, y*16, 16, 16);
		}
	}
}
