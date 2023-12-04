import { RequestHandler } from 'express';
import Matchup from '../models/Matchup';
import Player from '../models/Player';
import User from '../models/User';
import Log from '../models/Log';
import Match from '../models/Match';
import Team from '../models/Team';

// GET SERVER_URL/api/matchup/all
export const all: RequestHandler = async (req, res) => {
  const matchups = await Matchup.findAll({
    include: [
      { model: Player, as: 'player' },
      { model: Match, as: 'match' }
    ]
  });
  res.json({ matchups });
};

// Create a matchup for a substitute
// POST SERVER_URL/api/matchup/createOne
export const createOne: RequestHandler = async (req, res) => {
  const { email, leagueId, matchId, teamId, jerseyNumber, position } = req.body;
  const user = await User.findOne({
    where: {
      email
    }
  });
  if (user) {
    // create a player
    const player = await Player.create({
      leagueId,
      teamId,
      userId: user.id,
      matchId: 0,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: `${process.env.DOMAIN}/api/user/avatar/${user.id}`,
      email: user.email,
      jerseyNumber,
      position,
      birthday: user.birthday,
      isWaitList: 0,
      isAcceptedList: 0,
      isDeleted: 0,
      isSubstitute: 1,
      state: '',
      country: '',
      city: '',
      address: '',
      zipCode: ''
    });

    await Matchup.create({
      playerId: player.id,
      userId: user.id,
      leagueId,
      matchId,
      teamId,
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
    res.status(200).json({ message: 'Added successfully!' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
// POST SERVER_URL/api/matchup/create
export const create: RequestHandler = async (req, res) => {
  const matchId = req.body.matchId;
  // const data = req.body.data;

  var playerFound = false;
  const homeTeamPlayers = req.body.homeInputValues;
  const awayTeamPlayers = req.body.awayInputValues;

  // Handle home team players
  const promise1 = Object.keys(homeTeamPlayers).map(async id => {
    const player = homeTeamPlayers[id];

    // check if there is a matchup data
    const matchup = await Matchup.findOne({
      where: {
        playerId: player.id,
        teamId: player.teamId,
        matchId: matchId
      }
    });

    // update a matchup
    if (matchup) {
      await Matchup.update(
        {
          userId: player.userId,
          points: player.points,
          points3: player.points3,
          points2: player.points2,
          points1: player.points1
        },
        {
          where: {
            id: matchup.id
          }
        }
      );
    }
    // Create a matchup
    else {
      await Matchup.create({
        playerId: player.id,
        userId: player.userId,
        leagueId: player.leagueId,
        matchId: matchId,
        teamId: player.teamId,
        points: player.points,
        points3: player.points3,
        points2: player.points2,
        points1: player.points1,
        attempts3: player.attempts3 ? player.attempts3 : 0,
        attempts2: player.attempts2 ? player.attempts3 : 0,
        attempts1: player.attempts1 ? player.attempts3 : 0,
        blocks: player.blocks ? player.blocks : 0,
        rebounds: player.rebounds ? player.rebounds : 0,
        assists: player.assists ? player.assists : 0,
        fouls: player.fouls ? player.fouls : 0,
        steals: player.steals ? player.steals : 0,
        turnovers: player.turnovers ? player.turnovers : 0,
        attendance: 1,
        isDeleted: 0
      });
    }

    playerFound = true;
  });

  // Handle away team players
  const promise2 = Object.keys(awayTeamPlayers).map(async id => {
    const player = awayTeamPlayers[id];

    // check if there is a matchup data
    const matchup = await Matchup.findOne({
      where: {
        playerId: player.id,
        teamId: player.teamId,
        matchId: matchId
      }
    });
    // update a matchup
    if (matchup) {
      await Matchup.update(
        {
          userId: player.userId,
          points: player.points,
          points3: player.points3,
          points2: player.points2,
          points1: player.points1
        },
        { where: { id: matchup.id } }
      );
    }
    // Create a matchup
    else {
      await Matchup.create({
        playerId: player.id,
        userId: player.userId,
        leagueId: player.leagueId,
        matchId: matchId,
        teamId: player.teamId,
        points: player.points,
        points3: player.points3,
        points2: player.points2,
        points1: player.points1,
        attempts3: player.attempts3 ? player.attempts3 : 0,
        attempts2: player.attempts2 ? player.attempts3 : 0,
        attempts1: player.attempts1 ? player.attempts3 : 0,
        blocks: player.blocks ? player.blocks : 0,
        rebounds: player.rebounds ? player.rebounds : 0,
        assists: player.assists ? player.assists : 0,
        fouls: player.fouls ? player.fouls : 0,
        steals: player.steals ? player.steals : 0,
        turnovers: player.turnovers ? player.turnovers : 0,
        attendance: 1,
        isDeleted: 0
      });
    }
    playerFound = true;
  });
  await Promise.all(promise1);
  await Promise.all(promise2);

  if (playerFound) {
    res.status(200).json({ message: 'Saved successfully!' });
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
};

// POST SERVER_URL/api/matchup/update
export const update: RequestHandler = async (req, res) => {
  const matchId = req.body.matchId;
  // const data = req.body.data;

  var playerFound = false;
  const homeTeamPlayers = req.body.homeInputValues;
  const awayTeamPlayers = req.body.awayInputValues;

  // Handle home team players
  const promise1 = Object.keys(homeTeamPlayers).map(async id => {
    const player = homeTeamPlayers[id];

    // check if there is a matchup data
    const matchup = await Matchup.findOne({
      where: {
        playerId: player.id,
        teamId: player.teamId,
        matchId: matchId
      }
    });

    // update a matchup
    if (matchup) {
      await Matchup.update(
        {
          points: player.points,
          points3: player.points3,
          points2: player.points2,
          points1: player.points1,
          attempts3: player.attempts3,
          attempts2: player.attempts2,
          attempts1: player.attempts1,
          blocks: player.blocks,
          rebounds: player.rebounds,
          assists: player.assists,
          fouls: player.fouls,
          steals: player.steals,
          turnovers: player.turnovers
        },
        {
          where: {
            id: matchup?.id
          }
        }
      );
    }

    playerFound = true;
  });

  // Handle away team players
  const promise2 = Object.keys(awayTeamPlayers).map(async id => {
    const player = awayTeamPlayers[id];

    // check if there is a matchup data
    const matchup = await Matchup.findOne({
      where: {
        playerId: player.id,
        teamId: player.teamId,
        matchId: matchId
      }
    });
    // update a matchup
    if (matchup) {
      await Matchup.update(
        {
          points: player.points,
          points3: player.points3,
          points2: player.points2,
          points1: player.points1,
          attempts3: player.attempts3,
          attempts2: player.attempts2,
          attempts1: player.attempts1,
          blocks: player.blocks,
          rebounds: player.rebounds,
          assists: player.assists,
          fouls: player.fouls,
          steals: player.steals,
          turnovers: player.turnovers
        },
        { where: { id: matchup.id } }
      );
    }
    // Create a matchup
    else {
      await Matchup.create({
        playerId: player.id,
        userId: player.userId,
        leagueId: player.leagueId,
        matchId: matchId,
        teamId: player.teamId,
        points: player.points,
        points3: player.points3,
        points2: player.points2,
        points1: player.points1,
        attempts3: player.attempts3 ? player.attempts3 : 0,
        attempts2: player.attempts2 ? player.attempts3 : 0,
        attempts1: player.attempts1 ? player.attempts3 : 0,
        blocks: player.blocks ? player.blocks : 0,
        rebounds: player.rebounds ? player.rebounds : 0,
        assists: player.assists ? player.assists : 0,
        fouls: player.fouls ? player.fouls : 0,
        steals: player.steals ? player.steals : 0,
        turnovers: player.turnovers ? player.turnovers : 0,
        attendance: 1,
        isDeleted: 0
      });
    }
    playerFound = true;
  });
  await Promise.all(promise1);
  await Promise.all(promise2);

  if (playerFound) {
    res.status(200).json({ message: 'Saved successfully!' });
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
};

// POST SERVER_URL/api/matchup/remove/1
export const remove: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);

  const matchup = await Matchup.findByPk(id);
  if (matchup) {
    await matchup.destroy();
    const matchups = await Matchup.findAll();

    res.json({ message: 'deleted successfully!', matchups: matchups });
  } else {
    res.status(404).json({ message: 'matchup not found' });
  }
};

export const complete: RequestHandler = async (req, res) => {
  const { matchId } = req.body;
  const match = await Match.findByPk(matchId);
  console.log(matchId);
  const logs = await Log.findAll({
    where: {
      matchId
    }
  });

  try {
    if (logs) {
      // const promise = logs.map(async log => {
      for (const log of logs) {
        if (match && match.isNew && !log.isDirect) {
          const matchup = await Matchup.findOne({
            where: {
              matchId: matchId,
              playerId: log.playerId
            }
          });

          if (matchup) {
            console.log('lock=============', log.event);
            // update matchup if the match is not new
            switch (log.event) {
              case '+3 Pointer':
                matchup.points3 = matchup.points3 + 1;
                matchup.points = matchup.points + 3;
                break;
              case '+2 Pointer':
                console.log(
                  '====before',
                  log.playerId,
                  matchup.id,
                  matchup.points2,
                  matchup.points
                );
                matchup.points2 = matchup.points2 + 1;
                matchup.points = matchup.points + 2;
                console.log(
                  '====after',
                  log.playerId,
                  matchup.id,
                  matchup.points2,
                  matchup.points
                );
                break;
              case '+1 Pointer':
                matchup.points1 = matchup.points1 + 1;
                matchup.points = matchup.points + 1;
                break;
              case '+3 Attempt':
                matchup.attempts3 = matchup.attempts3 + 1;
                break;
              case '+2 Attempt':
                matchup.attempts2 = matchup.attempts2 + 1;
                break;
              case '+1 Attempt':
                matchup.attempts1 = matchup.attempts1 + 1;
                break;
              case 'Rebound':
                matchup.rebounds = matchup.rebounds + 1;
                break;
              case 'Turnover':
                matchup.turnovers = matchup.turnovers + 1;
                break;
              case 'Foul':
                matchup.fouls = matchup.fouls + 1;
                break;
              case 'Block':
                matchup.blocks = matchup.blocks + 1;
                break;
              case 'Assist':
                matchup.assists = matchup.assists + 1;
                break;
            }
            console.log('==========save', log.playerId);
            await matchup.save();
          }
        }
      }
      // });

      // await Promise.all(promise);
      // Update Team statistics if the match is new
      if (match && match.isNew) {
        match.isNew = false;
        await match.save();
        const homeTeam = await Team.findByPk(match.homeTeamId);
        const awayTeam = await Team.findByPk(match.awayTeamId);
        if (homeTeam && awayTeam) {
          console.log('================lock', homeTeam.win, awayTeam.lose);
          if (match.homeTeamPoints > match.awayTeamPoints) {
            homeTeam.win = homeTeam.win + 1;
            awayTeam.lose = awayTeam.lose + 1;

            // homeTeam.pointScored = homeTeam.pointScored + match.homeTeamPoints;
            // homeTeam.pointAgainst = homeTeam.pointAgainst + match.awayTeamPoints;
            // homeTeam.diff = homeTeam.pointScored - homeTeam.pointAgainst;

            // awayTeam.pointScored = awayTeam.pointScored + match.awayTeamPoints;
            // awayTeam.pointAgainst = awayTeam.pointAgainst + match.homeTeamPoints;
            // awayTeam.diff = awayTeam.pointScored - awayTeam.pointAgainst;
          } else if (match.homeTeamPoints < match.awayTeamPoints) {
            homeTeam.lose = homeTeam.lose + 1;
            awayTeam.win = awayTeam.win + 1;
          }
          homeTeam.pointScored = homeTeam.pointScored + match.homeTeamPoints;
          homeTeam.pointAgainst = homeTeam.pointAgainst + match.awayTeamPoints;
          homeTeam.diff = homeTeam.pointScored - homeTeam.pointAgainst;

          awayTeam.pointScored = awayTeam.pointScored + match.awayTeamPoints;
          awayTeam.pointAgainst = awayTeam.pointAgainst + match.homeTeamPoints;
          awayTeam.diff = awayTeam.pointScored - awayTeam.pointAgainst;

          await homeTeam.save();
          await awayTeam.save();
        }
      }
    } else {
      console.log('Logs are not found!');
    }

    const matchups = await Matchup.findAll({
      include: [{ model: Player, as: 'player' }]
    });
    res.status(200).json({ matchups });
  } catch (error) {
    res.status(400).json({ message: 'Error occurred!' });
  }
};

export const incomplete: RequestHandler = async (req, res) => {
  const { matchId } = req.body;
  const match = await Match.findByPk(matchId);
  console.log(matchId);
  const logs = await Log.findAll({
    where: {
      matchId
    }
  });

  try {
    if (logs) {
      // const promise = logs.map(async log => {
      for (const log of logs) {
        console.log(log.event, log.playerId, log.matchId);
        if (match && !match.isNew && !log.isDirect) {
          const matchup = await Matchup.findOne({
            where: {
              matchId: matchId,
              playerId: log.playerId
            }
          });
          if (matchup) {
            // update team statistics
            // if (match && !match.isNew) {
            // update matchup if the match is not new
            switch (log.event) {
              case '+3 Pointer':
                matchup.points3 = matchup.points3 - 1;
                matchup.points = matchup.points - 3;
                break;
              case '+2 Pointer':
                matchup.points2 = matchup.points2 - 1;
                matchup.points = matchup.points - 2;
                break;
              case '+1 Pointer':
                matchup.points1 = matchup.points1 - 1;
                matchup.points = matchup.points - 1;
                break;
              case '+3 Attempt':
                matchup.attempts3 = matchup.attempts3 - 1;
                break;
              case '+2 Attempt':
                matchup.attempts2 = matchup.attempts2 - 1;
                break;
              case '+1 Attempt':
                matchup.attempts1 = matchup.attempts1 - 1;
                break;
              case 'Rebound':
                matchup.rebounds = matchup.rebounds - 1;
                break;
              case 'Turnover':
                matchup.turnovers = matchup.turnovers - 1;
                break;
              case 'Foul':
                matchup.fouls = matchup.fouls - 1;
                break;
              case 'Block':
                matchup.blocks = matchup.blocks - 1;
                break;
              case 'Assist':
                matchup.assists = matchup.assists - 1;
                break;
            }
            await matchup.save();
            // }
          }
        }
      }
      // });
      // await Promise.all(promise);
      // Update Team statistics if the match is new
      if (match && !match.isNew) {
        match.isNew = true;
        await match.save();
        const homeTeam = await Team.findByPk(match.homeTeamId);
        const awayTeam = await Team.findByPk(match.awayTeamId);
        if (homeTeam && awayTeam) {
          console.log('================unlock', homeTeam.win, awayTeam.lose);
          if (match.homeTeamPoints > match.awayTeamPoints) {
            homeTeam.win = homeTeam.win - 1;
            awayTeam.lose = awayTeam.lose - 1;
          } else if (match.homeTeamPoints < match.awayTeamPoints) {
            homeTeam.lose = homeTeam.lose - 1;
            awayTeam.win = awayTeam.win - 1;
          }
          homeTeam.pointScored = homeTeam.pointScored - match.homeTeamPoints;
          homeTeam.pointAgainst = homeTeam.pointAgainst - match.awayTeamPoints;
          homeTeam.diff = homeTeam.pointScored - homeTeam.pointAgainst;

          awayTeam.pointScored = awayTeam.pointScored - match.awayTeamPoints;
          awayTeam.pointAgainst = awayTeam.pointAgainst - match.homeTeamPoints;
          awayTeam.diff = awayTeam.pointScored - awayTeam.pointAgainst;

          await homeTeam.save();
          await awayTeam.save();
        }
      }
    } else {
      console.log('Logs are not found!');
    }
    const matchups = await Matchup.findAll({
      include: [{ model: Player, as: 'player' }]
    });
    res.status(200).json({ matchups });
  } catch (error) {
    res.status(400).json({ message: 'Error occurred!' });
  }
};
export const editLineups: RequestHandler = async (req, res) => {
  const lineups = req.body.lineups;
  const matchId = req.body.matchId;

  try {
    const promise = Object.keys(lineups).map(async id => {
      // if (!lineups[id]) {
      await Matchup.update(
        {
          attendance: lineups[id]
        },
        {
          where: {
            matchId,
            playerId: id
          }
        }
      );
      // }
    });
    await Promise.all(promise);
    const matchups = await Matchup.findAll({
      include: [{ model: Player, as: 'player' }]
    });
    res.status(200).json({ matchups });
  } catch {
    res.status(404).json({ message: 'Failed!' });
  }
};

// GET SERVER_URL/api/matchup/info/1
export const info: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const matchup = await Matchup.findOne({
    where: {
      id
    }
  });
  if (matchup) res.json({ matchup });
  else {
    res.status(404).json({
      message: 'matchup not found'
    });
  }
};
