###
  Input imported from Jax Framework
###

window.Input = class Input extends Component
  
  constructor: (@receiver, @options = {}) ->
    @_listeners = {}
    @receiver.getEventListeners = (type) => @getReceiverEventListeners type
    
  getReceiverEventListeners: (type) -> @_listeners[type] or= []

  isListening: (type) -> !!@getReceiverEventListeners(type).length
  
  ###
  Subclasses can override this method if they need to maintain themselves
  over time. The default implementation does nothing. Timechange is in 
  seconds.
  ###
  update: (timechange) ->
    
  ###
  Manually triggers an event on the underlying receiver. This is mostly
  used for testing. Subclasses must override this method; the default
  implementation just raises an error.
  ###  
  trigger: (type, event) ->
    throw new Error "#{@__proto__.constructor.name} can't trigger event type #{type}: not implemented"
    
  ###
  Explicitly process a given event object. This is normally invoked by
  an event listener added to the underlying receiver.
  ###
  processEvent: (eventType, evt) ->
    for listener in @getReceiverEventListeners eventType
      listener.call(this, evt)
    true
      
  ###
  Convenience method that just registers the specified event listener with
  the input receiver. Ensures that the specific callback is only ever
  registered once.
  ###
  attach: (eventType, callback) ->
    listeners = @getReceiverEventListeners(eventType)
    unless listeners.interface
      listeners.interface = (evt) => 
        evt.preventDefault()
        @processEvent eventType, evt
      @receiver.addEventListener eventType, listeners.interface
    listeners.push callback unless callback in listeners
    
  ###
  Removes all event listeners from the input receiver.
  ###
  stopListening: ->
    for type of @_listeners
      listeners = @getReceiverEventListeners type
      if listeners.interface
        @receiver.removeEventListener type, listeners.interface
        listeners.length = 0
        delete listeners.interface
    @removeAllEventListeners()

  ###
  Starts listening for a specific event type. The callback is optional and
  if specified, will be fired every time this input device fires the specified
  event type.
  ###
  listen: (type, callback) ->
    if this[type]
      if domTypes = @__proto__.constructor.eventTypes?[type]
        for eventType in domTypes.split /,/
          @attach eventType.trim(), this[type]
          @addEventListener type, callback if callback
        true
      else
        throw new Error "BUG: Method `#{type}` exists but no corresponding DOM event type associated"
    else throw new Error "Invalid #{@__proto__.constructor.name} input type: #{type}"
    
    
