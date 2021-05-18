export interface IExpense {
    _id: string;
    date: string;
    value: number;
    item: string;
    additionalInfo: {
      type: boolean;
    };
  }