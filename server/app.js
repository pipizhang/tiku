import express from 'express';
import router from './routes/index.js';

const app = express();

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", 'TIKU');

  if (res.method == 'OPTION') {
    res.send(200);
  } else {
    next();
  }
});

router(app);

app.listen(3000, () => {
  console.log("app listening on port 3000");
});

