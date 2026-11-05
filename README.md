# tab

A small TypeScript library for splitting a restaurant check. Amounts are whole cents. `splitEvenly` divides a total across people, `settle` turns net balances into payments, and `itemsSubtotal` adds up a receipt.

## Run the tests

```bash
npm install
npm test
npm run typecheck
```

Node 22 or newer is enough. The test runner is `node:test` via `tsx`.

## Split a total

`splitEvenly(1000, 3)` returns `[334, 333, 333]`. Everyone gets the rounded-down share, and each leftover cent goes to one of the earliest people. The shares add back up to the original total.

## Settle a tab

A positive balance means that person is owed money. A negative balance means they owe money. The balances have to sum to zero, otherwise `settle` throws.

```ts
import { settle } from "./src/index.ts";

settle([
  { name: "Alice", cents: 2000 },
  { name: "Bob", cents: 0 },
  { name: "Cara", cents: -2000 },
]);
// [{ from: "Cara", to: "Alice", amountCents: 2000 }]
```

That is a $90 check where Alice put in $50, Bob put in $30, and Cara put in $10. Cara pays Alice $20. Bob is left out. Payments are never from a person to themselves, and they are never for zero cents.

## Receipts

`itemsSubtotal` skips a line whose description contains "gratuity", in any casing. A line that says "tip" still counts.
