/** A person's position on the tab, in cents. Positive means they are owed money. */
export type Balance = {
  name: string;
  cents: number;
};

/** Money moving from the person who owes to the person who is owed. */
export type Payment = {
  from: string;
  to: string;
  amountCents: number;
};

export type ReceiptLine = {
  description: string;
  amountCents: number;
};
