function Manager(canvasid) {

	/**
	 * Global variables
	 */
	canvas = document.getElementById(canvasid);
	div = canvas.parentElement;
	gl = canvas.getContext('webgl', {preserveDrawingBuffer: true});

	
	this.dimensions = [];
	
	/**
	 * Common databuffers for all dimensions
	 */
	this.databuffers = [];

	this.getGL = function(){
		return gl;
	}
	this.getCanvas = function(){
		return canvas;
	}
	this.getDiv = function(){
		return div;
	}
	
	this.addDimension = function(d){
		this.dimensions.push(d);
	}
	
	/**
	 * Creates a data buffer object. itemSize is a dimension of the data
	 */
	this.addData = function(data, itemSize, name) {
		buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
		buffer.itemSize = itemSize;
		buffer.numItems = data.length / itemSize;
		buffer.name = name;
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		this.databuffers.push(buffer);
	}
	

	
	/**
	 * traverse all dimensions and renders them
	 */

	this.render = function() {
		/* bind array buffers */
		var now = Date.now() / 1000;
		 
		for (var i = 0; i < this.dimensions.length; i++) {
			d = this.dimensions[i];
			d.setup();
			d.enableBuffersAndCommonUniforms(this.databuffers);
			d.render(this.databuffers[0].numItems);
			d.tearDown();
		}
		
	}
	this.setup = function() {
		for (var i = 0; i < this.dimensions.length; i++) {
			d = this.dimensions[i];			
			d.setup();			
		}
	}
	
	this.init = function() {
		for (var i = 0; i < this.dimensions.length; i++) {
			d = this.dimensions[i];			
			d.init();			
		}
	}
	
}

var readPixels = function(framebuffer) {
	var readout= new Float32Array(8*4);	
}