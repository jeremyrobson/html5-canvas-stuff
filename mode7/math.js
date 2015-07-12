function rotateX(p, radians) {
	var c = Math.cos(radians);
	var s = Math.sin(radians);
	return {
		"x": p.x,
		"y": (256-p.y)*c + (256+p.z)*-s,
		"z": (256-p.y)*s + (256+p.z)*c,
	};
}

function rotateY(p, radians, offsetx, offsety) {
	var c = Math.cos(radians);
	var s = Math.sin(radians);
	return {
		"x": p.x*c + p.y*s + offsetx,
		"y": p.x*-s + p.y*c + offsety,
		"z": p.z
	};
}

function rotateZ(p, radians, horizon) {
	var c = Math.cos(radians);
	var s = Math.sin(radians);
	return {
		"x": (p.x-128)*c + (p.y - horizon)*s,
		"y": (p.x-128)*-s + (p.y - horizon)*c,
		"z": p.z
	};
}

function project2d(p, fov, scale, offsetx, offsety) {
	var px = p.x;
	var py = fov;
	var pz = p.y;
	
	return {
		x: px / pz * scale,
		y: py / pz * scale,
		z: pz
	};
}
