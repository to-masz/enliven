window.Model = class Model
  @_idCounter: 0
  
  LOCAL_VIEW  = vec3[0, 0,-1]
  LOCAL_RIGHT = vec3[1, 0, 0]
  LOCAL_UP    = vec3[0, 1, 0]
  
  constructor: (options) ->
    @id = Model._idCounter++
    
    @rotation = quat[].setIdentity()
    @_position = vec3[]
    @matrices =
      mv:  mat4[].setIdentity()
      imv: mat4[].setIdentity()
      n:   mat3[].setIdentity()
    @reset()
    
    @_isValid = false
    @_viewVector = vec3[]
    @_upVector   = vec3[]
    @_rightVector= vec3[]
    if options
      @_position = options.position if options.position
      @direction = options.direction if options.direction
    @init()

  init: ->

  reset: ->
    @_position = vec3[0,0,0]
    @rotation = quat[0,0,0,1]
    
  _dirVec = vec3[]
  _dirRightVec = vec3[]
  _dirUpVec = vec3[]
  _dirQuat = quat[]
  getDirection: ->
    @validate() unless @isValid()
    @_viewVector
  
  setDirection: (dir) ->
    dir.copyTo _dirVec
    vec = _dirVec
    vec.normalize()
    ###
    if @_fixedYaw
      # negating so that right, up, vec is right-handed
      vec3.negate()
      right = vec3.normalize _dirRightVec, vec3[].cross _dirRightVec, @_fixedYawAxis, vec
      up    = vec3.normalize _dirUpVec,    vec3[].cross _dirUpVec,    vec, right
      quat.setAxes @rotation, vec, right, up
    else
    ###
    
    rotquat = _dirQuat.rotationTo @getDirection(), vec
    @rotation = rotquat * @rotation
    @rotation.normalize()
    @invalidate()
  
  getRight: ->
    @validate() unless @isValid()
    @_rightVector
    
  getUp: ->
    @validate() unless @isValid()
    @_upVector
    
  getPosition: ->
    @_position.clone()
    
  getHorizontalPlane: ->
    position = @getPosition()
    [position, position + @getRight(), position + @getDirection()]
    
  getWorldXYPlane: ->
    position =  @getPosition()
    new Geometry.Plane position, LOCAL_VIEW
  getWorldXZPlane: ->
    position =  @getPosition()
    new Geometry.Plane position, LOCAL_UP
  getWorldYZPlane: ->
    position =  @getPosition()
    new Geometry.Plane position, LOCAL_RIGHT
    #[position, position + LOCAL_RIGHT, position + LOCAL_VIEW]
  
  setPosition: (x) ->
    x.copyTo @_position
    # no need to completely invalidate, just force matrices and
    # frustum to update, that way we skip the overhead of
    # recalculating view, right and up vectors, which won't change.
    @_stale = true
    
  invalidate: ->
    @_isValid = false
    @_stale = true
    
  isValid: -> @_isValid
  
  recalculateMatrices: ->
    @validate() unless @isValid()
    @_stale = false
    @matrices.mv.fromRotationTranslation @rotation, @getPosition()
    @matrices.imv = @matrices.mv.getInverted()
    @matrices.n = mat3[].fromMat4 @matrices.imv
    @matrices.n = @matrices.n.transpose()
  
  validate: () ->
    @_isValid = true
    @_viewVector.transformQuat  LOCAL_VIEW,  @rotation
    @_rightVector.transformQuat LOCAL_RIGHT, @rotation
    @_upVector.transformQuat    LOCAL_UP,    @rotation
    
    #console.log LOCAL_UP.elements, @rotation.elements, @_upVector
  
  
  
  rotate: (amount, vec) ->
    vec = vec.transformQuat vec, @rotation
    @rotateWorld amount, vec
    
  rotateWorld: (amount, vec) ->
    rotquat = quat[].setAxisAngle vec, amount
    rotquat.normalize()
    @rotation = rotquat * @rotation
    @invalidate()
    this
  
  pitch: (amount) ->
    axis = @getRight()
    @rotateWorld amount, axis
    
  yaw: (amount) ->
    axis = @getUp()
    #console.log amount, axis
    @rotateWorld amount, axis
  
  roll: (amount) ->
    axis = @getDirection()
    @rotateWorld amount, axis
    
  reorient: (view, pos) ->
    if pos then @setPosition pos
    @setDirection view
    this
    
  lookAt: (point, pos) ->
    if pos then @setPosition pos
    else pos = @getPosition()
    view = @getDirection()
    @setDirection point - pos
  
  
  move: (distance, direction) ->
    direction ?= @getDirection()
    _moveVec = direction.clone()
    @setPosition _moveVec.scale(distance) + @getPosition()
    @invalidate()
    this
  
  
  getTransformationMatrix: ->
    @recalculateMatrices() if @_stale
    @matrices.mv
    
  getInverseTransformationMatrix: ->
    @recalculateMatrices() if @_stale
    @matrices.imv
  
  getNormalMatrix: ->
    @recalculateMatrices() if @_stale
    @matrices.n
    
  pushMatrices: (gl)  ->
    
    gl.matrixStack.push()
    gl.matrixStack.multModelMatrix @getTransformationMatrix()
  
  popMatrices: (gl) ->
    gl.matrixStack.pop()
  
  
  render: (gl, options, sceneObj) ->
  
  update: (gl, options, sceneObj) ->
  

window.ModelGroup = class ModelGroup extends Model
  constructor: (@models, @options) ->
    super @options

  render: (gl, options, sceneObj) ->
    @pushMatrices gl
    modelObj.render gl, options, sceneObj for modelObj in @models
    @popMatrices gl
  update: (gl, options, sceneObj) ->
    modelObj.update gl, options, sceneObj for modelObj in @models
  



window.ModelObject = class ModelObject extends Model
  
  constructor: ( @mesh, @material, @options = {}) ->
    super @options
  
    
  beforeRender: (gl, options, sceneObject) ->
    @pushMatrices gl
    
    
  afterRender: (gl, options, sceneObject) ->
    @popMatrices gl
    
    
  render: (gl, options, sceneObject) -> 
    @beforeRender(gl, options, sceneObject)
    if options.picking? and options.picking
      material = PickingMaterial.get()
    else
      material = @material
    @mesh.render gl, @, material
    @afterRender(gl, options, sceneObject)


  update: (gl, options, sceneObject) ->
  
  
  
  collide: (other) ->
    transform = @getInverseTransformationMatrix() * other.getTransformationMatrix()
    b0 = @getBounds()
    b1 = other.getBounds transform
    
    #console.log @getInverseTransformationMatrix().elements
    
    distance = (b0.center - b1.center).length()
    
    #console.log distance, b0.radius + b1.radius, b0.center.elements, b1.center.elements
    
    if distance < b0.radius + b1.radius
      return true
    false
    
    
  getBounds: (transform = null) ->
    bounds = @mesh.getBounds()
    return bounds if transform is null
    
    bounds.center = transform * bounds.center
    return bounds
    
   
  ###
  rotate: (rad, vec) ->
    @rotation = @rotation @> [rad, vec]
    
  translate: (vec) ->
    @position = @position |> vec
    
  scale: (vec) ->
    @calibration = @calibration ^> vec
  ###