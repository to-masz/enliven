shader picking
  """
  global uniform mat4 ModelViewMatrix, ProjectionMatrix;
  global attribute vec3 VertexPosition;
  global uniform float INDEX;
  
  varying vec4 vColor;

  void main(void) {
    gl_Position = ProjectionMatrix * ModelViewMatrix * vec4(VertexPosition, 1.0);
    
    // equivalent to [ int(INDEX/256), INDEX % 256 ] / 255. The last division
    // is necessary to scale to the [0..1] range.
    float d = 1.0 / 255.0;
    float f = floor(INDEX / 256.0);
    vColor = vec4(f * d, (INDEX - 256.0 * f) * d, 1.0, 1.0);
  }
  """
  
  """
  uniform float INDEX;
  varying vec4 vColor;
  
  void main(void) {
    if (INDEX == -1.0) discard;
    gl_FragColor = vColor;
  }
  """