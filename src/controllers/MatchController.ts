import { RequestHandler } from 'express';
import Match from '../models/Match';
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
 
// POST SERVER_URL/api/match/update/1
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
