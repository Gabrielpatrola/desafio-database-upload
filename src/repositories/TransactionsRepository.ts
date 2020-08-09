import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const incomeTotal = await this.find({ where: { type: 'income' } });

    const outcomeTotal = await this.find({ where: { type: 'outcome' } });

    const income = incomeTotal.reduce(
      (total, transaction) => total + transaction.value,
      0.0,
    );
    const outcome = outcomeTotal.reduce(
      (total, transaction) => total + transaction.value,
      0.0,
    );

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }
}

export default TransactionsRepository;
