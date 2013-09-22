class ShaderVariable
  
  constructor: ->
    @names = []
    @displayNames = []
    @type = null
    @typePublic = false
    @typeGlobal = false
    @typeQualifier = null
    @match = { 0: '', offset: 0 }
    
    
  
window.Shader = class Shader extends Component


  constructor: (@name, @guid) ->
    @ready = false
    @importing = 0
    @guid = @generateGuid() if @guid is undefined
    
    
    @imports = [@name]
    @variables = null
    @globals = []
    #@functions = null

  
  generateGuid: ->
    name = @getPublicMangler()
    hash = 0
    for i in [0..name.length-1]
      c = name.charCodeAt i
      hash = ((hash<<5)-hash)+c
      hash = hash & hash
    'e'+Math.abs(hash)


  getSource:  ->
    if not @ready
      @load()
      @compile()
    @src


  load: ->
    # checks for shader library (shaders defined in the code)
    if Enliven.ShaderSources[@name] isnt undefined
      @src = Enliven.ShaderSources[@name]
      @ready = true
      return true
    
    # looks for element in DOM with the id equalt to the shader name
    element = document.getElementById @name
    if element is not null
      source = ""
      k = element.firstChild
      while k
          if k.nodeType == 3
              source += k.textContent
          k = k.nextSibling
      @src = Enliven.ShaderSources[@name] = source
      @ready = true
      return true
      
    false
  
    # otherwise load by url
    ###
    url = "shaders/#{@name}.glsl"
    xhr = if window.ActiveXObject
            new window.ActiveXObject('Microsoft.XMLHTTP')
          else
            new window.XMLHttpRequest()
    xhr.open 'GET', url, true
    xhr.overrideMimeType 'text/plain' if 'overrideMimeType' of xhr
    xhr.onreadystatechange = =>
      if xhr.readyState is 4
        if xhr.status in [0, 200]
          ShaderSources[@name] = xhr.responseText
          @loaded()
        else
          throw new Error "Could not load #{url}"
    xhr.send null
    ###
  
  ###
  loaded: ->
    @ready = true
    return @compile()
  
  
  imported: (name) ->
    if name isnt undefined
      @importing--;
      console.log name
   ###   
  
  
  compile: (main = true, srcBefore = "", srcAfter = "") ->
    if not @ready
      @load()
      
    @main = null
    @src = @mangle()
    
    @src = srcBefore + @src + srcAfter;
    
    imports = @findImports()
    for importInfo in imports
      @importShader importInfo
    
    @activateMain() if main
    @resolveNames() if main
    @src = @src.replace(/(\n){2,}/g, "\n")
    
    @fireEvent 'ready', {}
    @fireEvent 'changed', {}
    
    
  resolveNames: ->
    for name in @imports
      regexp = new RegExp "(\W)?(#{@getName name})\\.", "gm"
      @src = @src.replace regexp, "$1#{@getPublicMangler name}"
  
  
  findImports: ->
    imports = []
    rx = /import[\s\t\n]*(.+?);/
    src = @src
    while match = rx.exec src
      offsetStart = match.index
      offsetEnd = match.index + match[0].length
      importName = match[1]
      src = src[0...offsetStart] + src[offsetEnd..-1]
      imports.push
        name: importName
        offset: [offsetStart, offsetEnd]
        match: match[0]
    imports
  
  
  findVariables: () ->
    # Need a state machine instead of simple regexp
    variables = []
    src = @src
    STATE_NONE = 0
    STATE_PUBLIC = 1
    STATE_GLOBAL = 2
    STATE_QUALIFIED = 4
    STATE_TYPED = 8
    STATE_COMMENT_SINGLE = 16
    STATE_COMMENT_MULTI  = 32
    
    state = STATE_NONE
    
    processToken = (token) ->
      return if token is ''
      if state is STATE_NONE
        # token could be 'public', a qualifier, or unimportant
        switch token
          when 'public'
            state |= STATE_PUBLIC
            variable.typePublic = true
          when 'global'
            state |= STATE_GLOBAL
            variable.typeGlobal = true
          when 'varying', 'uniform', 'attribute'
            state |= STATE_QUALIFIED
            variable.typeQualifier = token
      else if state & STATE_TYPED
        # token is a variable name
        variable.names or= []
        variable.names.push token.replace(/,/, '')
      else if state & STATE_QUALIFIED
        # token must be a type
        state |= STATE_TYPED
        variable.type = token
      else if state & STATE_PUBLIC or state & STATE_GLOBAL
        # token could be a qualifier, or unimportant
        switch token
          when 'varying', 'uniform', 'attribute'
            state |= STATE_QUALIFIED
            variable.typeQualifier = token
          else
            # it's not a shared variable, but might be a shared function
            # we'll handle functions elsewhere
            state = STATE_NONE
            # throw new Error "Unexpected token: #{token}, expected one of 'varying', 'uniform', 'attributes'. State is: #{state}"
      else throw new Error "Unexpected state: #{state}"
    
    _this = @
    removeGlobals = (names) ->
      verifiedNames = []
      for name in names
        
        defined = false
        for global in _this.globals
          if name in global.names
            defined = true
            break
        
        if not defined
          verifiedNames.push name
      verifiedNames
    
    token = ''
    variable = new ShaderVariable()
    matching = []
    match = { 0: '', offset: 0 }
    
    for ch, offset in src
      match[0] += ch
      # handle comment characters
      if ch is '\n' and state & STATE_COMMENT_SINGLE
        state ^= STATE_COMMENT_SINGLE
        continue
      if match[0].length >= 2 and match[0].indexOf('*/') == match[0].length - 2 and state & STATE_COMMENT_MULTI
        state ^= STATE_COMMENT_MULTI
        continue
      continue if state & STATE_COMMENT_SINGLE or state & STATE_COMMENT_MULTI
      if match[0].length >= 2 and match[0].indexOf('//') == match[0].length - 2
        # remove comment characters from token
        token = token.replace(/\/$/, '')
        state |= STATE_COMMENT_SINGLE
        continue
      if match[0].length >= 2 and match[0].indexOf('/*') == match[0].length - 2
        # remove comment characters from token
        token = token.replace(/\/$/, '')
        state |= STATE_COMMENT_MULTI
        continue
      # handle non-comment characters
      if ch is ';'
        processToken token
        if state & STATE_TYPED
          # vari.match = match for vari in matching
          variable.match = match
          if variable.typeGlobal
            variable.displayNames = removeGlobals variable.names
          else
            variable.displayNames = variable.names
          if variable.names.length > 0
            variables.push variable
            if variable.typeGlobal
              @globals.push variable
            variable = new ShaderVariable()
        state = STATE_NONE
        match = { 0: '', offset: offset }
        token = ''
      else if ch is '\n' or ch is ' ' or ch is '\t'
        processToken token
        if state is STATE_NONE
          match = { 0: '', offset: offset }
        token = ''
      else
        token += ch
    variables
    
    
  findFunctions: ->
    functions = []
    rx = /(public[\s\t\n]+|)(\w+)[\s\t\n]+(\w+)[\s\t\n]*\([\s\t\n]*[\s\t\n]*(.*?)[\s\t\n]*\)[\s\t\n]*{/
    src = @src
    while match = rx.exec src
      offsetStart = match.index
      offsetEnd = match.index + match[0].length
      signature = match[4]
      offsetEnd += @scan(src[offsetEnd..-1], '}', '{').length + 1
      func = src[offsetStart...offsetEnd]
      src = src[0...offsetStart] + src[offsetEnd..-1]
      functions.push
        typePublic: !!match[1]
        signature: signature
        full: func
        type: match[2]
        name: match[3]
    @functions = functions
    
    
  scan: (str, end, incr, decr, startIndex, singleLineComment, multiLineCommentStart, multiLineCommentEnd) ->
    end = end or ')'
    incr = incr or '('
    decr = decr or end
    singleLineComment = singleLineComment or "//"
    multiLineCommentStart = multiLineCommentStart or "/*"
    multiLineCommentEnd   = multiLineCommentEnd   or "*/"
    
    startIndex = startIndex || 0
    
    depth = 0
    result = ""
    inComment = 0
    for i in [startIndex..str.length-1]
      ch = str[i]
      switch(ch)
        when incr
          if not inComment then depth++
        when decr
          if not inComment then depth--
      
      if depth < 0
        break
      result += ch
      
      if result.length >= singleLineComment.length and \
          result.substring(result.length - singleLineComment.length, result.length) is singleLineComment
        inComment = 1
      if inComment is 1 and ch is "\n"
        inComment = 0
      if !inComment and result.length >= multiLineCommentStart.length and \
          result.substring(result.length - multiLineCommentStart.length, result.length) is multiLineCommentStart
        inComment = 2
      if inComment is 2 and result.length >= multiLineCommentEnd.length and \
          result.substring(result.length - multiLineCommentEnd.length, result.length) is multiLineCommentEnd
        inComment = 0
    result
  
  
  getName: (name = @name) ->
    if (pos = name.lastIndexOf ".") isnt -1
      name = name.substr 0, pos
    name
  
  getPublicMangler: (name = @name) ->
    if (pos = name.lastIndexOf ".") isnt -1
      name = name.substr 0, pos
    name = name.replace /\W+/, "_"
    "#{name}_"
  
  
  getMangler: ->
    rand = @guid #Math.floor(Math.random()*90000 + 10000)
    "#{rand}_#{@getPublicMangler()}"
  
  
  mangle: (currentSrc) ->
    src = @src
    
    publicMangler = @getPublicMangler()
    mangler = @getMangler()
    
    # functions
    mangles = @findFunctions()
    mangledNames = {}
    for mangle in mangles
      if mangle.typePublic
        mangledName = publicMangler + mangle.name
      else
        mangledName = mangler + mangle.name
      mangledSignature = mangle.signature.replace mangle.name, mangledName
      mangledFunc = mangle.full.replace mangle.signature, mangledSignature
      mangledFunc = mangledFunc.replace /public[\s\t\n]+/, ''
      #console.log src, mangle.full
      src = src.replace mangle.full, mangledFunc
      
      mangledNames[mangle.name] = mangledName
      
      if mangle.name is "main"
        @main = mangledName

    for own name, mangledName of mangledNames
      while match = new RegExp("(^|\\W)#{name}(\\W|$)").exec src
        src = src.replace match[0], match[1] + mangledName + match[2]
    
    # variables
    @variables = {}
    shaderName = @getName()
    mangles = @findVariables()
    for mangle in mangles
      mangledNames = []
      for name in mangle.displayNames
        if mangle.typeGlobal
          continue if new RegExp("#{name}(,|;)").test currentSrc
          mangledName = name
        else if mangle.typePublic
          mangledName = publicMangler + name
        else
          mangledName = mangler + name
        mangledNames.push mangledName
        if mangle.typeQualifier in ['uniform', 'attribute']
          if mangle.typeGlobal
            variableName = name
          else
            variableName = "#{shaderName}.#{name}"
          @variables[variableName] = 
            label: name
            name: mangledName
            type: mangle.type
            qualifier: mangle.typeQualifier
    
      if mangledNames.length > 0
        mangledNames = mangledNames.join ', '
        variable = [mangle.typeQualifier, mangle.type, mangledNames].join ' '
        variable += ';'
      else
        variable = ""
        
      # stworzyc reference names

      if mangle.typeGlobal
        src = variable + "\n" + src
        variable = ""
      src = src.replace mangle.match[0], variable
      
      # references
      continue if mangle.typeGlobal
      for name in mangle.names
        if mangle.typePublic
          mangledName = publicMangler + name
        else
          mangledName = mangler + name
        while match = new RegExp("(^|\\W)#{name}(\\W|$)").exec src
          src = src.replace match[0], match[1] + mangledName + match[2]
    
    src
  
  
  activateMain: ->
    src = @src
    if @main
      while match = new RegExp("(^|\\W)#{@main}(\\W|$)").exec src
        src = src.replace match[0], match[1] + "main" + match[2]
      @src = src
  
  
  mergeVariables: (shaderSource) ->
    shaderName = shaderSource.getName()
    for own name,variable of shaderSource.variables
      @variables[name] = variable # "#{shaderName}.#{name}"
    @variables
  
  mergeGlobals: (shaderSource) ->
    for global in shaderSource.globals
      @globals.push global if global.name
    @globals
    
  mergeImports: (importedShader) ->
    for imported in importedShader.imports
      if imported not in @imports
        @imports.push imported
    @imports
  
  #map: ->
  #  @mangle() if @variables is null
  #  @variables
  
  importShader: (importInfo) ->
    if importInfo.name in @imports
      # has been already imported
      @src = @src.replace importInfo.match, ''
      return
      
    importedShader = new Shader importInfo.name
    for imported in @imports
      importedShader.imports.push imported
    for global in @globals
      importedShader.globals.push global
    
    posBeforeEnd = @src.search importInfo.match
    posAfterBegin = posBeforeEnd + importInfo.match.length
    importedShader.compile false, @src.substr(0, posBeforeEnd), @src.substr(posAfterBegin)
    @src = importedShader.getSource()

    @mergeImports importedShader
    @mergeVariables importedShader
  
