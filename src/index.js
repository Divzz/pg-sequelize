const fastify = require('fastify')({ logger: true })
const {initializeTransaction} = require('./initializeTransaction');

fastify.route({
  method: 'POST',
  url: '/initialize',
  handler: initializeTransaction
})

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()