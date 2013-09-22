window.Mesh = class Mesh
  
  constructor: ->
    @vertexPositions = []
    @vertexColors = []
    @vertexIndices = null
    @vertexTextureCoords = []
    @vertexNormals = null
    
    @buffers = null
    
    @drawMode = 'GL_TRIANGLES'
    @material = 'default'
    
    @_bounds =
      left: vec3[]
      right: vec3[]
      top: vec3[]
      bottom: vec3[]
      front: vec3[]
      back: vec3[]
      center: vec3[]
      width: 0
      height: 0
      depth: 0
      radius: 0
    
    @init()
    @recalculateBounds()
    
  init: ->
  
  
  getBuffers: (gl) ->
    @initBuffers gl if @buffers is null
    @buffers
  
  initBuffers: (gl) ->
    @buffers = 
      vertexPositionBuffer: @createArrayBuffer gl, @vertexPositions 
      vertexNormalBuffer: @createArrayBuffer gl, @vertexNormals
      vertexColorBuffer: @createArrayBuffer gl, @vertexColors, 4 
      vertexIndexBuffer: @createArrayBuffer gl, @vertexIndices, 1, Uint16Array, gl.ELEMENT_ARRAY_BUFFER 
      vertexTextureCoordBuffer: @createArrayBuffer gl, @vertexTextureCoords, 2
      
      
  createArrayBuffer: (gl, vertices, size = 3, dataType = Float32Array, type = gl.ARRAY_BUFFER) ->
    return null if vertices is null
    buffer = gl.createBuffer(); 
    gl.bindBuffer(type, buffer);
    gl.bufferData(type, new dataType(vertices), gl.STATIC_DRAW);
    buffer.itemSize = size;
    buffer.numItems = vertices.length / size;
    return buffer;
  
  render: (gl, object, material) -> 
    buffers = @getBuffers gl
    
    material.apply gl, object, @
    if buffers.vertexIndexBuffer isnt null
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.vertexIndexBuffer)
      gl.drawElements(gl.TRIANGLES, buffers.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0)
    else
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, buffers.vertexPositionBuffer.numItems);
    material.remove gl, object, @    
    
    
  recalculateBounds: ->
    [left, right, top, bottom, front, back, center] = 
      [@_bounds.left, @_bounds.right, @_bounds.top, @_bounds.bottom, @_bounds.front, @_bounds.back, @_bounds.center]

    position = vec3[]
    biggest = 0
    for i in [0...@vertexPositions.length - 1] by 3
      position.e 0, @vertexPositions[i]
      position.e 1, @vertexPositions[i+1]
      position.e 2, @vertexPositions[i+2]
      if i == 0
        position.copyTo left
        position.copyTo right
        position.copyTo top
        position.copyTo bottom
        position.copyTo front
        position.copyTo back
      else
        if position.e(0) < left.e(0)   then position.copyTo left
        if position.e(0) > right.e(0)  then position.copyTo right
        if position.e(1) < bottom.e(1) then position.copyTo bottom
        if position.e(1) > top.e(1)    then position.copyTo top
        if position.e(2) < back.e(2)   then position.copyTo back
        if position.e(2) > front.e(2)  then position.copyTo front
    width  = right.e(0) - left.e(0)
    height = top.e(1)   - bottom.e(1)
    depth  = front.e(2) - back.e(2)
    biggest = (if width > height && width > depth then width else if height > depth then height else depth)
    center.e 0, left.e(0)   + width  * 0.5
    center.e 1, bottom.e(1) + height * 0.5
    center.e 2, back.e(2)   + depth  * 0.5
    if width  < 0.0001 then width  = 0.0001
    if height < 0.0001 then height = 0.0001
    if depth  < 0.0001 then depth  = 0.0001
    [@_bounds.width, @_bounds.height, @_bounds.depth] = [width, height, depth]
    @_bounds.radius = biggest / 2
    @_bounds
  
  getBounds: ->
    copy = {}
    for own name, value of @_bounds
      copy[name] = value
    copy
      

