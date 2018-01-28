import express from 'express'
import router from './routes/index.js'
import config from 'config-lite'
import cookieParser from 'cookie-parser'
import session from './middlewares/session'
import auth from './middlewares/auth'
import cors from './middlewares/cors'
import errorHandler from './middlewares/error-handler'

const app = express();
const cfg = config(__dirname);

app.use(cors);
app.use(cookieParser());
app.use(session(cfg));
app.use(auth);
router(app);
app.use(errorHandler);

app.listen(cfg.port, () => {
  console.log("app listening on port ".concat(cfg.port));
});

