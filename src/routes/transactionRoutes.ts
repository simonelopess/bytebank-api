import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';

const router = Router();

/**
 * @swagger
 * /transaction-types:
 *   get:
 *     summary: Obter tipos de transação disponíveis
 *     description: Retorna a lista de tipos de transação (deposit, debit)
 *     tags: [Transações]
 *     responses:
 *       200:
 *         description: Lista de tipos de transação
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   label:
 *                     type: string
 *                   value:
 *                     type: string
 */
router.get('/transaction-types', TransactionController.getTransactionTypes);

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Criar nova transação
 *     description: Cria uma nova transação para um usuário
 *     tags: [Transações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - amount
 *               - userId
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [deposit, debit]
 *                 description: Tipo da transação (apenas deposit ou debit são aceitos)
 *               amount:
 *                 type: number
 *                 description: Valor da transação
 *               userId:
 *                 type: string
 *                 description: ID do usuário
 *     responses:
 *       201:
 *         description: Transação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 type:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 userId:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos
 */
router.post('/transactions', TransactionController.createTransaction);

/**
 * @swagger
 * /transactions/{userId}:
 *   get:
 *     summary: Obter transações de um usuário
 *     description: Retorna todas as transações de um usuário específico
 *     tags: [Transações]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de transações do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   type:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   userId:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/transactions/:userId', TransactionController.getUserTransactions);

/**
 * @swagger
 * /amount/{userId}:
 *   get:
 *     summary: Obter saldo total do usuário
 *     description: Calcula o saldo total baseado em todas as transações do usuário (deposits somam, debits subtraem)
 *     tags: [Transações]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Saldo total do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 totalAmount:
 *                   type: number
 *                   description: Saldo total (deposits - debits)
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/amount/:userId', TransactionController.getUserBalance);

export default router; 