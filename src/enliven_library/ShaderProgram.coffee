window.ShaderProgram = class ShaderProgram
      
  @current: null
  
  constructor: (@name) ->
    @reset()
    
  reset: ->
    @shaderProgram = null
    @vertexShader = null
    @fragmentShader = null
    
  use: (gl) ->
    program = @getShaderProgram gl
    ShaderProgram.current = @
    gl.useProgram program
  
  setOptions: (options) ->
    for own name, value of options
      @[name] = value
  
  bindProperties: (gl, properties) ->
    for own name, value of properties
      @bindProperty gl, name, value
  
  bindProperty: (gl, name, value) ->
    if typeof value is 'Object' and value not instanceof Array
      for own n,v of value
        @bindProperty gl "#{name}.#{n}", v
      return true;
  
    shaderProgram = @getShaderProgram gl
    if not (name of shaderProgram.properties and value isnt undefined)
      return false
    
    property = shaderProgram.properties[name]
    switch property.qualifier
      when "uniform"
        if value instanceof BaseMatrix
          value = value.elements
        switch property.type
          when 'float'          then gl.uniform1f  property.location, value
          when 'bool', 'int'    then gl.uniform1i  property.location, value
          when 'vec2'           then gl.uniform2fv property.location, value
          when 'vec3'           then gl.uniform3fv property.location, value
          when 'vec4'           then gl.uniform4fv property.location, value
          when 'bvec2', 'ivec2' then gl.uniform2iv property.location, value
          when 'bvec3', 'ivec3' then gl.uniform3iv property.location, value
          when 'bvec4', 'ivec4' then gl.uniform4iv property.location, value
          when 'mat2' then gl.uniformMatrix2fv property.location, false, value
          when 'mat3' then gl.uniformMatrix3fv property.location, false, value
          when 'mat4' then gl.uniformMatrix4fv property.location, false, value
          when 'sampler2D', 'samplerCube'
            gl.uniform1i property.location, value
          #  gl.activeTexture GL_TEXTURE0 + @__textureIndex
          #  if handle = value.validate context
          #    gl.bindTexture value.get('target'), handle
          #  else
          #    gl.bindTexture value.get('target'), null
          else throw new Error "Unexpected variable type: #{property.type}"
        ###
        switch property.type
          when "mat4"
            gl.uniformMatrix4fv(property.location, false, value);
          when "sampler2D"
            gl.uniform1i property.location, 0
          when "float"
            gl.uniform1f property.location, value
        ###
      when "attribute"
        @bindBuffer gl, property, value
        
   
  bindBuffer: (gl, property, value) ->
    if value instanceof WebGLBuffer
      buffer = value
    else if value.hash? and @buffers[value.hash] instanceof WebGLBuffer
      buffer = @buffers[value.hash]
    else
      if value instanceof Matrix
        value = value.elements
      hash = @getArrayHash value
      value.hash = hash
      if @buffers[hash] instanceof WebGLBuffer
        buffer = @buffers[hash]
      else
        buffer = @buffers[hash] = @createPropertyBuffer gl, property, value
    gl.bindBuffer gl.ARRAY_BUFFER, buffer
    gl.vertexAttribPointer property.location, buffer.itemSize, gl.FLOAT, false, 0, 0
    
    
  getArrayHash: (value) ->
    hash = 0
    str = JSON.stringify value # TODO: fix; it may be slow :( 
    return hash if str.length is 0
    for i in [0..str.length-1]
      c = str.charCodeAt(i);
      hash = ((hash<<5)-hash)+c;
      hash |= 0; 
    return hash;
    
  buffers: {}
  
  createPropertyBuffer: (gl, property, value) ->
    result = /(mat|vec)([0-9])/.exec property.type
    size = result[2]
    
    switch result[1]
      when "vec"
        buffer = ShaderProgram.createBuffer gl, value, size
      else
        throw "Unsupported buffer type"
    
    return buffer
  
  @createBuffer: (gl, data, size = 3, dataType = Float32Array, type = gl.ARRAY_BUFFER) ->
    buffer = gl.createBuffer();
    gl.bindBuffer(type, buffer);
    gl.bufferData(type, new dataType(data), gl.STATIC_DRAW);
    buffer.itemSize = size;
    buffer.numItems = data.length / size;
    return buffer;
    
    
    
  getShaderProgram: (gl, recompile = false) ->
    if recompile or @shaderProgram is null
      @shaderProgram = @createShaderProgram gl
    @shaderProgram  
      
      
      
  getVertexShader: ->
    @vertexShader = new Shader "#{@name}.vertex" if @vertexShader is null
    @vertexShader
   
  getFragmentShader: () ->
    @fragmentShader = new Shader "#{@name}.fragment" if @fragmentShader is null
    @fragmentShader
  
  # creates shader program
  createShaderProgram: (gl) ->
  
    vertexShader = "precision mediump float;\n\n#{@getVertexShader().getSource()}"
    fragmentShader = "precision mediump float;\n\n#{@getFragmentShader().getSource()}"
    
    shaderProgram = gl.createProgram()

    vs = @compileShader(gl, vertexShader, gl.VERTEX_SHADER);
    fs = @compileShader(gl, fragmentShader, gl.FRAGMENT_SHADER);

    gl.attachShader(shaderProgram, vs);
    gl.attachShader(shaderProgram, fs);
    gl.linkProgram(shaderProgram);

    # could not initialize shaders
    if not gl.getProgramParameter shaderProgram, gl.LINK_STATUS
      console.debug(gl.getProgramInfoLog(shaderProgram))
      gl.deleteProgram shaderProgram
      gl.deleteShader vs
      gl.deleteShader fs
      return null

    gl.useProgram shaderProgram

    shaderProgram.properties = {}
    
    
    for shaderParser in [@vertexShader, @fragmentShader]
      for own name, variable of shaderParser.variables
        shaderProgram.properties[name] = variable
        shaderProgram.properties[name].locationName = name
        
        switch variable.qualifier
          when "attribute"
            shaderProgram.properties[name].location = gl.getAttribLocation shaderProgram, variable.name
            gl.enableVertexAttribArray shaderProgram.properties[name].location
          when "uniform"
            shaderProgram.properties[name].location = gl.getUniformLocation shaderProgram, variable.name
    return shaderProgram


  # compiles shader program
  compileShader: (gl, source, type) ->
    
    glShader = gl.createShader(type);

    gl.shaderSource(glShader, source);
    gl.compileShader(glShader);

    if not gl.getShaderParameter glShader, gl.COMPILE_STATUS
      console.debug(gl.getShaderInfoLog glShader)
      gl.deleteShader glShader
      return null
    glShader
    
  