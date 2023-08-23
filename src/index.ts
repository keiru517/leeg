import express from 'express';
import { config } from 'dotenv';
import { userRouter, leagueRouter, teamRouter, matchRouter } from './routers';
import bodyParser from 'body-parser';
import cors from 'cors';

config();
const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/user', userRouter);
app.use('/api/league', leagueRouter);
app.use('/api/team', teamRouter);
app.use('/api/match', matchRouter);

const port = Number(process.env.PORT || '3000');
app.listen(port, () => console.log(`App listening on port ${port}!`));
