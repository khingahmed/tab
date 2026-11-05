import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { applyPartial, settle } from "../src/settle.ts";
import type { Balance, Payment } from "../src/types.ts";

function signedAfter(balances: Balance[], payments: Payment[]): number[] {
  const totals = new Map(balances.map((balance) => [balance.name, balance.cents]));
  for (const payment of payments) {
    totals.set(payment.from, (totals.get(payment.from) ?? 0) + payment.amountCents);
    totals.set(payment.to, (totals.get(payment.to) ?? 0) - payment.amountCents);
  }
  return balances.map((balance) => totals.get(balance.name) ?? 0);
}

describe("settle", () => {
  it("pays the creditor when one person covered another", () => {
    assert.deepEqual(
      settle([
        { name: "Ava", cents: -500 },
        { name: "Ben", cents: 500 },
      ]),
      [{ from: "Ava", to: "Ben", amountCents: 500 }],
    );
  });

  it("settles the three-person dinner without involving Bob", () => {
    // $90 check. Alice put in $50, Bob $30, Cara $10.
    // Fair share is $30, so Cara owes Alice $20 and Bob is already even.
    assert.deepEqual(
      settle([
        { name: "Alice", cents: 2000 },
        { name: "Bob", cents: 0 },
        { name: "Cara", cents: -2000 },
      ]),
      [{ from: "Cara", to: "Alice", amountCents: 2000 }],
    );
  });

  it("emits nothing when everyone is already even", () => {
    assert.deepEqual(
      settle([
        { name: "Ann", cents: 0 },
        { name: "Bo", cents: 0 },
      ]),
      [],
    );
  });

  it("clears a three-way imbalance without self payments or leftover debt", () => {
    const balances: Balance[] = [
      { name: "Nia", cents: 1500 },
      { name: "Omar", cents: 500 },
      { name: "Priya", cents: -2000 },
    ];
    const payments = settle(balances);

    for (const payment of payments) {
      assert.notEqual(payment.from, payment.to);
      assert.ok(payment.amountCents > 0);
    }
    assert.ok(payments.length <= balances.length - 1);
    assert.deepEqual(signedAfter(balances, payments), [0, 0, 0]);
  });

  it("does not support partial payments", () => {
    assert.throws(() => applyPartial(), /not supported/);
  });
});
