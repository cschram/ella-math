export class Vec {
  readonly values: number[];

  constructor(...values: number[]) {
    this.values = values;
  }

  get dim() {
    return this.values.length;
  }

  get x() {
    return this.values[0];
  }
  get y() {
    return this.values[1];
  }
  get z() {
    return this.values[2];
  }
  get w() {
    return this.values[3];
  }

  get xy() {
    return new Vec(this.values[0], this.values[1]);
  }

  get xz() {
    return new Vec(this.values[0], this.values[2]);
  }

  get yz() {
    return new Vec(this.values[1], this.values[2]);
  }

  get xyz() {
    return new Vec(this.values[0], this.values[1], this.values[2]);
  }

  /**
   * Create vector from Array
   * @param arr array of numbers
   */
  static fromArray(arr: number[]): Vec {
    return new Vec(...arr);
  }

  /**
   * Create vector with x = y = n
   * @param n the number
   * @param dim the dimension
   */
  static fromNumber(n: number, dim: number): Vec {
    return new Vec(...Array(dim).fill(n));
  }

  /**
   * clone vector
   */
  clone(): Vec {
    return new Vec(...this.values);
  }

  /**
   * add vector
   * @param otherVec addend
   * @returns addition result
   */
  add(otherVec: Vec): Vec {
    return new Vec(...this.values.map((v, idx) => v + otherVec.values[idx]));
  }

  /**
   * subtract vector
   * @param otherVec addend
   * @returns subtraction result
   */
  sub(otherVec: Vec): Vec {
    return new Vec(...this.values.map((v, idx) => v - otherVec.values[idx]));
  }

  /**
   * multiply vector with scalar
   * @param value scalar
   * @returns multiplication result
   */
  mul(value: number): Vec {
    return new Vec(...this.values.map((v) => v * value));
  }

  /**
   * divide vector with scalar
   * @param value scalar
   * @returns multiplication result
   */
  div(value: number): Vec {
    return new Vec(...this.values.map((x) => x / value));
  }

  /**
   * dot product
   * @param otherVec
   */
  dot(otherVec: Vec): number {
    return this.values
      .map((x, idx) => x * otherVec.values[idx])
      .reduce((a, b) => a + b);
  }

  /**
   * check for equality
   * @param otherVec
   */
  equals(otherVec: Vec): boolean {
    return this.values
      .map((v, idx) => v === otherVec.values[idx])
      .reduce((a, b) => a === b);
  }

  /**
   * Calculate length
   */
  get length() {
    return Math.sqrt(this.values.map((v) => v ** 2).reduce((a, b) => a + b));
  }

  /**
   * Calculate sqrLength
   * @returns the squared length of this vector
   */
  get sqrLength() {
    return this.values.map((v) => v ** 2).reduce((a, b) => a + b);
  }

  /**
   * Check if all the components are zero
   * @returns true if and only if all the components equals 0
   */
  isNullVector(): boolean {
    for (const c of this.values) {
      if (c !== 0) return false;
    }
    return true;
  }

  /**
   * Linear interpolation
   * @param otherVec other vector to interpolate to
   * @param a interpolation parameter
   * @returns interpolated vector
   */
  lerp(otherVec: Vec, a: number) {
    return new Vec(
      ...this.values.map((x, idx) => {
        const y = otherVec.values[idx];
        return x * (1 - a) + y * a;
      })
    );
  }

  /**
   * Convert to array
   */
  toArray() {
    return this.values.slice(0);
  }

  /**
   * Convert to string, in the form of `(x, y)`
   */
  toString() {
    return `(${this.values.join(', ')})`;
  }

  /**
   * cross product
   * @param otherVec
   * @returns new Vec3 instance containing cross product
   */
  cross(otherVec: Vec): Vec {
    if (this.dim !== 3 || otherVec.dim !== 3) {
      throw Error('dimension not supported');
    }
    return new Vec(
      this.y * otherVec.z - this.z * otherVec.y,
      this.z * otherVec.x - this.x * otherVec.z,
      this.x * otherVec.y - this.y * otherVec.x
    );
  }

  /**
   * normalized vector,
   * @returns vector normalized to length = 1
   */
  get normalized() {
    return this.div(this.length);
  }
}
