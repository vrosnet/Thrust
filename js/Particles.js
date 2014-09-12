/**
 * @copyright 2014 Paul Liverman III
 */
/**
 * @constructor
 * @param {object} [location={x:0,y:0}] - Center of Particle.
 * @param {object} [effect={r:255,g:255,b:255,method:function()}] - Define starting color and method to execute on each call to Particle.effect()
 * @param {object} [size={width:1,height:1}] - Size of Particle.
 * @param {object} [speed={x:0,y:0}] - Velocity of Particle.
 * @param {object|Array} [parent] - A parent object can be specified, helps with the remove() method.
 */
var Particle=function(location,effect,size,speed,parent){
	//location = {x,y}
	if (location) {
		/**
		 * @type number
		 * @default 0
		 */
		this.x=location.x;
		/**
		 * @type number
		 * @default 0
		 */
		this.y=location.y;
	} else {
		this.x=0;
		this.y=0;
	}

	if (!effect) { // If no effect, use standard.
		var effect=Particle.effects.standard;
	}
	/**
	 * @type Array
	 * @default Particle.effects.standard {r,g,b}
	 */
	this.color=[effect.r,effect.g,effect.b];
	/**
	 * @type function
	 * @default Particle.effects.standard.method
	 */
	this.effect=effect.method;

	if (size) {
		/**
		 * @type number
		 * @default 1
		 */
		this.width=size.width;
		/**
		 * @type number
		 * @default 1
		 */
		this.height=size.height;
	} else {
		this.width=1;
		this.height=1;
	}

	/** 
	 * @type vector
	 * @default (0,0)
	 */
	this.v=new vector(speed.x,speed.y);

	/**
	 * @type object
	 * @default undefined
	 */
	if (parent) this.parent=parent;
};
Particle.effects={
	standard:{
		r:255,g:255,b:255,
		method:function(){
			this.color[0]-=1;
			this.color[1]-=1;
			this.color[2]-=1;
			if (this.color[0] < 1) this.remove();
		}
	}
};
Particle.prototype={
	remove:function(){
		if (this.parent) {
			if (this.parent.splice) {
				this.parent.splice(this.parent.indexOf(this),1);
			}
			delete this;
		}
	},
	draw:function(context) {
		context.fillStyle="rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
		context.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
	}
};