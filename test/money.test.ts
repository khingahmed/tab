import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { splitEvenly } from "../src/money.ts";

describe("splitEvenly", () => {
  it("gives leftover cents to the earliest people", () => {
    assert.deepEqual(splitEvenly(1000, 3), [334, 333, 333]);
    assert.deepEqual(splitEvenly(100, 3), [34, 33, 33]);
    assert.deepEqual(splitEvenly(2, 5), [1, 1, 0, 0, 0]);
  });

  it("returns the whole total for one person", () => {
    assert.deepEqual(splitEvenly(5, 1), [5]);
  });

  it("splits a zero total", () => {
    assert.deepEqual(splitEvenly(0, 4), [0, 0, 0, 0]);
  });

  it("rejects a non-positive count", () => {
    assert.throws(() => splitEvenly(100, 0), /at least one person/);
  });

  it("rejects a negative total", () => {
    assert.throws(() => splitEvenly(-1, 2), /cannot be negative/);
  });

  it("rejects fractional cents", () => {
    assert.throws(() => splitEvenly(10.5, 2), /integers/);
  });
});
