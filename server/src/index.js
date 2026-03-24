const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')
const cors = require('@fastify/cors')

fastify.register(cors, {
  origin: '*'
})

mongoose.connect('mongodb://localhost:27017/esilv')

const Expense = mongoose.model('Expense', {
  title: String,
  amount: Number
})

fastify.get('/expenses', async () => {
  return await Expense.find()
})

fastify.post('/expenses', async (req) => {
  const e = new Expense(req.body)
  await e.save()
  return e
})

fastify.delete('/expenses/:id', async (req) => {
  await Expense.findByIdAndDelete(req.params.id)
  return { ok: true }
})

fastify.listen({ port: 3000 })