const express = require('express');
const multer = require('multer');
const axios = require('axios');

const app = express();
const upload = multer();

app.use(express.static('public'));

app.post('/submit', upload.none(), (req, res) => {
  const postData = {
    namespace_id: req.body.namespace_id,
    data: req.body.data,
    gas_limit: 80000,
    fee: 2000
  };
console.log('POST Data:', req.body);

  axios.post('http://localhost:26659/submit_pfb', postData)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.listen(4001, () => {
  console.log('Server is listening on port 4001');
});

