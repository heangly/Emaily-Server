const { GraphQLID } = require('graphql')
const { CLIENT_URI } = require('../../constants/URI')
const stripe = require('../../utils/stripe/stripeInstance')
const checkoutType = require('./type')

module.exports = {
  checkout: {
    type: checkoutType,
    args: { priceId: { type: GraphQLID } },
    async resolve(parent, args, context) {
      if (!context.user) return null

      const session = await stripe.checkout.sessions.create(
        {
          mode: 'payment',
          payment_method_types: ['card'],
          line_items: [
            {
              price: args.priceId,
              quantity: 1
            }
          ],
          //TODO: need to setup these url
          success_url: CLIENT_URI,
          cancel_url: CLIENT_URI,
          customer: context.user.stripeCustomerId
        },
        {
          apiKey: process.env.STRIPE_SECRET_KEY
        }
      )

      return {
        id: session.id,
        amount: session.amount_total,
        url: session.url
      }
    }
  }
}
