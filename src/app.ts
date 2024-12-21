import express, { Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/router';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

const test = (req: Request, res: Response) => {
  res.send('Blog Project are Running');
};
app.get('/', test);

app.use(globalErrorHandler);

// not Found
app.use(notFound);

export default app;
