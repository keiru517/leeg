import express from 'express';
import { config } from 'dotenv';
import { userRouter, leagueRouter, teamRouter, playerRouter, matchRouter, adminRouter} from './routers';
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
app.use('/api/player', playerRouter);
app.use('/api/match', matchRouter);
app.use('/api/admin', adminRouter);

const port = Number(process.env.PORT || '3000');
app.listen(port, () => console.log(`App listening on port ${port}!`));
