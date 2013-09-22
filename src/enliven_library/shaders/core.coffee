shader core
  """
  global uniform mat4 ModelViewMatrix, ProjectionMatrix;
  global attribute vec3 VertexPosition;
  
  public void apply(void) {
    gl_Position = ProjectionMatrix * ModelViewMatrix * vec4(VertexPosition, 1.0);
  }

  void main(void) {
    apply();
  }
  """

  """
  global uniform vec4 Color;

  public void apply(void) {
      gl_FragColor = Color;
  }

  void main(void) {
    apply();
  }
  """