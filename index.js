import express from 'express';
import weatherRoute from './src/routes/weather.route.js';
import { env } from './src/config/env.js';
import rateLimit from 'express-rate-limit';

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many requests"
  }
});

app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', weatherRoute);

app.listen(env.PORT, () => {
  console.log(`Server is running on port http://localhost:${env.PORT}`);
});