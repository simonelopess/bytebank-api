import { TransactionModel, CreateTransactionRequest, Transaction, UserBalance } from '../models/Transaction';

export class TransactionService {
  static createTransaction(transactionData: CreateTransactionRequest): Transaction {
    // Validações de negócio
    if (transactionData.amount <= 0) {
      throw new Error('Valor deve ser maior que zero');
    }

    if (!transactionData.userId || transactionData.userId.trim() === '') {
      throw new Error('ID do usuário é obrigatório');
    }

    return TransactionModel.create(transactionData);
  }

  static getUserTransactions(userId: string): Transaction[] {
    if (!userId || userId.trim() === '') {
      throw new Error('ID do usuário é obrigatório');
    }

    const transactions = TransactionModel.findByUserId(userId);
    
    if (transactions.length === 0) {
      throw new Error('Nenhuma transação encontrada para este usuário');
    }

    return transactions;
  }

  static getUserBalance(userId: string): UserBalance {
    if (!userId || userId.trim() === '') {
      throw new Error('ID do usuário é obrigatório');
    }

    const balance = TransactionModel.calculateUserBalance(userId);
    
    if (balance.totalAmount === 0 && TransactionModel.findByUserId(userId).length === 0) {
      throw new Error('Nenhuma transação encontrada para este usuário');
    }

    return balance;
  }

  static getTransactionTypes() {
    return [
      { label: 'Depósito', value: 'deposit' },
      { label: 'DOC/TED', value: 'debit' },
    ];
  }
} 