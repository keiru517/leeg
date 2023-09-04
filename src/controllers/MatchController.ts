import { RequestHandler } from 'express';
import Match from '../models/Match';
import Team from '../models/Team';
import { Types } from '../types';

// GET SERVER_URL/api/match/all
export const all: RequestHandler = async (req, res) => {
  const matches = await Match.findAll();
  res.json({ matches });
};

// POST SERVER_URL/api/match/create
export const create: RequestHandler = async (req, res) => {
  const data: Types.T_Match = req.body;

  await Match.create(data);
  res.status(200).json({message:'A Match Created Successfully!'});
};
 
// POST SERVER_URL/api/match/update
export const update: RequestHandler = async (req, res) => {
  const data: Types.T_Match = req.body;

  const match = await Match.findByPk(req.body.id);
  if (match) {
    await match.update(data);
    res.status(200).json({ message: 'A match has updated successfully!' });
  } else {
    res.status(404).json({ message: 'match not found' });
  }
};

// POST SERVER_URL/api/match/updateResult
// update the result of the match when admin clicks "Mark As Finished"
export const updateResult: RequestHandler = async (req, res) => {
  const data = req.body;

  const match = await Match.findByPk(data.matchId);
  if (match) {
    match.result = `${data.result[0]}:${data.result[1]}`;

    // update team statistics based on the matchup.
    
    await match.save();
    await updateTeamStatistics(match, data.result[0], data.result[1]);
    res.status(200).json({ message: 'A match has updated successfully!' });
  } else {
    res.status(404).json({ message: 'match not found' });
  }
};

// update win, lose, points etc of the team 
const updateTeamStatistics = async (match:Match, homeTeamPoints: number, awayTeamPoints:number) => {
  const homeTeam = await Team.findByPk(match.homeTeamId);
  const awayTeam = await Team.findByPk(match.awayTeamId);

  if (homeTeam && awayTeam) {
    if (homeTeamPoints > awayTeamPoints) {
      homeTeam.win = homeTeam.win + 1;
      awayTeam.lose = awayTeam.lose + 1;
    } else {
      awayTeam.win = awayTeam.win + 1;
      homeTeam.lose = homeTeam.lose + 1;
    }

    homeTeam.pointScored = homeTeam.pointScored + homeTeamPoints;
    homeTeam.pointAgainst = homeTeam.pointAgainst + awayTeamPoints;
    homeTeam.diff = homeTeam.diff + (homeTeamPoints - awayTeamPoints);

    awayTeam.pointScored = awayTeam.pointScored + awayTeamPoints;
    awayTeam.pointAgainst = awayTeam.pointAgainst + homeTeamPoints;
    awayTeam.diff = awayTeam.diff + (awayTeamPoints - homeTeamPoints);
    await homeTeam.save();
    await awayTeam.save();

  }
  console.log(match, homeTeamPoints, awayTeamPoints)

}
// DELETE SERVER_URL/api/league/remove/1
export const remove: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);

  const league = await Match.findByPk(id);
  if (league) {
    await league.destroy();
    const leagues = await Match.findAll();

    res.json({ message: 'deleted successfully!', leagues:leagues });
  } else {
    res.status(404).json({ message: 'league not found' });
  }
};

// GET SERVER_URL/api/match/info/1
export const info: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const match = await Match.findOne({
    where: {
      id
    }
  });
  if (match) res.json({ match });
  else {
    res.status(404).json({
      message: 'match not found'
    });
  }
};
