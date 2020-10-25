import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.listen(3000, () => {
  console.log('Auth Server Running On 3000!!!');
});