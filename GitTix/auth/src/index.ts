import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.get('/api/users/currentuser', (req: express.Request, res: express.Response) => {
  res.send('Hi there!');
})

app.listen(3000, () => {
  console.log()
  console.log('Auth Server Running On 3000!!');
});