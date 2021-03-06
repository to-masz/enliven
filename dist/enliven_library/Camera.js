// Generated by CoffeeScript 1.6.2
(function() {
  var Camera,
    __operators = Object.prototype.operators = function(operator, object) { switch (operator) {case '+': return this + object;case '-': return this - object;case '/':return this / object;case '*':return this * object;case '%':return this % object;case '^':return this ^ object;default:throw SyntaxError('Object does not support "' + operator + '" operator');}};

  window.Camera = Camera = (function() {
    function Camera() {
      this._isValid = false;
      this.matrices = {
        mv: new Mat4([]).setIdentity(),
        imv: new Mat4([]).setIdentity(),
        p: new Mat4([]).setIdentity(),
        n: new Mat3([]).setIdentity()
      };
      this.position = new Vec3([0, 0, -10]);
      this.center = new Vec3([0, 0, 0]);
      this.up = new Vec3([0, 1, 0]);
    }

    Camera.prototype.invalidate = function() {
      return this._isValid = false;
    };

    Camera.prototype.isValid = function() {
      return this._isValid;
    };

    Camera.prototype.recalculateMatrices = function() {
      var aspectRatio, _ref;
      this._isValid = true;
      this.matrices.mv = new Mat4([]).setIdentity();
      this.matrices.p = new Mat4([]).setIdentity();
      switch ((_ref = this.projection) != null ? _ref.type : void 0) {
        case 'orthographic':
          this.matrices.p = (this.matrices.p).operators("*",new Mat4([]).setOrtho(this.projection.left, this.projection.right, this.projection.bottom, this.projection.top, this.projection.near, this.projection.far));
          break;
        case 'perspective':
          aspectRatio = (this.projection.width).operators("/",this.projection.height);
          this.matrices.p = (this.matrices.p).operators("*",new Mat4([]).setPerspective(this.projection.fov, aspectRatio, this.projection.near, this.projection.far));
      }
      this.matrices.p = (this.matrices.p).operators("*",new Mat4([]).setLookAt(this.position, this.center, this.up));
      this.matrices.imv = this.matrices.mv.getInverted();
      this.matrices.n = new Mat3([]).fromMat4(this.matrices.imv);
      return this.matrices.n = this.matrices.n.transpose();
    };

    Camera.prototype.setPosition = function(position) {
      this.position = position;
    };

    Camera.prototype.setCenter = function(center) {
      this.center = center;
    };

    Camera.prototype.setUp = function(up) {
      this.up = up;
    };

    Camera.prototype.ortho = function(options) {
      options.left || (options.left = -1);
      options.right || (options.right = 1);
      options.top || (options.top = 1);
      options.bottom || (options.bottom = -1);
      options.far || (options.far = 200);
      options.near || (options.near = 0.1);
      this.projection = {
        width: (options.right).operators("-",options.left),
        height: (options.top).operators("-",options.bottom),
        depth: (options.far).operators("-",options.near),
        left: options.left,
        right: options.right,
        top: options.top,
        bottom: options.bottom,
        near: options.near,
        far: options.far,
        type: 'orthographic'
      };
      return this.invalidate();
    };

    Camera.prototype.perspective = function(options) {
      var aspectRatio;
      options || (options = {});
      if (!options.width) {
        throw new Error("Expected a screen width");
      }
      if (!options.height) {
        throw new Error("Expected a screen height");
      }
      options.fov || (options.fov = 0.785398);
      options.near || (options.near = 0.1);
      options.far || (options.far = 200);
      aspectRatio = (options.width).operators("/",options.height);
      this.projection = {
        width: options.width,
        height: options.height,
        near: options.near,
        far: options.far,
        fov: options.fov,
        type: 'perspective'
      };
      return this.invalidate();
    };

    Camera.prototype.getTransformationMatrix = function() {
      if (!this._isValid) {
        this.recalculateMatrices();
      }
      return this.matrices.mv;
    };

    Camera.prototype.getInverseTransformationMatrix = function() {
      if (!this._isValid) {
        this.recalculateMatrices();
      }
      return this.matrices.imv;
    };

    Camera.prototype.getNormalMatrix = function() {
      if (!this._isValid) {
        this.recalculateMatrices();
      }
      return this.matrices.n;
    };

    Camera.prototype.getProjectionMatrix = function() {
      if (!this._isValid) {
        this.recalculateMatrices();
      }
      return this.matrices.p;
    };

    Camera.prototype.unproject = function(winx, winy, winz) {
      var inVec, m, m2, mm, out, pm, result, viewport;
      if (winz !== void 0) {
        mm = this.getTransformationMatrix();
        pm = this.getProjectionMatrix();
        viewport = [0, 0, this.projection.width, this.projection.height];
        m = (pm).operators("*",mm);
        m2 = m.clone();
        if (!m.invert()) {
          return null;
        }
        inVec = new Vec4([(((((winx).operators("-",viewport[0]))).operators("/",viewport[2])).operators("*",2)).operators("-",1), (((((winy).operators("-",viewport[1]))).operators("/",viewport[3])).operators("*",2)).operators("-",1), ((2).operators("*",winz)).operators("-",1), 1]);
        out = new Vec4([]).transformMat4(inVec, m);
        if (out.e(3) === 0) {
          return null;
        }
        out.e(3, (1).operators("/",out.e(3)));
        result = new Vec3([(out.e(0)).operators("*",out.e(3)), (out.e(1)).operators("*",out.e(3)), (out.e(2)).operators("*",out.e(3))]);
        return result;
      } else {
        return [this.unproject(winx, winy, 0), this.unproject(winx, winy, 1)];
      }
    };

    return Camera;

  })();

}).call(this);
