var MathUtils = require('./MathUtils');
import Vector = require('./Vector');


/**
 * Vector with 4 components
 * @extends Vector
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} w
 * @example
 * var v1 = new Vector4(); // v1 == (0, 0, 0, 0)
 * var v2 = new Vector4(1, 2, 3, 4); // v2 == (1, 2, 3, 4)
 */
class Vector4 {
	x: number;
	y: number;
	z: number;
	w: number;
	constructor(x?, y?, z?, w?) {
		/*
		// @ifdef DEBUG
		this._x = 0;
		this._y = 0;
		this._z = 0;
		this._w = 0;
		// @endif
		*/

		if (arguments.length === 0) {
			// Nothing given
			this.x = 0;
			this.y = 0;
			this.z = 0;
			this.w = 0;
		} else if (arguments.length === 1 && typeof arguments[0] === 'object') {
			if (arguments[0] instanceof Vector4) {
				// Vector4
				this.copy(arguments[0]);
			} else {
				// Array
				this.x = arguments[0][0];
				this.y = arguments[0][1];
				this.z = arguments[0][2];
				this.w = arguments[0][3];
			}
		} else {
			// Numbers
			this.x = x;
			this.y = y;
			this.z = z;
			this.w = w;
		}

		// @ifdef DEBUG
		Object.seal(this);
		// @endif
	}

	/*
	// @ifdef DEBUG
	Vector.setupAliases(Vector4.prototype, [['x'], ['y'], ['z'], ['w']]);
	Vector.setupIndices(Vector4.prototype, 4);
	// @endif

	Vector.setupAliases(Vector4.prototype, [['r'], ['g'], ['b'], ['a']]);
	*/

	/**
	 * Zero-vector (0, 0, 0, 0)
	 * @type {Vector4}
	 */
	static ZERO = new Vector4(0, 0, 0, 0);

	/**
	 * One-vector (1, 1, 1, 1)
	 * @type {Vector4}
	 */
	static ONE = new Vector4(1, 1, 1, 1);

	/**
	 * Unit-X (1, 0, 0, 0)
	 * @type {Vector4}
	 */
	static UNIT_X = new Vector4(1, 0, 0, 0);

	/**
	 * Unit-Y (0, 1, 0, 0)
	 * @type {Vector4}
	 */
	static UNIT_Y = new Vector4(0, 1, 0, 0);

	/**
	 * Unit-Z (0, 0, 1, 0)
	 * @type {Vector4}
	 */
	static UNIT_Z = new Vector4(0, 0, 1, 0);

	/**
	 * Unit-W (0, 0, 0, 1)
	 * @type {Vector4}
	 */
	static UNIT_W = new Vector4(0, 0, 0, 1);

