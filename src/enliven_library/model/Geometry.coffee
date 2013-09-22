window.Geometry = Geometry = {}
class Geometry.Plane
  
  constructor: ->
    @point = vec3[]
    @normal = vec3[]
    @d = 0.0
    @set.apply @, arguments if arguments.length > 0
    
  set: ->
    if arguments.length is 2
      point = arguments[0]
      normal = arguments[1]
      @normal.copyFrom(normal).normalize()
      @d = normal * point
    else if arguments.length is 3
      points = arguments
      tmp1 = points[1] - points[0]
      tmp2 = points[2] - points[0]
      @normal = (tmp1 x tmp2).normalize()
      @d = -(@normal * points[0])
      
    @point = @normal ^> @d
    
    
  intersectRayPoint: (orign, direction) -> 
    denom = @normal * direction
    return false if Math.abs denom < 0.00001 # normal is orthogonal to vector, can't intersect
    t = -(@d + (@normal * orign)) / denom
    return false if t <= 0 # intersect at orign or before
    

    # point = orign + t*direction
    point = orign + (direction * t)
    return point
