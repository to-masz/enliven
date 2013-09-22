shader light
  """
  global attribute vec3 VertexNormal;
  global uniform mat3 NormalMatrix;
  
  public uniform vec3 AmbientLightColor;

  public uniform vec3 PointLightLocation;
  public uniform vec3 PointLightColor;
  
  public uniform vec3 PointLightSpecularColor;
  public uniform float MaterialShininess;
  
  public varying vec3 LightWeighting;
  public varying vec3 TransformedNormal;
  public varying vec4 Position;
  
  
  public void apply(void) {
    Position = ModelViewMatrix * vec4(VertexPosition, 1.0);
    vec3 lightDirection = normalize(PointLightLocation - Position.xyz);
    TransformedNormal = NormalMatrix  * VertexNormal;
    float directionalLightWeighting = max(dot(TransformedNormal, lightDirection), 0.0);
    LightWeighting = AmbientLightColor + PointLightColor * directionalLightWeighting;
  }
  
  public void applyPerFragment(void) {
    Position = ModelViewMatrix * vec4(VertexPosition, 1.0);
    TransformedNormal = NormalMatrix * VertexNormal;
  }

  void main(void) {
    apply();
  }
  """

  """
  public varying vec3 LightWeighting;
  public varying vec3 TransformedNormal;
  public varying vec4 Position;
  
  public uniform vec3 AmbientLightColor;
  public uniform vec3 PointLightLocation;
  public uniform vec3 PointLightColor;
  
  public uniform vec3 PointLightSpecularColor;
  public uniform float MaterialShininess;
  
  public void apply(void) {
    gl_FragColor = vec4(gl_FragColor.rgb * LightWeighting, gl_FragColor.a);
  }
  
  public void applyPerFragment(void) {
    vec3 lightDirection = normalize(PointLightLocation - Position.xyz);
    vec3 normal = normalize(TransformedNormal);
    float directionalLightWeighting = max(dot(normal, lightDirection), 0.0);
    
    float specularLightWeighting = 0.0;
    if(MaterialShininess > 0.0)
    {
      vec3 eyeDirection = normalize(-Position.xyz);
      vec3 reflectionDirection = reflect(-lightDirection, normal);
      specularLightWeighting = pow(max(dot(reflectionDirection, eyeDirection), 0.0), MaterialShininess);
    }
    
    vec3 fragmentLightWeighting = AmbientLightColor 
        + PointLightColor * directionalLightWeighting
        + PointLightSpecularColor * specularLightWeighting;
    gl_FragColor = vec4(gl_FragColor.rgb * fragmentLightWeighting, gl_FragColor.a);
  }

  void main(void) {
    apply();
  }
  """