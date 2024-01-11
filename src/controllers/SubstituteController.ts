import { RequestHandler } from 'express';
import Substitute from '../models/Substitute';
import Match from '../models/Match';

// GET /api/substitutes/all
export const all: RequestHandler = async (req, res) => {
  const substitutes = await Substitute.findAll({
    include: [
      { model: Match, as: 'match' }
    ]
  });
  res.status(200).json({ substitutes });
};

export const create: RequestHandler = async (req, res) => {
  const {
    leagueId,
    teamId,
    matchId,
    firstName,
    lastName,
    jerseyNumber,
    position
  } = req.body;

  try {
    await Substitute.create({
      leagueId: leagueId,
      teamId: teamId,
      matchId: matchId,
      firstName: firstName,
      lastName: lastName,
      jerseyNumber: jerseyNumber,
      position: position,
      totalPoints: 0,
      totalPoints3: 0,
      totalPoints2: 0,
      totalPoints1: 0,
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
      isSubstitute: true
    });
    const substitutes = await Substitute.findAll();
    res.status(200).json({ substitutes });
  } catch (error) {
    console.log(error)
    res
      .status(400)
      .json({ message: 'Error occurred while adding as a substitute!' });
  }
};

export const remove: RequestHandler = async (req, res) => {
  const { playerId } = req.body;
  const substitute = await Substitute.findByPk(playerId);
  if (substitute) {
    await substitute.destroy();
  }
  const substitutes = await Substitute.findAll();
  res.status(200).json({ substitutes });
}