import express from 'express';
import { config } from 'dotenv';
import { userRouter, leagueRouter, teamRouter, playerRouter, matchRouter, adminRouter, matchupRouter, logRouter, substituteRouter, blogRouter, commentRouter} from './routers';
import bodyParser from 'body-parser';
import cors from 'cors';

config();
const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/user', userRouter);
app.use('/api/league', leagueRouter);
app.use('/api/blog', blogRouter);
app.use('/api/comment', commentRouter);
app.use('/api/team', teamRouter);
app.use('/api/player', playerRouter);
app.use('/api/match', matchRouter);
app.use('/api/admin', adminRouter);
app.use('/api/matchup', matchupRouter);
app.use('/api/log', logRouter);
app.use('/api/substitutes', substituteRouter);

const port = Number(process.env.PORT || '3001');
app.listen(port, () => console.log(`App listening on port ${port}!`));
