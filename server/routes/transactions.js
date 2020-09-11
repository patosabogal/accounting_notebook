import express from "express";
import {
  getTransactions,
  getTransactionById,
  addTransaction,
} from "../controllers/transactions.js";
import { exists } from "../utils.js";
const httpStatusCodes = {
  ok: 200,
  badRequest: 400,
  notFound: 404,
};

const router = express.Router();

/* GET transactions */
router.get("/", (req, res, next) => {
  const transactions = getTransactions();
  return res.send(transactions);
});

/* GET transaction from id */
router.get("/:id", (req, res, next) => {
  if (
    !exists(req.params) ||
    !exists(req.params.id) ||
    typeof req.params.id !== "string"
  )
    return res.status(httpStatusCodes.badRequest).send("invalid ID supplied");
  const transaction = getTransactionById(req.params.id);
  if (!exists(transaction))
    return res.status(httpStatusCodes.notFound).send("transaction not found");
  return res.send(transaction);
});

/* GET transactions */
router.post("/", async (req, res, next) => {
  if (!exists(req.body) || !exists(req.body.type) || !exists(req.body.amount))
    return res.status(httpStatusCodes.badRequest).send("invalid input");
  try {
    const { amount, type } = req.body;
    await addTransaction({ amount, type });
    return res.send("transaction stored");
  } catch (error) {
    return res.status(httpStatusCodes.badRequest).send("invalid input");
  }
});

export default router;
