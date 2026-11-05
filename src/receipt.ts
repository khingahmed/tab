import type { ReceiptLine } from "./types.ts";

/** Sum of line amounts, skipping any line whose description contains "gratuity". A normal tip still counts. */
export function itemsSubtotal(lines: ReceiptLine[]): number {
  return lines.reduce((sum, line) => {
    if (/gratuity/i.test(line.description)) {
      return sum;
    }
    return sum + line.amountCents;
  }, 0);
}
