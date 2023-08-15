import { RequestHandler } from 'express';
import League from '../models/League';
import { Types } from '../types';

export const all: RequestHandler = async (req, res) => {
  const leagues = await League.findAll();
  res.json({ leagues });
};

export const create: RequestHandler = async (req, res) => {
  const json: Types.T_League = req.body;
  const league = await League.create(json);
  res.json({ league });
};

export const info: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const league = await League.findOne({
    where: {
      id
    }
  });
  if (league) res.json({ league });
  else {
    res.status(404).json({
      message: 'league not found'
    });
  }
};
