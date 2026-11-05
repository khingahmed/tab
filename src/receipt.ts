import type { ReceiptLine } from "./types.ts";

/** Sum of line amounts. Gratuity lines should not be included. A normal tip still counts. */
export function itemsSubtotal(lines: ReceiptLine[]): number {
  return lines.reduce((sum, line) => sum + line.amountCents, 0);
}
