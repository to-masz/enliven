#Function::define = (prop, desc) ->
#  Object.defineProperty this.prototype, prop, desc


window.BaseMatrix = class BaseMatrix extends Object
  elements: null
  
  
  
  constructor: (@typeName, @elements = []) ->
    @type = glMatrix[@typeName]
    
  E = (matrix) ->
    if matrix instanceof BaseMatrix
      return matrix.elements
    else
      matrix
      
  E: (matrix) ->
    E matrix
    
  e: (i, value) ->
    if value?
      @elements[i] = value
    @elements[i]
  
  
  operators: (operator, object) ->
    if object instanceof BaseMatrix
      out = []
      clone = @.clone()
      switch operator
        
        # multiplication
        when '*'
          return clone.multiply(object)

        # addition
        when '+' 
          return clone.add(object)
      
        # subtraction
        when '-' 
          return clone.subtract(object)
          
        # translation
        when '|>'
          return clone.translate(object)
          
          
    else if operator is '^>' and object instanceof Vector
      out = []
      @type.scale(out, @elements, object)
    else if operator is '@>' and object.length is 2 and object[1] instanceof BaseMatrix
      out = []
      @type.rotate out, @elements, object[0], object[1].elements
      return new BaseMatrix @typeName, out
    else
      super(operator, object)
       
  
  multiply: (a) ->
    @type.multiply(@elements, @elements, @E(a))
    @
    
  add: (x) ->
    @type.add(@elements, @elements, @E(x))
    @
   
  subtract: (x) ->
    @type.subtract(@elements, @elements, @E(x))
    @
          
  translate: (a) ->
    @type.translate(@elements, @elements, @E(a))
    @
       
  setIdentity: ->
    @type.identity @elements
    @
       
       
  setPerspective: (fovy, aspect, near, far) ->
    @type.perspective @elements, fovy, aspect, near, far
    @
  
  
  setOrtho: (out, left, right, bottom, top, near, far) ->
    @type.ortho @elements, out, left, right, bottom, top, near, far
    @   
       
       
  setLookAt: (eye, center, up) ->
    @type.lookAt @elements, eye.elements, center.elements, up.elements
    @
  
  
  
  clone: ->
    return new @.constructor(@elements.slice())
    
  copyTo: (mat) ->
    mat.elements = @elements.slice()
    mat.typeName = @typeName
    
  copyFrom: (m) ->
    @elements = m.elements.slice()
    @typeName = m.typeName
    @
    
  fromMat4: (matrix) ->
    @type.fromMat4(@elements, E(matrix))
    @
    
  transpose: ->
    @type.transpose(@elements, @elements)
    @
    
  normalize: ->
    @type.normalize(@elements, @elements)
    @
    
  negate: ->
    @type.negate(@elements, @elements)
    @
    
  cross: (a,b) ->
    console.log "dupa B"
    clone = @clone()
    @type.cross(clone.elements, E(a), E(b))
    clone
    
  
    
  rotationTo: (a,b) ->
    @type.rotationTo(@elements, E(a), E(b))
    @
    
  getInverted: ->
    clone = @clone()
    @type.invert(clone.elements, @elements)
    return clone
    
  invert: ->
    @type.invert(@elements, @elements)
    @
  
  #quat
  transformQuat: (a,q) ->
    @type.transformQuat(@elements, @E(a), @E(q))
    @
    
  #quat
  setAxisAngle: (axis, rad) ->
    @type.setAxisAngle @elements, @E(axis), rad
    @
    
  scale: (k) ->
    @type.scale @elements, @elements, k
    @
    
  multiplyBy: (a) ->
    @type.multiply @elements, @elements, @E(a)
    @
    
  toString: ->
    return "#{@typeName}: #{@elements}"
			

window.Matrix = class Matrix extends BaseMatrix

  operators: (operator, object) ->
    if object instanceof Vec3 and operator is '*'
      return @multiplyVec3 object
    super operator, object
  
  
  multiplyVec3: (v) ->
    out = []
    v = @E v
    m = @elements
    if @ instanceof Mat4
      out[0] = m[0]*v[0] + m[4]*v[1] + m[8]*v[2]  + m[12]
      out[1] = m[1]*v[0] + m[5]*v[1] + m[9]*v[2]  + m[13]
      out[2] = m[2]*v[0] + m[6]*v[1] + m[10]*v[2] + m[14]
    return new Vec3 out
      
  fromRotationTranslation: (q, v) ->
    
    @type.fromRotationTranslation @elements, @E(q), @E(v)
    @
    
  toMat3: ->
    @elements = [
      @elements[0]
      @elements[1]
      @elements[2]
      @elements[4]
      @elements[5]
      @elements[6]
      @elements[8]
      @elements[9]
      @elements[10]
    ]
    @type = glMatrix['mat3']
    @
    

window.Vector = class Vector extends BaseMatrix
  
  operators: (operator, object) ->
    if object instanceof Vector
      switch operator
        when '*'
          return @dot @elements, object
        when 'x'
          return @cross @elements, object
    
    if typeof object is 'number'
      clone = @.clone()
      switch operator
        when '^>'
          clone.scale object
          return clone
        when '*'
          clone.scale object
          return clone
    
    return super(operator, object)
          
        
  transformMat4: (a, m) ->
    @type.transformMat4 @elements, @E(a), @E(m)
    @
    
  dot: (a,b) ->
    return @type.dot @E(a), @E(b)
    
  distance: (a,b) ->
    return @type.distance @E(a), @E(b)
    
  length: ->
    return @type.length @elements
    

window.Quatenion = class Quatenion extends BaseMatrix
  
  

window.Mat2 = class Mat2 extends Matrix
  constructor: (elements) ->
    super "mat2", elements

window.Mat3 = class Mat3 extends Matrix
  constructor: (elements) ->
    super "mat3", elements

window.Mat4 = class Mat4 extends Matrix
  constructor: (elements) ->
    super "mat4", elements

window.Vec2 = class Vec2 extends Vector
  constructor: (elements) ->
    super "vec2", elements

window.Vec3 = class Vec3 extends Vector
  constructor: (elements) ->
    super "vec3", elements
  
window.Vec4 = class Vec4 extends Vector
  constructor: (elements) ->
    super "vec4", elements

window.Quat = class Quat extends Quatenion
  constructor: (elements) ->
    super "quat", elements
