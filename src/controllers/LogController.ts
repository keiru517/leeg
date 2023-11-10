import { RequestHandler } from 'express';
import Matchup from '../models/Matchup';
import Player from '../models/Player';
import User from '../models/User';
import Log from '../models/Log';

// import { Types } from '../types';

// GET SERVER_URL/api/matchup/all
export const all: RequestHandler = async (req, res) => {
  // const matchups = await Matchup.findAll();
  const logs = await Log.findAll();
  // const modifiedMatchups = matchups.map((matchup)=>({
  //   ...matchup,
  //   firstName: matchup['player.firstName']
  // }))
  res.json({ logs });
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
  const { leagueId, matchId, logs } = req.body;
  const playerIds = [
    ...new Set(Object.values(logs).map((log: any) => log.playerId))
  ];
  console.log(playerIds);

  try {
    const previousLogs = await Log.findAll({
      where: {
        leagueId: leagueId,
        matchId: matchId
      }
    });

    if (previousLogs) {
      previousLogs.map(async log => {
        await log.destroy();
      });
    }

    // Create new logs for the matchup
    const promise = Object.keys(logs).map(async id => {
      const log = logs[id];
      
      await Log.create({
        playerId: log.playerId,
        leagueId,
        matchId,
        teamId: log.teamId,
        event: log.event,
        period: log.period,
        time: log.time,
        isDeleted: 0
      });
    });

    await Promise.all(promise);

    if (playerIds.length === 0) {
      // const matchups = await Matchup.findAll({
      //   where:{
      //     leagueId: leagueId,
      //     matchId: matchId
      //   }
      // });
      
      // matchups.map(async matchup=>{
        await Matchup.update({
          points : 0,
          points3 : 0,
          points2 : 0,
          points1 : 0,
          attempts3 : 0,
          attempts2 : 0,
          attempts1 : 0,
          blocks : 0,
          rebounds : 0,
          assists : 0,
          fouls : 0,
          steals : 0,
          turnovers : 0,
        }, {
          where:{
            leagueId: leagueId,
            matchId: matchId
          }
        })
      // })
    } else {
      // update matchup
      playerIds.map(async (id: any) => {
        if (id !== '') {
          const matchup = await Matchup.findOne({
            where: {
              playerId: id,
              leagueId: leagueId,
              matchId: matchId
            }
          });
    
          const points3 = calculateNumberOfEvents(logs, '+3 Pointer', id);
    
          const attempts3 =
            points3 + calculateNumberOfEvents(logs, '+3 Attempt', id);
    
          const points2 = calculateNumberOfEvents(logs, '+2 Pointer', id);
          const attempts2 =
            points2 + calculateNumberOfEvents(logs, '+2 Attempt', id);
          const points1 = calculateNumberOfEvents(logs, '+1 Pointer', id);
    
          const points = points3 * 3 + points2 * 2 + points1;
          const attempts1 =
            points1 + calculateNumberOfEvents(logs, '+1 Attempt', id);
    
          const rebounds = calculateNumberOfEvents(logs, 'Rebound', id);
          const turnovers = calculateNumberOfEvents(logs, 'Turnover', id);
          const fouls = calculateNumberOfEvents(logs, 'Foul', id);
          const blocks = calculateNumberOfEvents(logs, 'Block', id);
          const assists = calculateNumberOfEvents(logs, 'Assist', id);
    
          if (matchup) {
            await matchup.update({
              points,
              points3,
              points2,
              points1,
              attempts3,
              attempts2,
              attempts1,
              rebounds,
              turnovers,
              fouls,
              blocks,
              assists
            });
          }
  
        }
      });
    }
    res.status(200).json({ message: 'Saved successfully!' });
  } catch {
    res.status(404).json({ message: 'Save failed' });
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

const calculateNumberOfEvents = (
  logs: any,
  event: any,
  // teamId: any,
  playerId: any
) => {
  const logArray = Object.values(logs);
  const result = logArray.filter(
    (log: any) => log.event == event && log.playerId == playerId
  );

  const number = result.length;
  return number;
};
