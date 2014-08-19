var Dimension = function(manager){
	var manager = manager;
	var gl = manager.getGL();
	var canvas = manager.getCanvas();
	var div = manager.getDiv();

	manager.addDimension(this);
	var glProgram;

	
	/**
	 * 
	 */
	this.setProgram = function(vs, fs){
			
			var vertexSrc = document.getElementById(vs).text;
			var vertexShader = gl.createShader(gl.VERTEX_SHADER);
			gl.shaderSource(vertexShader, vertexSrc);
			gl.compileShader(vertexShader);
			
			
			if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
				alert("An error occurred compiling the shaders: "
						+ gl.getShaderInfoLog(vertexShader));
				return null;
			}
			// create fragment shader
			var fragmentSrc = document.getElementById(fs).text;
			var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
			gl.shaderSource(fragmentShader, fragmentSrc);
			gl.compileShader(fragmentShader);

			if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
				alert("An error occurred compiling the shaders: "
						+ gl.getShaderInfoLog(vertexShader));
				return null;
			}
			// link shaders to create our program
			var pointProgram = gl.createProgram();
			gl.attachShader(pointProgram, vertexShader);
			gl.attachShader(pointProgram, fragmentShader);
			gl.linkProgram(pointProgram);
			this.glProgram = pointProgram;	
		}
	/**
	 * 
	 */
	this.enableBuffers = function(buffers){
		for (var i in buffers){
			name = buffers[i].name;
			gl.bindBuffer(gl.ARRAY_BUFFER, buffers[i]);
			
			if (gl.getAttribLocation(this.glProgram, name)>=0){
			var loc = gl.getAttribLocation(this.glProgram, name);		
	        gl.enableVertexAttribArray(loc);
			gl.vertexAttribPointer(loc,  buffers[i].itemSize, gl.FLOAT, false, 0, 0);	
			} else {
				console.log("Error: attribute "+name+" does not exist.");
			}
		}
	}
	
	/**
	 * 
	 */
	this.render =  function(num){
		gl.useProgram(this.glProgram);	
		gl.drawArrays(gl.POINTS, 0, num);
		gl.useProgram(null);
		this.readPixels();
	}
};

Dimension.prototype.readPixels = function(){
	console.log("readPixels function should be implemneted by subclass");
}



Dimension.prototype.setMapMatrix = function(m){
	gl.useProgram(this.glProgram);
	var matrixLoc = gl.getUniformLocation(this.glProgram, 'mapMatrix');
	gl.uniformMatrix4fv(matrixLoc, false, m);
	gl.useProgram(null);
}


Dimension.prototype.update = function(){	
	/** trigger webgl render*/
	
	/** trigger visaulisation update*/
}


Dimension.prototype.filter = function(){
	/** create mask*/
}