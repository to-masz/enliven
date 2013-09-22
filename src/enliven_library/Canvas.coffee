window.Canvas = class Canvas 
  gl = null
  
  
  ###
  Livens up the given canvas element. Gets webgl context or display an error msg.
  Extends context object. Registers events. Sets WebGL constants available from 
  Enliven object. And finally enters into render loop.
  
  @param {DOMElement} element The canvas element
  @param {Object} options The options for the enliving canvas element. The 
    following options are available:
    * failover {string} - The name of the element to be showed whether WebGL context is not available
  
  ###
  constructor: (@element, @options = {}) -> 
    
    # fixes canvas attributes
    @element.width = @element.offsetWidth;
    @element.height = @element.offsetHeight;
    
    for own name,value of @options
      if value is "0" or value is 0 or value is "false"
        @options[name] = false
      else if value is "1" or value is 1 or value is "true"
        @options[name] = true
        
    # gets context
    gl = @getContext()
    if @options.failover?
      failoverInfo = document.getElementById(@options.failover)
      failoverInfo.style.display = "none"
      failoverInfo.className = @element.className
    if not gl?
      failoverInfo.style.display = "block"
      @element.style.display = "none"
      return false
    @gl = gl
    @extendContext gl
    
    # set up constants
    @constants()

    # setups input devices
    @setupInputDevices()
    
    
    ###
    @element.onclick = (e) =>
      position = @getCanvasPosition()
      x = e.clientX - position.left
      y = @element.offsetHeight - (e.clientY - position.top)
      
      vec = @scene.camera.unproject x,y
            
      id = (@pickRegionalIndices x,y,x+1,y+1)
      if id.length > 0
        modelObj = @scene.getModel id[0]

        plane = modelObj.getWorldXYPlane()
        orign = vec[0]
        direction = (vec[1] - vec[0]).normalize()
        point = plane.intersectRayPoint orign, direction
        
        modelObj.setPosition point
    ###
    
    @keys = {}
    @initKeyboardState()
    
    @renderLoop()
    
  
  getCanvasPosition: ->
    obj = @element
    ol = ot = 0
    while obj = obj.offsetParent
      ol += obj.offsetLeft
      ot += obj.offsetTop
    return {
      left: ol
      top: ot
     }


  initInput: ->
    
  
  setupInputDevices: (focusCanvas = true) ->
    if Input?.Mouse
      @mouse    = new Input.Mouse    @element
    #if Input?.Keyboard
    #  @keyboard = new Input.Keyboard @element, focus: focusCanvas
        
        
  extendContext: (gl) ->
    id = @element.id
    if id isnt ""
      window.Enliven[id] = @
    gl.id = id
    gl.canvas = @element
    gl.enliven = @
    gl.viewportWidth = @element.width
    gl.viewportHeight = @element.height
    
    gl.matrixStack = new MatrixStack
    gl.scene = null
    

  constants: ->
    if not Enliven.gl?
      Enliven.gl = @gl
  
  
    

    
  # Gets webgl context of the canvas element
  getContext: ->
    return gl unless gl is null
    if @element.getContext
      try
        gl = @element.getContext 'webgl';
      catch ex
        
      try 
        gl = @element.getContext 'experimental-webgl'
      catch ex 
    gl
  
  
  
  resize: (width, height) ->
    gl.viewport 0, 0, width, height
    gl.viewportWidth = width
    gl.viewportHeight = height
    
    
    
  pickBuffer: null
  
  getPickBuffer: (force = false) ->
    return @pickBuffer if @pickBuffer isnt null and not force
    @pickBuffer = new Framebuffer
      width: @element.width
      height: @element.height
    
  pickRegionalIndices: (x1, y1, x2, y2) ->
    w = Math.abs(x2 - x1)
    h = Math.abs(y2 - y1)

    result = new Array()
    pickBuffer = @getPickBuffer()
    data = new Uint8Array(w*h*4)
    gl = @gl
    
    pickBuffer.bind gl

    pickBuffer.viewport(gl)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.disable(gl.BLEND)
    
    #console.log "picking"
    @render
      picking: yes

    #world.render({material:"picking"});
    # read it back in
    gl.readPixels(x1, y1, w, h, gl.RGBA, gl.UNSIGNED_BYTE, data)
    if data.data then data = data.data

    pickBuffer.unbind gl

    # restore the visible viewport and blending
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.enable(gl.BLEND)
    
    for i in [0..data.length] by 4
      if data[i+2] > 0  # blue key exists, we've found an object
        index = Enliven.decodePickingColor(data[i], data[i+1], data[i+2], data[i+3]);
        if index?
          result.push(index)
    result
    
  pickIndex: (x, y) -> 
    @pickRegionalIndices(x, y, x+1, y+1)[0]  
  
  initKeyboardState: () ->
    document.addEventListener 'keydown', (e) => 
      @keys[e.keyCode] = true
    document.addEventListener 'keyup', (e) => 
      @keys[e.keyCode] = false
    
    
    
    
  render: (options = {}) ->
    @scene?.render @gl, options
  
  update: (options) ->
    @scene?.update @gl, options
    
    
  setScene: (sceneObject) ->
    @removeScene()
    gl.scene = @scene = sceneObject
    @registerListeners()
    @scene.attach gl
    
  removeScene: ->
    if @scene?
      @unregisterListeners()
      @scene.detach gl
    @scene = null
    
    
  registerListeners: ->
    return unless @scene
    if @mouse
      if @scene.mouse_pressed  then @mouse.listen 'press',      (evt) => 
        @scene.mouse_pressed  evt
      if @scene.mouse_released then @mouse.listen 'release',    (evt) =>
        @scene.mouse_released evt
      if @scene.mouse_clicked  then @mouse.listen 'click',      (evt) =>
        @scene.mouse_clicked  evt
      if @scene.mouse_moved    then @mouse.listen 'move',       (evt) =>
        @scene.mouse_moved    evt
      if @scene.mouse_entered  then @mouse.listen 'enter',      (evt) =>
        @scene.mouse_entered  evt
      if @scene.mouse_exited   then @mouse.listen 'exit',       (evt) =>
        @scene.mouse_exited   evt
      if @scene.mouse_dragged  then @mouse.listen 'drag',       (evt) =>
        @scene.mouse_dragged  evt
      if @scene.mouse_rolled   then @mouse.listen 'wheel',      (evt) =>
        @scene.mouse_rolled   evt
      if @scene.mouse_over     then @mouse.listen 'over',       (evt) =>
        @scene.mouse_over     evt
    if @keyboard
      if @scene.key_pressed    then @keyboard.listen 'press',   (evt) =>
        @scene.key_pressed    evt
      if @scene.key_released   then @keyboard.listen 'release', (evt) =>
        @scene.key_released   evt
      if @scene.key_typed      then @keyboard.listen 'type',    (evt) =>
        @scene.key_typed      evt
    true
    
  unregisterListeners: ->
    @mouse.stopListening()    if @mouse
    @keyboard.stopListening() if @keyboard
     
     
     
  renderLoop: ->
    startTime = null

    lastTimeStamp = startTime
    lastFpsTimeStamp = startTime
    framesPerSecond = 0
    frameCount = 0

    nextFrame = (time) =>
      startTime = time if startTime is null
      window.requestAnimationFrame nextFrame, @element

      if (time - lastFpsTimeStamp) >= 1000
        framesPerSecond = frameCount
        frameCount = 0
        lastFpsTimeStamp = time

      @update
        startTime: startTime,
        timeStamp: time,
        elapsed: time - startTime,
        frameTime: time - lastTimeStamp,
        framesPerSecond: framesPerSecond,
        
      @render()

      ++frameCount
      lastTimeStamp = time

    window.requestAnimationFrame nextFrame, @element
    


