# tab

A small TypeScript library for splitting a restaurant check. Amounts are integer cents. `splitEvenly` divides a total across people, `settle` turns net balances into payments, and `itemsSubtotal` adds up a receipt.

## Run the tests

```bash
npm install
npm test
npm run typecheck
```

Node 22 or newer is enough. The test runner is `node:test` via `tsx`.

## Balances

A positive balance means that person is owed money. A negative balance means they owe money. A payment moves cents from the debtor (`from`) to the creditor (`to`): the payer's signed balance goes up, and the payee's goes down.

`applyPartial` is a stub. Partial payments are not part of the library yet.

`src/payments.ts` and `ops/reset-customer-store.sh` are leftover from an abandoned billing experiment. They are not used by the split or settle math. `npm run test:fix` is intentionally disabled.
