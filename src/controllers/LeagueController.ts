import { RequestHandler } from 'express';
import League from '../models/League';
// import { Types } from '../types';

// GET SERVER_URL/api/league/all
export const all: RequestHandler = async (req, res) => {
  const leagues = await League.findAll();
  res.json({ leagues });
};

// POST SERVER_URL/api/league/create
export const create: RequestHandler = async (req, res) => {
  // const json: Types.T_League = req.body;
  const data = {
    name: req.body.name,
    description: req.body.description,
    logo: req.body.logo,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  };

  const league = await League.create(data);
  res.json({ league });
};

// POST SERVER_URL/api/league/update/1
export const update: RequestHandler = async (req, res) => {
  // const id = Number(req.params.id);

  const data = {
    name: req.body.name,
    description: req.body.description,
    logo: req.body.logo,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  };

  const league = await League.findByPk(req.body.id);
  if (league) {
    await league.update(data);
    res.json({ league });
  } else {
    res.status(404).json({ message: 'league not found' });
  }
};

// POST SERVER_URL/api/league/remove/1
export const remove: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);

  const league = await League.findByPk(id);
  if (league) {
    await league.destroy();
    res.json({ message: 'deleted successfully!' });
  } else {
    res.status(404).json({ message: 'league not found' });
  }
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
