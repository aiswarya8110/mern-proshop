import dotenv from "dotenv";
dotenv.config();

/**
 * Fetches an access token from the PayPal API.
 * @see {@link https://developer.paypal.com/reference/get-an-access-token/#link-getanaccesstoken}
 *
 * @returns {Promise<string>} The access token if the request is successful.
 * @throws {Error} If the request is not successful.
 *
 */
async function getPayPalAccessToken() {
  // Authorization header requires base64 encoding
  const auth = Buffer.from(
    process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_APP_SECRET
  ).toString("base64");

  const url = `${process.env.PAYPAL_API_URL}/v1/oauth2/token`;

  const headers = {
    Accept: "application/json",
    "Accept-Language": "en_US",
    Authorization: `Basic ${auth}`,
  };

  const body = "grant_type=client_credentials";
  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  if (!response.ok) throw new Error("Failed to get access token");

  const paypalData = await response.json();

  return paypalData.access_token;
}

/**
 * Verifies a PayPal payment by making a request to the PayPal API.
 * @see {@link https://developer.paypal.com/docs/api/orders/v2/#orders_get}
 *
 * @param {string} paypalTransactionId - The PayPal transaction ID to be verified.
 * @returns {Promise<Object>} An object with properties 'verified' indicating if the payment is completed and 'value' indicating the payment amount.
 * @throws {Error} If the request is not successful.
 *
 */
export async function verifyPayPalPayment(paypalTransactionId) {
  const accessToken = await getPayPalAccessToken();
  const paypalResponse = await fetch(
    `${process.env.PAYPAL_API_URL}/v2/checkout/orders/${paypalTransactionId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!paypalResponse.ok) throw new Error("Failed to verify payment");

  const paypalData = await paypalResponse.json();
  return {
    verified: paypalData.status === "COMPLETED",
    value: paypalData.purchase_units[0].amount.value,
  };
}
