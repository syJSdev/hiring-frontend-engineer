/**
 * @see https://github.com/google/palette.js/blob/master/palette.js
 */

/**
 * Calculates a colour along Paul Tol's rainbow colours axis.
 *
 * @see http://www.sron.nl/~pault/colourschemes.pdf figure 13 and equation 3.
 * @param {number} x Position of the colour on the axis in the [0, 1] range.
 * @returns {string} An RRGGBB representation of the colour.
 */
export function tolRainbowColor(x: number) {
  return rgb(
    poly(x, 0.472, -0.567, 4.05) / poly(x, 1, 8.72, -19.17, 14.1),
    poly(x, 0.108932, -1.22635, 27.284, -98.577, 163.3, -131.395, 40.634),
    1 / poly(x, 1.97, 3.54, -68.5, 243, -297, 125)
  );
}

/**
 * Converts r, g, b triple into RRGGBB hex representation.
 *
 * @param {number} r Red value of the colour in the range [0, 1].
 * @param {number} g Green value of the colour in the range [0, 1].
 * @param {number} b Blue value of the colour in the range [0, 1].
 * @returns {string} A lower-case RRGGBB representation of the colour.
 */
export function rgb(r: number, g: number, b: number): string {
  return [r, g, b].map(hex).join('');
}

/**
 * Apply alpha to the original color \
 * **!Important**: Only hex color is acceptable. otherwise will return with same value
 *
 * @param {string} color original color without alpha.
 * @param {number} alpha alpha in the range [0, 1].
 * @returns {string} A lower-case RRGGBB representation of the colour.
 */
export function rgba(color: string, alpha: number): string {
  if (color.startsWith('#')) {
    const a = hex(alpha);
    if (color.length === 4) {
      const [_, r, g, b] = color.split('');
      return [_, r, r, g, g, b, b, a].join('');
    }
    if (color.length === 7) {
      const [_, r, g, b] = color.match(/(#|.{2})/g) ?? [];
      return [_, r, g, b, a].join('');
    }

    return color;
  }

  return color;
}

/**
 * Clamps value to [0, 1] range.
 *
 * @param {number} v Number to limit value of.
 * @returns {number} If v is inside of [0, 1] range returns v, otherwise
 *     returns 0 or 1 depending which side of the range v is closer to.
 */
export function clamp(v: number): number {
  return v > 0 ? (v < 1 ? v : 1) : 0;
}

/**
 * Convert [0, 1] range value to hex.
 *
 * @param {number} v [0, 1] range value
 * @returns {string} hex string
 */
export function hex(v: number): string {
  const n = Number(Math.round(clamp(v) * 255)).toString(16);
  return n.length === 1 ? '0' + n : n;
}

/**
 * Calculates value of a polynomial at given point.
 *
 * @param {number} x Value to calculate polynomial for.
 * @param {...number} args Coefficients of the polynomial specified in
 *     the order of rising powers of x including constant as the first
 *     variable argument.
 * @returns value of a polynomial
 * @example
 * ```js
 * poly(x, 1, 2, 3) // 1 + 2*x + 3*X²
 * ```
 */
function poly(x: number, ...args: number[]): number {
  let i = args.length - 1;

  let n = args[i];
  while (i > 0) {
    n = n * x + args[--i];
  }
  return n;
}