	/**
	 * Returns the vector component associated with the given index.
	 * Vector components are numbered from 0 to 3 in this order: x, y, z, w.
	 * @param {number} index
	 * @returns {number}
	 */
	getComponent(index) {
		switch (index) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
		}
	};

	/**
	 * Sets the vector component associated with the given index to a given value.
	 * Vector components are numbered from 0 to 3 in this order: x, y, z, w.
	 * @param {number} index
	 * @param {number} value
	 * @returns {Vector4} Self to allow chaining
	 */
	setComponent(index, value) {
		switch (index) {
			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			case 3: this.w = value; break;
		}
		return this;
	};

	/**
	 * Adds a vector to the current vector
	 * @param {Vector4} rhs
	 * @returns {Vector4} Self to allow chaining
	 * @example
	 * var v1 = new Vector4(1, 2, 3, 4);
	 * var v2 = new Vector4(4, 5, 6, 7);
	 * v1.add(v2); // v1 == (5, 7, 9, 11)
	 */
	add(rhs) {
		this.x += rhs.x;
		this.y += rhs.y;
		this.z += rhs.z;
		this.w += rhs.w;

		return this;
	};

	/**
	 * Adds numbers 'x', 'y', 'z', 'w' to the current Vector4 values
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @param {number} w
	 * @returns {Vector4} Self to allow chaining
	 * @example
	 * var v = new Vector4(1, 2, 3, 4);
	 * v.addDirect(2, 4, 6, 8); // v == (3, 6, 9, 12)
	 */
	addDirect(x, y, z, w) {
		this.x += x;
		this.y += y;
		this.z += z;
		this.w += w;

		return this;
	};

	/**
	 * Adds a vector from the current vector
	 * @param {Vector4} rhs
	 * @returns {Vector4} Self to allow chaining
	 * @example
	 * var v1 = new Vector4(4, 5, 6, 7);
	 * var v2 = new Vector4(1, 2, 3, 4);
	 * v1.sub(v2); // v1 == (3, 3, 3, 3)
	 */
	sub(rhs) {
		this.x -= rhs.x;
		this.y -= rhs.y;
		this.z -= rhs.z;
		this.w -= rhs.w;

		return this;
	};

	/**
	 * Subtracts numbers 'x', 'y', 'z', 'w' from the current Vector4
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @param {number} w
	 * @returns {Vector4} Self to allow chaining
	 * @example
	 * var v = new Vector4(); // v == (0, 0, 0, 0)
	 * v.subDirect(1, 2, 3); // v == (-1, -2, -3, -4)
	 */
	subDirect(x, y, z, w) {
		this.x -= x;
		this.y -= y;
		this.z -= z;
		this.w -= w;

		return this;
	};

	/**
	 * Performs component-wise negation of the vector
	 * @returns {Vector4} Self to allow chaining
	 */
	negate() {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		this.w = -this.w;

		return this;
	};

	/**
	 * Multiplies the current vector by another vector
	 * @param {Vector4} rhs
	 * @returns {Vector4} Self to allow chaining
	 * @example
	 * var v1 = new Vector4(4, 5, 6, 7);
	 * var v2 = new Vector4(1, 2, 3, 4);
	 * v1.mul(v2); // v1 == (4, 10, 18, 28)
	 */
	mul(rhs) {
		this.x *= rhs.x;
		this.y *= rhs.y;
		this.z *= rhs.z;
		this.w *= rhs.w;

		return this;
	};

	/**
	 * Multiplies the current Vector4 by numbers 'x', 'y', 'z', 'w' as inputs
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @param {number} w
	 * @returns {Vector4} Self to allow chaining
	 * @example
	 * var v = new Vector4(1, 2, 3, 4);
	 * v.mulDirect(2, 4, 6, 8); // v == (2, 8, 18, 32)
	 */
	mulDirect(x, y, z, w) {
		this.x *= x;
		this.y *= y;
		this.z *= z;
		this.w *= w;

		return this;
	};

	/**
	 * Scales the vector by a factor
	 * @param {number} factor
	 * @returns {Vector4} Self to allow chaining
	 */
	scale(factor) {
		this.x *= factor;
		this.y *= factor;
		this.z *= factor;
		this.w *= factor;

		return this;
	};

	/**
	 * Divides the current Vector4 by another vector
	 * @param {Vector4} rhs
	 * @returns {Vector4} Self to allow chaining
	 * @example
	 * var v = new Vector4(2, 4, 6, 8);
	 * v.divDirect(1, 2, 3, 4); // v == (2, 2, 2, 2)
	 */
	div(rhs) {
		this.x /= rhs.x;
		this.y /= rhs.y;
		this.z /= rhs.z;
		this.w /= rhs.w;

		return this;
	};

	/**
	 * Divides the current Vector4 by numbers 'x', 'y', 'z', 'w' as inputs
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @param {number} w
	 * @returns {Vector4} Self to allow chaining
	 * @example
	 * var v = new Vector4(4, 9, 16, 25);
	 * v.divDirect(2, 3, 4, 5); // v == (2, 3, 4, 5)
	 */
	divDirect(x, y, z, w) {
		this.x /= x;
		this.y /= y;
		this.z /= z;
		this.w /= w;

		return this;
	};

	/**
	 * Computes the dot product between the current vector and another vector
	 * @param {Vector4} rhs
	 * @returns {number}
	 */
	dot(rhs) {
		return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z + this.w * rhs.w;
	};

	/**
	 * Computes the dot product between the current vector and another vector given as 3 values
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @param {number} w
	 * @returns {number}
	 */
	dotDirect(x, y, z, w) {
		return this.x * x +
			this.y * y +
			this.z * z +
			this.w * w;
	};

	/**
	 * Returns whether this vector is aproximately equal to a given vector
	 * @param rhs
	 * @returns {boolean}
	 */
	equals(rhs) {
		return (Math.abs(this.x - rhs.x) <= MathUtils.EPSILON) &&
			(Math.abs(this.y - rhs.y) <= MathUtils.EPSILON) &&
			(Math.abs(this.z - rhs.z) <= MathUtils.EPSILON) &&
			(Math.abs(this.w - rhs.w) <= MathUtils.EPSILON);
	};

	/**
	 * Returns whether this vector is approximately equal to a given vector given as 3 values
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @param {number} w
	 * @returns {boolean}
	 */
	equalsDirect(x, y, z, w) {
		return (Math.abs(this.x - x) <= MathUtils.EPSILON) &&
			(Math.abs(this.y - y) <= MathUtils.EPSILON) &&
			(Math.abs(this.z - z) <= MathUtils.EPSILON) &&
			(Math.abs(this.w - w) <= MathUtils.EPSILON);
	};

	/**
	 * Linearly interpolates between the current Vector4 and an 'end' Vector4
	 * @param {Vector4} end End Vector4
	 * @param {number} factor Interpolation factor between 0.0 and 1.0
	 * @returns {Vector4} Self to allow chaining
	 * @example
	 * var from = new Vector4(1, 2, 3, 4);
	 * var to = new Vector4(3, 4, 5, 6);
	 * var midway = from.clone().lerp(to, 0.5); // midway == (2, 3, 4, 5)
	 */
	lerp(end, factor) {
		this.x += (end.x - this.x) * factor;
		this.y += (end.y - this.y) * factor;
		this.z += (end.z - this.z) * factor;
		this.w += (end.w - this.w) * factor;

		return this;
	};

	/**
	 * Reflects a vector relative to the plane obtained from the normal parameter.
	 * @param {Vector4} normal Defines the plane that reflects the vector. Assumed to be of unit length.
	 * @returns {Vector4} Self to allow chaining
	 */
	reflect(normal) {

var tmpVec = new Vector4();
		tmpVec.copy(normal);
		tmpVec.scale(2 * this.dot(normal));
		this.sub(tmpVec);
		return this;
	};

	/**
	 * Sets the vector's values from another vector's values
	 * @param {Vector4} rhs
	 * @returns {Vector4} Self to allow chaining
	 * @example
	 * var v = new Vector4(); // v == (0, 0, 0, 0)
	 * v.set(new Vector4(2, 4, 6, 8)); // v == (2, 4, 6, 8)
	 */
	set(rhs) {
		if (rhs instanceof Vector4) {
			this.x = rhs.x;
			this.y = rhs.y;
			this.z = rhs.z;
			this.w = rhs.w;
		} else {
			this.x = arguments[0];
			this.y = arguments[1];
			this.z = arguments[2];
			this.w = arguments[3];
		}

		return this;
	};

	/**
	 * Sets the vector's values from 4 numeric arguments
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @param {number} w
	 * @returns {Vector4} Self to allow chaining
	 * @example
	 * var v = new Vector4(); // v == (0, 0, 0, 0)
	 * v.setDirect(2, 4, 6, 8); // v == (2, 4, 6, 8)
	 */
	setDirect(x, y, z, w) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

		return this;
	};

	/**
	 * Calculates the squared length/magnitude of the current Vector4.
	 * Note: When comparing the relative distances between two points it is usually sufficient
	 * to compare the squared distances, thus avoiding an expensive square root operation.
	 * @returns {number} squared length
	 * @example
	 * var v = new Vector4(0, 9, 0, 0);
	 * v.lengthSquared(); // 81
	 */
	lengthSquared() {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
	};

	/**
	 * Calculates length squared of vector
	 * @returns {number} length squared
	 */
	length() {
		return Math.sqrt(this.lengthSquared());
	};

	/**
	 * Normalizes the current vector
	 * @returns {Vector4} Self to allow chaining
	 */
	normalize() {
		var length = this.length();

		if (length < MathUtils.EPSILON) {
			this.x = 0;
			this.y = 0;
			this.z = 0;
			this.w = 0;
		} else {
			this.x /= length;
			this.y /= length;
			this.z /= length;
			this.w /= length;
		}

		return this;
	};

	/**
	 * Normalizes the current vector; this method does not perform special checks for zero length vectors
	 * @returns {Vector4} Self to allow chaining
	 */
	unsafeNormalize() {
		var length = this.length();

		this.x /= length;
		this.y /= length;
		this.z /= length;
		this.w /= length;

		return this;
	};

	/**
	 * Computes the squared distance between the current Vector4 and another Vector4.
	 * Note: When comparing the relative distances between two points it is usually sufficient
	 * to compare the squared distances, thus avoiding an expensive square root operation.
	 * @param {Vector4} rhs Vector4
	 * @returns {number} distance squared
	 * @example
	 * var v1 = new Vector4(); // v1 == (0, 0, 0, 0)
	 * var v2 = new Vector4(0, 9, 0, 0);
	 * v1.distanceSquared(v2); // 81
	 */
	distanceSquared(rhs) {
		var deltaX = this.x - rhs.x;
		var deltaY = this.y - rhs.y;
		var deltaZ = this.z - rhs.z;
		var deltaW = this.w - rhs.w;

		return deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ + deltaW * deltaW;
	};

	/**
	 * Computes the distance between the current Vector4 and another Vector4.
	 * Note: When comparing the relative distances between two points it is usually sufficient
	 * to compare the squared distances, thus avoiding an expensive square root operation.
	 * @param {Vector4} rhs Vector4
	 * @returns {number} distance
	 * @example
	 * var v1 = new Vector4(); // v1 == (0, 0, 0, 0)
	 * var v2 = new Vector4(0, 9, 0, 0);
	 * v1.distance(v2); // 9
	 */
	distance(rhs) {
		return Math.sqrt(this.distanceSquared(rhs));
	};

	/**
	 * Multiplies this vector with a Matrix4
	 * @param {Matrix4} matrix
	 * @returns {Vector4} Self to allow chaining
	 */
	applyPre(matrix) {
		var source = matrix.data;

		var x = this.x;
		var y = this.y;
		var z = this.z;
		var w = this.w;

		this.x = source[ 0] * x + source[ 1] * y + source[ 2] * z + source[ 3] * w;
		this.y = source[ 4] * x + source[ 5] * y + source[ 6] * z + source[ 7] * w;
		this.z = source[ 8] * x + source[ 9] * y + source[10] * z + source[11] * w;
		this.w = source[12] * x + source[13] * y + source[14] * z + source[15] * w;

		return this;
	};

	/**
	 * Multiplies a Matrix4 with this vector
	 * @param {Matrix4} matrix
	 * @returns {Vector4} Self to allow chaining
	 */
	applyPost(matrix) {
		var source = matrix.data;

		var x = this.x;
		var y = this.y;
		var z = this.z;
		var w = this.w;

		this.x = source[0] * x + source[4] * y + source[ 8] * z + source[12] * w;
		this.y = source[1] * x + source[5] * y + source[ 9] * z + source[13] * w;
		this.z = source[2] * x + source[6] * y + source[10] * z + source[14] * w;
		this.w = source[3] * x + source[7] * y + source[11] * z + source[15] * w;

		return this;
	};

	/**
	 * Clones the vector
	 * @returns {Vector4} Clone of self
	 */
	clone() {
		return new Vector4(this.x, this.y, this.z, this.w);
	};

	/**
	 * Copies the values of another vector to this vector; an alias for .setVector
	 * @param {Vector4} Source vector
	 * @returns {Vector4} Self to allow chaining
	 */
	copy(v) {
		return this.set(v);
	};

	/**
	 * Copies this vector over another. Not equivalent to `target.copy(this)` when
	 * the target vector has more components than the source vector
	 * @param {Vector} target
	 * @returns {Vector4} Self to allow chaining
	 */
	copyTo(target) {
		target.x = this.x;
		target.y = this.y;
		target.z = this.z;
		target.w = this.w;

		return this;
	};

	/**
	 * Creates a Vector4 given an array
	 * @param {Array<number>} array
	 * @returns {Vector4}
	 */
	static fromArray(array) {
		return new Vector4(array[0], array[1], array[2], array[3]);
	};

	/**
	 * Creates a Vector4 given 4 numbers, an array, an {x, y, z, w} object or another Vector4
	 * @returns {Vector4}
	 */
	static fromAny() {
		if (arguments.length === 4) {
			return Vector4.fromArray(arguments);
		} else if (arguments[0] instanceof Array) {
			return Vector4.fromArray(arguments[0]);
		} else {
			var vectorLike = arguments[0];
			return new Vector4(vectorLike.x, vectorLike.y, vectorLike.z, vectorLike.w);
		}
	};

	/**
	 * Sets the vector content from an array of numbers.
	 * @param {Array<number>} array
	 */
	setArray(array) {
		this.x = array[0];
		this.y = array[1];
		this.z = array[2];
		this.w = array[3];
		return this;
	};

	/**
	 * Returns the components of the vector in array form
	 * @returns {Array<number>}
	 */
	toArray() {
		return [this.x, this.y, this.z, this.w];
	};

	/*
	// @ifdef DEBUG
	Vector.addReturnChecks(Vector4.prototype, [
		'dot', 'dotDirect',
		'length', 'lengthSquared',
		'distance', 'distanceSquared'
	]);
	// @endif
	*/
}

export = Vector4;