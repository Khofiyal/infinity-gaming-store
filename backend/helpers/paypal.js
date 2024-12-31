const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AVFnnpGJYlN4e5b-0rfL_aBYni15eP9jzMhiyXRZ78GQ3jP6LL1grpddnY05CY7HcrAY964FN4qdCDaO",
  client_secret: "EF3Fu6cHeQORtA3I311ErhNrwKwNFJ23Zz-xdx5E8sBT96CyeoXTpc_Q8K3yafySC_N3omGar_Fza2cJ",
});

module.exports = paypal;
