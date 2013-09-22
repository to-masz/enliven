window.Texture = class Texture
  texture: null

  constructor: (@file) ->
    @initialized = false
    @image = new Image();
    @image.onload = (e) => 
      @initialized = true
    @image.src = @file;
    
  apply: (gl) ->
    if @texture is null
      @texture = gl.createTexture();
    
    if @initialized
      @init gl
      @initialized = false
      
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, @texture);
  
  init: (gl) ->
    gl.bindTexture(gl.TEXTURE_2D, @texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, @image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);