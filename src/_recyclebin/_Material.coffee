window.Material = class Material

  wireframe: false
  wireframeWidth: 1
  
  useLights: false
  
  
  
  vertexShaderProperties: [
    ["attribute", "vec3", "aVertexPosition"],
    #["attribute", "vec4", "aVertexColor"],
    ["uniform", "mat4", "uMvMatrix"],
    ["uniform", "mat4", "uPMatrix"]
  ]
  
  VERTEX_SHADER = 
  """ 
  void main(void) {
      gl_Position = uPMatrix * uMvMatrix * vec4(aVertexPosition, 1.0);
  }

  """

  vertexShader: VERTEX_SHADER
  
  fragmentShaderProperties: [
  ]
  
  FRAGMENT_SHADER = 
  """
  void main(void) {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }

  """

  fragmentShader: FRAGMENT_SHADER
  
  shaderProgram: null



  useMaterial: (gl) ->
    gl.useProgram @getShaderProgram gl
  
  
  
  applyMaterial: (gl, properties) ->
    shaderProgram = @getShaderProgram gl
    for own name, property of properties
      if name of shaderProgram.properties and property isnt undefined
        if property instanceof Matrix
          property = property.elements
        prop = shaderProgram.properties[name]
        switch prop.type
          when "uniform"
            switch prop.dataType
              when "mat4"
                gl.uniformMatrix4fv(prop.location, false, property);
              when "sampler2D"
                gl.uniform1i prop.location, 0
          when "attribute"
            gl.bindBuffer(gl.ARRAY_BUFFER, property);
            gl.vertexAttribPointer(prop.location, property.itemSize, gl.FLOAT, false, 0, 0);
    
    
    
  getShaderProgram: (gl) ->
    if @shaderProgram is null
      @shaderProgram = @createShaderProgram gl
    @shaderProgram  
      
      
      
  getVertexShader: ->
    header = ""
    
    properties = ("#{property[0]} #{property[1]} #{property[2]};\n" for property in @vertexShaderProperties).join("");
    
    return header + properties + @vertexShader
   
   
   
  getFragmentShader: () ->
    header = 
    """
    #ifdef GL_ES
    precision highp float;
    #endif
    
    """
    
    properties = ("#{property[0]} #{property[1]} #{property[2]};\n" for property in @fragmentShaderProperties).join("");
    
    return header + properties + @fragmentShader
    
  
  
  # creates shader program
  createShaderProgram: (gl) ->
  
    vertexShader = @getVertexShader()
    fragmentShader = @getFragmentShader()
    
    shaderProgram = gl.createProgram()

    vs = @compileShader(gl, vertexShader, gl.VERTEX_SHADER);
    fs = @compileShader(gl, fragmentShader, gl.FRAGMENT_SHADER);

    gl.attachShader(shaderProgram, vs);
    gl.attachShader(shaderProgram, fs);
    gl.linkProgram(shaderProgram);

    # could not initialize shaders
    if not gl.getProgramParameter shaderProgram, gl.LINK_STATUS
      gl.deleteProgram shaderProgram
      gl.deleteShader vs
      gl.deleteShader fs
      return null

    gl.useProgram shaderProgram

    # Query any shader attributes and uniforms that we specified needing
    shaderProgram.properties = {}
    
    for properties in [@vertexShaderProperties, @fragmentShaderProperties]
      for property in properties
        [type,dataType,name] = property;
        shaderProgram.properties[name] = type: type, dataType: dataType
        
        switch type
          when "attribute"
            shaderProgram.properties[name].location = gl.getAttribLocation shaderProgram, name
            gl.enableVertexAttribArray shaderProgram.properties[name].location
          when "uniform"
            shaderProgram.properties[name].location = gl.getUniformLocation shaderProgram, name
    
    return shaderProgram



  # compiles shader
  compileShader: (gl, source, type) ->
    
    shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if not gl.getShaderParameter shader, gl.COMPILE_STATUS
      console.debug(gl.getShaderInfoLog shader)
      gl.deleteShader shader
      return null
    shader
  
  
  