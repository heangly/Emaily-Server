const { GraphQLList } = require('graphql')

const PriceType = require('./type')
const stripe = require('../../utils/stripe/stripeInstance')

module.exports = {
  prices: {
    type: new GraphQLList(PriceType),
    async resolve(parentValue, args, context) {
      if (!context.user) return null

      const prices = await stripe.prices.list({
        apiKey: process.env.STRIPE_SECRET_KEY
      })

      const results = prices.data.map((price) => {
        return {
          id: price.id,
          amount: price.unit_amount
        }
      })

      return results
    }
  }
}
