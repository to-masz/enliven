WebGL = 
  TRIANGLES: 1
  TRIANGLE_STRIP: 2
  POINTS: 3
  TRIANGLE_FAN: 4
  LINEAR: 5
  CLAMP_TO_EDGE: 12
  NEAREST: 7
  DONT_CARE: 8
  RGBA: 9
  TEXTURE_2D: 10
  UNSIGNED_BYTE: 11
  REPEAT: 6
  BLEND: 13
  SRC_ALPHA: 14
  ONE_MINUS_SRC_ALPHA: 15
  NO_ERROR: 16
  DEPTH_TEST: 17
  LEQUAL: 18
  ARRAY_BUFFER: 19
  STATIC_DRAW: 20
  CULL_FACE: 21
  FRONT: 22
  BACK: 23
  POLYGON_OFFSET_FILL: 24
  FRAMEBUFFER: 25
  RENDERBUFFER: 26
  DEPTH_COMPONENT16: 27
  VERTEX_SHADER: 28
  FRAGMENT_SHADER: 29
  COMPILE_STATUS: 30
  LINK_STATUS: 31
  ACTIVE_ATTRIBUTES: 32
  ACTIVE_UNIFORMS: 33
  DEPTH_ATTACHMENT: 34
  COLOR_ATTACHMENT0: 35
  ALPHA: 36
  LUMINANCE: 37
  MAX_VARYING_VECTORS: 38
  MAX_UNIFORM_VECTORS: 39
  MAX_VERTEX_UNIFORM_VECTORS: 40
  MAX_FRAGMENT_UNIFORM_VECTORS: 41
  MAX_VERTEX_ATTRIBS: 42
  MAX_VERTEX_TEXTURE_IMAGE_UNITS: 43
  RGB: 44
  TEXTURE_MAG_FILTER: 45
  TEXTURE_MIN_FILTER: 46
  TEXTURE_WRAP_S: 47
  TEXTURE_WRAP_T: 48
  UNPACK_FLIP_Y_WEBGL: 49
  ELEMENT_ARRAY_BUFFER: 50
  UNPACK_PREMULTIPLY_ALPHA_WEBGL: 51
  UNPACK_COLORSPACE_CONVERSION_WEBGL: 52
  BROWSER_DEFAULT_WEBGL: 53
  FRAMEBUFFER_COMPLETE: 54
  FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 55
  FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 56
  FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 57
  FRAMEBUFFER_UNSUPPORTED: 58
  COLOR_BUFFER_BIT: 59
  DEPTH_BUFFER_BIT: 60
  ONE: 61
  STREAM_DRAW: 62
  UNSIGNED_SHORT: 63
  LUMINANCE_ALPHA: 64
  DEPTH_STENCIL: 65
  DEPTH_STENCIL_ATTACHMENT: 66
  TEXTURE0: 67
  TEXTURE1: 68
  TEXTURE2: 69
  TEXTURE3: 70
  TEXTURE4: 71
  TEXTURE5: 72
  TEXTURE6: 73
  TEXTURE7: 74
  TEXTURE8: 75
  TEXTURE9: 76
  TEXTURE10: 77
  TEXTURE11: 78
  TEXTURE12: 79
  TEXTURE13: 80
  TEXTURE14: 81
  TEXTURE15: 82
  TEXTURE16: 83
  TEXTURE17: 84
  TEXTURE18: 85
  TEXTURE19: 86
  TEXTURE20: 87
  TEXTURE21: 88
  TEXTURE22: 89
  TEXTURE23: 90
  TEXTURE24: 91
  TEXTURE25: 92
  TEXTURE26: 93
  TEXTURE27: 94
  TEXTURE28: 95
  TEXTURE29: 96
  TEXTURE30: 97
  TEXTURE31: 98
  TEXTURE_CUBE_MAP: 99
  TEXTURE_CUBE_MAP_POSITIVE_X: 100
  TEXTURE_CUBE_MAP_POSITIVE_Y: 101
  TEXTURE_CUBE_MAP_POSITIVE_Z: 102
  TEXTURE_CUBE_MAP_NEGATIVE_X: 103
  TEXTURE_CUBE_MAP_NEGATIVE_Y: 104
  TEXTURE_CUBE_MAP_NEGATIVE_Z: 105
  DYNAMIC_DRAW: 106

window.Enliven = Enliven = {
  sizeofFormat: (glEnum) ->
    switch glEnum
      when gl.ALPHA then return 1;           # alpha component only
      when gl.LUMINANCE then return 1;       # luminance component only
      when gl.RGB then return 3;             # RGB triplet
      when gl.RGBA then return 4;            # all 4 components
      when gl.LUMINANCE_ALPHA then return 2; # luminance/alpha pair
      else
        throw new Error("Unrecognized format: #{glEnum}");
}



window.Component = class Component
  
  contexts: {}
  
  getHandle: (gl) ->
    @contexts[gl.id] ? null
    
  setHandle: (gl, handle) ->
    @contexts[gl.id] = handle
    


window.Texture = class Texture extends Component
  
  initialized: no
  valid: []
  
  options: 
    min_filter: WebGL.NEAREST
    mag_filter: WebGL.NEAREST
    generate_mipmap: yes
    mipmap_hint: WebGL.DONT_CARE
    format: WebGL.RGBA
    target: WebGL.TEXTURE_2D
    data_type: WebGL.UNSIGNED_BYTE
    wrap_s: WebGL.REPEAT
    wrap_t: WebGL.REPEAT
    flip_y: no
    premultiply_alpha: no
    colorspace_conversion: yes
    onload: null


  # Checks whether the given size is the power of two
  isPoT: (s) ->
    return s && (s & -s) == s;



  constructor: (@file, options) ->
    @options[name] = value for own name, value of options
    
    if @file 
      @image = new Image();
      @image.onload = (e) => 
        if !@isPoT @image.width or !@isPoT @image.height
          @options.mag_filter = gl.LINEAR
          @options.min_filter = gl.LINEAR
          @options.wrap_s = gl.CLAMP_TO_EDGE
          @options.wrap_t = gl.CLAMP_TO_EDGE
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
    
  
      
  refresh: (gl) ->
    return false if not @initialized

    texture = @getHandle(gl)
    texture ?= gl.createTexture()
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
    gl.bindTexture(@options.target, null);



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