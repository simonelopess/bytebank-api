import { Request, Response } from 'express';
import { TransactionService } from '../services/TransactionService';
import { CreateTransactionRequest } from '../models/Transaction';

export class TransactionController {
  static async createTransaction(req: Request, res: Response): Promise<void> {
    try {
      const { type, amount, userId }: CreateTransactionRequest = req.body;

      // Validação básica dos campos obrigatórios
      if (!type || !amount || !userId) {
        res.status(400).json({ 
          error: 'Campos obrigatórios: type, amount, userId' 
        });
        return;
      }

      // Validação específica do tipo
      if (!['deposit', 'debit'].includes(type)) {
        res.status(400).json({ 
          error: 'Tipo de transação deve ser "deposit" ou "debit"' 
        });
        return;
      }

      const transaction = TransactionService.createTransaction({ type, amount, userId });
      
      res.status(201).json(transaction);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(400).json({ error: message });
    }
  }

  static async getUserTransactions(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const transactions = TransactionService.getUserTransactions(userId);
      
      res.json(transactions);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(404).json({ error: message });
    }
  }

  static async getUserBalance(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const balance = TransactionService.getUserBalance(userId);
      
      res.json(balance);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(404).json({ error: message });
    }
  }

  static async getTransactionTypes(req: Request, res: Response): Promise<void> {
    try {
      const transactionTypes = TransactionService.getTransactionTypes();
      res.json(transactionTypes);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
} 