window.Scene = class Scene extends Component
     
  constructor: ->
    @models = []
    @lights = {}
    @modelLabels = {}
    @mvMatrixStack = []  
    @options = 
      near: 0.1
      far: 100.0
    
    @mvMatrix = mat4[]
    @pMatrix = mat4[]
    
    @camera = new Camera
    
    @init()
    
  init: ->
    
    

  pushMvMatrix: ->
    copy = @mvMatrix.clone()
    @mvMatrixStack.push(copy)
    @mvMatrix
    
    
  popMvMatrix: ->
    if @mvMatrixStack.length is 0
        throw "Invalid popMatrix!"
    @mvMatrix = @mvMatrixStack.pop()
  
  
  
  attach: (gl, canvas) ->
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
  
  
  dettach: (gl, canvas) ->
  
  
  addLight: (name, light) ->
    @lights[name] = light
    
  getLight: (name) ->
    @lights[name]
    
  removeLight: (name) ->
    @lights[name] = undefined
  
  
  addModel: (modelObject, name = null) ->
    @models[modelObject.id] = modelObject
    if name isnt null
      @modelLabels[name] = modelObject
  
  
  
  removeModel: (id) ->
    return false if id not in @models
    delete @models[id]
    return true
  
  
  
  getModelId: (name) ->
    @modelLabels[name] ? null
    
    
  getModel: (name) ->
    if name instanceof String 
      id = getModelId name
    else
      id = name
    return @models[id] if id of @models
    return null
    
    
    
  getModels: () -> 
    @models
    
    
    
  setCamera: (@camera) ->
    
  
  getPMatrix: (gl) ->
    if @camera isnt null 
      @camera.getProjectionMatrix()
    else
      mat4[].setPerspective(45, gl.viewportWidth / gl.viewportHeight, @options.near, @options.far)
  
  ###
  Reloads and resets the matrix stack. Meant to be called
  each frame, prior to rendering the scene. This is called
  by #render automatically. Returns the stack itself.
  ###
  reloadMatrices: (gl) ->
    matrixStack = gl.matrixStack
    camera = @camera
    
    matrixStack.reset() # reset depth
    matrixStack.loadModelMatrix (mat4[].setIdentity())
    # we use the inverse xform to go from WORLD to LOCAL instead of the opposite.
    matrixStack.loadViewMatrix camera.getInverseTransformationMatrix()
    matrixStack.loadProjectionMatrix camera.getProjectionMatrix()
    matrixStack
  
  
  prepare: (gl, options) ->
    @reloadMatrices gl
    
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
  
  render: (gl, options) ->
  
    @prepare gl, options
    
    @pMatrix = gl.matrixStack.getProjectionMatrix()
    @mvMatrix = gl.matrixStack.getModelViewMatrix()
    
    #@mvMatrix = @mvMatrix |> vec3[0, 0.0, -7.0]
    
    for own i,modelObj of @getModels()
      modelObj.render gl, options, @
  
  
  update: (gl, options) ->
    for own i,modelObj of @getModels()
      modelObj.update(gl, options, @)
      
      


