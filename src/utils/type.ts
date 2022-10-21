/**
 * used for switch-case statement to block unhandled cases.
 *
 * @param x never
 * @param message error message
 */
export function assertUnreachable(x: never, message?: string): never {
  throw new Error(message ?? `Unsupported Value ${x}`);
}
