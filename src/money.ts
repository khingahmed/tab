/**
 * Split a total into `n` integer cent amounts that should sum to `totalCents`.
 * Leftover cents belong to the earliest people, one each.
 */
export function splitEvenly(totalCents: number, n: number): number[] {
  if (!Number.isInteger(totalCents) || !Number.isInteger(n)) {
    throw new Error("cents and count must be integers");
  }
  if (n <= 0) {
    throw new Error("need at least one person");
  }
  if (totalCents < 0) {
    throw new Error("total cannot be negative");
  }

  const each = Math.round(totalCents / n);
  return Array.from({ length: n }, () => each);
}
