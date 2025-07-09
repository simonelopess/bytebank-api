export type TransactionType = 'deposit' | 'debit';

export interface Transaction {
  id?: string;
  type: TransactionType;
  amount: number;
  userId: string;
  date: Date;
}

export interface CreateTransactionRequest {
  type: TransactionType;
  amount: number;
  userId: string;
}

export interface TransactionResponse {
  id: string;
  type: TransactionType;
  amount: number;
  userId: string;
  date: Date;
}

export interface UserBalance {
  userId: string;
  totalAmount: number;
}

export class TransactionModel {
  private static transactions: Transaction[] = [];

  static create(transactionData: CreateTransactionRequest): Transaction {
    const transaction: Transaction = {
      id: this.generateId(),
      ...transactionData,
      date: new Date()
    };
    
    this.transactions.push(transaction);
    return transaction;
  }

  static findByUserId(userId: string): Transaction[] {
    return this.transactions.filter(transaction => transaction.userId === userId);
  }

  static calculateUserBalance(userId: string): UserBalance {
    const userTransactions = this.findByUserId(userId);
    
    const totalAmount = userTransactions.reduce((acc, transaction) => {
      if (transaction.type === 'deposit') {
        return acc + transaction.amount;
      } else if (transaction.type === 'debit') {
        return acc - transaction.amount;
      }
      return acc;
    }, 0);

    return { userId, totalAmount };
  }

  static getAll(): Transaction[] {
    return this.transactions;
  }

  private static generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
} 