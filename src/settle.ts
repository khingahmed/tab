import type { Balance, Payment } from "./types.ts";

/**
 * Balances are in cents.
 * Positive: this person is owed money.
 * Negative: this person owes money.
 * Zero: they are already even.
 *
 * The balances must sum to zero. A payment's payer is `from` and the person
 * receiving it is `to`. The payer's signed balance moves up by the amount.
 * The payee's signed balance moves down by the amount.
 */
export function settle(balances: Balance[]): Payment[] {
  const net = balances.reduce((sum, balance) => sum + balance.cents, 0);
  if (net !== 0) {
    throw new Error(`balances must sum to zero, got ${net}`);
  }

  const creditors = balances
    .filter((balance) => balance.cents > 0)
    .map((balance) => ({ name: balance.name, cents: balance.cents }));
  const debtors = balances
    .filter((balance) => balance.cents < 0)
    .map((balance) => ({ name: balance.name, cents: -balance.cents }));

  const payments: Payment[] = [];
  let creditorIndex = 0;
  let debtorIndex = 0;
  while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
    const creditor = creditors[creditorIndex];
    const debtor = debtors[debtorIndex];
    if (creditor === undefined || debtor === undefined) {
      break;
    }
    const amountCents = Math.min(creditor.cents, debtor.cents);
    payments.push({ from: debtor.name, to: creditor.name, amountCents });
    creditor.cents -= amountCents;
    debtor.cents -= amountCents;
    if (creditor.cents === 0) {
      creditorIndex += 1;
    }
    if (debtor.cents === 0) {
      debtorIndex += 1;
    }
  }
  return payments;
}
