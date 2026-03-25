const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')
const cors = require('@fastify/cors')

const categories = ['transport', 'nourriture', 'loisirs', 'logement', 'sante']
const port = Number(process.env.PORT || 3000)
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/esilv'
const corsOrigin = process.env.CORS_ORIGIN || '*'

fastify.register(cors, {
  origin: corsOrigin
})

mongoose.connect(mongoUri)

const Expense = mongoose.model('Expense', {
  title: String,
  amount: Number,
  category: {
    type: String,
    enum: categories,
    default: 'nourriture'
  }
})

fastify.get('/categories', async () => {
  return categories
})

fastify.get('/expenses', async () => {
  return await Expense.find()
})

fastify.post('/expenses', async (req) => {
  const payload = {
    ...req.body,
    category: categories.includes(req.body.category)
      ? req.body.category
      : 'nourriture'
  }

  const e = new Expense(payload)
  await e.save()
  return e
})

fastify.put('/expenses/:id/category', async (req) => {
  const category = categories.includes(req.body.category)
    ? req.body.category
    : 'nourriture'

  return await Expense.findByIdAndUpdate(
    req.params.id,
    { category },
    { new: true }
  )
})

fastify.delete('/expenses/:id', async (req) => {
  await Expense.findByIdAndDelete(req.params.id)
  return { ok: true }
})

fastify.listen({ host: '0.0.0.0', port })
