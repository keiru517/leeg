import { RequestHandler } from 'express';
import Player from '../models/Player';
// import User from '../models/User';
import { Types } from '../types';

// GET SERVER_URL/api/player/all
export const all: RequestHandler = async (req, res) => {
  const players = await Player.findAll();
  res.json({ players });
};

// POST SERVER_URL/api/player/create
export const create: RequestHandler = async (req, res) => {
  const data: Types.T_Player = req.body;

  await Player.create(data);
  res.status(200).json({ message: 'A Player Created Successfully!' });
};

// POST SERVER_URL/api/player/update
export const update: RequestHandler = async (req, res) => {
  const {playerId, jerseyNumber} = req.body;
  console.log(playerId, jerseyNumber);
  
  const player = await Player.findByPk(playerId);
  if (player) {
    await player.update({'jerseyNumber':jerseyNumber});
    res.json({ message:"Updated successfully!" });
  } else {
    res.status(404).json({ message: 'player not found' });
  }
};

// POST SERVER_URL/api/player/remove
export const remove: RequestHandler = async (req, res) => {
  const id = req.body.id;

  const player = await Player.findByPk(id);
  if (player) {
    player.isDeleted = 1;
    await player.save();

    await Player.create({
      leagueId: player.leagueId,
      teamId: 0,
      userId: player.userId,
      firstName: player.firstName,
      lastName: player.lastName,
      avatar: player.avatar,
      email: player.email,
      jerseyNumber: 0,
      birthday: player.birthday,
      country: player.country,
      state: player.state,
      city: player.city,
      address: player.address,
      zipCode: player.zipCode,
      isWaitList: player.isWaitList,
      isAcceptedList: player.isAcceptedList,
      isDeleted: 0
    });

    res.json({ message: 'deleted successfully!'});
  } else {
    res.status(404).json({ message: 'player not found' });
  }
};

// POST SERVER_URL/api/player/add
export const add: RequestHandler = async (req, res) => {
  const data = req.body;
  console.log(data);
  const teamId = data['teamId'];
  const playersList = data['playersList'];
  var playerFound = false;

  const promises = Object.keys(playersList).map(async id => {
    const player = await Player.findByPk(id);
    if (player) {
      player.teamId = teamId;
      await player.save();
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
  console.log(data);
  var playerFound = false;

  const promises = Object.keys(data.waitItemChecked).map(async id => {
    const player = await Player.findByPk(id);
    if (player) {
      player.isAcceptedList = 1;
      player.isWaitList = 0;
      await player.save();
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
    const player = await Player.findByPk(id);
    if (player) {
      player.isWaitList = 1;
      player.isAcceptedList = 0;
      await player.save();
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
