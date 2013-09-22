// Generated by CoffeeScript 1.6.2
/*
  Input imported from Jax Framework
*/


(function() {
  var Input,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __operators = Object.prototype.operators = function(operator, object) { switch (operator) {case '+': return this + object;case '-': return this - object;case '/':return this / object;case '*':return this * object;case '%':return this % object;case '^':return this ^ object;default:throw SyntaxError('Object does not support "' + operator + '" operator');}},
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.Input = Input = (function(_super) {
    __extends(Input, _super);

    function Input(receiver, options) {
      var _this = this;
      this.receiver = receiver;
      this.options = options != null ? options : {};
      this._listeners = {};
      this.receiver.getEventListeners = function(type) {
        return _this.getReceiverEventListeners(type);
      };
    }

    Input.prototype.getReceiverEventListeners = function(type) {
      var _base;
      return (_base = this._listeners)[type] || (_base[type] = []);
    };

    Input.prototype.isListening = function(type) {
      return !!this.getReceiverEventListeners(type).length;
    };

    /*
    Subclasses can override this method if they need to maintain themselves
    over time. The default implementation does nothing. Timechange is in 
    seconds.
    */


    Input.prototype.update = function(timechange) {};

    /*
    Manually triggers an event on the underlying receiver. This is mostly
    used for testing. Subclasses must override this method; the default
    implementation just raises an error.
    */


    Input.prototype.trigger = function(type, event) {
      throw new Error((((("").operators("+",this.__proto__.constructor.name)).operators("+"," can't trigger event type ")).operators("+",type)).operators("+",": not implemented"));
    };

    /*
    Explicitly process a given event object. This is normally invoked by
    an event listener added to the underlying receiver.
    */


    Input.prototype.processEvent = function(eventType, evt) {
      var listener, _i, _len, _ref;
      _ref = this.getReceiverEventListeners(eventType);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        listener = _ref[_i];
        listener.call(this, evt);
      }
      return true;
    };

    /*
    Convenience method that just registers the specified event listener with
    the input receiver. Ensures that the specific callback is only ever
    registered once.
    */


    Input.prototype.attach = function(eventType, callback) {
      var listeners,
        _this = this;
      listeners = this.getReceiverEventListeners(eventType);
      if (!listeners["interface"]) {
        listeners["interface"] = function(evt) {
          evt.preventDefault();
          return _this.processEvent(eventType, evt);
        };
        this.receiver.addEventListener(eventType, listeners["interface"]);
      }
      if (__indexOf.call(listeners, callback) < 0) {
        return listeners.push(callback);
      }
    };

    /*
    Removes all event listeners from the input receiver.
    */


    Input.prototype.stopListening = function() {
      var listeners, type;
      for (type in this._listeners) {
        listeners = this.getReceiverEventListeners(type);
        if (listeners["interface"]) {
          this.receiver.removeEventListener(type, listeners["interface"]);
          listeners.length = 0;
          delete listeners["interface"];
        }
      }
      return this.removeAllEventListeners();
    };

    /*
    Starts listening for a specific event type. The callback is optional and
    if specified, will be fired every time this input device fires the specified
    event type.
    */


    Input.prototype.listen = function(type, callback) {
      var domTypes, eventType, _i, _len, _ref, _ref1;
      if (this[type]) {
        if (domTypes = (_ref = this.__proto__.constructor.eventTypes) != null ? _ref[type] : void 0) {
          _ref1 = domTypes.split(/,/);
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            eventType = _ref1[_i];
            this.attach(eventType.trim(), this[type]);
            if (callback) {
              this.addEventListener(type, callback);
            }
          }
          return true;
        } else {
          throw new Error((("BUG: Method `").operators("+",type)).operators("+","` exists but no corresponding DOM event type associated"));
        }
      } else {
        throw new Error(((("Invalid ").operators("+",this.__proto__.constructor.name)).operators("+"," input type: ")).operators("+",type));
      }
    };

    return Input;

  })(Component);

  Input.Mouse = (function(_super) {
    __extends(Mouse, _super);

    Mouse.eventTypes = {
      press: 'mousedown',
      release: 'mouseup',
      move: 'mousemove',
      over: 'mouseover',
      wheel: 'mousewheel, DOMMouseScroll',
      exit: 'mouseout'
    };

    /*
    Click speed, in seconds. The lower this number, the faster the
    mouse must be pressed and released in order to result in a single click.
    Defaults to 0.25.
    */


    Mouse.prototype.getClickSpeed = function() {
      return this._clickSpeed || (this._clickSpeed = 0.25);
    };

    Mouse.prototype.setClickSpeed = function(speed) {
      return this._clickSpeed = speed;
    };

    function Mouse(element) {
      Mouse.__super__.constructor.call(this, element);
      this._pendingClicks = {};
      this._clickCount = {};
      this._buttonState = {};
    }

    /*
    Programmatically triggers an event. Note that because Jax uses
    `addEventListener`, you can't trigger events using jQuery. Instead,
    you have to either trigger events through the DOM methods, or use this 
    method.
    */


    Mouse.prototype.trigger = function(type, evt) {
      var event;
      if (evt == null) {
        evt = {};
      }
      if (type === 'click') {
        this.trigger('mousedown', evt);
        this.trigger('mouseup', evt);
        return;
      }
      event = document.createEvent('MouseEvents');
      event.initMouseEvent(type, true, true, window, 1, evt.screenX, evt.screenY, evt.clientX, evt.clientY, false, false, false, false, evt.button, null);
      return this.receiver.dispatchEvent(event);
    };

    Mouse.prototype.processEvent = function(type, evt) {
      evt = this.normalizeEvent(evt);
      return Mouse.__super__.processEvent.call(this, type, evt);
    };

    /*
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
    */


    Mouse.prototype.normalizeEvent = function(evt) {
      var rect, root, _ref, _ref1;
      rect = this.receiver.getBoundingClientRect();
      root = document.documentElement;
      evt = {
        base: evt,
        button: evt.button,
        x: (evt.clientX).operators("-",rect.left),
        y: (rect.height).operators("-",((evt.clientY).operators("-",rect.top))),
        wheelDeltaX: evt.wheelDeltaX || 0,
        wheelDeltaY: evt.wheelDeltaY || -evt.detail,
        wheelDeltaZ: evt.wheelDeltaZ || 0,
        wheelDelta: evt.wheelDelta || 1
      };
      evt.x *= (this.receiver.width).operators("/",rect.width);
      evt.y *= (this.receiver.height).operators("/",rect.height);
      if (this._lastx === void 0) {
        evt.diffx = evt.diffy = 0;
      } else {
        _ref = [(evt.x).operators("-",this._lastx), (evt.y).operators("-",this._lasty)], evt.diffx = _ref[0], evt.diffy = _ref[1];
      }
      _ref1 = [evt.x, evt.y], this._lastx = _ref1[0], this._lasty = _ref1[1];
      return evt;
    };

    Mouse.prototype.update = function(timechange) {
      var button;
      for (button in this._pendingClicks) {
        this._pendingClicks[button] += timechange;
        if (this._pendingClicks[button] >= this.getClickSpeed()) {
          this.clearClick(button);
        }
      }
      return true;
    };

    Mouse.prototype.logClickStart = function(button) {
      this._pendingClicks[button] = 0;
      return this._clickCount[button] = ((this._clickCount[button] || 0)).operators("+",1);
    };

    Mouse.prototype.clearClick = function(button) {
      delete this._pendingClicks[button];
      return delete this._clickCount[button];
    };

    Mouse.prototype.listen = function(type, callback) {
      switch (type) {
        case 'enter':
          Mouse.__super__.listen.call(this, 'over');
          Mouse.__super__.listen.call(this, 'exit');
          if (callback) {
            return this.addEventListener('enter', callback);
          }
          break;
        case 'move':
        case 'click':
          Mouse.__super__.listen.call(this, 'move');
          Mouse.__super__.listen.call(this, 'press');
          Mouse.__super__.listen.call(this, 'release');
          if (callback) {
            return this.addEventListener(type, callback);
          }
          break;
        case 'drag':
          Mouse.__super__.listen.call(this, 'move');
          Mouse.__super__.listen.call(this, 'press');
          Mouse.__super__.listen.call(this, 'release');
          Mouse.__super__.listen.call(this, 'exit');
          if (callback) {
            return this.addEventListener(type, callback);
          }
          break;
        default:
          return Mouse.__super__.listen.call(this, type, callback);
      }
    };

    Mouse.prototype.press = function(e) {
      this.fireEvent('press', e);
      this.logClickStart(e.button);
      return this._buttonState[e.button] = true;
    };

    Mouse.prototype.release = function(e) {
      this.fireEvent('release', e);
      this._buttonState[e.button] = false;
      if (this._pendingClicks[e.button] !== void 0) {
        e.clickCount = this._clickCount[e.button];
        return this.fireEvent('click', e);
      }
    };

    Mouse.prototype.move = function(e) {
      var button;
      if (this._buttonState[e.button]) {
        for (button in this._pendingClicks) {
          this.clearClick(button);
        }
        return this.fireEvent('drag', e);
      } else {
        return this.fireEvent('move', e);
      }
    };

    Mouse.prototype.over = function(e) {
      this.fireEvent('over', e);
      if (!this._entered) {
        this._entered = true;
        return this.fireEvent('enter', e);
      }
    };

    Mouse.prototype.wheel = function(e) {
      return this.fireEvent('wheel', e);
    };

    Mouse.prototype.exit = function(e) {
      var button;
      this._entered = false;
      for (button in this._buttonState) {
        delete this._buttonState[button];
      }
      return this.fireEvent('exit', e);
    };

    return Mouse;

  })(Input);

  Input.Keyboard = (function(_super) {
    __extends(Keyboard, _super);

    Keyboard.eventTypes = {
      press: 'keydown',
      release: 'keyup',
      type: 'keypress'
    };

    function Keyboard(element, options) {
      var shouldFocus;
      if (options == null) {
        options = {};
      }
      Keyboard.__super__.constructor.call(this, element, options);
      shouldFocus = false;
      if (!this.receiver.getAttribute('tabindex')) {
        shouldFocus = true;
        this.receiver.setAttribute('tabindex', '0');
      }
      if (options.focus === void 0 || options.focus) {
        if (shouldFocus) {
          this.receiver.focus();
        }
      }
      this.receiver.addEventListener('mouseover', this._captureFocus = function(e) {
        return this.focus();
      });
    }

    Keyboard.prototype.trigger = function(type, evt) {
      var event;
      if (evt == null) {
        evt = {};
      }
      event = document.createEvent('KeyboardEvent');
      if (event.initKeyboardEvent) {
        event.initKeyboardEvent(type, true, true, null, evt.ctrl, evt.alt, evt.shift, evt.meta, evt.keyCode, evt.charCode);
      } else {
        event.initKeyEvent(type, true, true, null, evt.ctrl, evt.alt, evt.shift, evt.meta, evt.keyCode, evt.charCode);
      }
      return this.receiver.dispatchEvent(event);
    };

    Keyboard.prototype.stopListening = function() {
      this.receiver.removeEventListener('mouseover', this._captureFocus);
      return Keyboard.__super__.stopListening.call(this);
    };

    Keyboard.prototype.press = function(e) {
      return this.fireEvent('press', e);
    };

    Keyboard.prototype.release = function(e) {
      return this.fireEvent('release', e);
    };

    Keyboard.prototype.type = function(e) {
      return this.fireEvent('type', e);
    };

    return Keyboard;

  })(Input);

}).call(this);