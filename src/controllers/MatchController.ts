import { RequestHandler } from 'express';
import Match from '../models/Match';
import Team from '../models/Team';
import Matchup from '../models/Matchup';
import Player from '../models/Player';
import { Types } from '../types';

// GET SERVER_URL/api/match/all
export const all: RequestHandler = async (req, res) => {
  const matches = await Match.findAll();
  res.json({ matches });
};

// POST SERVER_URL/api/match/create
export const create: RequestHandler = async (req, res) => {
  const data: Types.T_Match = req.body;

  // await Match.create(data);

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
        isDeleted: 0
      });
    }
  });
  //  ========================================
  res.status(200).json({ message: 'A Match Created Successfully!' });
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
// update the result of the match when admin clicks "Save"
export const updateResult: RequestHandler = async (req, res) => {
  const data = req.body;

  const match = await Match.findByPk(data.matchId);
  if (match) {
    // match.homeTeamPoints = data.result[0];
    // match.awayTeamPoints = data.result[1];

    // update team statistics based on the matchup.

    await updateTeamStatistics(match, data.result[0], data.result[1]);
    // await updateMatchup(match, data.home)
    res.status(200).json({ message: 'A match has updated successfully!' });
  } else {
    res.status(404).json({ message: 'match not found' });
  }
};

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

  const league = await Match.findByPk(id);
  if (league) {
    await league.destroy();
    const leagues = await Match.findAll();

    res.json({ message: 'deleted successfully!', leagues: leagues });
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
