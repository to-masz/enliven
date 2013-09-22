window.Framebuffer = class Framebuffer extends Component
  
  options:
    width: 512
    height: 512
    
  
  constructor: (options) ->
    @options[name] = value for own name, value of options
    
  init: (gl) ->
    handle = gl.createFramebuffer()
    gl.bindFramebuffer gl.FRAMEBUFFER, handle
    
    @setHandle gl, handle
    
    handle.renderbuffer = gl.createRenderbuffer()
    gl.bindRenderbuffer(gl.RENDERBUFFER, handle.renderbuffer)
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, @options.width, @options.height)
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, handle.renderbuffer)
    gl.bindRenderbuffer(gl.RENDERBUFFER, null)
    
    @options.colors ?= [gl.RGBA]
    
    # texture attachments
    handle.textures = []
    attachment = gl.COLOR_ATTACHMENT0;
    for own i,format of @options.colors
      texture_options =
        format: format
        width: @options.width
        height: @options.height
        min_filter: gl.LINEAR_MIPMAP_NEAREST
        mag_filter: gl.LINEAR
        wrap_s: gl.CLAMP_TO_EDGE
        wrap_t: gl.CLAMP_TO_EDGE
        generate_mipmap: no
        
      handle.textures[i] = new Texture null, texture_options
      gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, handle.textures[i].getHandle(gl), 0)
      attachment++
    
    @checkStatus gl
  


  checkStatus: (gl) ->
    status = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
    @unbind(gl)
    switch status
      when gl.FRAMEBUFFER_COMPLETE
        return
      when gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT
        throw new Error("Framebuffer: one or more attachments is incomplete. (gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT)");
      when gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT
        throw new Error("Framebuffer: there are no images attached to the framebuffer. (gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT)");
      when gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS
        throw new Error("Framebuffer: all attachments must have the same dimensions. (gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS)");
      when gl.FRAMEBUFFER_UNSUPPORTED
        throw new Error("Framebuffer: the requested framebuffer layout is unsupported on this hardware. (gl.FRAMEBUFFER_UNSUPPORTED)");
      #when (getGlobal()['gl.FRAMEBUFFER_INCOMPLETE_DRAW_BUFFER'] || 0x8cdb)
      when 0x8cdb
        # a cryptic error that is not in the WebGL spec. Took me way too long to figure this out and I'm still not
        # sure why it happens...
        # but it seems to crop up primarily when no textures are attached.
        # from opengl (not webgl) spec: The value of FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE_EXT must not be NONE for any
        # color attachment point(s) named by DRAW_BUFFER.
        throw new Error("Framebuffer: make sure the framebuffer has at least 1 texture attachment. (gl.FRAMEBUFFER_INCOMPLETE_DRAW_BUFFER)");
      else
        #for (which in gl.gl)
        #  if (gl.gl[which] == status)
        #    throw new Error("Framebuffer: an unknown error occurred. ("+status+" - "+which+")");
        throw new Error("Framebuffer: an unknown error occurred. ("+status+")");
  

  viewport: (gl) ->
    gl.viewport(0,0,@options.width,@options.height)

    
    
  bind: (gl, callback) ->
    handle = @getHandle gl
    if handle is null
      @init gl
      handle = @getHandle gl
      
    gl.bindFramebuffer gl.FRAMEBUFFER, handle

    if callback
      callback.call @
      @unbind gl
    
    
  unbind: (gl) ->            
    gl.bindFramebuffer gl.FRAMEBUFFER, null