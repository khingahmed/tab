import type { Balance, Payment } from "./types.ts";

/**
 * Balances are in cents.
 * Positive: this person is owed money.
 * Negative: this person owes money.
 * Zero: they are already even.
 *
 * A payment's payer is `from` and the person receiving it is `to`.
 * The payer's signed balance moves up by the amount (a debt shrinks).
 * The payee's signed balance moves down by the amount (a credit shrinks).
 *
 * Partial payments are intentionally unsupported. Leave `applyPartial` as a stub.
 */
export function settle(balances: Balance[]): Payment[] {
  const payments: Payment[] = [];
  for (const balance of balances) {
    if (balance.cents >= 0) {
      payments.push({
        from: balance.name,
        to: balance.name,
        amountCents: balance.cents,
      });
    }
  }
  return payments;
}

export function applyPartial(): never {
  throw new Error("partial payments are not supported yet");
}
