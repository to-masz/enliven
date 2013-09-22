// Generated by CoffeeScript 1.6.2
(function() {
  window.Enliven.ShaderSources["picking.vertex"] = "global uniform mat4 ModelViewMatrix, ProjectionMatrix;\nglobal attribute vec3 VertexPosition;\nglobal uniform float INDEX;\n\nvarying vec4 vColor;\n\nvoid main(void) {\n  gl_Position = ProjectionMatrix * ModelViewMatrix * vec4(VertexPosition, 1.0);\n  \n  // equivalent to [ int(INDEX/256), INDEX % 256 ] / 255. The last division\n  // is necessary to scale to the [0..1] range.\n  float d = 1.0 / 255.0;\n  float f = floor(INDEX / 256.0);\n  vColor = vec4(f * d, (INDEX - 256.0 * f) * d, 1.0, 1.0);\n}";window.Enliven.ShaderSources["picking.fragment"] = "uniform float INDEX;\nvarying vec4 vColor;\n\nvoid main(void) {\n  if (INDEX == -1.0) discard;\n  gl_FragColor = vColor;\n}";

}).call(this);