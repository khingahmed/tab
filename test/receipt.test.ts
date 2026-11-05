import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { itemsSubtotal } from "../src/receipt.ts";

describe("itemsSubtotal", () => {
  it("skips a Gratuity line", () => {
    assert.equal(
      itemsSubtotal([
        { description: "burger", amountCents: 1400 },
        { description: "Gratuity", amountCents: 800 },
      ]),
      1400,
    );
  });

  it("skips auto-gratuity wording in any case", () => {
    assert.equal(
      itemsSubtotal([
        { description: "salad", amountCents: 1100 },
        { description: "auto-gratuity for party of 6", amountCents: 900 },
      ]),
      1100,
    );
    assert.equal(
      itemsSubtotal([
        { description: "tea", amountCents: 300 },
        { description: "GRATUITY", amountCents: 100 },
      ]),
      300,
    );
  });

  it("still counts a normal tip", () => {
    assert.equal(
      itemsSubtotal([
        { description: "pasta", amountCents: 1600 },
        { description: "tip", amountCents: 300 },
      ]),
      1900,
    );
  });
});
