shader color
  """
  global attribute vec4 VertexColor;
  
  public varying vec4 vColor;
  
  public void apply(void) {
    vColor = VertexColor;
  }

  void main(void) {
    apply();
  }
  """

  """
  public varying vec4 vColor;

  public void apply(void) {
      gl_FragColor = vColor;
  }

  void main(void) {
    apply();
  }
  """