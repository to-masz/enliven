window.Model = class Model
  @_idCounter: 0
  
  constructor: ->
    @id = Model._idCounter++

  render: (gl, options, sceneObj) ->
  
  update: (gl, options, sceneObj) ->
  

window.ModelGroup = class ModelGroup extends Model
  models: []
  
  draw: (gl) ->
    m.draw gl for m  in @models;



window.ModelObject = class ModelObject extends Model
  vertexPositionBuffer: null
  vertexColorBuffer: null
  vertexIndexBuffer: null
  vertexTextureCoordBuffer: null
  
  matrix: null
  position: mat4[].setIdentity()
  rotation: mat4[].setIdentity()
  calibration: mat4[].setIdentity()
  
  
  constructor: ( @mesh, @material, @texture = null) ->
    super()
  
  initBuffers: (gl) ->
    @vertexPositionBuffer = @createArrayBuffer gl, @mesh.vertexPositions if @mesh.vertexPositions isnt null
    @vertexColorBuffer = @createArrayBuffer gl, @mesh.vertexColors, 4 if @mesh.vertexColors isnt null
    @vertexIndexBuffer = @createArrayBuffer gl, @mesh.vertexIndices, 1, Uint16Array, gl.ELEMENT_ARRAY_BUFFER if @mesh.vertexIndices isnt null
    @vertexTextureCoordBuffer = @createArrayBuffer gl, @mesh.vertexTextureCoords, 2 if @mesh.vertexTextureCoords isnt null
    
  createArrayBuffer: (gl, vertices, size = 3, dataType = Float32Array, type = gl.ARRAY_BUFFER) ->
    buffer = gl.createBuffer();
    gl.bindBuffer(type, buffer);
    gl.bufferData(type, new dataType(vertices), gl.STATIC_DRAW);
    buffer.itemSize = size;
    buffer.numItems = vertices.length / size;
    return buffer;
    
    
    
  beforeRender: (gl, options, sceneObject) ->
    if @vertexPositionBuffer is null
      @initBuffers gl
      
    @matrix = sceneObject.pushMvMatrix()
    
    
    
  afterRender: (gl, options, sceneObject) ->
    sceneObject.popMvMatrix()
    
    
    
  render: (gl, options, sceneObject) -> 
    
    @beforeRender(gl, options, sceneObject)
    
    @matrix = @matrix * @position * @rotation * @calibration

    if options.picking? and options.picking
      material = PickingMaterial.get()
      texture = null
    else
      material = @material
      texture = @texture
    
    material.use gl
    
    if texture isnt null
      texture.bind gl
      
    $mvMatrix = @matrix
    $pMatrix = sceneObject.pMatrix
    $vertexPosition = @mesh.vertexPositions
    $vertexTextureCoord = @mesh.vertexTextureCoords
    $INDEX = @id
    if texture isnt null
      $sampler = 0 #@texture.getHandle gl
    
    if @vertexIndexBuffer isnt null
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, @vertexIndexBuffer);
      gl.drawElements(gl.TRIANGLES, @vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    else
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, @vertexPositionBuffer.numItems);
      
    if texture isnt null
      texture.unbind gl
      
    @afterRender(gl, options, sceneObject)
      
  update: (gl, options, sceneObject) ->
    
    
  rotate: (rad, vec) ->
    @rotation = @rotation @> [rad, vec]
    
  translate: (vec) ->
    @position = @position |> vec
    
  scale: (vec) ->
    @calibration = @calibration ^> vec