import { RequestHandler } from 'express';
import Matchup from '../models/Matchup';
// import Player from '../models/Player';
// import { Types } from '../types';

// GET SERVER_URL/api/matchup/all
export const all: RequestHandler = async (req, res) => {
  const matchups = await Matchup.findAll();
  res.json({ matchups });
};

// POST SERVER_URL/api/matchup/create
export const create: RequestHandler = async (req, res) => {
  const data = req.body.data;
  var playerFound = false;

  const promises = Object.keys(data).map(async playerId=> {
    await Matchup.create({
      playerId: Number(playerId),
      matchId: data[playerId]['matchId'],
      teamId: data[playerId]['teamId'],
      points: data[playerId]['points']
    })
    playerFound = true;
  })

  await Promise.all(promises);

  if (playerFound) {
    res.status(200).json({message: 'Saved successfully!'});
  } else {
    res.status(404).json({message: "Player not found"});
  }
};

// POST SERVER_URL/api/matchup/update/1
export const update: RequestHandler = async (req, res) => {

  // const data = {
  //   name: req.body.name,
  //   description: req.body.description,
  //   logo: req.body.logo,
  //   startDate: req.body.startDate,
  //   endDate: req.body.endDate
  // };

  const matchup = await Matchup.findByPk(req.body.id);
  if (matchup) {
    await matchup.update(req.body);
    res.json({ matchup });
  } else {
    res.status(404).json({ message: 'matchup not found' });
  }
};

// POST SERVER_URL/api/matchup/remove/1
export const remove: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);

  const matchup = await Matchup.findByPk(id);
  if (matchup) {
    await matchup.destroy();
    const matchups = await Matchup.findAll();

    res.json({ message: 'deleted successfully!', matchups:matchups });
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
