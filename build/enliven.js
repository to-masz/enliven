/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.2.0
 */

/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

var glMatrix = {};
(function(_global) {
  "use strict";

  var shim = {};
  if (typeof(exports) === 'undefined') {
    if(typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      shim.exports = {};
      define(function() {
        return shim.exports;
      });
    } else {
      // gl-matrix lives in a browser, define its namespaces in global
      shim.exports = _global; //typeof(window) !== 'undefined' ? window : _global;
    }
  }
  else {
    // gl-matrix lives in commonjs, define its namespaces in exports
    shim.exports = exports;
  }

  (function(exports) {
    /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

if(!GLMAT_ARRAY_TYPE) {
    var GLMAT_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
}

if(!GLMAT_RANDOM) {
    var GLMAT_RANDOM = Math.random;
}

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

/**
 * Sets the type of array used when creating new vectors and matricies
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}

if(typeof(exports) !== 'undefined') {
    exports.glMatrix = glMatrix;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */

var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec2 = vec2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */

var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    var z = (GLMAT_RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec3 = vec3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */

var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        out[3] = a[3] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = GLMAT_RANDOM();
    out[1] = GLMAT_RANDOM();
    out[2] = GLMAT_RANDOM();
    out[3] = GLMAT_RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec4 = vec4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x2 Matrix
 * @name mat2
 */

var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a1 * b2;
    out[1] = a0 * b1 + a1 * b3;
    out[2] = a2 * b0 + a3 * b2;
    out[3] = a2 * b1 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a1 * s;
    out[1] = a0 * -s + a1 * c;
    out[2] = a2 *  c + a3 * s;
    out[3] = a2 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v1;
    out[2] = a2 * v0;
    out[3] = a3 * v1;
    return out;
};

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat2 = mat2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x3 Matrix
 * @name mat2d
 * 
 * @description 
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, b,
 *  c, d,
 *  tx,ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, b, 0
 *  c, d, 0
 *  tx,ty,1]
 * </pre>
 * The last column is ignored so the array is shorter and operations are faster.
 */

var mat2d = {};

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5],
        ba = b[0], bb = b[1], bc = b[2], bd = b[3],
        btx = b[4], bty = b[5];

    out[0] = aa*ba + ab*bc;
    out[1] = aa*bb + ab*bd;
    out[2] = ac*ba + ad*bc;
    out[3] = ac*bb + ad*bd;
    out[4] = ba*atx + bc*aty + btx;
    out[5] = bb*atx + bd*aty + bty;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;


/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var aa = a[0],
        ab = a[1],
        ac = a[2],
        ad = a[3],
        atx = a[4],
        aty = a[5],
        st = Math.sin(rad),
        ct = Math.cos(rad);

    out[0] = aa*ct + ab*st;
    out[1] = -aa*st + ab*ct;
    out[2] = ac*ct + ad*st;
    out[3] = -ac*st + ct*ad;
    out[4] = ct*atx + st*aty;
    out[5] = ct*aty - st*atx;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var vx = v[0], vy = v[1];
    out[0] = a[0] * vx;
    out[1] = a[1] * vy;
    out[2] = a[2] * vx;
    out[3] = a[3] * vy;
    out[4] = a[4] * vx;
    out[5] = a[5] * vy;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4] + v[0];
    out[5] = a[5] + v[1];
    return out;
};

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat2d = mat2d;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3x3 Matrix
 * @name mat3
 */

var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[3] = xy + wz;
    out[6] = xz - wy;

    out[1] = xy - wz;
    out[4] = 1 - (xx + zz);
    out[7] = yz + wx;

    out[2] = xz + wy;
    out[5] = yz - wx;
    out[8] = 1 - (xx + yy);

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat3 = mat3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4x4 Matrix
 * @name mat4
 */

var mat4 = {};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < GLMAT_EPSILON) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

/**
* Calculates a 4x4 matrix from the given quaternion
*
* @param {mat4} out mat4 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat4} out
*/
mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;

    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;

    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < GLMAT_EPSILON &&
        Math.abs(eyey - centery) < GLMAT_EPSILON &&
        Math.abs(eyez - centerz) < GLMAT_EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat4 = mat4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class Quaternion
 * @name quat
 */

