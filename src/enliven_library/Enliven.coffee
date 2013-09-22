window.Enliven = Enliven = {
  sizeofFormat: (glEnum) ->
    switch glEnum
      when gl.ALPHA then return 1;           # alpha component only
      when gl.LUMINANCE then return 1;       # luminance component only
      when gl.RGB then return 3;             # RGB triplet
      when gl.RGBA then return 4;            # all 4 components
      when gl.LUMINANCE_ALPHA then return 2; # luminance/alpha pair
      else
        throw new Error("Unrecognized format: #{glEnum}");
        
  decodePickingColor: (red, green, blue, alpha) ->
    # blue is a key. It is always max. So if it's 1, we're dealing with floats; else, bytes. 
    if blue is 1.0
      red *= 255
      green *= 255
    return red * 256 + green
  
  ShaderSources: {}
}


