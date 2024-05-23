import mercadopago from "mercadopago";

export const createOrder = async (req, res) => {
  mercadopago.configure({
    access_token:
      "TEST-7388107373323799-111117-cda42e452f0073d1f6cc9976b96f04c1-1544443213",
  });

  const result = await mercadopago.preferences.create({
    items: [
      {
        title: "Honguito Shitake",
        unit_price: 500,
        currency_id: "ARS",
        quantity: 1,
      },
    ],
    back_urls: {
      success: "http://localhost:3000/success",
      failure: "http://localhost:3000/failure",
      pending: "http://localhost:3000/pending",
    },
    notification_url: "https://b66c-181-84-62-31.ngrok.io/webhook",
  });

  console.log(result);

  res.send(result.body);
};

export const receiveWebHook = async (req, res) => {
  console.log(req.query);

  const payment = req.query;

  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log(data);
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ error: error.message });
  }
};
