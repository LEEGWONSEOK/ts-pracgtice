import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as passport from 'passport';
import * as hpp from 'hpp';
import helmet from 'helmet';

dotenv.config();
const app = express();
const prod: boolean = process.env.NODE_ENV === 'production';


if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(cors());
} else {
  app.use(morgan('dev'));
  app.use(cors());
}

app.set(`port`, prod ? process.env.PORT : 3065)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser)

app.get('/', (req, res) => {
  res.send('ts-practice');
});

app.listen(app.get('port'), () => {
  console.log(`server is runnig on ${app.get('port')}`)
})