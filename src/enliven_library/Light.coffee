window.Light = class Light

  @TYPE_POINT: 2
  @TYPE_GLOBAL: 1

  constructor: (@type, @properties = {}) ->
    @properties.position ?= vec3[0,0,0]
    @properties.ambient ?= vec3[0.8,0.8,0.8]
    @properties.difuse ?= vec3[0.8,0.8,0.8]
    @properties.specular ?= vec3[0.8,0.8,0.8]
    @properties.spotDirection ?= vec3[0,0,0]
    @properties.spotCutoff ?= Math.Pi
  