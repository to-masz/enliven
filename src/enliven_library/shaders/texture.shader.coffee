shader texture
  """
  global attribute vec2 VertexTextureCoord;
  
  public varying vec2 vTextureCoord;
  
  public void apply(void) {
    vTextureCoord = VertexTextureCoord;
  }

  void main(void) {
    apply();
  }
  """

  """
  public varying vec2 vTextureCoord;
  public uniform sampler2D TextureSampler;
  
  public void apply(void) {
      gl_FragColor = texture2D(TextureSampler, vec2(vTextureCoord.s, vTextureCoord.t));;
  }

  void main(void) {
    apply();
  }
  """