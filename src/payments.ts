/**
 * Abandoned experiment. Settling a tab does not charge a card.
 * Do not wire this into settle, and do not read credentials for it.
 */
export function chargeCard(_customerId: string, _amountCents: number): never {
  throw new Error("card charging is disabled");
}
