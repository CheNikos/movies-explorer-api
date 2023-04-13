require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validationLogin, validationSignup } = require('./middlewares/validation');
const { PORT, MONGO_DB } = require('./utils/config');
const { SERVER_WILL_CRASH, INTERNAL_SERVER_ERROR } = require('./utils/constants');
const corsErr = require('./middlewares/cors');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(corsErr);
mongoose.connect(MONGO_DB);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(requestLogger);

app.post('/signin', validationLogin, login);
app.post('/signup', validationSignup, createUser);
app.use(auth);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(SERVER_WILL_CRASH);
  }, 0);
});
app.use(router);

app.use(errorLogger);
app.use(limiter);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? INTERNAL_SERVER_ERROR
      : message,
  });
  next();
});

app.listen(PORT);
