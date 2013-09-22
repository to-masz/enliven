// Generated by CoffeeScript 1.6.2
(function() {
  var BaseMatrix, Mat2, Mat3, Mat4, Matrix, Quat, Quatenion, Vec2, Vec3, Vec4, Vector, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __operators = Object.prototype.operators = function(operator, object) { switch (operator) {case '+': return this + object;case '-': return this - object;case '/':return this / object;case '*':return this * object;case '%':return this % object;case '^':return this ^ object;default:throw SyntaxError('Object does not support "' + operator + '" operator');}};

  window.BaseMatrix = BaseMatrix = (function(_super) {
    var E;

    __extends(BaseMatrix, _super);

    BaseMatrix.prototype.elements = null;

    function BaseMatrix(typeName, elements) {
      this.typeName = typeName;
      this.elements = elements != null ? elements : [];
      this.type = glMatrix[this.typeName];
    }

    E = function(matrix) {
      if (matrix instanceof BaseMatrix) {
        return matrix.elements;
      } else {
        return matrix;
      }
    };

    BaseMatrix.prototype.E = function(matrix) {
      return E(matrix);
    };

    BaseMatrix.prototype.e = function(i, value) {
      if (value != null) {
        this.elements[i] = value;
      }
      return this.elements[i];
    };

    BaseMatrix.prototype.operators = function(operator, object) {
      var clone, out;
      if (object instanceof BaseMatrix) {
        out = [];
        clone = this.clone();
        switch (operator) {
          case '*':
            return clone.multiply(object);
          case '+':
            return clone.add(object);
          case '-':
            return clone.subtract(object);
          case '|>':
            return clone.translate(object);
        }
      } else if (operator === '^>' && object instanceof Vector) {
        out = [];
        return this.type.scale(out, this.elements, object);
      } else if (operator === '@>' && object.length === 2 && object[1] instanceof BaseMatrix) {
        out = [];
        this.type.rotate(out, this.elements, object[0], object[1].elements);
        return new BaseMatrix(this.typeName, out);
      } else {
        return BaseMatrix.__super__.operators.call(this, operator, object);
      }
    };

    BaseMatrix.prototype.multiply = function(a) {
      this.type.multiply(this.elements, this.elements, this.E(a));
      return this;
    };

    BaseMatrix.prototype.add = function(x) {
      this.type.add(this.elements, this.elements, this.E(x));
      return this;
    };

    BaseMatrix.prototype.subtract = function(x) {
      this.type.subtract(this.elements, this.elements, this.E(x));
      return this;
    };

    BaseMatrix.prototype.translate = function(a) {
      this.type.translate(this.elements, this.elements, this.E(a));
      return this;
    };

    BaseMatrix.prototype.setIdentity = function() {
      this.type.identity(this.elements);
      return this;
    };

    BaseMatrix.prototype.setPerspective = function(fovy, aspect, near, far) {
      this.type.perspective(this.elements, fovy, aspect, near, far);
      return this;
    };

    BaseMatrix.prototype.setOrtho = function(out, left, right, bottom, top, near, far) {
      this.type.ortho(this.elements, out, left, right, bottom, top, near, far);
      return this;
    };

    BaseMatrix.prototype.setLookAt = function(eye, center, up) {
      this.type.lookAt(this.elements, eye.elements, center.elements, up.elements);
      return this;
    };

    BaseMatrix.prototype.clone = function() {
      return new this.constructor(this.elements.slice());
    };

    BaseMatrix.prototype.copyTo = function(mat) {
      mat.elements = this.elements.slice();
      return mat.typeName = this.typeName;
    };

    BaseMatrix.prototype.copyFrom = function(m) {
      this.elements = m.elements.slice();
      this.typeName = m.typeName;
      return this;
    };

    BaseMatrix.prototype.fromMat4 = function(matrix) {
      this.type.fromMat4(this.elements, E(matrix));
      return this;
    };

    BaseMatrix.prototype.transpose = function() {
      this.type.transpose(this.elements, this.elements);
      return this;
    };

    BaseMatrix.prototype.normalize = function() {
      this.type.normalize(this.elements, this.elements);
      return this;
    };

    BaseMatrix.prototype.negate = function() {
      this.type.negate(this.elements, this.elements);
      return this;
    };

    BaseMatrix.prototype.cross = function(a, b) {
      var clone;
      console.log("dupa B");
      clone = this.clone();
      this.type.cross(clone.elements, E(a), E(b));
      return clone;
    };

    BaseMatrix.prototype.rotationTo = function(a, b) {
      this.type.rotationTo(this.elements, E(a), E(b));
      return this;
    };

    BaseMatrix.prototype.getInverted = function() {
      var clone;
      clone = this.clone();
      this.type.invert(clone.elements, this.elements);
      return clone;
    };

    BaseMatrix.prototype.invert = function() {
      this.type.invert(this.elements, this.elements);
      return this;
    };

    BaseMatrix.prototype.transformQuat = function(a, q) {
      this.type.transformQuat(this.elements, this.E(a), this.E(q));
      return this;
    };

    BaseMatrix.prototype.setAxisAngle = function(axis, rad) {
      this.type.setAxisAngle(this.elements, this.E(axis), rad);
      return this;
    };

    BaseMatrix.prototype.scale = function(k) {
      this.type.scale(this.elements, this.elements, k);
      return this;
    };

    BaseMatrix.prototype.multiplyBy = function(a) {
      this.type.multiply(this.elements, this.elements, this.E(a));
      return this;
    };

    BaseMatrix.prototype.toString = function() {
      return ((("").operators("+",this.typeName)).operators("+",": ")).operators("+",this.elements);
    };

    return BaseMatrix;

  })(Object);

  window.Matrix = Matrix = (function(_super) {
    __extends(Matrix, _super);

    function Matrix() {
      _ref = Matrix.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Matrix.prototype.operators = function(operator, object) {
      if (object instanceof Vec3 && operator === '*') {
        return this.multiplyVec3(object);
      }
      return Matrix.__super__.operators.call(this, operator, object);
    };

    Matrix.prototype.multiplyVec3 = function(v) {
      var m, out;
      out = [];
      v = this.E(v);
      m = this.elements;
      if (this instanceof Mat4) {
        out[0] = ((((m[0]).operators("*",v[0])).operators("+",(m[4]).operators("*",v[1]))).operators("+",(m[8]).operators("*",v[2]))).operators("+",m[12]);
        out[1] = ((((m[1]).operators("*",v[0])).operators("+",(m[5]).operators("*",v[1]))).operators("+",(m[9]).operators("*",v[2]))).operators("+",m[13]);
        out[2] = ((((m[2]).operators("*",v[0])).operators("+",(m[6]).operators("*",v[1]))).operators("+",(m[10]).operators("*",v[2]))).operators("+",m[14]);
      }
      return new Vec3(out);
    };

    Matrix.prototype.fromRotationTranslation = function(q, v) {
      this.type.fromRotationTranslation(this.elements, this.E(q), this.E(v));
      return this;
    };

    Matrix.prototype.toMat3 = function() {
      this.elements = [this.elements[0], this.elements[1], this.elements[2], this.elements[4], this.elements[5], this.elements[6], this.elements[8], this.elements[9], this.elements[10]];
      this.type = glMatrix['mat3'];
      return this;
    };

    return Matrix;

  })(BaseMatrix);

  window.Vector = Vector = (function(_super) {
    __extends(Vector, _super);

    function Vector() {
      _ref1 = Vector.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Vector.prototype.operators = function(operator, object) {
      var clone;
      if (object instanceof Vector) {
        switch (operator) {
          case '*':
            return this.dot(this.elements, object);
          case 'x':
            return this.cross(this.elements, object);
        }
      }
      if (typeof object === 'number') {
        clone = this.clone();
        switch (operator) {
          case '^>':
            clone.scale(object);
            return clone;
          case '*':
            clone.scale(object);
            return clone;
        }
      }
      return Vector.__super__.operators.call(this, operator, object);
    };

    Vector.prototype.transformMat4 = function(a, m) {
      this.type.transformMat4(this.elements, this.E(a), this.E(m));
      return this;
    };

    Vector.prototype.dot = function(a, b) {
      return this.type.dot(this.E(a), this.E(b));
    };

    Vector.prototype.distance = function(a, b) {
      return this.type.distance(this.E(a), this.E(b));
    };

    Vector.prototype.length = function() {
      return this.type.length(this.elements);
    };

    return Vector;

  })(BaseMatrix);

  window.Quatenion = Quatenion = (function(_super) {
    __extends(Quatenion, _super);

    function Quatenion() {
      _ref2 = Quatenion.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    return Quatenion;

  })(BaseMatrix);

  window.Mat2 = Mat2 = (function(_super) {
    __extends(Mat2, _super);

    function Mat2(elements) {
      Mat2.__super__.constructor.call(this, "mat2", elements);
    }

    return Mat2;

  })(Matrix);

  window.Mat3 = Mat3 = (function(_super) {
    __extends(Mat3, _super);

    function Mat3(elements) {
      Mat3.__super__.constructor.call(this, "mat3", elements);
    }

    return Mat3;

  })(Matrix);

  window.Mat4 = Mat4 = (function(_super) {
    __extends(Mat4, _super);

    function Mat4(elements) {
      Mat4.__super__.constructor.call(this, "mat4", elements);
    }

    return Mat4;

  })(Matrix);

  window.Vec2 = Vec2 = (function(_super) {
    __extends(Vec2, _super);

    function Vec2(elements) {
      Vec2.__super__.constructor.call(this, "vec2", elements);
    }

    return Vec2;

  })(Vector);

  window.Vec3 = Vec3 = (function(_super) {
    __extends(Vec3, _super);

    function Vec3(elements) {
      Vec3.__super__.constructor.call(this, "vec3", elements);
    }

    return Vec3;

  })(Vector);

  window.Vec4 = Vec4 = (function(_super) {
    __extends(Vec4, _super);

    function Vec4(elements) {
      Vec4.__super__.constructor.call(this, "vec4", elements);
    }

    return Vec4;

  })(Vector);

  window.Quat = Quat = (function(_super) {
    __extends(Quat, _super);

    function Quat(elements) {
      Quat.__super__.constructor.call(this, "quat", elements);
    }

    return Quat;

  })(Quatenion);

}).call(this);
