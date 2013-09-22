window.Camera = class Camera
 
  
  constructor: ->
    @_isValid = false
    @matrices =
      mv:  mat4[].setIdentity()
      imv: mat4[].setIdentity()
      p:   mat4[].setIdentity()
      n:   mat3[].setIdentity()
    @position = vec3[0,0,-10]
    @center   = vec3[0,0,0]
    @up       = vec3[0,1,0]       
    
  
  invalidate: ->
    @_isValid = false
    
  isValid: -> @_isValid
    
  recalculateMatrices: ->
    @_isValid = true
    @matrices.mv = mat4[].setIdentity()
    @matrices.p = mat4[].setIdentity()
    
    #projection type
    switch @projection?.type
      when 'orthographic'
        @matrices.p = @matrices.p *  mat4[].setOrtho(@projection.left, @projection.right, @projection.bottom, @projection.top, @projection.near, @projection.far)
      when 'perspective'
        aspectRatio = @projection.width / @projection.height
        @matrices.p = @matrices.p * mat4[].setPerspective(@projection.fov, aspectRatio, @projection.near, @projection.far)
    
    #look at
    @matrices.p = @matrices.p * mat4[].setLookAt(@position, @center, @up)
    
    @matrices.imv = @matrices.mv.getInverted()
    @matrices.n = mat3[].fromMat4 @matrices.imv
    @matrices.n = @matrices.n.transpose()
    
  setPosition: (@position) ->
  setCenter: (@center) ->
  setUp: (@up) ->
    
  ortho: (options) ->
    options.left or= -1
    options.right or= 1
    options.top or= 1
    options.bottom or= -1
    options.far or= 200
    options.near or= 0.1
    
    @projection =
      width: options.right - options.left
      height: options.top - options.bottom
      depth: options.far - options.near
      left: options.left
      right: options.right
      top: options.top
      bottom: options.bottom
      near: options.near
      far: options.far
      type: 'orthographic'
    
    @invalidate()
    
  perspective: (options) ->
    options or= {}
    throw new Error "Expected a screen width" unless options.width
    throw new Error "Expected a screen height" unless options.height
    options.fov or= 0.785398 # 45 degrees in radians
    options.near or= 0.1
    options.far or= 200
    aspectRatio = options.width / options.height
    
    @projection =
      width: options.width
      height: options.height
      near: options.near
      far: options.far
      fov: options.fov
      type: 'perspective'
      
    @invalidate()
  
   getTransformationMatrix: ->
    @recalculateMatrices() unless @_isValid
    @matrices.mv
    
  getInverseTransformationMatrix: ->
    @recalculateMatrices() unless @_isValid
    @matrices.imv
  
  getNormalMatrix: ->
    @recalculateMatrices() unless @_isValid
    @matrices.n
    
  getProjectionMatrix: ->
    @recalculateMatrices() unless @_isValid
    @matrices.p
      
  unproject: (winx, winy, winz) ->
    # winz is either 0 (near plane), 1 (far plane) or somewhere in between.
    # if it's not given a value we'll produce coords for both.
    if winz isnt undefined
      mm = @getTransformationMatrix()
      pm = @getProjectionMatrix()
      viewport = [0, 0, @projection.width, @projection.height]
      
      # calculation for inverting a matrix, computing projection x modelview
      # then compute the inverse
      #m = mm.getInverted() # WHY do I have to invert first?
      
      m = pm * mm
      m2 = m.clone()
      return null unless m.invert()
      
      #console.log (m * vec3[
      
      # Transformation of normalized coordinates between -1 and 1
      inVec = vec4[
          (winx - viewport[0]) / viewport[2] * 2 - 1
          (winy - viewport[1]) / viewport[3] * 2 - 1
          2 * winz - 1
          1
        ]
        
      
      # Objects coordinates
      out = vec4[].transformMat4 inVec, m
      return null if out.e(3) is 0
      
      out.e(3, 1 / out.e(3))
      result = vec3 [
          out.e(0) * out.e(3)
          out.e(1) * out.e(3)
          out.e(2) * out.e(3)
        ]
      return result
    else
      return [@unproject(winx, winy, 0), @unproject(winx, winy, 1)]