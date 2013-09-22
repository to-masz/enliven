window.Component = class Component
  
  getHandle: (gl) ->
    @contexts?[gl.id] ? null
    
  setHandle: (gl, handle) ->
    if @contexts is undefined
      @contexts = {}
    @contexts[gl.id] = handle
    
  
  getEventListeners: (name) ->
    @event_listeners ?= {}
    @event_listeners[name] ?= []
    @event_listeners[name] 

  addEventListener: (name, callback) ->
    ary = @getEventListeners(name);
    ary.push(callback);
    callback;

  removeEventListener: (name, index) ->
    if (!name || index == undefined) 
      throw new Error("both event type and listener index are required");
    ary = @getEventListeners(name);
    func = ary[index];
    if (ary[index]) 
      delete ary[index];
      # ary.splice(index, 1);
    return func;

  fireEvent: (name, event_object) ->
    listeners = @getEventListeners(name);
    if (event_object && event_object.type == undefined)
      event_object.type = name;
    for listener in listeners
      listener.call(@, event_object);