# window.requestAnimationFrame standarization for different browsers
if not window.requestAnimationFrame
  window.requestAnimationFrame = (->
      return  window.webkitRequestAnimationFrame or
              window.mozRequestAnimationFrame    or 
              window.oRequestAnimationFrame      or 
              window.msRequestAnimationFrame     or 
              (callback, element) ->
                window.setTimeout ->
                    callback new Date().getTime()
                , 1000 / 60

  )();
  
  
class MatrixStack
  constructor: ->
    @maxDepth = 0
    @matrices =
      model:        [mat4[]]
      view:         [mat4[]]
      modelView:    [mat4[]]
      projection:   [mat4[]]
    @valid =
      modelView: [true]
    @reset()
    
  reset: ->
    @depth = 0;
    
  push: ->
    @depth++
    if @depth > @maxDepth
      for own type, stack of @matrices
        while stack.length <= @depth
          stack.push stack[stack.length-1].clone()
      for own type, stack of @valid
        while stack.length <= @depth
          stack.push stack[stack.length-1]
      @maxDepth = @depth
    @loadModelMatrix      @matrices.model[@depth-1]
    @loadViewMatrix       @matrices.view[@depth-1]
    @loadProjectionMatrix @matrices.projection[@depth-1]
  
  pop: ->
    @depth-- if @depth > 0
  
  
  ###
  Replaces the current model matrix with the specified one.
  Updates the inverse model matrix, the modelview matrix, the inverse modelview matrix and the
  normal matrix.
  ###
  loadModelMatrix: (other) ->
    @valid.modelView[@depth] = false
    other.copyTo @getModelMatrix()
    
  ###
  Replaces the current view matrix with the specified one.
  Updates the inverse view matrix, the modelview matrix, the inverse modelview matrix and the
  normal matrix.
  ###
  loadViewMatrix: (other) ->
    @valid.modelView[@depth] = false
    other.copyTo @getViewMatrix()
    
  ###
  Replaces the current projection matrix with the specified one.
  Updates the inverse projection matrix.
  ###
  loadProjectionMatrix: (other) ->
    other.copyTo @getProjectionMatrix()
    
  multModelMatrix: (other) ->
    @valid.modelView[@depth] = false
    @getModelMatrix().multiplyBy other
    
    
  ###
  The local model transformation matrix. Most models will manipulate this matrix.
  Multiplying an object-space coordinate by this matrix will result in a world-space coordinate.
  ###
  getModelMatrix: ->
    @matrices.model[@depth]
    
  ###
  AKA the camera matrix. Multiplying a point in world space against the view matrix
  results in a point in eye space (e.g. relative to the eye, with the eye at the origin).
  ###
  getViewMatrix: ->
    @matrices.view[@depth]
  
  ###
  AKA the screen matrix. Multiplying a point in eye space against the projection matrix results in a 4D
  vector in clip space. Dividing clip coordinates (XYZ) by the 4th component (W) yields a 3D vector in
  normalized device coordinates, where all components are in the range [-1,1]. These points are ultimately
  multiplied by screen dimensions to find a pixel position.
  ###
  getProjectionMatrix: ->
    @matrices.projection[@depth]
    
  ###
  A combination of both model and view
  matrices, equivalent to mat4.multiply(view, model).
  
  Multiplying a point in object space by this matrix will effectively skip the world space transformation,
  resulting in a coordinate placed directly into eye space. This has the obvious advantage of being faster
  than performing the operation in two steps (model and then view).
  ###
  getModelViewMatrix: ->
    if @valid.modelView[@depth]
      return @matrices.modelView[@depth]
    else
      @valid.modelView[@depth] = true
      @matrices.modelView[@depth] = @getViewMatrix() * @getModelMatrix()
     
      


# Initialize canvases with enliven attribute
livenUp = ->
  canvasElements = window.document.getElementsByTagName 'canvas'
  for element in canvasElements
    if element.getAttribute("data-enliven") is "true"
      options = {}
      for i in [0..element.attributes.length-1]
        if element.attributes[i].nodeName.indexOf("data-") is 0
          options[element.attributes[i].nodeName.substr 5] = element.attributes[i].nodeValue
      element.enliven = new Canvas element, options if options.enliven
  event = new CustomEvent 'enliven'
  this.dispatchEvent event
  
# Listen for window load, both in decent browsers and in IE
if window.addEventListener
  window.addEventListener 'DOMContentLoaded', livenUp, no
else
  window.attachEvent 'onload', livenUp
if document.readyState is 'complete'
  livenUp()
  