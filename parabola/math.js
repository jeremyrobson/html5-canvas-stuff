function randint(min, max) { return Math.floor(Math.random() * (max-min)) + min; }

var Parabola = function(p, q, r) {
	var denom = (p.x - q.x) * (p.x - r.x) * (q.x - r.x);
	this.a = (r.x * (q.y - p.y) + q.x * (p.y - r.y) + p.x * (r.y - q.y)) / denom;
	this.b = (r.x*r.x * (p.y - q.y) + q.x*q.x * (r.y - p.y) + p.x*p.x * (q.y - r.y)) / denom;
	this.c = (q.x * r.x * (q.x - r.x) * p.y + r.x * p.x * (r.x - p.x) * q.y + p.x * q.x * (p.x - q.x) * r.y) / denom;

    this.line = [];
    var dx = (r.x - p.x) / 100;

    console.log(p.x, r.x, dx);
    for (var x=p.x; Math.abs(r.x - x) > 0.1; x += dx) {
        var y = this.a * x * x + this.b * x + this.c;
        this.line.push({"x":x+0.5, "y":y+0.5});
    }

};
