window.Material = class Material
  
  @id: 0
  @get: ->
    return @id++
    
  constructor: (@name = "core", @callback = null) ->
    @reset()
    if typeof @name is 'object'
      layers = @name
      @name = "LayerMaterial_#{Material.get()}"
      @setLayers layers
    
  reset: ->
    @shader = null
    
  setLayers: (@layers) ->
    @reset()
    window.Enliven.ShaderSources["#{@name}.vertex"] = @generateLayerSource "vertex"
    window.Enliven.ShaderSources["#{@name}.fragment"] = @generateLayerSource "fragment"
    
  generateLayerSource: (type) ->
    imports = []
    calls = []
    for own i,layer of @layers
      imports.push "import #{layer}.#{type};"
      calls.push "#{layer}.apply();"
    return "#{imports.join "\n" }\nvoid main(void){\n#{calls.join "\n" }\n}"
      
  getShader: (gl) ->
    if @shader not instanceof ShaderProgram
      @shader = new ShaderProgram @name
    @shader
      
  bindGlobals: (gl) ->
    @shader.bindProperty gl, 'ModelViewMatrix', gl.matrixStack.getModelViewMatrix()
    @shader.bindProperty gl, 'ProjectionMatrix', gl.scene.pMatrix
    
    normalMatrix = gl.matrixStack.getModelViewMatrix().clone().toMat3().invert().transpose();
    @shader.bindProperty gl, 'NormalMatrix', normalMatrix
   
  bindProperties: (gl, object, mesh) -> 
    buffers = mesh.getBuffers()
    @shader.bindProperty gl, 'VertexPosition', buffers.vertexPositionBuffer
    @shader.bindProperty gl, 'VertexColor', buffers.vertexColorBuffer
    @shader.bindProperty gl, 'VertexTextureCoord', buffers.vertexTextureCoordBuffer
    @shader.bindProperty gl, 'VertexNormal', buffers.vertexNormalBuffer
  
  apply: (gl, object, mesh) -> 
    shaderProgram = @getShader gl
    shaderProgram.use gl
    @bindGlobals gl
    @bindProperties gl, object, mesh
    if @callback isnt null
      @callback.apply @, [gl, object, mesh]
    
  remove: (gl, object, mesh) -> 
    
    
window.PickingMaterial = class PickingMaterial extends Material
  @instance: null
  @get: ->
    @instance ?= new PickingMaterial()
    
  constructor: ->
    super 'picking'
    
  bindProperties: (gl, object, mesh) -> 
    @shader.bindProperty gl, 'INDEX', object.id
    super gl, object, mesh


window.SimpleMaterial = class SimpleMaterial extends Material
  constructor: (@color) ->
    super 'core'
    
  bindProperties: (gl, object, mesh) -> 
    @shader.bindProperty gl, 'Color', @color
    super gl, object, mesh


window.TextureMaterial = class TextureMaterial extends Material
  @bindTexture: (gl, texture) ->
    texture.bind gl
  @unbindTexture: (gl, texture) ->
    texture.unbind gl
  @bindTextureSampler: (gl, shaderProgram) ->
    shaderProgram.bindProperty gl, 'texture.TextureSampler', 0
    
  constructor: (@texture) ->
    if not (@texture instanceof Texture)
      @texture = new Texture @texture 
    super ['core','texture']
    
  bindProperties: (gl, object, mesh) -> 
    @shader.bindProperty gl, 'texture.TextureSampler', 0
    super gl, object, mesh
    
  apply: (gl, object, mesh) -> 
    @texture.bind gl
    super gl,object,mesh
    
  
  remove: (gl, object, mesh) ->  
    super gl,object,mesh
    @texture.unbind gl
    