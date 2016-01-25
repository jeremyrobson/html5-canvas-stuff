var TileTypes = {
    "sky": {
        color: "rgb(100,200,255)"
    },
    "grass": {
        color: "rgb(50,125,75)"
    }
};
function draw_tile(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x*20,y*15,19,14);
}
var Tile = function(type, x, y) {
    this.type = type;
    this.color = TileTypes[type].color;
    this.unit = null;
    this.x = x;
    this.y = y;
};
Tile.prototype.draw = function(ctx, newcolor) {
    draw_tile(ctx,this.x,this.y,newcolor || this.color);
};
var Map = function() {
    var heights = [[randint(18,26), randint(18,26)]];
    for (var n=1;n<6;n++) {
        heights[n] = [];
        var max = Math.pow(2, n);
        for (var x=0;x<max;x++) {
            heights[n][x] = heights[n-1][Math.floor(x/2)] + randint(0,3) - 1;
        }
    }
    this.height = [];
    for (var x=0;x<32;x++) {
        this.height[x] = {
            unit: null,
            x: x,
            y: heights[5][x]
        };
    }
    this.tile = [];
    for (var x=0;x<32;x++) {
        this.tile[x] = [];
        for (var y=0;y<this.height[x].y;y++) {
            this.tile[x][y] = new Tile("sky", x, y);
        }
        for (var y=this.height[x].y; y<32; y++) {
            this.tile[x][y] = new Tile("grass", x, y);
        }
    }
};
Map.prototype.select_tile = function(mx, my) {
    return this.tile[mx][my];
};
Map.prototype.draw = function(ctx) {
    for (var x=0;x<32;x++) {
        for (var y=0;y<32;y++) {
            this.tile[x][y].draw(ctx);
        }
    }
};
var Unit = function() {
    this.color = "rgb(0,255,0)";
};
Unit.prototype.move = function(map, x) {
    this.x = x;
    this.y = map.height[x].y;
};
Unit.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * 20 + 5, this.y * 15 - 15, 10, 16);
};
var Battle = function() {
    this.map = new Map();
    this.unit = [new Unit()];
    this.unit[0].move(this.map, 5);
    this.seltile = [];
};
Battle.prototype.create_parabola = function(p, q, r) {
    this.parabola = new Parabola(p, q, r);
};
Battle.prototype.mouse_down = function(x, y) {
    var mx = Math.floor(x/20);
    var my = Math.floor(y/15);
    this.seltile.push(this.map.select_tile(mx, my));
    if (this.seltile.length > 2)
        this.create_parabola(this.seltile[0], this.seltile[1], this.seltile[2]);
};
Battle.prototype.draw = function(ctx) {
    this.map.draw(ctx);
    
    this.seltile.forEach(function(t) {
        t.draw(ctx, "rgba(255,200,55,0.5)");
    });
    
    if (this.parabola && this.parabola.line && this.parabola.line.length > 0) {
        this.parabola.line.forEach(function(p) {
            draw_tile(ctx, Math.floor(p.x), Math.floor(p.y), "rgba(255,255,255,0.50)");
        });
        ctx.beginPath();
        ctx.moveTo(this.parabola.line[0].x * 20, this.parabola.line[0].y * 15);
        this.parabola.line.forEach(function(p) {
            ctx.lineTo(p.x * 20, p.y * 15);
            ctx.stroke();
        });
    }
    
    this.unit.forEach(function(u) { u.draw(ctx); });
};