window.CuboidMesh = class CuboidMesh extends Mesh
  
  constructor: (@width = 1, @height = 1, @depth = 1) ->
    super
  
  init: ->
    depth = @depth/2
    height = @height/2
    width = @width/2
    @vertexPositions = [
      # Front face
      -width, -height,  depth,
       width, -height,  depth,
       width,  height,  depth,
      -width,  height,  depth,

      # Back face
      -width, -height, -depth,
      -width,  height, -depth,
       width,  height, -depth,
       width, -height, -depth,

      # Top face
      -width,  height, -depth,
      -width,  height,  depth,
       width,  height,  depth,
       width,  height, -depth,

      # Bottom face
      -width, -height, -depth,
       width, -height, -depth,
       width, -height,  depth,
      -width, -height,  depth,

      # Right face
       width, -height, -depth,
       width,  height, -depth,
       width,  height,  depth,
       width, -height,  depth,

      # Left face
      -width, -height, -depth,
      -width, -height,  depth,
      -width,  height,  depth,
      -width,  height, -depth,
    ]
        
    colors = [
      [1.0, 0.0, 0.0, 1.0],     # Front face
      [1.0, 1.0, 0.0, 1.0],     # Back face
      [0.0, 1.0, 0.0, 1.0],     # Top face
      [1.0, 0.5, 0.5, 1.0],     # Bottom face
      [1.0, 0.0, 1.0, 1.0],     # Right face
      [0.0, 0.0, 1.0, 1.0],     # Left face
    ]
    unpackedColors = []
    for own i, color of colors
      for j in [0..3]
        unpackedColors = unpackedColors.concat(color);
    @vertexColors = unpackedColors
    
    @vertexIndices = [
      0, 1, 2,      0, 2, 3,    # Front face
      4, 5, 6,      4, 6, 7,    # Back face
      8, 9, 10,     8, 10, 11,  # Top face
      12, 13, 14,   12, 14, 15, # Bottom face
      16, 17, 18,   16, 18, 19, # Right face
      20, 21, 22,   20, 22, 23  # Left face
    ]
    
    @vertexTextureCoords = [
      # Front face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,

      # Back face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      # Top face
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,

      # Bottom face
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,

      # Right face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      # Left face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    ]
    
    @vertexNormals = [
      # Front face
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,

      # Back face
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,

      # Top face
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,

      # Bottom face
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,

      # Right face
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,

      # Left face
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
    ]

window.SphereMesh = class SphereMesh extends Mesh
  constructor: (@radius, @latitudeBands = 30, @longitudeBands = 30) ->
    super
    
  init: -> 
    @vertexNormals = []
    for latNumber in [0..@latitudeBands]
      theta = latNumber * Math.PI / @latitudeBands
      sinTheta = Math.sin theta
      cosTheta = Math.cos theta

      for longNumber in[0..@longitudeBands]
        phi = longNumber * 2 * Math.PI / @longitudeBands
        sinPhi = Math.sin phi
        cosPhi = Math.cos phi

        x = cosPhi * sinTheta
        y = cosTheta
        z = sinPhi * sinTheta
        u = 1 - (longNumber / @longitudeBands)
        v = 1 - (latNumber / @latitudeBands)

        @vertexNormals.push x
        @vertexNormals.push y
        @vertexNormals.push z
        @vertexTextureCoords.push u
        @vertexTextureCoords.push v
        @vertexPositions.push @radius * x
        @vertexPositions.push @radius * y
        @vertexPositions.push @radius * z

    @vertexIndices = []
    for latNumber in [0..@latitudeBands-1]
      for longNumber in [0..@longitudeBands-1]
        first = (latNumber * (@longitudeBands + 1)) + longNumber
        second = first + @longitudeBands + 1;
        
        @vertexIndices.push first
        @vertexIndices.push second
        @vertexIndices.push first + 1

        @vertexIndices.push second
        @vertexIndices.push second + 1
        @vertexIndices.push first + 1
      

window.PyramidMesh = class PyramidMesh extends Mesh
  
  constructor: (@width = 1, @height = 1, @depth = 1) ->
    super
  
  init: ->
    depth = @depth/2
    height = @height/2
    width = @width/2
    @vertexPositions = [
      # Front face
      0.0,  height,  0.0,
      -width, -height,  depth,
      width, -height,  depth,

     # Right face
      0.0,  height,  0.0,
      width, -height,  depth,
      width, -height, -depth,

     # Back face
      0.0,  height,  0.0,
      width, -height, -depth,
      -width, -height, -depth,

     # Left face
      0.0,  height,  0.0,
      -width, -height, -depth,
      -width, -height,  depth
    ]
        
    @vertexColors = [
      # Front face
      1.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 0.0, 1.0, 1.0,

      # Right face
      1.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 1.0, 1.0,
      0.0, 1.0, 0.0, 1.0,

      # Back face
      1.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 0.0, 1.0, 1.0,

      # Left face
      1.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 1.0, 1.0,
      0.0, 1.0, 0.0, 1.0
    ]
    
    ###
    @vertexIndices = [
      0, 1, 2,      0, 2, 3,    # Front face
      4, 5, 6,      4, 6, 7,    # Back face
      8, 9, 10,     8, 10, 11,  # Top face
      12, 13, 14,   12, 14, 15, # Bottom face
      16, 17, 18,   16, 18, 19, # Right face
      20, 21, 22,   20, 22, 23  # Left face
    ]
    
    @vertexTextureCoords = [
      # Front face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,

      # Back face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      # Top face
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,

      # Bottom face
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,

      # Right face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      # Left face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    ]
    
    @vertexNormals = [
      # Front face
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,

      # Back face
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,

      # Top face
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,

      # Bottom face
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,

      # Right face
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,

      # Left face
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
    ]
    ###
  
  
  
window.SquareMesh = class SquareMesh extends Mesh
  constructor: (@size = 1) ->
    super
    
  init: ->
    size = @size/2
    @vertexPositions = [
         size,  size,  0.0,
        -size,  size,  0.0,
         size, -size,  0.0,
        -size, -size,  0.0
    ]
  
window.TriangleMesh = class SquareMesh extends Mesh
  constructor: (@size = 1) ->
    super
    
  init: ->
    size = @size/2
    @vertexPositions = [
         0.0,  size,  0.0,
        -size, -size,  0.0,
         size, -size,  0.0
    ]
    @vertexColors = [
         1.0,  0.0,  0.0, 1.0
         0.0,  1.0,  0.0, 1.0
         0.0,  0.0,  1.0, 1.0
    ]
    