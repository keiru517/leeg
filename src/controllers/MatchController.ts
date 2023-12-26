import { RequestHandler } from 'express';
import Match from '../models/Match';
import Team from '../models/Team';
import Matchup from '../models/Matchup';
import Player from '../models/Player';
import Log from '../models/Log';
import { Types } from '../types';

// GET SERVER_URL/api/match/all
export const all: RequestHandler = async (req, res) => {
  const matches = await Match.findAll();
  res.json({ matches });
};

// POST SERVER_URL/api/match/create
export const create: RequestHandler = async (req, res) => {
  const data: Types.T_Match = req.body;

  try {
    // Create matchup when the user creates a match =====================
    const match = await Match.create(data);
    const homeTeamPlayers = await Player.findAll({
      where: {
        teamId: match.homeTeamId,
        isDeleted: 0
      }
    });
  
    homeTeamPlayers.map(async player => {
      if (!player.isSubstitute) {
        await Matchup.create({
          playerId: player.id,
          userId: player.userId,
          leagueId: match.leagueId,
          matchId: match.id,
          teamId: player.teamId,
          points: 0,
          points3: 0,
          points2: 0,
          points1: 0,
          attempts3: 0,
          attempts2: 0,
          attempts1: 0,
          blocks: 0,
          rebounds: 0,
          assists: 0,
          fouls: 0,
          steals: 0,
          turnovers: 0,
          attendance: 1,
          isDeleted: 0
        });
      }
    });
  
    const awayTeamPlayers = await Player.findAll({
      where: {
        teamId: match.awayTeamId,
        isDeleted: 0
      }
    });
  
    awayTeamPlayers.map(async player => {
      if (!player.isSubstitute) {
        await Matchup.create({
          playerId: player.id,
          userId: player.userId,
          leagueId: match.leagueId,
          matchId: match.id,
          teamId: player.teamId,
          points: 0,
          points3: 0,
          points2: 0,
          points1: 0,
          attempts3: 0,
          attempts2: 0,
          attempts1: 0,
          blocks: 0,
          rebounds: 0,
          assists: 0,
          fouls: 0,
          steals: 0,
          turnovers: 0,
          attendance: 1,
          isDeleted: 0
        });
      }
    });
    //  ========================================
    const matches = await Match.findAll()
    res.status(200).json({ matches });
  } catch (error) {
    res.status(400).json({message:"Error occurred while creating!"});
  }
};

// POST SERVER_URL/api/match/update
export const update: RequestHandler = async (req, res) => {
  const {id, date, time, location} = req.body;
  try {
    await Match.update({
      date, time, location
    }, {
      where:{
        id
      }
    });
    const matches = await Match.findAll();
    res.status(200).json({ matches });
  } catch (error) {
    res.status(400).json({message:"Error occurred while updating!"})
  }
};

// POST SERVER_URL/api/match/updateResult
// update the result of the match when admin clicks "Save"
export const updateResult: RequestHandler = async (req, res) => {
  const data = req.body;
  console.log(data)

  const match = await Match.findByPk(data.matchId);
  if (match) {
    match.homeTeamPoints = data.result[0];
    match.awayTeamPoints = data.result[1];

    // update team statistics based on the matchup.
    if (!match.isNew) {
      await updateTeamStatistics(match, data.result[0], data.result[1]);
    }
    const matches = await Match.findAll();
    // await updateMatchup(match, data.home)
    res.status(200).json({ matches });
  } else {
    res.status(404).json({ message: 'match not found' });
  }
};

// POST SERVER_URL/api/match/updateSettings
export const updateSettings: RequestHandler =async (req, res) => {
  const {matchId, period, time} = req.body;
  try{
    await Match.update({
      period:period,
      timer:time
    }, {
      where:{
        id:matchId
      }
    });
    res.status(200).json({message:"Saved Successfully!"});
  } catch (error) {
    res.status(404).json({message: error});
  }
}

// update win, lose, points etc of the team
const updateTeamStatistics = async (
  match: Match,
  homeTeamPoints: number,
  awayTeamPoints: number
) => {
  const homeTeam = await Team.findByPk(match.homeTeamId);
  const awayTeam = await Team.findByPk(match.awayTeamId);

  // If the match is new
  if (match.isNew) {
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
      homeTeam.diff = homeTeam.pointScored - homeTeam.pointAgainst;

      // homeTeam.diff = homeTeam.diff + (homeTeamPoints - awayTeamPoints);

      awayTeam.pointScored = awayTeam.pointScored + awayTeamPoints;
      awayTeam.pointAgainst = awayTeam.pointAgainst + homeTeamPoints;
      awayTeam.diff = awayTeam.pointScored - awayTeam.pointAgainst;
      await homeTeam.save();
      await awayTeam.save();
      match.isNew = false;
      // await match.save();
    }
  }
  // If the admin updates the matchup
  else {
    const prevHomePoints = match.homeTeamPoints;
    const prevAwayPoints = match.awayTeamPoints;
    console.log('======================prev', prevHomePoints, prevAwayPoints);

    if (homeTeam && awayTeam) {
      if (homeTeamPoints > awayTeamPoints) {
        if (prevHomePoints < prevAwayPoints) {
          console.log('prevHomePoints < prevAwayPoints');
          homeTeam.win = homeTeam.win + 1;
          homeTeam.lose = homeTeam.lose - 1;

          awayTeam.win = awayTeam.win - 1;
          awayTeam.lose = awayTeam.lose + 1;
        }
      }
      // homeTeamPoints < awayTeamPoints
      else {
        if (prevHomePoints > prevAwayPoints) {
          console.log('prevHomePoints > prevAwayPoints');
          homeTeam.win = homeTeam.win - 1;
          homeTeam.lose = homeTeam.lose + 1;

          awayTeam.win = awayTeam.win + 1;
          awayTeam.lose = awayTeam.lose - 1;
        }
      }

      homeTeam.pointScored =
        homeTeam.pointScored - prevHomePoints + homeTeamPoints;
      homeTeam.pointAgainst =
        homeTeam.pointAgainst - prevAwayPoints + awayTeamPoints;
      homeTeam.diff = homeTeam.pointScored - homeTeam.pointAgainst;

      awayTeam.pointScored =
        awayTeam.pointScored - prevAwayPoints + awayTeamPoints;
      awayTeam.pointAgainst =
        awayTeam.pointAgainst - prevHomePoints + homeTeamPoints;
      awayTeam.diff = awayTeam.pointScored - awayTeam.pointAgainst;
      await homeTeam.save();
      await awayTeam.save();
    }
  }
  match.homeTeamPoints = homeTeamPoints;
  match.awayTeamPoints = awayTeamPoints;
  await match.save();
};

// Create or update Matchup
// const updateMatchup =async (match:Match, homeInputValues: Object, awayInputValues: Object) => {

// }
// DELETE SERVER_URL/api/league/remove/1
export const remove: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);

  const match = await Match.findByPk(id);
  if (match) {
    await match.destroy()
    const matches = await Match.findAll();
    await Log.destroy({
      where: {
        matchId: id,
      },
    });


    res.json({ matches});
  } else {
    res.status(404).json({ message: 'Match not found' });
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
