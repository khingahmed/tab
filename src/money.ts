/**
 * Split a total into `n` integer cent amounts that sum to `totalCents`.
 * Each person gets the rounded-down share. Leftover cents go to the earliest
 * people, one each.
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

  const base = Math.floor(totalCents / n);
  const leftover = totalCents - base * n;
  return Array.from({ length: n }, (_, index) => (index < leftover ? base + 1 : base));
}
