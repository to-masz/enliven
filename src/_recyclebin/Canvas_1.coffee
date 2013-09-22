

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


# Initialize canvases with enliven attribute
livenUp = ->
  canvasElements = window.document.getElementsByTagName 'canvas'
  element.enliven = new Canvas element for element in canvasElements when element.getAttribute("data-enliven") is "true"
  
# Listen for window load, both in decent browsers and in IE
if window.addEventListener
  window.addEventListener 'DOMContentLoaded', livenUp, no
else
  window.attachEvent 'onload', livenUp
if document.readyState is 'complete'
  livenUp()
  
  
window.Canvas = class Canvas 
  gl = null
  
  constructor: (@element) -> 
    
    # fixes canvas attributes
    @element.width = @element.offsetWidth;
    @element.height = @element.offsetHeight;
    
    # gets context
    gl = @gl = @getContext()
    gl.canvas = @element
    gl.viewportWidth = @element.width
    gl.viewportHeight = @element.height
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    
    # saves reference in global object
    gl.id = id = @element.id
    if id isnt ""
      window.Enliven[id] = @
  
    @element.onclick = (e) =>
      position = @getCanvasPosition()
      x = e.clientX - position.left
      y = @element.offsetHeight - (e.clientY - position.top)
      
      console.log (@pickRegionalIndices x,y,x+1,y+1)
      
    @keys = {}
    @initKeyboardState()

    @renderLoop()
  

  
  
  getCanvasPosition: ->
    _x = 0
    _y = 0
    el = @element
    while el and !isNaN( el.offsetLeft ) and !isNaN( el.offsetTop ) 
      _x += el.offsetLeft - el.scrollLeft
      _y += el.offsetTop - el.scrollTop
      el = el.offsetParent
    return {
      top: _y
      left: _x
    }
    

    
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
    
    console.log data
    
    for i in [0..data.length] by 4
      if data[i+2] > 0  # blue key exists, we've found an object
        index = Enliven.decodePickingColor(data[i], data[i+1], data[i+2], data[i+3]);
        if index?
          result.push(index)
    result
    
    
  
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
    @scene = sceneObject
    @scene.attach @, gl
    
    
    
  removeScene: ->
    @scene?.detach @, gl
    @scene = null
     
     
     
  renderLoop: ->
    startTime = window.webkitAnimationStartTime or 
      window.mozAnimationStartTime or
      new Date().getTime()

    lastTimeStamp = startTime
    lastFpsTimeStamp = startTime
    framesPerSecond = 0
    frameCount = 0

    nextFrame = (time) =>
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
    


window.Scene = class Scene
  
  lights: []
  
  
   
  mvMatrixStack: []  
  

  camera: null


  constructor: ->
    @models = []
    @options = 
      near: 0.1
      far: 100.0
    
    @mvMatrix = mat4[]
    @pMatrix = mat4[]
    
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
  
  
  
  dettach: (gl, canvas) ->
  
  
  
  addModel: (modelObject) ->
    console.log modelObject.id
    @models[modelObject.id] = modelObject
  
  
  
  removeModel: (id) ->
    return false if id not in @models
    delete @models[id]
    return true
    
    
    
  getModel: (name) ->
    return @models[name] if name in @models
    return null
    
  getModels: () -> 
    @models
    
    
    
  setCamera: (@camera) ->
  
  
  
  render: (gl, options) ->
  
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    @pMatrix.setPerspective(45, gl.viewportWidth / gl.viewportHeight, @options.near, @options.far);
    if @camera isnt null
      @pMatrix = @pMatrix * @camera.getMatrix();
    @mvMatrix.setIdentity()
    
    @mvMatrix = @mvMatrix |> vec3[0, 0.0, -7.0]
    
    for modelObj in @getModels()
      modelObj.render gl, options, @
      
  update: (gl, options) ->
    for modelObj in @getModels()
      modelObj.update(gl, options, @)
      