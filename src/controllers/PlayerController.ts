import { RequestHandler } from 'express';
import Player from '../models/Player';
import User from '../models/User';
import LeagueUser from '../models/LeagueUser';
import { Types } from '../types';

// GET SERVER_URL/api/player/all
export const all: RequestHandler = async (req, res) => {
  // const leagueId = 1;

  const leagueUsers = await LeagueUser.findAll();

  // const players: Types.T_User = [];
  // leagueUsers.map(async leagueUser=>{
  //   const user = await User.findOne({
  //     where: {
  //       id: leagueUser.userId
  //     }
  //   });
  //   console.log("=============", user)
  //   players.push(user)
  // })

  const players = await Promise.all(
    leagueUsers.map(async leagueUser => {
      const user = await User.findOne({
        where: {
          id: leagueUser.userId
        }
      });
      return {
        ...user?.dataValues,
        leagueId: leagueUser.leagueId,
        isWaitList: leagueUser.isWaitList,
        isAcceptedList: leagueUser.isAcceptedList
      };
    })
  );

  res.json({ players });
};

// POST SERVER_URL/api/player/create
export const create: RequestHandler = async (req, res) => {
  const data: Types.T_Player = req.body;

  await Player.create(data);
  res.status(200).json({ message: 'A Player Created Successfully!' });
};

// POST SERVER_URL/api/player/update/1
export const update: RequestHandler = async (req, res) => {
  const player = await Player.findByPk(req.body.id);
  if (player) {
    await player.update(req.body);
    res.json({ player });
  } else {
    res.status(404).json({ message: 'player not found' });
  }
};

// POST SERVER_URL/api/player/remove/1
export const remove: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);

  const player = await Player.findByPk(id);
  if (player) {
    await player.destroy();
    const players = await Player.findAll();

    res.json({ message: 'deleted successfully!', players: players });
  } else {
    res.status(404).json({ message: 'player not found' });
  }
};

// POST SERVER_URL/api/player/add
export const add: RequestHandler = async (req, res) => {
  const data = req.body;
  console.log(data)
  const teamId = data['teamId'];
  const playersList = data['playersList'];
  var playerFound = false;

  const promises = Object.keys(playersList).map(async id => {
    const player = await User.findByPk(id);
    if (player) {
      if (playersList[id] == true) {
        player.teamId = teamId;
        await player.save();
      }
      playerFound = true;
    }
  });

  await Promise.all(promises);

  if (playerFound) {
    res.status(200).json({ message: 'Added successfully!' });
  } else {
    res.status(404).json({ message: 'Players not found' });
  }
};
// POST SERVER_URL/api/player/accept
export const accept: RequestHandler = async (req, res) => {
  const data = req.body;
  console.log(data)
  var playerFound = false;

  const promises = Object.keys(data.waitItemChecked).map(async id => {
    const player = await User.findByPk(id);
    if (player) {
      if (data.waitItemChecked[id] == true) {
        const leagueUser = await LeagueUser.findOne({
          where: {
            userId: id,
            leagueId: data.leagueId
          }
        });

        if (leagueUser) {
          leagueUser.isWaitList = false;
          leagueUser.isAcceptedList = true;
          await leagueUser.save();
        }
        await player.save();
      }
      playerFound = true;
    }
  });

  await Promise.all(promises);

  if (playerFound) {
    res.status(200).json({ message: 'Accpeted successfully!' });
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
};

// POST SERVER_URL/api/player/unaccept
export const unaccept: RequestHandler = async (req, res) => {
  const data = req.body;
  var playerFound = false;

  const promises = Object.keys(data).map(async id => {
    const player = await User.findByPk(id);
    if (player) {
      if (data[id] == true) {
        const leagueUser = await LeagueUser.findOne({
          where: {
            userId: id
          }
        });

        if (leagueUser) {
          leagueUser.isWaitList = true;
          leagueUser.isAcceptedList = false;
          await leagueUser.save();
        }
        await player.save();
      }
      playerFound = true;
    }
  });

  await Promise.all(promises);

  if (playerFound) {
    res.status(200).json({ message: 'Unaccpeted successfully!' });
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
};

// GET SERVER_URL/api/player/info/1
export const info: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const player = await Player.findOne({
    where: {
      id
    }
  });
  if (player) res.json({ player });
  else {
    res.status(404).json({
      message: 'player not found'
    });
  }
};
