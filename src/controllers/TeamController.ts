import { RequestHandler } from 'express';
import Team from '../models/Team';
import { Types } from '../types';

// GET SERVER_URL/api/team/all
export const all: RequestHandler = async (req, res) => {
  const teams = await Team.findAll();
  res.json({ teams });
};

// POST SERVER_URL/api/team/create
export const create: RequestHandler = async (req, res) => {
  const data: Types.T_Team = req.body;

  await Team.create(data);
  res.status(200).json({message:'A Team Created Successfully!'});
};

// POST SERVER_URL/api/team/update
export const update: RequestHandler = async (req, res) => {
  const data = {
    name: req.body.name,
    logo: req.body.logo,
  };

  const team = await Team.findByPk(req.body.id);
  if (team) {
    await team.update(data);
    res.status(200).json({ message: 'A team has updated successfully!' });
  } else {
    res.status(404).json({ message: 'team not found' });
  }
};

// DELETE SERVER_URL/api/team/remove/1
export const remove: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);

  const team = await Team.findByPk(id);
  if (team) {
    await team.destroy();
    // const teams = await Team.findAll();

    res.json({ message: 'deleted successfully!'});
  } else {
    res.status(404).json({ message: 'team not found' });
  }
};

// GET SERVER_URL/api/team/info/1
export const info: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const team = await Team.findOne({
    where: {
      id
    }
  });
  if (team) res.json({ team });
  else {
    res.status(404).json({
      message: 'team not found'
    });
  }
};
