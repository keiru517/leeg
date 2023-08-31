import { RequestHandler } from 'express';
import Player from '../models/Player';
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
export const add: RequestHandler =async (req, res) => {
  const data = req.body;
  const teamId = data['teamId']
  const playersList = data['playersList']
console.log(teamId, playersList)
  var playerFound = false;
  
  const promises = Object.keys(playersList).map( async id => {
    console.log(id)
    const player = await Player.findByPk(id);
    if (player) {
      if (playersList[id] == true) {
        player.role = 2;
        player.teamId = teamId;
        await player.save();
      }
      playerFound = true;
    }
  });
  
  await Promise.all(promises);
  
  if (playerFound) {
    res.status(200).json({message: 'Added successfully!'});
  } else {
    res.status(404).json({message: "Players not found"});
  }
  
}
// POST SERVER_URL/api/player/accept
export const accept: RequestHandler = async (req, res) => {
  const data = req.body;
  var playerFound = false;

  const promises = Object.keys(data).map( async id => {
    const player = await Player.findByPk(id);
    if (player) {
      if (data[id] == true) {
        player.role = 1;
        await player.save();
      }
      playerFound = true;
    }
  });

  await Promise.all(promises);

  if (playerFound) {
    res.status(200).json({message: 'Accpeted successfully!'});
  } else {
    res.status(404).json({message: "Player not found"});
  }
};


// POST SERVER_URL/api/player/unaccept
export const unaccept: RequestHandler =async (req, res) => {
  const data = req.body;
  var playerFound = false;

  const promises = Object.keys(data).map( async id => {
    const player = await Player.findByPk(id);
    if (player) {
      if (data[id] == true) {
        player.role = 0;
        await player.save();
      }
      playerFound = true;
    }
  });

  await Promise.all(promises);

  if (playerFound) {
    res.status(200).json({message: 'Unaccpeted successfully!'});
  } else {
    res.status(404).json({message: "Player not found"});
  }
}

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