class Input.Mouse extends Input
  @eventTypes:
    press:   'mousedown'
    release: 'mouseup'
    move:    'mousemove'
    over:    'mouseover'
    wheel:   'mousewheel, DOMMouseScroll'
    exit:    'mouseout'
    
  ###
  Click speed, in seconds. The lower this number, the faster the
  mouse must be pressed and released in order to result in a single click.
  Defaults to 0.25.
  ###
  getClickSpeed: -> @_clickSpeed or= 0.25
  setClickSpeed: (speed) -> @_clickSpeed = speed
  
  constructor: (element) ->
    super element
    @_pendingClicks = {}
    @_clickCount = {}
    @_buttonState = {}
  
  ###
  Programmatically triggers an event. Note that because Jax uses
  `addEventListener`, you can't trigger events using jQuery. Instead,
  you have to either trigger events through the DOM methods, or use this 
  method.
  ###
  trigger: (type, evt = {}) ->
    if type is 'click'
      @trigger 'mousedown', evt
      @trigger 'mouseup',   evt
      return
    event = document.createEvent 'MouseEvents'
    event.initMouseEvent type, true,               \ # type, bubbles, 
                         true,                     \ # cancelable,
                         window,                   \ # windowObject
                         1,                        \ # detail
                         evt.screenX, evt.screenY, \ # screenX, screenY
                         evt.clientX, evt.clientY, \ # clientX, clientY
                         false, false,             \ # ctrlKey, altKey
                         false, false,             \ # shiftKey, metaKey
                         evt.button, null            # button, relatedTarget
    @receiver.dispatchEvent event
    
  processEvent: (type, evt) ->
    evt = @normalizeEvent evt
    super type, evt
    
  ###
  Preprocesses the mouse event, adding the following attributes:
  
  * `x`: the X coordinate of the mouse event, relative to the
         @receiver element, in pixels, scaled from the element's
         actual size to the size of the element's render buffer.
  * `y`: the Y coordinate of the mouse event, relative to the
         @receiver element, in pixels, scaled from the element's
         actual size to the size of the element's render buffer.
  * `diffx`: the change in `x` between the last event and this
  * `diffy`: the change in `y` between the last event and this
  
  Returns the normalized event.
  ###
  normalizeEvent: (evt) ->
    rect = @receiver.getBoundingClientRect()
    root = document.documentElement
    evt =
      base: evt
      button: evt.button
      x: evt.clientX - rect.left
      y: rect.height - (evt.clientY - rect.top)
      wheelDeltaX: evt.wheelDeltaX || 0
      wheelDeltaY: evt.wheelDeltaY || -evt.detail
      wheelDeltaZ: evt.wheelDeltaZ || 0
      wheelDelta:  evt.wheelDelta  || 1
    evt.x *= @receiver.width / rect.width
    evt.y *= @receiver.height/ rect.height
    if @_lastx is undefined
      evt.diffx = evt.diffy = 0
    else
      [evt.diffx, evt.diffy] = [evt.x - @_lastx, evt.y - @_lasty]
    [@_lastx, @_lasty] = [evt.x, evt.y]
    evt
    
  
  update: (timechange) ->
    for button of @_pendingClicks
      @_pendingClicks[button] += timechange
      if @_pendingClicks[button] >= @getClickSpeed()
        @clearClick button
    true
    
  logClickStart: (button) ->
    @_pendingClicks[button] = 0
    @_clickCount[button] = (@_clickCount[button] || 0) + 1
    
  clearClick: (button) ->
    delete @_pendingClicks[button]
    delete @_clickCount[button]
  
  listen: (type, callback) ->
    switch type
      when 'enter'
        super 'over'
        super 'exit'
        @addEventListener 'enter', callback if callback
      when 'move', 'click'
        super 'move'
        super 'press'
        super 'release'
        @addEventListener type, callback if callback
      when 'drag'
        super 'move'
        super 'press'
        super 'release'
        super 'exit'
        @addEventListener type, callback if callback
      else super type, callback
      
  press: (e) ->
    @fireEvent 'press', e
    @logClickStart e.button
    @_buttonState[e.button] = true
    
  release: (e) ->
    @fireEvent 'release', e
    @_buttonState[e.button] = false
    if @_pendingClicks[e.button] isnt undefined
      e.clickCount = @_clickCount[e.button]
      @fireEvent 'click', e
    
  move: (e) ->
    if @_buttonState[e.button]
      # mouse movement invalidates any clicks
      for button of @_pendingClicks
        @clearClick button
      @fireEvent 'drag', e
    else
      @fireEvent 'move', e
    
  over: (e) ->
    @fireEvent 'over', e
    unless @_entered
      @_entered = true
      @fireEvent 'enter', e

  wheel: (e) ->
    @fireEvent 'wheel', e

  exit: (e) ->
    @_entered = false
    # when mouse leaves canvas, stop 'dragging'
    # this may not sound right, but in practice, it's the expected
    # result far more often than the reverse.
    for button of @_buttonState
      delete @_buttonState[button]
    @fireEvent 'exit', e
    
    
    
    
    
class Input.Keyboard extends Input
  @eventTypes:
    press:   'keydown'
    release: 'keyup'
    type:    'keypress'
    
  constructor: (element, options = {}) ->
    super element, options
    shouldFocus = false
    unless @receiver.getAttribute('tabindex')
      shouldFocus = true
      @receiver.setAttribute 'tabindex', '0'
    if options.focus is undefined or options.focus
      # make sure the element can accept key events
      if shouldFocus
        @receiver.focus()
    # add a mouse listener to capture focus when mouse moves over
    @receiver.addEventListener 'mouseover', @_captureFocus = (e) ->
      this.focus()

  trigger: (type, evt = {}) ->
    event = document.createEvent 'KeyboardEvent'
    if event.initKeyboardEvent
      event.initKeyboardEvent type, true, true, null,             \ # type, bubbles, cancelable, viewArg
                              evt.ctrl, evt.alt, evt.shift,       \ # ctrl, alt, shift
                              evt.meta, evt.keyCode, evt.charCode   # meta, keyCode, charCode
    else
      event.initKeyEvent type, true, true, null,             \ # type, bubbles, cancelable, viewArg
                         evt.ctrl, evt.alt, evt.shift,       \ # ctrl, alt, shift
                         evt.meta, evt.keyCode, evt.charCode   # meta, keyCode, charCode
    @receiver.dispatchEvent event
    
  stopListening: ->
    @receiver.removeEventListener 'mouseover', @_captureFocus
    super()

  press: (e) ->
    @fireEvent 'press', e
    
  release: (e) ->
    @fireEvent 'release', e
    
  type: (e) ->
    @fireEvent 'type', e