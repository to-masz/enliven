window.Texture = class Texture extends Component
  
  initialized: no
  valid: []
  
  options: {}


  # Checks whether the given size is the power of two
  isPoT: (s) ->
    return s && (s & -s) == s;



  constructor: (@file, options) ->
    @options[name] = value for own name, value of options
    
    if @file 
      @image = new Image();
      @image.onload = (e) => 
        if !@isPoT @image.width or !@isPoT @image.height
          @options.mag_filter = Enliven.gl.LINEAR
          @options.min_filter = Enliven.gl.LINEAR
          @options.wrap_s = Enliven.gl.CLAMP_TO_EDGE
          @options.wrap_t = Enliven.gl.CLAMP_TO_EDGE
          @options.generate_mipmap = no
        @options.onload?.call @, @image
        @initialized = yes
      @image.onerror = @image.onabort = (e) =>
        throw new Error "Failed to load '#{@image.src}' texture."
      @image.src = @file;
    else
      @initialized = yes
      
      
   
  generateTexture: (gl) ->
    data_type = @options.data_type
    format = @options.format
    target = @options.target
    
    if @image
      gl.texImage2D(target, 0, format, format, data_type, @image)
    else
      # no images at all -- load the texture with empty data; it's probably for a framebuffer
      width = @options.width
      height = @options.height;
      if not width or not height
        throw new Error("Can't build an empty texture without at least a width and height")
      
      ti2d = (glEnum) ->
        try # should now work in every browser
          gl.texImage2D(glEnum, 0, format, width, height, 0, format, gl.UNSIGNED_BYTE, null)
        catch e
          tex = new Uint8Array(width*height*Enliven.sizeofFormat(format))
          gl.texImage2D(glEnum, 0, format, width, height, 0, format, gl.UNSIGNED_BYTE, tex)
      
      ti2d(gl.TEXTURE_2D)
      
      
      
  generateMipmap: (gl) ->
    # FIXME why does this raise 1280 invalid enum?
    # context.glHint(gl.GENERATE_MIPMAP_HINT, this.options.mipmap_hint);
    gl.generateMipmap(@options.target)
    
  
  
  build: (gl) ->
    @setHandle gl, gl.createTexture()
  
  
      
  refresh: (gl) ->
    return false if not @initialized
    
    options = 
      min_filter: gl.NEAREST
      mag_filter: gl.NEAREST
      generate_mipmap: yes
      mipmap_hint: gl.DONT_CARE
      format: gl.RGBA
      target: gl.TEXTURE_2D
      data_type: gl.UNSIGNED_BYTE
      wrap_s: gl.REPEAT
      wrap_t: gl.REPEAT
      flip_y: no
      premultiply_alpha: no
      colorspace_conversion: yes
      onload: null
      
    for own name, value of options
      if @options[name] is undefined
        @options[name] = value
        

    texture = @getHandle(gl)
    gl.bindTexture(@options.target, texture)
    
    @setHandle gl, texture
    
    @generateTexture gl
    
    gl.texParameteri(@options.target, gl.TEXTURE_MAG_FILTER, @options.mag_filter)
    gl.texParameteri(@options.target, gl.TEXTURE_MIN_FILTER, @options.min_filter)
    gl.texParameteri(@options.target, gl.TEXTURE_WRAP_S, @options.wrap_s)
    gl.texParameteri(@options.target, gl.TEXTURE_WRAP_T, @options.wrap_t)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, @options.flip_y)
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, @options.premultiply_alpha)
    colorspaceConversion = gl.NONE
    colorspaceConversion = gl.BROWSER_DEFAULT_WEBGL if @options.colorspace_conversion
    gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, colorspaceConversion)

    if @options.generate_mipmap
      @generateMipmap(gl)

    gl.bindTexture(@options.target, null)
    @valid[gl.id] = yes

  
  
  isValid: (gl) ->
    return @valid[gl.id] ? false
    
    

  bind: (gl) ->
    return null unless @initialized # no texture to display, yet... but not worth crashing over.
    if not @isValid gl then @refresh(gl)
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(@options.target, @getHandle(gl))


    
  unbind: (gl) ->
    if @isValid gl
      gl.bindTexture(@options.target, null);


  getHandle: (gl) ->
    if not @contexts? or not @contexts[gl.id]?
      @build gl
      @refresh gl
    @contexts[gl.id]
  
 ###   
  init: (gl) ->
    gl.bindTexture(gl.TEXTURE_2D, @texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, @image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);
    
  apply: (gl, material) ->
    if @texture is null
      @texture = gl.createTexture();
    
    if @initialized
      @init gl
      @initialized = false
      
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, @texture);
    material.applyMaterial gl, {
      "uSampler", 0
    }
  ###