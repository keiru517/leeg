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
  const data: Types.T_PLAYER = req.body;

  await Player.create(data);
  res.status(200).json({message:'A Player Created Successfully!'});
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

    res.json({ message: 'deleted successfully!', players:players });
  } else {
    res.status(404).json({ message: 'player not found' });
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