var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function() {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1,0,0);
    var yUnitVec3 = vec3.fromValues(0,1,0);

    return function(out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
                vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
})();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = (function() {
    var matr = mat3.create();

    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = view[0];
        matr[5] = view[1];
        matr[8] = view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
})();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var        omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
        // standard case (slerp)
        omega  = Math.acos(cosom);
        sinom  = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {        
        // "from" and "to" quaternions are very close 
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    
    return out;
};

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;
    
    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = (function() {
    // benchmarks:
    //    http://jsperf.com/typed-array-access-speed
    //    http://jsperf.com/conversion-of-3x3-matrix-to-quaternion

    var s_iNext = (typeof(Int8Array) !== 'undefined' ? new Int8Array([1,2,0]) : [1,2,0]);

    return function(out, m) {
        // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
        // article "Quaternion Calculus and Fast Animation".
        var fTrace = m[0] + m[4] + m[8];
        var fRoot;

        if ( fTrace > 0.0 ) {
            // |w| > 1/2, may as well choose w > 1/2
            fRoot = Math.sqrt(fTrace + 1.0);  // 2w
            out[3] = 0.5 * fRoot;
            fRoot = 0.5/fRoot;  // 1/(4w)
            out[0] = (m[7]-m[5])*fRoot;
            out[1] = (m[2]-m[6])*fRoot;
            out[2] = (m[3]-m[1])*fRoot;
        } else {
            // |w| <= 1/2
            var i = 0;
            if ( m[4] > m[0] )
              i = 1;
            if ( m[8] > m[i*3+i] )
              i = 2;
            var j = s_iNext[i];
            var k = s_iNext[j];
            
            fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
            out[i] = 0.5 * fRoot;
            fRoot = 0.5 / fRoot;
            out[3] = (m[k*3+j] - m[j*3+k]) * fRoot;
            out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
            out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
        }
        
        return out;
    };
})();

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.quat = quat;
}
;













  })(shim.exports);
})(glMatrix);
// Generated by CoffeeScript 1.6.2
(function() {
  var Enliven,
    __operators = Object.prototype.operators = function(operator, object) { switch (operator) {case '+': return this + object;case '-': return this - object;case '/':return this / object;case '*':return this * object;case '%':return this % object;case '^':return this ^ object;default:throw SyntaxError('Object does not support "' + operator + '" operator');}};

  window.Enliven = Enliven = {
    sizeofFormat: function(glEnum) {
      switch (glEnum) {
        case gl.ALPHA:
          return 1;
        case gl.LUMINANCE:
          return 1;
        case gl.RGB:
          return 3;
        case gl.RGBA:
          return 4;
        case gl.LUMINANCE_ALPHA:
          return 2;
        default:
          throw new Error(("Unrecognized format: ").operators("+",glEnum));
      }
    },
    decodePickingColor: function(red, green, blue, alpha) {
      if (blue === 1.0) {
        red *= 255;
        green *= 255;
      }
      return ((red).operators("*",256)).operators("+",green);
    },
    ShaderSources: {}
  };

}).call(this);
// Generated by CoffeeScript 1.6.2
(function() {
  var Component;

  window.Component = Component = (function() {
    function Component() {}

    Component.prototype.getHandle = function(gl) {
      var _ref, _ref1;
      return (_ref = (_ref1 = this.contexts) != null ? _ref1[gl.id] : void 0) != null ? _ref : null;
    };

    Component.prototype.setHandle = function(gl, handle) {
      if (this.contexts === void 0) {
        this.contexts = {};
      }
      return this.contexts[gl.id] = handle;
    };

    Component.prototype.getEventListeners = function(name) {
      var _base;
      if (this.event_listeners == null) {
        this.event_listeners = {};
      }
      if ((_base = this.event_listeners)[name] == null) {
        _base[name] = [];
      }
      return this.event_listeners[name];
    };

    Component.prototype.addEventListener = function(name, callback) {
      var ary;
      ary = this.getEventListeners(name);
      ary.push(callback);
      return callback;
    };

    Component.prototype.removeEventListener = function(name, index) {
      var ary, func;
      if (!name || index === void 0) {
        throw new Error("both event type and listener index are required");
      }
      ary = this.getEventListeners(name);
      func = ary[index];
      if (ary[index]) {
        delete ary[index];
      }
      return func;
    };

    Component.prototype.fireEvent = function(name, event_object) {
      var listener, listeners, _i, _len, _results;
      listeners = this.getEventListeners(name);
      if (event_object && event_object.type === void 0) {
        event_object.type = name;
      }
      _results = [];
      for (_i = 0, _len = listeners.length; _i < _len; _i++) {
        listener = listeners[_i];
        _results.push(listener.call(this, event_object));
      }
      return _results;
    };

    return Component;

  })();

}).call(this);
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
// Generated by CoffeeScript 1.6.2
(function() {
  var Canvas, MatrixStack, Scene, livenUp,
    __hasProp = {}.hasOwnProperty,
    __operators = Object.prototype.operators = function(operator, object) { switch (operator) {case '+': return this + object;case '-': return this - object;case '/':return this / object;case '*':return this * object;case '%':return this % object;case '^':return this ^ object;default:throw SyntaxError('Object does not support "' + operator + '" operator');}},
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.Canvas = Canvas = (function() {
    var gl;

    gl = null;

    /*
    Livens up the given canvas element. Gets webgl context or display an error msg.
    Extends context object. Registers events. Sets WebGL constants available from 
    Enliven object. And finally enters into render loop.
    
    @param {DOMElement} element The canvas element
    @param {Object} options The options for the enliving canvas element. The 
      following options are available:
      * failover {string} - The name of the element to be showed whether WebGL context is not available
    */


    function Canvas(element, options) {
      var failoverInfo, name, value, _ref;
      this.element = element;
      this.options = options != null ? options : {};
      this.element.width = this.element.offsetWidth;
      this.element.height = this.element.offsetHeight;
      _ref = this.options;
      for (name in _ref) {
        if (!__hasProp.call(_ref, name)) continue;
        value = _ref[name];
        if (value === "0" || value === 0 || value === "false") {
          this.options[name] = false;
        } else if (value === "1" || value === 1 || value === "true") {
          this.options[name] = true;
        }
      }
      gl = this.getContext();
      if (this.options.failover != null) {
        failoverInfo = document.getElementById(this.options.failover);
        failoverInfo.style.display = "none";
        failoverInfo.className = this.element.className;
      }
      if (gl == null) {
        failoverInfo.style.display = "block";
        this.element.style.display = "none";
        return false;
      }
      this.gl = gl;
      this.extendContext(gl);
      this.constants();
      this.setupInputDevices();
      /*
      @element.onclick = (e) =>
        position = @getCanvasPosition()
        x = e.clientX - position.left
        y = @element.offsetHeight - (e.clientY - position.top)
        
        vec = @scene.camera.unproject x,y
              
        id = (@pickRegionalIndices x,y,x+1,y+1)
        if id.length > 0
          modelObj = @scene.getModel id[0]
      
          plane = modelObj.getWorldXYPlane()
          orign = vec[0]
          direction = (vec[1] - vec[0]).normalize()
          point = plane.intersectRayPoint orign, direction
          
          modelObj.setPosition point
      */

      this.keys = {};
      this.initKeyboardState();
      this.renderLoop();
    }

    Canvas.prototype.getCanvasPosition = function() {
      var obj, ol, ot;
      obj = this.element;
      ol = ot = 0;
      while (obj = obj.offsetParent) {
        ol += obj.offsetLeft;
        ot += obj.offsetTop;
      }
      return {
        left: ol,
        top: ot
      };
    };

    Canvas.prototype.initInput = function() {};

    Canvas.prototype.setupInputDevices = function(focusCanvas) {
      if (focusCanvas == null) {
        focusCanvas = true;
      }
      if (typeof Input !== "undefined" && Input !== null ? Input.Mouse : void 0) {
        return this.mouse = new Input.Mouse(this.element);
      }
    };

    Canvas.prototype.extendContext = function(gl) {
      var id;
      id = this.element.id;
      if (id !== "") {
        window.Enliven[id] = this;
      }
      gl.id = id;
      gl.canvas = this.element;
      gl.enliven = this;
      gl.viewportWidth = this.element.width;
      gl.viewportHeight = this.element.height;
      gl.matrixStack = new MatrixStack;
      return gl.scene = null;
    };

    Canvas.prototype.constants = function() {
      if (Enliven.gl == null) {
        return Enliven.gl = this.gl;
      }
    };

    Canvas.prototype.getContext = function() {
      var ex;
      if (gl !== null) {
        return gl;
      }
      if (this.element.getContext) {
        try {
          gl = this.element.getContext('webgl');
        } catch (_error) {
          ex = _error;
        }
        try {
          gl = this.element.getContext('experimental-webgl');
        } catch (_error) {
          ex = _error;
        }
      }
      return gl;
    };

    Canvas.prototype.resize = function(width, height) {
      gl.viewport(0, 0, width, height);
      gl.viewportWidth = width;
      return gl.viewportHeight = height;
    };

    Canvas.prototype.pickBuffer = null;

    Canvas.prototype.getPickBuffer = function(force) {
      if (force == null) {
        force = false;
      }
      if (this.pickBuffer !== null && !force) {
        return this.pickBuffer;
      }
      return this.pickBuffer = new Framebuffer({
        width: this.element.width,
        height: this.element.height
      });
    };

    Canvas.prototype.pickRegionalIndices = function(x1, y1, x2, y2) {
      var data, h, i, index, pickBuffer, result, w, _i, _ref;
      w = Math.abs((x2).operators("-",x1));
      h = Math.abs((y2).operators("-",y1));
      result = new Array();
      pickBuffer = this.getPickBuffer();
      data = new Uint8Array(((w).operators("*",h)).operators("*",4));
      gl = this.gl;
      pickBuffer.bind(gl);
      pickBuffer.viewport(gl);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.disable(gl.BLEND);
      this.render({
        picking: true
      });
      gl.readPixels(x1, y1, w, h, gl.RGBA, gl.UNSIGNED_BYTE, data);
      if (data.data) {
        data = data.data;
      }
      pickBuffer.unbind(gl);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.enable(gl.BLEND);
      for (i = _i = 0, _ref = data.length; _i <= _ref; i = _i += 4) {
        if (data[(i).operators("+",2)] > 0) {
          index = Enliven.decodePickingColor(data[i], data[(i).operators("+",1)], data[(i).operators("+",2)], data[(i).operators("+",3)]);
          if (index != null) {
            result.push(index);
          }
        }
      }
      return result;
    };

    Canvas.prototype.pickIndex = function(x, y) {
      return this.pickRegionalIndices(x, y, (x).operators("+",1), (y).operators("+",1))[0];
    };

    Canvas.prototype.initKeyboardState = function() {
      var _this = this;
      document.addEventListener('keydown', function(e) {
        return _this.keys[e.keyCode] = true;
      });
      return document.addEventListener('keyup', function(e) {
        return _this.keys[e.keyCode] = false;
      });
    };

    Canvas.prototype.render = function(options) {
      var _ref;
      if (options == null) {
        options = {};
      }
      return (_ref = this.scene) != null ? _ref.render(this.gl, options) : void 0;
    };

    Canvas.prototype.update = function(options) {
      var _ref;
      return (_ref = this.scene) != null ? _ref.update(this.gl, options) : void 0;
    };

    Canvas.prototype.setScene = function(sceneObject) {
      this.removeScene();
      gl.scene = this.scene = sceneObject;
      this.registerListeners();
      return this.scene.attach(gl);
    };

    Canvas.prototype.removeScene = function() {
      if (this.scene != null) {
        this.unregisterListeners();
        this.scene.detach(gl);
      }
      return this.scene = null;
    };

    Canvas.prototype.registerListeners = function() {
      var _this = this;
      if (!this.scene) {
        return;
      }
      if (this.mouse) {
        if (this.scene.mouse_pressed) {
          this.mouse.listen('press', function(evt) {
            return _this.scene.mouse_pressed(evt);
          });
        }
        if (this.scene.mouse_released) {
          this.mouse.listen('release', function(evt) {
            return _this.scene.mouse_released(evt);
          });
        }
        if (this.scene.mouse_clicked) {
          this.mouse.listen('click', function(evt) {
            return _this.scene.mouse_clicked(evt);
          });
        }
        if (this.scene.mouse_moved) {
          this.mouse.listen('move', function(evt) {
            return _this.scene.mouse_moved(evt);
          });
        }
        if (this.scene.mouse_entered) {
          this.mouse.listen('enter', function(evt) {
            return _this.scene.mouse_entered(evt);
          });
        }
        if (this.scene.mouse_exited) {
          this.mouse.listen('exit', function(evt) {
            return _this.scene.mouse_exited(evt);
          });
        }
        if (this.scene.mouse_dragged) {
          this.mouse.listen('drag', function(evt) {
            return _this.scene.mouse_dragged(evt);
          });
        }
        if (this.scene.mouse_rolled) {
          this.mouse.listen('wheel', function(evt) {
            return _this.scene.mouse_rolled(evt);
          });
        }
        if (this.scene.mouse_over) {
          this.mouse.listen('over', function(evt) {
            return _this.scene.mouse_over(evt);
          });
        }
      }
      if (this.keyboard) {
        if (this.scene.key_pressed) {
          this.keyboard.listen('press', function(evt) {
            return _this.scene.key_pressed(evt);
          });
        }
        if (this.scene.key_released) {
          this.keyboard.listen('release', function(evt) {
            return _this.scene.key_released(evt);
          });
        }
        if (this.scene.key_typed) {
          this.keyboard.listen('type', function(evt) {
            return _this.scene.key_typed(evt);
          });
        }
      }
      return true;
    };

    Canvas.prototype.unregisterListeners = function() {
      if (this.mouse) {
        this.mouse.stopListening();
      }
      if (this.keyboard) {
        return this.keyboard.stopListening();
      }
    };

    Canvas.prototype.renderLoop = function() {
      var frameCount, framesPerSecond, lastFpsTimeStamp, lastTimeStamp, nextFrame, startTime,
        _this = this;
      startTime = null;
      lastTimeStamp = startTime;
      lastFpsTimeStamp = startTime;
      framesPerSecond = 0;
      frameCount = 0;
      nextFrame = function(time) {
        if (startTime === null) {
          startTime = time;
        }
        window.requestAnimationFrame(nextFrame, _this.element);
        if (((time).operators("-",lastFpsTimeStamp)) >= 1000) {
          framesPerSecond = frameCount;
          frameCount = 0;
          lastFpsTimeStamp = time;
        }
        _this.update({
          startTime: startTime,
          timeStamp: time,
          elapsed: (time).operators("-",startTime),
          frameTime: (time).operators("-",lastTimeStamp),
          framesPerSecond: framesPerSecond
        });
        _this.render();
        ++frameCount;
        return lastTimeStamp = time;
      };
      return window.requestAnimationFrame(nextFrame, this.element);
    };

    return Canvas;

  })();

  window.Scene = Scene = (function(_super) {
    __extends(Scene, _super);

    function Scene() {
      this.models = [];
      this.lights = {};
      this.modelLabels = {};
      this.mvMatrixStack = [];
      this.options = {
        near: 0.1,
        far: 100.0
      };
      this.mvMatrix = new Mat4([]);
      this.pMatrix = new Mat4([]);
      this.camera = new Camera;
      this.init();
    }

    Scene.prototype.init = function() {};

    Scene.prototype.pushMvMatrix = function() {
      var copy;
      copy = this.mvMatrix.clone();
      this.mvMatrixStack.push(copy);
      return this.mvMatrix;
    };

    Scene.prototype.popMvMatrix = function() {
      if (this.mvMatrixStack.length === 0) {
        throw "Invalid popMatrix!";
      }
      return this.mvMatrix = this.mvMatrixStack.pop();
    };

    Scene.prototype.attach = function(gl, canvas) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      return gl.enable(gl.DEPTH_TEST);
    };

    Scene.prototype.dettach = function(gl, canvas) {};

    Scene.prototype.addLight = function(name, light) {
      return this.lights[name] = light;
    };

    Scene.prototype.getLight = function(name) {
      return this.lights[name];
    };

    Scene.prototype.removeLight = function(name) {
      return this.lights[name] = void 0;
    };

    Scene.prototype.addModel = function(modelObject, name) {
      if (name == null) {
        name = null;
      }
      this.models[modelObject.id] = modelObject;
      if (name !== null) {
        return this.modelLabels[name] = modelObject;
      }
    };

    Scene.prototype.removeModel = function(id) {
      if (__indexOf.call(this.models, id) < 0) {
        return false;
      }
      delete this.models[id];
      return true;
    };

    Scene.prototype.getModelId = function(name) {
      var _ref;
      return (_ref = this.modelLabels[name]) != null ? _ref : null;
    };

    Scene.prototype.getModel = function(name) {
      var id;
      if (name instanceof String) {
        id = getModelId(name);
      } else {
        id = name;
      }
      if (id in this.models) {
        return this.models[id];
      }
      return null;
    };

    Scene.prototype.getModels = function() {
      return this.models;
    };

    Scene.prototype.setCamera = function(camera) {
      this.camera = camera;
    };

    Scene.prototype.getPMatrix = function(gl) {
      if (this.camera !== null) {
        return this.camera.getProjectionMatrix();
      } else {
        return new Mat4([]).setPerspective(45, (gl.viewportWidth).operators("/",gl.viewportHeight), this.options.near, this.options.far);
      }
    };

    /*
    Reloads and resets the matrix stack. Meant to be called
    each frame, prior to rendering the scene. This is called
    by #render automatically. Returns the stack itself.
    */


    Scene.prototype.reloadMatrices = function(gl) {
      var camera, matrixStack;
      matrixStack = gl.matrixStack;
      camera = this.camera;
      matrixStack.reset();
      matrixStack.loadModelMatrix(new Mat4([]).setIdentity());
      matrixStack.loadViewMatrix(camera.getInverseTransformationMatrix());
      matrixStack.loadProjectionMatrix(camera.getProjectionMatrix());
      return matrixStack;
    };

    Scene.prototype.prepare = function(gl, options) {
      this.reloadMatrices(gl);
      gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
      return gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };

    Scene.prototype.render = function(gl, options) {
      var i, modelObj, _ref, _results;
      this.prepare(gl, options);
      this.pMatrix = gl.matrixStack.getProjectionMatrix();
      this.mvMatrix = gl.matrixStack.getModelViewMatrix();
      _ref = this.getModels();
      _results = [];
      for (i in _ref) {
        if (!__hasProp.call(_ref, i)) continue;
        modelObj = _ref[i];
        _results.push(modelObj.render(gl, options, this));
      }
      return _results;
    };

    Scene.prototype.update = function(gl, options) {
      var i, modelObj, _ref, _results;
      _ref = this.getModels();
      _results = [];
      for (i in _ref) {
        if (!__hasProp.call(_ref, i)) continue;
        modelObj = _ref[i];
        _results.push(modelObj.update(gl, options, this));
      }
      return _results;
    };

    return Scene;

  })(Component);

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
      return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) {
        return window.setTimeout(function() {
          return callback(new Date().getTime());
        }, (1000).operators("/",60));
      };
    })();
  }

  MatrixStack = (function() {
    function MatrixStack() {
      this.maxDepth = 0;
      this.matrices = {
        model: [new Mat4([])],
        view: [new Mat4([])],
        modelView: [new Mat4([])],
        projection: [new Mat4([])]
      };
      this.valid = {
        modelView: [true]
      };
      this.reset();
    }

    MatrixStack.prototype.reset = function() {
      return this.depth = 0;
    };

    MatrixStack.prototype.push = function() {
      var stack, type, _ref, _ref1;
      this.depth++;
      if (this.depth > this.maxDepth) {
        _ref = this.matrices;
        for (type in _ref) {
          if (!__hasProp.call(_ref, type)) continue;
          stack = _ref[type];
          while (stack.length <= this.depth) {
            stack.push(stack[(stack.length).operators("-",1)].clone());
          }
        }
        _ref1 = this.valid;
        for (type in _ref1) {
          if (!__hasProp.call(_ref1, type)) continue;
          stack = _ref1[type];
          while (stack.length <= this.depth) {
            stack.push(stack[(stack.length).operators("-",1)]);
          }
        }
        this.maxDepth = this.depth;
      }
      this.loadModelMatrix(this.matrices.model[(this.depth).operators("-",1)]);
      this.loadViewMatrix(this.matrices.view[(this.depth).operators("-",1)]);
      return this.loadProjectionMatrix(this.matrices.projection[(this.depth).operators("-",1)]);
    };

    MatrixStack.prototype.pop = function() {
      if (this.depth > 0) {
        return this.depth--;
      }
    };

    /*
    Replaces the current model matrix with the specified one.
    Updates the inverse model matrix, the modelview matrix, the inverse modelview matrix and the
    normal matrix.
    */


    MatrixStack.prototype.loadModelMatrix = function(other) {
      this.valid.modelView[this.depth] = false;
      return other.copyTo(this.getModelMatrix());
    };

    /*
    Replaces the current view matrix with the specified one.
    Updates the inverse view matrix, the modelview matrix, the inverse modelview matrix and the
    normal matrix.
    */


    MatrixStack.prototype.loadViewMatrix = function(other) {
      this.valid.modelView[this.depth] = false;
      return other.copyTo(this.getViewMatrix());
    };

    /*
    Replaces the current projection matrix with the specified one.
    Updates the inverse projection matrix.
    */


    MatrixStack.prototype.loadProjectionMatrix = function(other) {
      return other.copyTo(this.getProjectionMatrix());
    };

    MatrixStack.prototype.multModelMatrix = function(other) {
      this.valid.modelView[this.depth] = false;
      return this.getModelMatrix().multiplyBy(other);
    };

    /*
    The local model transformation matrix. Most models will manipulate this matrix.
    Multiplying an object-space coordinate by this matrix will result in a world-space coordinate.
    */


    MatrixStack.prototype.getModelMatrix = function() {
      return this.matrices.model[this.depth];
    };

    /*
    AKA the camera matrix. Multiplying a point in world space against the view matrix
    results in a point in eye space (e.g. relative to the eye, with the eye at the origin).
    */


    MatrixStack.prototype.getViewMatrix = function() {
      return this.matrices.view[this.depth];
    };

    /*
    AKA the screen matrix. Multiplying a point in eye space against the projection matrix results in a 4D
    vector in clip space. Dividing clip coordinates (XYZ) by the 4th component (W) yields a 3D vector in
    normalized device coordinates, where all components are in the range [-1,1]. These points are ultimately
    multiplied by screen dimensions to find a pixel position.
    */


    MatrixStack.prototype.getProjectionMatrix = function() {
      return this.matrices.projection[this.depth];
    };

    /*
    A combination of both model and view
    matrices, equivalent to mat4.multiply(view, model).
    
    Multiplying a point in object space by this matrix will effectively skip the world space transformation,
    resulting in a coordinate placed directly into eye space. This has the obvious advantage of being faster
    than performing the operation in two steps (model and then view).
    */


    MatrixStack.prototype.getModelViewMatrix = function() {
      if (this.valid.modelView[this.depth]) {
        return this.matrices.modelView[this.depth];
      } else {
        this.valid.modelView[this.depth] = true;
        return this.matrices.modelView[this.depth] = (this.getViewMatrix()).operators("*",this.getModelMatrix());
      }
    };

    return MatrixStack;

  })();

  livenUp = function() {
    var canvasElements, element, event, i, options, _i, _j, _len, _ref;
    canvasElements = window.document.getElementsByTagName('canvas');
    for (_i = 0, _len = canvasElements.length; _i < _len; _i++) {
      element = canvasElements[_i];
      if (element.getAttribute("data-enliven") === "true") {
        options = {};
        for (i = _j = 0, _ref = (element.attributes.length).operators("-",1); 0 <= _ref ? _j <= _ref : _j >= _ref; i = 0 <= _ref ? ++_j : --_j) {
          if (element.attributes[i].nodeName.indexOf("data-") === 0) {
            options[element.attributes[i].nodeName.substr(5)] = element.attributes[i].nodeValue;
          }
        }
        if (options.enliven) {
          element.enliven = new Canvas(element, options);
        }
      }
    }
    event = new CustomEvent('enliven');
    return this.dispatchEvent(event);
  };

  if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', livenUp, false);
  } else {
    window.attachEvent('onload', livenUp);
  }

  if (document.readyState === 'complete') {
    livenUp();
  }

}).call(this);
// Generated by CoffeeScript 1.6.2
(function() {
  var Framebuffer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __operators = Object.prototype.operators = function(operator, object) { switch (operator) {case '+': return this + object;case '-': return this - object;case '/':return this / object;case '*':return this * object;case '%':return this % object;case '^':return this ^ object;default:throw SyntaxError('Object does not support "' + operator + '" operator');}};

  window.Framebuffer = Framebuffer = (function(_super) {
    __extends(Framebuffer, _super);

    Framebuffer.prototype.options = {
      width: 512,
      height: 512
    };

    function Framebuffer(options) {
      var name, value;
      for (name in options) {
        if (!__hasProp.call(options, name)) continue;
        value = options[name];
        this.options[name] = value;
      }
    }

    Framebuffer.prototype.init = function(gl) {
      var attachment, format, handle, i, texture_options, _base, _ref;
      handle = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, handle);
      this.setHandle(gl, handle);
      handle.renderbuffer = gl.createRenderbuffer();
      gl.bindRenderbuffer(gl.RENDERBUFFER, handle.renderbuffer);
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.options.width, this.options.height);
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, handle.renderbuffer);
      gl.bindRenderbuffer(gl.RENDERBUFFER, null);
      if ((_base = this.options).colors == null) {
        _base.colors = [gl.RGBA];
      }
      handle.textures = [];
      attachment = gl.COLOR_ATTACHMENT0;
      _ref = this.options.colors;
      for (i in _ref) {
        if (!__hasProp.call(_ref, i)) continue;
        format = _ref[i];
        texture_options = {
          format: format,
          width: this.options.width,
          height: this.options.height,
          min_filter: gl.LINEAR_MIPMAP_NEAREST,
          mag_filter: gl.LINEAR,
          wrap_s: gl.CLAMP_TO_EDGE,
          wrap_t: gl.CLAMP_TO_EDGE,
          generate_mipmap: false
        };
        handle.textures[i] = new Texture(null, texture_options);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, handle.textures[i].getHandle(gl), 0);
        attachment++;
      }
      return this.checkStatus(gl);
    };

    Framebuffer.prototype.checkStatus = function(gl) {
      var status;
      status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      this.unbind(gl);
      switch (status) {
        case gl.FRAMEBUFFER_COMPLETE:
          break;
        case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
          throw new Error("Framebuffer: one or more attachments is incomplete. (gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT)");
          break;
        case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
          throw new Error("Framebuffer: there are no images attached to the framebuffer. (gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT)");
          break;
        case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
          throw new Error("Framebuffer: all attachments must have the same dimensions. (gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS)");
          break;
        case gl.FRAMEBUFFER_UNSUPPORTED:
          throw new Error("Framebuffer: the requested framebuffer layout is unsupported on this hardware. (gl.FRAMEBUFFER_UNSUPPORTED)");
          break;
        case 0x8cdb:
          throw new Error("Framebuffer: make sure the framebuffer has at least 1 texture attachment. (gl.FRAMEBUFFER_INCOMPLETE_DRAW_BUFFER)");
          break;
        default:
          throw new Error((("Framebuffer: an unknown error occurred. (").operators("+",status)).operators("+",")"));
      }
    };

    Framebuffer.prototype.viewport = function(gl) {
      return gl.viewport(0, 0, this.options.width, this.options.height);
    };

    Framebuffer.prototype.bind = function(gl, callback) {
      var handle;
      handle = this.getHandle(gl);
      if (handle === null) {
        this.init(gl);
        handle = this.getHandle(gl);
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, handle);
      if (callback) {
        callback.call(this);
        return this.unbind(gl);
      }
    };

    Framebuffer.prototype.unbind = function(gl) {
      return gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    };

    return Framebuffer;

  })(Component);

}).call(this);
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
// Generated by CoffeeScript 1.6.2
(function() {
  var Material, PickingMaterial, SimpleMaterial, TextureMaterial,
    __operators = Object.prototype.operators = function(operator, object) { switch (operator) {case '+': return this + object;case '-': return this - object;case '/':return this / object;case '*':return this * object;case '%':return this % object;case '^':return this ^ object;default:throw SyntaxError('Object does not support "' + operator + '" operator');}},
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Material = Material = (function() {
    Material.id = 0;

    Material.get = function() {
      return this.id++;
    };

    function Material(name, callback) {
      var layers;
      this.name = name != null ? name : "core";
      this.callback = callback != null ? callback : null;
      this.reset();
      if (typeof this.name === 'object') {
        layers = this.name;
        this.name = ("LayerMaterial_").operators("+",(Material.get()));
        this.setLayers(layers);
      }
    }

    Material.prototype.reset = function() {
      return this.shader = null;
    };

    Material.prototype.setLayers = function(layers) {
      this.layers = layers;
      this.reset();
      window.Enliven.ShaderSources[(("").operators("+",this.name)).operators("+",".vertex")] = this.generateLayerSource("vertex");
      return window.Enliven.ShaderSources[(("").operators("+",this.name)).operators("+",".fragment")] = this.generateLayerSource("fragment");
    };

    Material.prototype.generateLayerSource = function(type) {
      var calls, i, imports, layer, _ref;
      imports = [];
      calls = [];
      _ref = this.layers;
      for (i in _ref) {
        if (!__hasProp.call(_ref, i)) continue;
        layer = _ref[i];
        imports.push((((("import ").operators("+",layer)).operators("+",".")).operators("+",type)).operators("+",";"));
        calls.push((("").operators("+",layer)).operators("+",".apply();"));
      }
      return (((("").operators("+",(imports.join("\n")))).operators("+","\nvoid main(void){\n")).operators("+",(calls.join("\n")))).operators("+","\n}");
    };

    Material.prototype.getShader = function(gl) {
      if (!(this.shader instanceof ShaderProgram)) {
        this.shader = new ShaderProgram(this.name);
      }
      return this.shader;
    };

    Material.prototype.bindGlobals = function(gl) {
      var normalMatrix;
      this.shader.bindProperty(gl, 'ModelViewMatrix', gl.matrixStack.getModelViewMatrix());
      this.shader.bindProperty(gl, 'ProjectionMatrix', gl.scene.pMatrix);
      normalMatrix = gl.matrixStack.getModelViewMatrix().clone().toMat3().invert().transpose();
      return this.shader.bindProperty(gl, 'NormalMatrix', normalMatrix);
    };

    Material.prototype.bindProperties = function(gl, object, mesh) {
      var buffers;
      buffers = mesh.getBuffers();
      this.shader.bindProperty(gl, 'VertexPosition', buffers.vertexPositionBuffer);
      this.shader.bindProperty(gl, 'VertexColor', buffers.vertexColorBuffer);
      this.shader.bindProperty(gl, 'VertexTextureCoord', buffers.vertexTextureCoordBuffer);
      return this.shader.bindProperty(gl, 'VertexNormal', buffers.vertexNormalBuffer);
    };

    Material.prototype.apply = function(gl, object, mesh) {
      var shaderProgram;
      shaderProgram = this.getShader(gl);
      shaderProgram.use(gl);
      this.bindGlobals(gl);
      this.bindProperties(gl, object, mesh);
      if (this.callback !== null) {
        return this.callback.apply(this, [gl, object, mesh]);
      }
    };

    Material.prototype.remove = function(gl, object, mesh) {};

    return Material;

  })();

  window.PickingMaterial = PickingMaterial = (function(_super) {
    __extends(PickingMaterial, _super);

    PickingMaterial.instance = null;

    PickingMaterial.get = function() {
      return this.instance != null ? this.instance : this.instance = new PickingMaterial();
    };

    function PickingMaterial() {
      PickingMaterial.__super__.constructor.call(this, 'picking');
    }

    PickingMaterial.prototype.bindProperties = function(gl, object, mesh) {
      this.shader.bindProperty(gl, 'INDEX', object.id);
      return PickingMaterial.__super__.bindProperties.call(this, gl, object, mesh);
    };

    return PickingMaterial;

  })(Material);

  window.SimpleMaterial = SimpleMaterial = (function(_super) {
    __extends(SimpleMaterial, _super);

    function SimpleMaterial(color) {
      this.color = color;
      SimpleMaterial.__super__.constructor.call(this, 'core');
    }

    SimpleMaterial.prototype.bindProperties = function(gl, object, mesh) {
      this.shader.bindProperty(gl, 'Color', this.color);
      return SimpleMaterial.__super__.bindProperties.call(this, gl, object, mesh);
    };

    return SimpleMaterial;

  })(Material);

  window.TextureMaterial = TextureMaterial = (function(_super) {
    __extends(TextureMaterial, _super);

    TextureMaterial.bindTexture = function(gl, texture) {
      return texture.bind(gl);
    };

    TextureMaterial.unbindTexture = function(gl, texture) {
      return texture.unbind(gl);
    };

    TextureMaterial.bindTextureSampler = function(gl, shaderProgram) {
      return shaderProgram.bindProperty(gl, 'texture.TextureSampler', 0);
    };

    function TextureMaterial(texture) {
      this.texture = texture;
      if (!(this.texture instanceof Texture)) {
        this.texture = new Texture(this.texture);
      }
      TextureMaterial.__super__.constructor.call(this, ['core', 'texture']);
    }

    TextureMaterial.prototype.bindProperties = function(gl, object, mesh) {
      this.shader.bindProperty(gl, 'texture.TextureSampler', 0);
      return TextureMaterial.__super__.bindProperties.call(this, gl, object, mesh);
    };

    TextureMaterial.prototype.apply = function(gl, object, mesh) {
      this.texture.bind(gl);
      return TextureMaterial.__super__.apply.call(this, gl, object, mesh);
    };

    TextureMaterial.prototype.remove = function(gl, object, mesh) {
      TextureMaterial.__super__.remove.call(this, gl, object, mesh);
      return this.texture.unbind(gl);
    };

    return TextureMaterial;

  })(Material);

}).call(this);
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
// Generated by CoffeeScript 1.6.2
(function() {
  var Shader, ShaderVariable,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __operators = Object.prototype.operators = function(operator, object) { switch (operator) {case '+': return this + object;case '-': return this - object;case '/':return this / object;case '*':return this * object;case '%':return this % object;case '^':return this ^ object;default:throw SyntaxError('Object does not support "' + operator + '" operator');}},
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ShaderVariable = (function() {
    function ShaderVariable() {
      this.names = [];
      this.displayNames = [];
      this.type = null;
      this.typePublic = false;
      this.typeGlobal = false;
      this.typeQualifier = null;
      this.match = {
        0: '',
        offset: 0
      };
    }

    return ShaderVariable;

  })();

  window.Shader = Shader = (function(_super) {
    __extends(Shader, _super);

    function Shader(name, guid) {
      this.name = name;
      this.guid = guid;
      this.ready = false;
      this.importing = 0;
      if (this.guid === void 0) {
        this.guid = this.generateGuid();
      }
      this.imports = [this.name];
      this.variables = null;
      this.globals = [];
    }

    Shader.prototype.generateGuid = function() {
      var c, hash, i, name, _i, _ref;
      name = this.getPublicMangler();
      hash = 0;
      for (i = _i = 0, _ref = (name.length).operators("-",1); 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        c = name.charCodeAt(i);
        hash = ((((hash << 5)).operators("-",hash))).operators("+",c);
        hash = hash & hash;
      }
      return ('e').operators("+",Math.abs(hash));
    };

    Shader.prototype.getSource = function() {
      if (!this.ready) {
        this.load();
        this.compile();
      }
      return this.src;
    };

    Shader.prototype.load = function() {
      var element, k, source;
      if (Enliven.ShaderSources[this.name] !== void 0) {
        this.src = Enliven.ShaderSources[this.name];
        this.ready = true;
        return true;
      }
      element = document.getElementById(this.name);
      if (element === !null) {
        source = "";
        k = element.firstChild;
        while (k) {
          if (k.nodeType === 3) {
            source += k.textContent;
          }
          k = k.nextSibling;
        }
        this.src = Enliven.ShaderSources[this.name] = source;
        this.ready = true;
        return true;
      }
      return false;
      /*
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
      */

    };

    /*
    loaded: ->
      @ready = true
      return @compile()
    
    
    imported: (name) ->
      if name isnt undefined
        @importing--;
        console.log name
    */


    Shader.prototype.compile = function(main, srcBefore, srcAfter) {
      var importInfo, imports, _i, _len;
      if (main == null) {
        main = true;
      }
      if (srcBefore == null) {
        srcBefore = "";
      }
      if (srcAfter == null) {
        srcAfter = "";
      }
      if (!this.ready) {
        this.load();
      }
      this.main = null;
      this.src = this.mangle();
      this.src = ((srcBefore).operators("+",this.src)).operators("+",srcAfter);
      imports = this.findImports();
      for (_i = 0, _len = imports.length; _i < _len; _i++) {
        importInfo = imports[_i];
        this.importShader(importInfo);
      }
      if (main) {
        this.activateMain();
      }
      if (main) {
        this.resolveNames();
      }
      this.src = this.src.replace(/(\n){2,}/g, "\n");
      this.fireEvent('ready', {});
      return this.fireEvent('changed', {});
    };

    Shader.prototype.resolveNames = function() {
      var name, regexp, _i, _len, _ref, _results;
      _ref = this.imports;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        regexp = new RegExp((("(\W)?(").operators("+",(this.getName(name)))).operators("+",")\\."), "gm");
        _results.push(this.src = this.src.replace(regexp, ("$1").operators("+",(this.getPublicMangler(name)))));
      }
      return _results;
    };

    Shader.prototype.findImports = function() {
      var importName, imports, match, offsetEnd, offsetStart, rx, src;
      imports = [];
      rx = /import[\s\t\n]*(.+?);/;
      src = this.src;
      while (match = rx.exec(src)) {
        offsetStart = match.index;
        offsetEnd = (match.index).operators("+",match[0].length);
        importName = match[1];
        src = (src.slice(0, offsetStart)).operators("+",src.slice(offsetEnd));
        imports.push({
          name: importName,
          offset: [offsetStart, offsetEnd],
          match: match[0]
        });
      }
      return imports;
    };

    Shader.prototype.findVariables = function() {
      var STATE_COMMENT_MULTI, STATE_COMMENT_SINGLE, STATE_GLOBAL, STATE_NONE, STATE_PUBLIC, STATE_QUALIFIED, STATE_TYPED, ch, match, matching, offset, processToken, removeGlobals, src, state, token, variable, variables, _i, _len, _this;
      variables = [];
      src = this.src;
      STATE_NONE = 0;
      STATE_PUBLIC = 1;
      STATE_GLOBAL = 2;
      STATE_QUALIFIED = 4;
      STATE_TYPED = 8;
      STATE_COMMENT_SINGLE = 16;
      STATE_COMMENT_MULTI = 32;
      state = STATE_NONE;
      processToken = function(token) {
        if (token === '') {
          return;
        }
        if (state === STATE_NONE) {
          switch (token) {
            case 'public':
              state |= STATE_PUBLIC;
              return variable.typePublic = true;
            case 'global':
              state |= STATE_GLOBAL;
              return variable.typeGlobal = true;
            case 'varying':
            case 'uniform':
            case 'attribute':
              state |= STATE_QUALIFIED;
              return variable.typeQualifier = token;
          }
        } else if (state & STATE_TYPED) {
          variable.names || (variable.names = []);
          return variable.names.push(token.replace(/,/, ''));
        } else if (state & STATE_QUALIFIED) {
          state |= STATE_TYPED;
          return variable.type = token;
        } else if (state & STATE_PUBLIC || state & STATE_GLOBAL) {
          switch (token) {
            case 'varying':
            case 'uniform':
            case 'attribute':
              state |= STATE_QUALIFIED;
              return variable.typeQualifier = token;
            default:
              return state = STATE_NONE;
          }
        } else {
          throw new Error(("Unexpected state: ").operators("+",state));
        }
      };
      _this = this;
      removeGlobals = function(names) {
        var defined, global, name, verifiedNames, _i, _j, _len, _len1, _ref;
        verifiedNames = [];
        for (_i = 0, _len = names.length; _i < _len; _i++) {
          name = names[_i];
          defined = false;
          _ref = _this.globals;
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            global = _ref[_j];
            if (__indexOf.call(global.names, name) >= 0) {
              defined = true;
              break;
            }
          }
          if (!defined) {
            verifiedNames.push(name);
          }
        }
        return verifiedNames;
      };
      token = '';
      variable = new ShaderVariable();
      matching = [];
      match = {
        0: '',
        offset: 0
      };
      for (offset = _i = 0, _len = src.length; _i < _len; offset = ++_i) {
        ch = src[offset];
        match[0] += ch;
        if (ch === '\n' && state & STATE_COMMENT_SINGLE) {
          state ^= STATE_COMMENT_SINGLE;
          continue;
        }
        if (match[0].length >= 2 && match[0].indexOf('*/') === (match[0].length).operators("-",2) && state & STATE_COMMENT_MULTI) {
          state ^= STATE_COMMENT_MULTI;
          continue;
        }
        if (state & STATE_COMMENT_SINGLE || state & STATE_COMMENT_MULTI) {
          continue;
        }
        if (match[0].length >= 2 && match[0].indexOf('//') === (match[0].length).operators("-",2)) {
          token = token.replace(/\/$/, '');
          state |= STATE_COMMENT_SINGLE;
          continue;
        }
        if (match[0].length >= 2 && match[0].indexOf('/*') === (match[0].length).operators("-",2)) {
          token = token.replace(/\/$/, '');
          state |= STATE_COMMENT_MULTI;
          continue;
        }
        if (ch === ';') {
          processToken(token);
          if (state & STATE_TYPED) {
            variable.match = match;
            if (variable.typeGlobal) {
              variable.displayNames = removeGlobals(variable.names);
            } else {
              variable.displayNames = variable.names;
            }
            if (variable.names.length > 0) {
              variables.push(variable);
              if (variable.typeGlobal) {
                this.globals.push(variable);
              }
              variable = new ShaderVariable();
            }
          }
          state = STATE_NONE;
          match = {
            0: '',
            offset: offset
          };
          token = '';
        } else if (ch === '\n' || ch === ' ' || ch === '\t') {
          processToken(token);
          if (state === STATE_NONE) {
            match = {
              0: '',
              offset: offset
            };
          }
          token = '';
        } else {
          token += ch;
        }
      }
      return variables;
    };

    Shader.prototype.findFunctions = function() {
      var func, functions, match, offsetEnd, offsetStart, rx, signature, src;
      functions = [];
      rx = /(public[\s\t\n]+|)(\w+)[\s\t\n]+(\w+)[\s\t\n]*\([\s\t\n]*[\s\t\n]*(.*?)[\s\t\n]*\)[\s\t\n]*{/;
      src = this.src;
      while (match = rx.exec(src)) {
        offsetStart = match.index;
        offsetEnd = (match.index).operators("+",match[0].length);
        signature = match[4];
        offsetEnd += (this.scan(src.slice(offsetEnd), '}', '{').length).operators("+",1);
        func = src.slice(offsetStart, offsetEnd);
        src = (src.slice(0, offsetStart)).operators("+",src.slice(offsetEnd));
        functions.push({
          typePublic: !!match[1],
          signature: signature,
          full: func,
          type: match[2],
          name: match[3]
        });
      }
      return this.functions = functions;
    };

    Shader.prototype.scan = function(str, end, incr, decr, startIndex, singleLineComment, multiLineCommentStart, multiLineCommentEnd) {
      var ch, depth, i, inComment, result, _i, _ref;
      end = end || ')';
      incr = incr || '(';
      decr = decr || end;
      singleLineComment = singleLineComment || "//";
      multiLineCommentStart = multiLineCommentStart || "/*";
      multiLineCommentEnd = multiLineCommentEnd || "*/";
      startIndex = startIndex || 0;
      depth = 0;
      result = "";
      inComment = 0;
      for (i = _i = startIndex, _ref = (str.length).operators("-",1); startIndex <= _ref ? _i <= _ref : _i >= _ref; i = startIndex <= _ref ? ++_i : --_i) {
        ch = str[i];
        switch (ch) {
          case incr:
            if (!inComment) {
              depth++;
            }
            break;
          case decr:
            if (!inComment) {
              depth--;
            }
        }
        if (depth < 0) {
          break;
        }
        result += ch;
        if (result.length >= singleLineComment.length && result.substring((result.length).operators("-",singleLineComment.length), result.length) === singleLineComment) {
          inComment = 1;
        }
        if (inComment === 1 && ch === "\n") {
          inComment = 0;
        }
        if (!inComment && result.length >= multiLineCommentStart.length && result.substring((result.length).operators("-",multiLineCommentStart.length), result.length) === multiLineCommentStart) {
          inComment = 2;
        }
        if (inComment === 2 && result.length >= multiLineCommentEnd.length && result.substring((result.length).operators("-",multiLineCommentEnd.length), result.length) === multiLineCommentEnd) {
          inComment = 0;
        }
      }
      return result;
    };

    Shader.prototype.getName = function(name) {
      var pos;
      if (name == null) {
        name = this.name;
      }
      if ((pos = name.lastIndexOf(".")) !== -1) {
        name = name.substr(0, pos);
      }
      return name;
    };

    Shader.prototype.getPublicMangler = function(name) {
      var pos;
      if (name == null) {
        name = this.name;
      }
      if ((pos = name.lastIndexOf(".")) !== -1) {
        name = name.substr(0, pos);
      }
      name = name.replace(/\W+/, "_");
      return (("").operators("+",name)).operators("+","_");
    };

    Shader.prototype.getMangler = function() {
      var rand;
      rand = this.guid;
      return ((("").operators("+",rand)).operators("+","_")).operators("+",(this.getPublicMangler()));
    };

    Shader.prototype.mangle = function(currentSrc) {
      var mangle, mangledFunc, mangledName, mangledNames, mangledSignature, mangler, mangles, match, name, publicMangler, shaderName, src, variable, variableName, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2;
      src = this.src;
      publicMangler = this.getPublicMangler();
      mangler = this.getMangler();
      mangles = this.findFunctions();
      mangledNames = {};
      for (_i = 0, _len = mangles.length; _i < _len; _i++) {
        mangle = mangles[_i];
        if (mangle.typePublic) {
          mangledName = (publicMangler).operators("+",mangle.name);
        } else {
          mangledName = (mangler).operators("+",mangle.name);
        }
        mangledSignature = mangle.signature.replace(mangle.name, mangledName);
        mangledFunc = mangle.full.replace(mangle.signature, mangledSignature);
        mangledFunc = mangledFunc.replace(/public[\s\t\n]+/, '');
        src = src.replace(mangle.full, mangledFunc);
        mangledNames[mangle.name] = mangledName;
        if (mangle.name === "main") {
          this.main = mangledName;
        }
      }
      for (name in mangledNames) {
        if (!__hasProp.call(mangledNames, name)) continue;
        mangledName = mangledNames[name];
        while (match = new RegExp((("(^|\\W)").operators("+",name)).operators("+","(\\W|$)")).exec(src)) {
          src = src.replace(match[0], ((match[1]).operators("+",mangledName)).operators("+",match[2]));
        }
      }
      this.variables = {};
      shaderName = this.getName();
      mangles = this.findVariables();
      for (_j = 0, _len1 = mangles.length; _j < _len1; _j++) {
        mangle = mangles[_j];
        mangledNames = [];
        _ref = mangle.displayNames;
        for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
          name = _ref[_k];
          if (mangle.typeGlobal) {
            if (new RegExp((("").operators("+",name)).operators("+","(,|;)")).test(currentSrc)) {
              continue;
            }
            mangledName = name;
          } else if (mangle.typePublic) {
            mangledName = (publicMangler).operators("+",name);
          } else {
            mangledName = (mangler).operators("+",name);
          }
          mangledNames.push(mangledName);
          if ((_ref1 = mangle.typeQualifier) === 'uniform' || _ref1 === 'attribute') {
            if (mangle.typeGlobal) {
              variableName = name;
            } else {
              variableName = ((("").operators("+",shaderName)).operators("+",".")).operators("+",name);
            }
            this.variables[variableName] = {
              label: name,
              name: mangledName,
              type: mangle.type,
              qualifier: mangle.typeQualifier
            };
          }
        }
        if (mangledNames.length > 0) {
          mangledNames = mangledNames.join(', ');
          variable = [mangle.typeQualifier, mangle.type, mangledNames].join(' ');
          variable += ';';
        } else {
          variable = "";
        }
        if (mangle.typeGlobal) {
          src = ((variable).operators("+","\n")).operators("+",src);
          variable = "";
        }
        src = src.replace(mangle.match[0], variable);
        if (mangle.typeGlobal) {
          continue;
        }
        _ref2 = mangle.names;
        for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
          name = _ref2[_l];
          if (mangle.typePublic) {
            mangledName = (publicMangler).operators("+",name);
          } else {
            mangledName = (mangler).operators("+",name);
          }
          while (match = new RegExp((("(^|\\W)").operators("+",name)).operators("+","(\\W|$)")).exec(src)) {
            src = src.replace(match[0], ((match[1]).operators("+",mangledName)).operators("+",match[2]));
          }
        }
      }
      return src;
    };

    Shader.prototype.activateMain = function() {
      var match, src;
      src = this.src;
      if (this.main) {
        while (match = new RegExp((("(^|\\W)").operators("+",this.main)).operators("+","(\\W|$)")).exec(src)) {
          src = src.replace(match[0], ((match[1]).operators("+","main")).operators("+",match[2]));
        }
        return this.src = src;
      }
    };

    Shader.prototype.mergeVariables = function(shaderSource) {
      var name, shaderName, variable, _ref;
      shaderName = shaderSource.getName();
      _ref = shaderSource.variables;
      for (name in _ref) {
        if (!__hasProp.call(_ref, name)) continue;
        variable = _ref[name];
        this.variables[name] = variable;
      }
      return this.variables;
    };

    Shader.prototype.mergeGlobals = function(shaderSource) {
      var global, _i, _len, _ref;
      _ref = shaderSource.globals;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        global = _ref[_i];
        if (global.name) {
          this.globals.push(global);
        }
      }
      return this.globals;
    };

    Shader.prototype.mergeImports = function(importedShader) {
      var imported, _i, _len, _ref;
      _ref = importedShader.imports;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        imported = _ref[_i];
        if (__indexOf.call(this.imports, imported) < 0) {
          this.imports.push(imported);
        }
      }
      return this.imports;
    };

    Shader.prototype.importShader = function(importInfo) {
      var global, imported, importedShader, posAfterBegin, posBeforeEnd, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      if (_ref = importInfo.name, __indexOf.call(this.imports, _ref) >= 0) {
        this.src = this.src.replace(importInfo.match, '');
        return;
      }
      importedShader = new Shader(importInfo.name);
      _ref1 = this.imports;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        imported = _ref1[_i];
        importedShader.imports.push(imported);
      }
      _ref2 = this.globals;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        global = _ref2[_j];
        importedShader.globals.push(global);
      }
      posBeforeEnd = this.src.search(importInfo.match);
      posAfterBegin = (posBeforeEnd).operators("+",importInfo.match.length);
      importedShader.compile(false, this.src.substr(0, posBeforeEnd), this.src.substr(posAfterBegin));
      this.src = importedShader.getSource();
      this.mergeImports(importedShader);
      return this.mergeVariables(importedShader);
    };

    return Shader;

  })(Component);

}).call(this);
// Generated by CoffeeScript 1.6.2
(function() {
  var ShaderProgram,
    __hasProp = {}.hasOwnProperty,
    __operators = Object.prototype.operators = function(operator, object) { switch (operator) {case '+': return this + object;case '-': return this - object;case '/':return this / object;case '*':return this * object;case '%':return this % object;case '^':return this ^ object;default:throw SyntaxError('Object does not support "' + operator + '" operator');}};

  window.ShaderProgram = ShaderProgram = (function() {
    ShaderProgram.current = null;

    function ShaderProgram(name) {
      this.name = name;
      this.reset();
    }

    ShaderProgram.prototype.reset = function() {
      this.shaderProgram = null;
      this.vertexShader = null;
      return this.fragmentShader = null;
    };

    ShaderProgram.prototype.use = function(gl) {
      var program;
      program = this.getShaderProgram(gl);
      ShaderProgram.current = this;
      return gl.useProgram(program);
    };

    ShaderProgram.prototype.setOptions = function(options) {
      var name, value, _results;
      _results = [];
      for (name in options) {
        if (!__hasProp.call(options, name)) continue;
        value = options[name];
        _results.push(this[name] = value);
      }
      return _results;
    };

    ShaderProgram.prototype.bindProperties = function(gl, properties) {
      var name, value, _results;
      _results = [];
      for (name in properties) {
        if (!__hasProp.call(properties, name)) continue;
        value = properties[name];
        _results.push(this.bindProperty(gl, name, value));
      }
      return _results;
    };

    ShaderProgram.prototype.bindProperty = function(gl, name, value) {
      var n, property, shaderProgram, v;
      if (typeof value === 'Object' && !(value instanceof Array)) {
        for (n in value) {
          if (!__hasProp.call(value, n)) continue;
          v = value[n];
          this.bindProperty(gl(((("").operators("+",name)).operators("+",".")).operators("+",n), v));
        }
        return true;
      }
      shaderProgram = this.getShaderProgram(gl);
      if (!(name in shaderProgram.properties && value !== void 0)) {
        return false;
      }
      property = shaderProgram.properties[name];
      switch (property.qualifier) {
        case "uniform":
          if (value instanceof BaseMatrix) {
            value = value.elements;
          }
          switch (property.type) {
            case 'float':
              return gl.uniform1f(property.location, value);
            case 'bool':
            case 'int':
              return gl.uniform1i(property.location, value);
            case 'vec2':
              return gl.uniform2fv(property.location, value);
            case 'vec3':
              return gl.uniform3fv(property.location, value);
            case 'vec4':
              return gl.uniform4fv(property.location, value);
            case 'bvec2':
            case 'ivec2':
              return gl.uniform2iv(property.location, value);
            case 'bvec3':
            case 'ivec3':
              return gl.uniform3iv(property.location, value);
            case 'bvec4':
            case 'ivec4':
              return gl.uniform4iv(property.location, value);
            case 'mat2':
              return gl.uniformMatrix2fv(property.location, false, value);
            case 'mat3':
              return gl.uniformMatrix3fv(property.location, false, value);
            case 'mat4':
              return gl.uniformMatrix4fv(property.location, false, value);
            case 'sampler2D':
            case 'samplerCube':
              return gl.uniform1i(property.location, value);
            default:
              throw new Error(("Unexpected variable type: ").operators("+",property.type));
          }
          /*
          switch property.type
            when "mat4"
              gl.uniformMatrix4fv(property.location, false, value);
            when "sampler2D"
              gl.uniform1i property.location, 0
            when "float"
              gl.uniform1f property.location, value
          */

          break;
        case "attribute":
          return this.bindBuffer(gl, property, value);
      }
    };

    ShaderProgram.prototype.bindBuffer = function(gl, property, value) {
      var buffer, hash;
      if (value instanceof WebGLBuffer) {
        buffer = value;
      } else if ((value.hash != null) && this.buffers[value.hash] instanceof WebGLBuffer) {
        buffer = this.buffers[value.hash];
      } else {
        if (value instanceof Matrix) {
          value = value.elements;
        }
        hash = this.getArrayHash(value);
        value.hash = hash;
        if (this.buffers[hash] instanceof WebGLBuffer) {
          buffer = this.buffers[hash];
        } else {
          buffer = this.buffers[hash] = this.createPropertyBuffer(gl, property, value);
        }
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      return gl.vertexAttribPointer(property.location, buffer.itemSize, gl.FLOAT, false, 0, 0);
    };

    ShaderProgram.prototype.getArrayHash = function(value) {
      var c, hash, i, str, _i, _ref;
      hash = 0;
      str = JSON.stringify(value);
      if (str.length === 0) {
        return hash;
      }
      for (i = _i = 0, _ref = (str.length).operators("-",1); 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        c = str.charCodeAt(i);
        hash = ((((hash << 5)).operators("-",hash))).operators("+",c);
        hash |= 0;
      }
      return hash;
    };

    ShaderProgram.prototype.buffers = {};

    ShaderProgram.prototype.createPropertyBuffer = function(gl, property, value) {
      var buffer, result, size;
      result = /(mat|vec)([0-9])/.exec(property.type);
      size = result[2];
      switch (result[1]) {
        case "vec":
          buffer = ShaderProgram.createBuffer(gl, value, size);
          break;
        default:
          throw "Unsupported buffer type";
      }
      return buffer;
    };

    ShaderProgram.createBuffer = function(gl, data, size, dataType, type) {
      var buffer;
      if (size == null) {
        size = 3;
      }
      if (dataType == null) {
        dataType = Float32Array;
      }
      if (type == null) {
        type = gl.ARRAY_BUFFER;
      }
      buffer = gl.createBuffer();
      gl.bindBuffer(type, buffer);
      gl.bufferData(type, new dataType(data), gl.STATIC_DRAW);
      buffer.itemSize = size;
      buffer.numItems = (data.length).operators("/",size);
      return buffer;
    };

    ShaderProgram.prototype.getShaderProgram = function(gl, recompile) {
      if (recompile == null) {
        recompile = false;
      }
      if (recompile || this.shaderProgram === null) {
        this.shaderProgram = this.createShaderProgram(gl);
      }
      return this.shaderProgram;
    };

    ShaderProgram.prototype.getVertexShader = function() {
      if (this.vertexShader === null) {
        this.vertexShader = new Shader((("").operators("+",this.name)).operators("+",".vertex"));
      }
      return this.vertexShader;
    };

    ShaderProgram.prototype.getFragmentShader = function() {
      if (this.fragmentShader === null) {
        this.fragmentShader = new Shader((("").operators("+",this.name)).operators("+",".fragment"));
      }
      return this.fragmentShader;
    };

    ShaderProgram.prototype.createShaderProgram = function(gl) {
      var fragmentShader, fs, name, shaderParser, shaderProgram, variable, vertexShader, vs, _i, _len, _ref, _ref1;
      vertexShader = ("precision mediump float;\n\n").operators("+",(this.getVertexShader().getSource()));
      fragmentShader = ("precision mediump float;\n\n").operators("+",(this.getFragmentShader().getSource()));
      shaderProgram = gl.createProgram();
      vs = this.compileShader(gl, vertexShader, gl.VERTEX_SHADER);
      fs = this.compileShader(gl, fragmentShader, gl.FRAGMENT_SHADER);
      gl.attachShader(shaderProgram, vs);
      gl.attachShader(shaderProgram, fs);
      gl.linkProgram(shaderProgram);
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.debug(gl.getProgramInfoLog(shaderProgram));
        gl.deleteProgram(shaderProgram);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        return null;
      }
      gl.useProgram(shaderProgram);
      shaderProgram.properties = {};
      _ref = [this.vertexShader, this.fragmentShader];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        shaderParser = _ref[_i];
        _ref1 = shaderParser.variables;
        for (name in _ref1) {
          if (!__hasProp.call(_ref1, name)) continue;
          variable = _ref1[name];
          shaderProgram.properties[name] = variable;
          shaderProgram.properties[name].locationName = name;
          switch (variable.qualifier) {
            case "attribute":
              shaderProgram.properties[name].location = gl.getAttribLocation(shaderProgram, variable.name);
              gl.enableVertexAttribArray(shaderProgram.properties[name].location);
              break;
            case "uniform":
              shaderProgram.properties[name].location = gl.getUniformLocation(shaderProgram, variable.name);
          }
        }
      }
      return shaderProgram;
    };

    ShaderProgram.prototype.compileShader = function(gl, source, type) {
      var glShader;
      glShader = gl.createShader(type);
      gl.shaderSource(glShader, source);
      gl.compileShader(glShader);
      if (!gl.getShaderParameter(glShader, gl.COMPILE_STATUS)) {
        console.debug(gl.getShaderInfoLog(glShader));
        gl.deleteShader(glShader);
        return null;
      }
      return glShader;
    };

    return ShaderProgram;

  })();

}).call(this);
// Generated by CoffeeScript 1.6.2
(function() {
  var CuboidMesh, Mesh, PyramidMesh, SphereMesh, SquareMesh,
    __operators = Object.prototype.operators = function(operator, object) { switch (operator) {case '+': return this + object;case '-': return this - object;case '/':return this / object;case '*':return this * object;case '%':return this % object;case '^':return this ^ object;default:throw SyntaxError('Object does not support "' + operator + '" operator');}},
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Mesh = Mesh = (function() {
    function Mesh() {
      this.vertexPositions = [];
      this.vertexColors = [];
      this.vertexIndices = null;
      this.vertexTextureCoords = [];
      this.vertexNormals = null;
      this.buffers = null;
      this.drawMode = 'GL_TRIANGLES';
      this.material = 'default';
      this._bounds = {
        left: new Vec3([]),
        right: new Vec3([]),
        top: new Vec3([]),
        bottom: new Vec3([]),
        front: new Vec3([]),
        back: new Vec3([]),
        center: new Vec3([]),
        width: 0,
        height: 0,
        depth: 0,
        radius: 0
      };
      this.init();
      this.recalculateBounds();
    }

    Mesh.prototype.init = function() {};

    Mesh.prototype.getBuffers = function(gl) {
      if (this.buffers === null) {
        this.initBuffers(gl);
      }
      return this.buffers;
    };

    Mesh.prototype.initBuffers = function(gl) {
      return this.buffers = {
        vertexPositionBuffer: this.createArrayBuffer(gl, this.vertexPositions),
        vertexNormalBuffer: this.createArrayBuffer(gl, this.vertexNormals),
        vertexColorBuffer: this.createArrayBuffer(gl, this.vertexColors, 4),
        vertexIndexBuffer: this.createArrayBuffer(gl, this.vertexIndices, 1, Uint16Array, gl.ELEMENT_ARRAY_BUFFER),
        vertexTextureCoordBuffer: this.createArrayBuffer(gl, this.vertexTextureCoords, 2)
      };
    };

    Mesh.prototype.createArrayBuffer = function(gl, vertices, size, dataType, type) {
      var buffer;
      if (size == null) {
        size = 3;
      }
      if (dataType == null) {
        dataType = Float32Array;
      }
      if (type == null) {
        type = gl.ARRAY_BUFFER;
      }
      if (vertices === null) {
        return null;
      }
      buffer = gl.createBuffer();
      gl.bindBuffer(type, buffer);
      gl.bufferData(type, new dataType(vertices), gl.STATIC_DRAW);
      buffer.itemSize = size;
      buffer.numItems = (vertices.length).operators("/",size);
      return buffer;
    };

    Mesh.prototype.render = function(gl, object, material) {
      var buffers;
      buffers = this.getBuffers(gl);
      material.apply(gl, object, this);
      if (buffers.vertexIndexBuffer !== null) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.vertexIndexBuffer);
        gl.drawElements(gl.TRIANGLES, buffers.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
      } else {
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, buffers.vertexPositionBuffer.numItems);
      }
      return material.remove(gl, object, this);
    };

    Mesh.prototype.recalculateBounds = function() {
      var back, biggest, bottom, center, depth, front, height, i, left, position, right, top, width, _i, _ref, _ref1, _ref2;
      _ref = [this._bounds.left, this._bounds.right, this._bounds.top, this._bounds.bottom, this._bounds.front, this._bounds.back, this._bounds.center], left = _ref[0], right = _ref[1], top = _ref[2], bottom = _ref[3], front = _ref[4], back = _ref[5], center = _ref[6];
      position = new Vec3([]);
      biggest = 0;
      for (i = _i = 0, _ref1 = (this.vertexPositions.length).operators("-",1); _i < _ref1; i = _i += 3) {
        position.e(0, this.vertexPositions[i]);
        position.e(1, this.vertexPositions[(i).operators("+",1)]);
        position.e(2, this.vertexPositions[(i).operators("+",2)]);
        if (i === 0) {
          position.copyTo(left);
          position.copyTo(right);
          position.copyTo(top);
          position.copyTo(bottom);
          position.copyTo(front);
          position.copyTo(back);
        } else {
          if (position.e(0) < left.e(0)) {
            position.copyTo(left);
          }
          if (position.e(0) > right.e(0)) {
            position.copyTo(right);
          }
          if (position.e(1) < bottom.e(1)) {
            position.copyTo(bottom);
          }
          if (position.e(1) > top.e(1)) {
            position.copyTo(top);
          }
          if (position.e(2) < back.e(2)) {
            position.copyTo(back);
          }
          if (position.e(2) > front.e(2)) {
            position.copyTo(front);
          }
        }
      }
      width = (right.e(0)).operators("-",left.e(0));
      height = (top.e(1)).operators("-",bottom.e(1));
      depth = (front.e(2)).operators("-",back.e(2));
      biggest = (width > height && width > depth ? width : height > depth ? height : depth);
      center.e(0, (left.e(0)).operators("+",(width).operators("*",0.5)));
      center.e(1, (bottom.e(1)).operators("+",(height).operators("*",0.5)));
      center.e(2, (back.e(2)).operators("+",(depth).operators("*",0.5)));
      if (width < 0.0001) {
        width = 0.0001;
      }
      if (height < 0.0001) {
        height = 0.0001;
      }
      if (depth < 0.0001) {
        depth = 0.0001;
      }
      _ref2 = [width, height, depth], this._bounds.width = _ref2[0], this._bounds.height = _ref2[1], this._bounds.depth = _ref2[2];
      this._bounds.radius = (biggest).operators("/",2);
      return this._bounds;
    };

    Mesh.prototype.getBounds = function() {
      var copy, name, value, _ref;
      copy = {};
      _ref = this._bounds;
      for (name in _ref) {
        if (!__hasProp.call(_ref, name)) continue;
        value = _ref[name];
        copy[name] = value;
      }
      return copy;
    };

    return Mesh;

  })();

  window.CuboidMesh = CuboidMesh = (function(_super) {
    __extends(CuboidMesh, _super);

    function CuboidMesh(width, height, depth) {
      this.width = width != null ? width : 1;
      this.height = height != null ? height : 1;
      this.depth = depth != null ? depth : 1;
      CuboidMesh.__super__.constructor.apply(this, arguments);
    }

    CuboidMesh.prototype.init = function() {
      var color, colors, depth, height, i, j, unpackedColors, width, _i;
      depth = (this.depth).operators("/",2);
      height = (this.height).operators("/",2);
      width = (this.width).operators("/",2);
      this.vertexPositions = [-width, -height, depth, width, -height, depth, width, height, depth, -width, height, depth, -width, -height, -depth, -width, height, -depth, width, height, -depth, width, -height, -depth, -width, height, -depth, -width, height, depth, width, height, depth, width, height, -depth, -width, -height, -depth, width, -height, -depth, width, -height, depth, -width, -height, depth, width, -height, -depth, width, height, -depth, width, height, depth, width, -height, depth, -width, -height, -depth, -width, -height, depth, -width, height, depth, -width, height, -depth];
      colors = [[1.0, 0.0, 0.0, 1.0], [1.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0], [1.0, 0.5, 0.5, 1.0], [1.0, 0.0, 1.0, 1.0], [0.0, 0.0, 1.0, 1.0]];
      unpackedColors = [];
      for (i in colors) {
        if (!__hasProp.call(colors, i)) continue;
        color = colors[i];
        for (j = _i = 0; _i <= 3; j = ++_i) {
          unpackedColors = unpackedColors.concat(color);
        }
      }
      this.vertexColors = unpackedColors;
      this.vertexIndices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];
      this.vertexTextureCoords = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];
      return this.vertexNormals = [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0];
    };

    return CuboidMesh;

  })(Mesh);

  window.SphereMesh = SphereMesh = (function(_super) {
    __extends(SphereMesh, _super);

    function SphereMesh(radius, latitudeBands, longitudeBands) {
      this.radius = radius;
      this.latitudeBands = latitudeBands != null ? latitudeBands : 30;
      this.longitudeBands = longitudeBands != null ? longitudeBands : 30;
      SphereMesh.__super__.constructor.apply(this, arguments);
    }

    SphereMesh.prototype.init = function() {
      var cosPhi, cosTheta, first, latNumber, longNumber, phi, second, sinPhi, sinTheta, theta, u, v, x, y, z, _i, _j, _k, _ref, _ref1, _ref2, _results;
      this.vertexNormals = [];
      for (latNumber = _i = 0, _ref = this.latitudeBands; 0 <= _ref ? _i <= _ref : _i >= _ref; latNumber = 0 <= _ref ? ++_i : --_i) {
        theta = ((latNumber).operators("*",Math.PI)).operators("/",this.latitudeBands);
        sinTheta = Math.sin(theta);
        cosTheta = Math.cos(theta);
        for (longNumber = _j = 0, _ref1 = this.longitudeBands; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; longNumber = 0 <= _ref1 ? ++_j : --_j) {
          phi = (((longNumber).operators("*",2)).operators("*",Math.PI)).operators("/",this.longitudeBands);
          sinPhi = Math.sin(phi);
          cosPhi = Math.cos(phi);
          x = (cosPhi).operators("*",sinTheta);
          y = cosTheta;
          z = (sinPhi).operators("*",sinTheta);
          u = (1).operators("-",((longNumber).operators("/",this.longitudeBands)));
          v = (1).operators("-",((latNumber).operators("/",this.latitudeBands)));
          this.vertexNormals.push(x);
          this.vertexNormals.push(y);
          this.vertexNormals.push(z);
          this.vertexTextureCoords.push(u);
          this.vertexTextureCoords.push(v);
          this.vertexPositions.push((this.radius).operators("*",x));
          this.vertexPositions.push((this.radius).operators("*",y));
          this.vertexPositions.push((this.radius).operators("*",z));
        }
      }
      this.vertexIndices = [];
      _results = [];
      for (latNumber = _k = 0, _ref2 = (this.latitudeBands).operators("-",1); 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; latNumber = 0 <= _ref2 ? ++_k : --_k) {
        _results.push((function() {
          var _l, _ref3, _results1;
          _results1 = [];
          for (longNumber = _l = 0, _ref3 = (this.longitudeBands).operators("-",1); 0 <= _ref3 ? _l <= _ref3 : _l >= _ref3; longNumber = 0 <= _ref3 ? ++_l : --_l) {
            first = (((latNumber).operators("*",((this.longitudeBands).operators("+",1))))).operators("+",longNumber);
            second = ((first).operators("+",this.longitudeBands)).operators("+",1);
            this.vertexIndices.push(first);
            this.vertexIndices.push(second);
            this.vertexIndices.push((first).operators("+",1));
            this.vertexIndices.push(second);
            this.vertexIndices.push((second).operators("+",1));
            _results1.push(this.vertexIndices.push((first).operators("+",1)));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    return SphereMesh;

  })(Mesh);

  window.PyramidMesh = PyramidMesh = (function(_super) {
    __extends(PyramidMesh, _super);

    function PyramidMesh(width, height, depth) {
      this.width = width != null ? width : 1;
      this.height = height != null ? height : 1;
      this.depth = depth != null ? depth : 1;
      PyramidMesh.__super__.constructor.apply(this, arguments);
    }

    PyramidMesh.prototype.init = function() {
      var depth, height, width;
      depth = (this.depth).operators("/",2);
      height = (this.height).operators("/",2);
      width = (this.width).operators("/",2);
      this.vertexPositions = [0.0, height, 0.0, -width, -height, depth, width, -height, depth, 0.0, height, 0.0, width, -height, depth, width, -height, -depth, 0.0, height, 0.0, width, -height, -depth, -width, -height, -depth, 0.0, height, 0.0, -width, -height, -depth, -width, -height, depth];
      return this.vertexColors = [1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0];
      /*
      @vertexIndices = [
        0, 1, 2,      0, 2, 3,    # Front face
        4, 5, 6,      4, 6, 7,    # Back face
        8, 9, 10,     8, 10, 11,  # Top face
        12, 13, 14,   12, 14, 15, # Bottom face
        16, 17, 18,   16, 18, 19, # Right face
        20, 21, 22,   20, 22, 23  # Left face
      ]
      
      @vertexTextureCoords = [
        # Front face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
      
        # Back face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
      
        # Top face
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
      
        # Bottom face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
      
        # Right face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
      
        # Left face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
      ]
      
      @vertexNormals = [
        # Front face
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,
      
        # Back face
         0.0,  0.0, -1.0,
         0.0,  0.0, -1.0,
         0.0,  0.0, -1.0,
         0.0,  0.0, -1.0,
      
        # Top face
         0.0,  1.0,  0.0,
         0.0,  1.0,  0.0,
         0.0,  1.0,  0.0,
         0.0,  1.0,  0.0,
      
        # Bottom face
         0.0, -1.0,  0.0,
         0.0, -1.0,  0.0,
         0.0, -1.0,  0.0,
         0.0, -1.0,  0.0,
      
        # Right face
         1.0,  0.0,  0.0,
         1.0,  0.0,  0.0,
         1.0,  0.0,  0.0,
         1.0,  0.0,  0.0,
      
        # Left face
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
      ]
      */

    };

    return PyramidMesh;

  })(Mesh);

  window.SquareMesh = SquareMesh = (function(_super) {
    __extends(SquareMesh, _super);

    function SquareMesh(size) {
      this.size = size != null ? size : 1;
      SquareMesh.__super__.constructor.apply(this, arguments);
    }

    SquareMesh.prototype.init = function() {
      var size;
      size = (this.size).operators("/",2);
      return this.vertexPositions = [size, size, 0.0, -size, size, 0.0, size, -size, 0.0, -size, -size, 0.0];
    };

    return SquareMesh;

  })(Mesh);

  window.TriangleMesh = SquareMesh = (function(_super) {
    __extends(SquareMesh, _super);

    function SquareMesh(size) {
      this.size = size != null ? size : 1;
      SquareMesh.__super__.constructor.apply(this, arguments);
    }

    SquareMesh.prototype.init = function() {
      var size;
      size = (this.size).operators("/",2);
      this.vertexPositions = [0.0, size, 0.0, -size, -size, 0.0, size, -size, 0.0];
      return this.vertexColors = [1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0];
    };

    return SquareMesh;

  })(Mesh);

}).call(this);
// Generated by CoffeeScript 1.6.2
(function() {
  var Geometry,
    __operators = Object.prototype.operators = function(operator, object) { switch (operator) {case '+': return this + object;case '-': return this - object;case '/':return this / object;case '*':return this * object;case '%':return this % object;case '^':return this ^ object;default:throw SyntaxError('Object does not support "' + operator + '" operator');}};

  window.Geometry = Geometry = {};

  Geometry.Plane = (function() {
    function Plane() {
      this.point = new Vec3([]);
      this.normal = new Vec3([]);
      this.d = 0.0;
      if (arguments.length > 0) {
        this.set.apply(this, arguments);
      }
    }

    Plane.prototype.set = function() {
      var normal, point, points, tmp1, tmp2;
      if (arguments.length === 2) {
        point = arguments[0];
        normal = arguments[1];
        this.normal.copyFrom(normal).normalize();
        this.d = (normal).operators("*",point);
      } else if (arguments.length === 3) {
        points = arguments;
        tmp1 = (points[1]).operators("-",points[0]);
        tmp2 = (points[2]).operators("-",points[0]);
        this.normal = (tmp1(x(tmp2))).normalize();
        this.d = -((this.normal).operators("*",points[0]));
      }
      return this.point = (this.normal).operators("^>",this.d);
    };

    Plane.prototype.intersectRayPoint = function(orign, direction) {
      var denom, point, t;
      denom = (this.normal).operators("*",direction);
      if (Math.abs(denom < 0.00001)) {
        return false;
      }
      t = (-((this.d).operators("+",((this.normal).operators("*",orign))))).operators("/",denom);
      if (t <= 0) {
        return false;
      }
      point = (orign).operators("+",((direction).operators("*",t)));
      return point;
    };

    return Plane;

  })();

}).call(this);
// Generated by CoffeeScript 1.6.2
(function() {
  var Model, ModelGroup, ModelObject,
    __operators = Object.prototype.operators = function(operator, object) { switch (operator) {case '+': return this + object;case '-': return this - object;case '/':return this / object;case '*':return this * object;case '%':return this % object;case '^':return this ^ object;default:throw SyntaxError('Object does not support "' + operator + '" operator');}},
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Model = Model = (function() {
    var LOCAL_RIGHT, LOCAL_UP, LOCAL_VIEW, _dirQuat, _dirRightVec, _dirUpVec, _dirVec;

    Model._idCounter = 0;

    LOCAL_VIEW = new Vec3([0, 0, -1]);

    LOCAL_RIGHT = new Vec3([1, 0, 0]);

    LOCAL_UP = new Vec3([0, 1, 0]);

    function Model(options) {
      this.id = Model._idCounter++;
      this.rotation = new Quat([]).setIdentity();
      this._position = new Vec3([]);
      this.matrices = {
        mv: new Mat4([]).setIdentity(),
        imv: new Mat4([]).setIdentity(),
        n: new Mat3([]).setIdentity()
      };
      this.reset();
      this._isValid = false;
      this._viewVector = new Vec3([]);
      this._upVector = new Vec3([]);
      this._rightVector = new Vec3([]);
      if (options) {
        if (options.position) {
          this._position = options.position;
        }
        if (options.direction) {
          this.direction = options.direction;
        }
      }
      this.init();
    }

    Model.prototype.init = function() {};

    Model.prototype.reset = function() {
      this._position = new Vec3([0, 0, 0]);
      return this.rotation = new Quat([0, 0, 0, 1]);
    };

    _dirVec = new Vec3([]);

    _dirRightVec = new Vec3([]);

    _dirUpVec = new Vec3([]);

    _dirQuat = new Quat([]);

    Model.prototype.getDirection = function() {
      if (!this.isValid()) {
        this.validate();
      }
      return this._viewVector;
    };

    Model.prototype.setDirection = function(dir) {
      var rotquat, vec;
      dir.copyTo(_dirVec);
      vec = _dirVec;
      vec.normalize();
      /*
      if @_fixedYaw
        # negating so that right, up, vec is right-handed
        vec3.negate()
        right = vec3.normalize _dirRightVec, vec3[].cross _dirRightVec, @_fixedYawAxis, vec
        up    = vec3.normalize _dirUpVec,    vec3[].cross _dirUpVec,    vec, right
        quat.setAxes @rotation, vec, right, up
      else
      */

      rotquat = _dirQuat.rotationTo(this.getDirection(), vec);
      this.rotation = (rotquat).operators("*",this.rotation);
      this.rotation.normalize();
      return this.invalidate();
    };

    Model.prototype.getRight = function() {
      if (!this.isValid()) {
        this.validate();
      }
      return this._rightVector;
    };

    Model.prototype.getUp = function() {
      if (!this.isValid()) {
        this.validate();
      }
      return this._upVector;
    };

    Model.prototype.getPosition = function() {
      return this._position.clone();
    };

    Model.prototype.getHorizontalPlane = function() {
      var position;
      position = this.getPosition();
      return [position, (position).operators("+",this.getRight()), (position).operators("+",this.getDirection())];
    };

    Model.prototype.getWorldXYPlane = function() {
      var position;
      position = this.getPosition();
      return new Geometry.Plane(position, LOCAL_VIEW);
    };

    Model.prototype.getWorldXZPlane = function() {
      var position;
      position = this.getPosition();
      return new Geometry.Plane(position, LOCAL_UP);
    };

    Model.prototype.getWorldYZPlane = function() {
      var position;
      position = this.getPosition();
      return new Geometry.Plane(position, LOCAL_RIGHT);
    };

    Model.prototype.setPosition = function(x) {
      x.copyTo(this._position);
      return this._stale = true;
    };

    Model.prototype.invalidate = function() {
      this._isValid = false;
      return this._stale = true;
    };

    Model.prototype.isValid = function() {
      return this._isValid;
    };

    Model.prototype.recalculateMatrices = function() {
      if (!this.isValid()) {
        this.validate();
      }
      this._stale = false;
      this.matrices.mv.fromRotationTranslation(this.rotation, this.getPosition());
      this.matrices.imv = this.matrices.mv.getInverted();
      this.matrices.n = new Mat3([]).fromMat4(this.matrices.imv);
      return this.matrices.n = this.matrices.n.transpose();
    };

    Model.prototype.validate = function() {
      this._isValid = true;
      this._viewVector.transformQuat(LOCAL_VIEW, this.rotation);
      this._rightVector.transformQuat(LOCAL_RIGHT, this.rotation);
      return this._upVector.transformQuat(LOCAL_UP, this.rotation);
    };

    Model.prototype.rotate = function(amount, vec) {
      vec = vec.transformQuat(vec, this.rotation);
      return this.rotateWorld(amount, vec);
    };

    Model.prototype.rotateWorld = function(amount, vec) {
      var rotquat;
      rotquat = new Quat([]).setAxisAngle(vec, amount);
      rotquat.normalize();
      this.rotation = (rotquat).operators("*",this.rotation);
      this.invalidate();
      return this;
    };

    Model.prototype.pitch = function(amount) {
      var axis;
      axis = this.getRight();
      return this.rotateWorld(amount, axis);
    };

    Model.prototype.yaw = function(amount) {
      var axis;
      axis = this.getUp();
      return this.rotateWorld(amount, axis);
    };

    Model.prototype.roll = function(amount) {
      var axis;
      axis = this.getDirection();
      return this.rotateWorld(amount, axis);
    };

    Model.prototype.reorient = function(view, pos) {
      if (pos) {
        this.setPosition(pos);
      }
      this.setDirection(view);
      return this;
    };

    Model.prototype.lookAt = function(point, pos) {
      var view;
      if (pos) {
        this.setPosition(pos);
      } else {
        pos = this.getPosition();
      }
      view = this.getDirection();
      return this.setDirection((point).operators("-",pos));
    };

    Model.prototype.move = function(distance, direction) {
      var _moveVec;
      if (direction == null) {
        direction = this.getDirection();
      }
      _moveVec = direction.clone();
      this.setPosition((_moveVec.scale(distance)).operators("+",this.getPosition()));
      this.invalidate();
      return this;
    };

    Model.prototype.getTransformationMatrix = function() {
      if (this._stale) {
        this.recalculateMatrices();
      }
      return this.matrices.mv;
    };

    Model.prototype.getInverseTransformationMatrix = function() {
      if (this._stale) {
        this.recalculateMatrices();
      }
      return this.matrices.imv;
    };

    Model.prototype.getNormalMatrix = function() {
      if (this._stale) {
        this.recalculateMatrices();
      }
      return this.matrices.n;
    };

    Model.prototype.pushMatrices = function(gl) {
      gl.matrixStack.push();
      return gl.matrixStack.multModelMatrix(this.getTransformationMatrix());
    };

    Model.prototype.popMatrices = function(gl) {
      return gl.matrixStack.pop();
    };

    Model.prototype.render = function(gl, options, sceneObj) {};

    Model.prototype.update = function(gl, options, sceneObj) {};

    return Model;

  })();

  window.ModelGroup = ModelGroup = (function(_super) {
    __extends(ModelGroup, _super);

    function ModelGroup(models, options) {
      this.models = models;
      this.options = options;
      ModelGroup.__super__.constructor.call(this, this.options);
    }

    ModelGroup.prototype.render = function(gl, options, sceneObj) {
      var modelObj, _i, _len, _ref;
      this.pushMatrices(gl);
      _ref = this.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        modelObj = _ref[_i];
        modelObj.render(gl, options, sceneObj);
      }
      return this.popMatrices(gl);
    };

    ModelGroup.prototype.update = function(gl, options, sceneObj) {
      var modelObj, _i, _len, _ref, _results;
      _ref = this.models;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        modelObj = _ref[_i];
        _results.push(modelObj.update(gl, options, sceneObj));
      }
      return _results;
    };

    return ModelGroup;

  })(Model);

  window.ModelObject = ModelObject = (function(_super) {
    __extends(ModelObject, _super);

    function ModelObject(mesh, material, options) {
      this.mesh = mesh;
      this.material = material;
      this.options = options != null ? options : {};
      ModelObject.__super__.constructor.call(this, this.options);
    }

    ModelObject.prototype.beforeRender = function(gl, options, sceneObject) {
      return this.pushMatrices(gl);
    };

    ModelObject.prototype.afterRender = function(gl, options, sceneObject) {
      return this.popMatrices(gl);
    };

    ModelObject.prototype.render = function(gl, options, sceneObject) {
      var material;
      this.beforeRender(gl, options, sceneObject);
      if ((options.picking != null) && options.picking) {
        material = PickingMaterial.get();
      } else {
        material = this.material;
      }
      this.mesh.render(gl, this, material);
      return this.afterRender(gl, options, sceneObject);
    };

    ModelObject.prototype.update = function(gl, options, sceneObject) {};

    ModelObject.prototype.collide = function(other) {
      var b0, b1, distance, transform;
      transform = (this.getInverseTransformationMatrix()).operators("*",other.getTransformationMatrix());
      b0 = this.getBounds();
      b1 = other.getBounds(transform);
      distance = ((b0.center).operators("-",b1.center)).length();
      if (distance < (b0.radius).operators("+",b1.radius)) {
        return true;
      }
      return false;
    };

    ModelObject.prototype.getBounds = function(transform) {
      var bounds;
      if (transform == null) {
        transform = null;
      }
      bounds = this.mesh.getBounds();
      if (transform === null) {
        return bounds;
      }
      bounds.center = (transform).operators("*",bounds.center);
      return bounds;
    };

    /*
    rotate: (rad, vec) ->
      @rotation = @rotation @> [rad, vec]
      
    translate: (vec) ->
      @position = @position |> vec
      
    scale: (vec) ->
      @calibration = @calibration ^> vec
    */


    return ModelObject;

  })(Model);

}).call(this);
// Generated by CoffeeScript 1.6.2
(function() {
  var Texture,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __operators = Object.prototype.operators = function(operator, object) { switch (operator) {case '+': return this + object;case '-': return this - object;case '/':return this / object;case '*':return this * object;case '%':return this % object;case '^':return this ^ object;default:throw SyntaxError('Object does not support "' + operator + '" operator');}};

  window.Texture = Texture = (function(_super) {
    __extends(Texture, _super);

    Texture.prototype.initialized = false;

    Texture.prototype.valid = [];

    Texture.prototype.options = {};

    Texture.prototype.isPoT = function(s) {
      return s && (s & -s) === s;
    };

    function Texture(file, options) {
      var name, value,
        _this = this;
      this.file = file;
      for (name in options) {
        if (!__hasProp.call(options, name)) continue;
        value = options[name];
        this.options[name] = value;
      }
      if (this.file) {
        this.image = new Image();
        this.image.onload = function(e) {
          var _ref;
          if (!_this.isPoT(_this.image.width || !_this.isPoT(_this.image.height))) {
            _this.options.mag_filter = Enliven.gl.LINEAR;
            _this.options.min_filter = Enliven.gl.LINEAR;
            _this.options.wrap_s = Enliven.gl.CLAMP_TO_EDGE;
            _this.options.wrap_t = Enliven.gl.CLAMP_TO_EDGE;
            _this.options.generate_mipmap = false;
          }
          if ((_ref = _this.options.onload) != null) {
            _ref.call(_this, _this.image);
          }
          return _this.initialized = true;
        };
        this.image.onerror = this.image.onabort = function(e) {
          throw new Error((("Failed to load '").operators("+",_this.image.src)).operators("+","' texture."));
        };
        this.image.src = this.file;
      } else {
        this.initialized = true;
      }
    }

    Texture.prototype.generateTexture = function(gl) {
      var data_type, format, height, target, ti2d, width;
      data_type = this.options.data_type;
      format = this.options.format;
      target = this.options.target;
      if (this.image) {
        return gl.texImage2D(target, 0, format, format, data_type, this.image);
      } else {
        width = this.options.width;
        height = this.options.height;
        if (!width || !height) {
          throw new Error("Can't build an empty texture without at least a width and height");
        }
        ti2d = function(glEnum) {
          var e, tex;
          try {
            return gl.texImage2D(glEnum, 0, format, width, height, 0, format, gl.UNSIGNED_BYTE, null);
          } catch (_error) {
            e = _error;
            tex = new Uint8Array(((width).operators("*",height)).operators("*",Enliven.sizeofFormat(format)));
            return gl.texImage2D(glEnum, 0, format, width, height, 0, format, gl.UNSIGNED_BYTE, tex);
          }
        };
        return ti2d(gl.TEXTURE_2D);
      }
    };

    Texture.prototype.generateMipmap = function(gl) {
      return gl.generateMipmap(this.options.target);
    };

    Texture.prototype.build = function(gl) {
      return this.setHandle(gl, gl.createTexture());
    };

    Texture.prototype.refresh = function(gl) {
      var colorspaceConversion, name, options, texture, value;
      if (!this.initialized) {
        return false;
      }
      options = {
        min_filter: gl.NEAREST,
        mag_filter: gl.NEAREST,
        generate_mipmap: true,
        mipmap_hint: gl.DONT_CARE,
        format: gl.RGBA,
        target: gl.TEXTURE_2D,
        data_type: gl.UNSIGNED_BYTE,
        wrap_s: gl.REPEAT,
        wrap_t: gl.REPEAT,
        flip_y: false,
        premultiply_alpha: false,
        colorspace_conversion: true,
        onload: null
      };
      for (name in options) {
        if (!__hasProp.call(options, name)) continue;
        value = options[name];
        if (this.options[name] === void 0) {
          this.options[name] = value;
        }
      }
      texture = this.getHandle(gl);
      gl.bindTexture(this.options.target, texture);
      this.setHandle(gl, texture);
      this.generateTexture(gl);
      gl.texParameteri(this.options.target, gl.TEXTURE_MAG_FILTER, this.options.mag_filter);
      gl.texParameteri(this.options.target, gl.TEXTURE_MIN_FILTER, this.options.min_filter);
      gl.texParameteri(this.options.target, gl.TEXTURE_WRAP_S, this.options.wrap_s);
      gl.texParameteri(this.options.target, gl.TEXTURE_WRAP_T, this.options.wrap_t);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.options.flip_y);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.options.premultiply_alpha);
      colorspaceConversion = gl.NONE;
      if (this.options.colorspace_conversion) {
        colorspaceConversion = gl.BROWSER_DEFAULT_WEBGL;
      }
      gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, colorspaceConversion);
      if (this.options.generate_mipmap) {
        this.generateMipmap(gl);
      }
      gl.bindTexture(this.options.target, null);
      return this.valid[gl.id] = true;
    };

    Texture.prototype.isValid = function(gl) {
      var _ref;
      return (_ref = this.valid[gl.id]) != null ? _ref : false;
    };

    Texture.prototype.bind = function(gl) {
      if (!this.initialized) {
        return null;
      }
      if (!this.isValid(gl)) {
        this.refresh(gl);
      }
      gl.activeTexture(gl.TEXTURE0);
      return gl.bindTexture(this.options.target, this.getHandle(gl));
    };

    Texture.prototype.unbind = function(gl) {
      if (this.isValid(gl)) {
        return gl.bindTexture(this.options.target, null);
      }
    };

    Texture.prototype.getHandle = function(gl) {
      if ((this.contexts == null) || (this.contexts[gl.id] == null)) {
        this.build(gl);
        this.refresh(gl);
      }
      return this.contexts[gl.id];
    };

    return Texture;

  })(Component);

  /*   
   init: (gl) ->
     gl.bindTexture(gl.TEXTURE_2D, @texture);
     gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
     gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, @image);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
     gl.bindTexture(gl.TEXTURE_2D, null);
     
   apply: (gl, material) ->
     if @texture is null
       @texture = gl.createTexture();
     
     if @initialized
       @init gl
       @initialized = false
       
     gl.activeTexture(gl.TEXTURE0);
     gl.bindTexture(gl.TEXTURE_2D, @texture);
     material.applyMaterial gl, {
       "uSampler", 0
     }
  */


}).call(this);
// Generated by CoffeeScript 1.6.2
(function() {
  var Light;

  window.Light = Light = (function() {
    Light.TYPE_POINT = 2;

    Light.TYPE_GLOBAL = 1;

    function Light(type, properties) {
      var _base, _base1, _base2, _base3, _base4, _base5;
      this.type = type;
      this.properties = properties != null ? properties : {};
      if ((_base = this.properties).position == null) {
        _base.position = new Vec3([0, 0, 0]);
      }
      if ((_base1 = this.properties).ambient == null) {
        _base1.ambient = new Vec3([0.8, 0.8, 0.8]);
      }
      if ((_base2 = this.properties).difuse == null) {
        _base2.difuse = new Vec3([0.8, 0.8, 0.8]);
      }
      if ((_base3 = this.properties).specular == null) {
        _base3.specular = new Vec3([0.8, 0.8, 0.8]);
      }
      if ((_base4 = this.properties).spotDirection == null) {
        _base4.spotDirection = new Vec3([0, 0, 0]);
      }
      if ((_base5 = this.properties).spotCutoff == null) {
        _base5.spotCutoff = Math.Pi;
      }
    }

    return Light;

  })();

}).call(this);
// Generated by CoffeeScript 1.6.2
(function() {
  window.Enliven.ShaderSources["core.vertex"] = "global uniform mat4 ModelViewMatrix, ProjectionMatrix;\nglobal attribute vec3 VertexPosition;\n\npublic void apply(void) {\n  gl_Position = ProjectionMatrix * ModelViewMatrix * vec4(VertexPosition, 1.0);\n}\n\nvoid main(void) {\n  apply();\n}";window.Enliven.ShaderSources["core.fragment"] = "global uniform vec4 Color;\n\npublic void apply(void) {\n    gl_FragColor = Color;\n}\n\nvoid main(void) {\n  apply();\n}";

}).call(this);
// Generated by CoffeeScript 1.6.2
(function() {
  window.Enliven.ShaderSources["picking.vertex"] = "global uniform mat4 ModelViewMatrix, ProjectionMatrix;\nglobal attribute vec3 VertexPosition;\nglobal uniform float INDEX;\n\nvarying vec4 vColor;\n\nvoid main(void) {\n  gl_Position = ProjectionMatrix * ModelViewMatrix * vec4(VertexPosition, 1.0);\n  \n  // equivalent to [ int(INDEX/256), INDEX % 256 ] / 255. The last division\n  // is necessary to scale to the [0..1] range.\n  float d = 1.0 / 255.0;\n  float f = floor(INDEX / 256.0);\n  vColor = vec4(f * d, (INDEX - 256.0 * f) * d, 1.0, 1.0);\n}";window.Enliven.ShaderSources["picking.fragment"] = "uniform float INDEX;\nvarying vec4 vColor;\n\nvoid main(void) {\n  if (INDEX == -1.0) discard;\n  gl_FragColor = vColor;\n}";

}).call(this);
// Generated by CoffeeScript 1.6.2
(function() {
  window.Enliven.ShaderSources["color.vertex"] = "global attribute vec4 VertexColor;\n\npublic varying vec4 vColor;\n\npublic void apply(void) {\n  vColor = VertexColor;\n}\n\nvoid main(void) {\n  apply();\n}";window.Enliven.ShaderSources["color.fragment"] = "public varying vec4 vColor;\n\npublic void apply(void) {\n    gl_FragColor = vColor;\n}\n\nvoid main(void) {\n  apply();\n}";

}).call(this);
// Generated by CoffeeScript 1.6.2
(function() {
  window.Enliven.ShaderSources["texture.vertex"] = "global attribute vec2 VertexTextureCoord;\n\npublic varying vec2 vTextureCoord;\n\npublic void apply(void) {\n  vTextureCoord = VertexTextureCoord;\n}\n\nvoid main(void) {\n  apply();\n}";window.Enliven.ShaderSources["texture.fragment"] = "public varying vec2 vTextureCoord;\npublic uniform sampler2D TextureSampler;\n\npublic void apply(void) {\n    gl_FragColor = texture2D(TextureSampler, vec2(vTextureCoord.s, vTextureCoord.t));;\n}\n\nvoid main(void) {\n  apply();\n}";

}).call(this);
// Generated by CoffeeScript 1.6.2
(function() {
  window.Enliven.ShaderSources["light.vertex"] = "global attribute vec3 VertexNormal;\nglobal uniform mat3 NormalMatrix;\n\npublic uniform vec3 AmbientLightColor;\n\npublic uniform vec3 PointLightLocation;\npublic uniform vec3 PointLightColor;\n\npublic uniform vec3 PointLightSpecularColor;\npublic uniform float MaterialShininess;\n\npublic varying vec3 LightWeighting;\npublic varying vec3 TransformedNormal;\npublic varying vec4 Position;\n\n\npublic void apply(void) {\n  Position = ModelViewMatrix * vec4(VertexPosition, 1.0);\n  vec3 lightDirection = normalize(PointLightLocation - Position.xyz);\n  TransformedNormal = NormalMatrix  * VertexNormal;\n  float directionalLightWeighting = max(dot(TransformedNormal, lightDirection), 0.0);\n  LightWeighting = AmbientLightColor + PointLightColor * directionalLightWeighting;\n}\n\npublic void applyPerFragment(void) {\n  Position = ModelViewMatrix * vec4(VertexPosition, 1.0);\n  TransformedNormal = NormalMatrix * VertexNormal;\n}\n\nvoid main(void) {\n  apply();\n}";window.Enliven.ShaderSources["light.fragment"] = "public varying vec3 LightWeighting;\npublic varying vec3 TransformedNormal;\npublic varying vec4 Position;\n\npublic uniform vec3 AmbientLightColor;\npublic uniform vec3 PointLightLocation;\npublic uniform vec3 PointLightColor;\n\npublic uniform vec3 PointLightSpecularColor;\npublic uniform float MaterialShininess;\n\npublic void apply(void) {\n  gl_FragColor = vec4(gl_FragColor.rgb * LightWeighting, gl_FragColor.a);\n}\n\npublic void applyPerFragment(void) {\n  vec3 lightDirection = normalize(PointLightLocation - Position.xyz);\n  vec3 normal = normalize(TransformedNormal);\n  float directionalLightWeighting = max(dot(normal, lightDirection), 0.0);\n  \n  float specularLightWeighting = 0.0;\n  if(MaterialShininess > 0.0)\n  {\n    vec3 eyeDirection = normalize(-Position.xyz);\n    vec3 reflectionDirection = reflect(-lightDirection, normal);\n    specularLightWeighting = pow(max(dot(reflectionDirection, eyeDirection), 0.0), MaterialShininess);\n  }\n  \n  vec3 fragmentLightWeighting = AmbientLightColor \n      + PointLightColor * directionalLightWeighting\n      + PointLightSpecularColor * specularLightWeighting;\n  gl_FragColor = vec4(gl_FragColor.rgb * fragmentLightWeighting, gl_FragColor.a);\n}\n\nvoid main(void) {\n  apply();\n}";

}).call(this);
