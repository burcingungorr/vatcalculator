const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

/*
  - Levy: %1
  - GETFund: %2.5
  - Covid: %1
  - NHIL: %2.5
  - VAT: %15
*/
function calculateAll(
  value,
  levyPercent = 1,
  getFundPercent = 2.5,
  covidPercent = 1,
  nhilPercent = 2.5,
  vatPercent = 15
) {

  const invoiceAmount = Number(value);

  const levy = invoiceAmount * (levyPercent / 100);
  const getFund = invoiceAmount * (getFundPercent / 100);
  const covid = invoiceAmount * (covidPercent / 100);
  const nhil = invoiceAmount * (nhilPercent / 100);

  const beforeVat = invoiceAmount + levy + getFund + covid + nhil;
  const vat = beforeVat * (vatPercent / 100);
  const total = beforeVat + vat;

  return {
    invoiceAmount: invoiceAmount.toFixed(2),
    levy: levy.toFixed(2),
    getFund: getFund.toFixed(2),
    covid: covid.toFixed(2),
    nhil: nhil.toFixed(2),
    net: beforeVat.toFixed(2),
    vat: vat.toFixed(2),
    total: total.toFixed(2),
    rates: { levyPercent, getFundPercent, covidPercent, nhilPercent, vatPercent }
  };
}

// hesaplama endpointi
app.post('/api/calculate', (req, res) => {
    const { inclusive, levyPercent, getFundPercent, covidPercent, nhilPercent, vatPercent } = req.body;

    if (inclusive === undefined || inclusive === null) {
      return res.status(400).json({ error: 'inclusive alanı gerekli' });
    }

    const result = calculateAll(
      Number(inclusive),
      levyPercent ?? 1,
      getFundPercent ?? 2.5,
      covidPercent ?? 1,
      nhilPercent ?? 2.5,
      vatPercent ?? 15
    );

    return res.json(result);

});

app.listen(PORT, () => console.log(`Sunucu calisiyor`));
