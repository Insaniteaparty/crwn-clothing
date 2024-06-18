require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_methods_types: ["card"],
    });

    return {
      stsusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.error({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};
