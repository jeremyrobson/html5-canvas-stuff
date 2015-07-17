function wrap(n, max) {
	if (n >= max) return n - max;
	if (n < 0) return n + max;
	return n; 
}

function terp(a, b, x) {
	var ft = x * Math.PI;
	var f = (1 - Math.cos(ft)) * 0.5;
	return a*(1-f) + b*f;
}

function get_noise_value(src, x, y) {
	var corners = (src[wrap(x-1,256)][wrap(y-1,256)] +
		src[wrap(x+1,256)][wrap(y-1,256)] +
		src[wrap(x-1,256)][wrap(y+1,256)] +
		src[wrap(x+1,256)][wrap(y+1,256)]) / 16;
	var sides = (src[wrap(x-1,256)][wrap(y,256)] +
		src[wrap(x+1,256)][wrap(y,256)] +
		src[wrap(x,256)][wrap(y-1,256)] +
		src[wrap(x,256)][wrap(y+1,256)]) / 8;
	var center = src[wrap(x,256)][wrap(y,256)] / 4;
	return corners + sides + center;
}

function generate_noise(width, height) {
	var noise = document.createElement("canvas");
	noise.width = 256;
	noise.height = 256;
	var ctx = noise.getContext("2d");
	
	var src = [];
	for (var x=0;x<width;x++) {
		src[x] = [];
		for (var y=0;y<height;y++) {
			src[x][y] = Math.floor(Math.random() * 256);
		}
	}
	
	var imgdata = ctx.getImageData(0,0,256,256);
	var data = imgdata.data;
	var index, x, y;
	var horizontal, vertical, center, size, total, value, sum, average;
	var h0, h1, horizontal_avg;
	var v1, v2, v3, v4, i1, i2, i3;
	var highest=0;
	
	for (var i=0; i<256; i++) {
		for (var j=0; j<256; j++) {
			sum = 0;
			for (var octave=1;octave<9;octave++) {
				size = Math.floor(256 / Math.pow(2,octave));
				x = Math.floor(i / size);
				y = Math.floor(j / size);
				
				v1 = get_noise_value(src, x, y);
				v2 = get_noise_value(src, x+1, y);
				v3 = get_noise_value(src, x, y+1);
				v4 = get_noise_value(src, x+1, y+1);
				
				i1 = terp(v1, v2, (i%size)/size);
				i2 = terp(v3, v4, (i%size)/size);
				i3 = terp(i1, i2, (j%size)/size);
				
				sum += i3;
			}
			value = Math.floor(sum / 9);
			
			index = i * 256 * 4 + j * 4;
			data[index+0] = value;
			data[index+1] = value;
			data[index+2] = value;
			data[index+3] = 255;
		}
	}
	
	//normalize
	for (var i=0; i<256; i++) {
		for (var j=0; j<256; j++) {
			
		}
	}
	
	ctx.putImageData(imgdata,0,0);
	
	return noise;
}