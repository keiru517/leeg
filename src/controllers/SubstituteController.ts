import { RequestHandler } from 'express';
import Substitute from '../models/Substitute';
import Match from '../models/Match';
import Player from '../models/Player';
import Matchup from '../models/Matchup';

// GET /api/substitutes/all
export const all: RequestHandler = async (req, res) => {
  const substitutes = await Substitute.findAll({
    include: [
      { model: Match, as: 'match' }
    ]
  });
  res.status(200).json({ substitutes });
};

// create a substitute in the Substitute table
// export const create: RequestHandler = async (req, res) => {
//   const {
//     leagueId,
//     teamId,
//     matchId,
//     firstName,
//     lastName,
//     jerseyNumber,
//     position
//   } = req.body;

//   try {
//     await Substitute.create({
//       leagueId: leagueId,
//       teamId: teamId,
//       matchId: matchId,
//       firstName: firstName,
//       lastName: lastName,
//       jerseyNumber: jerseyNumber,
//       position: position,
//       totalPoints: 0,
//       totalPoints3: 0,
//       totalPoints2: 0,
//       totalPoints1: 0,
//       attempts3: 0,
//       attempts2: 0,
//       attempts1: 0,
//       blocks: 0,
//       rebounds: 0,
//       assists: 0,
//       fouls: 0,
//       steals: 0,
//       turnovers: 0,
//       attendance: 1,
//       isSubstitute: true
//     });
//     const substitutes = await Substitute.findAll();
//     res.status(200).json({ substitutes });
//   } catch (error) {
//     console.log(error)
//     res
//       .status(400)
//       .json({ message: 'Error occurred while adding as a substitute!' });
//   }
// };

// create a substitute in Players and Matchups table

export const create: RequestHandler = async (req, res) => {
  const {
    leagueId,
    userId,
    teamId,
    matchId,
    firstName,
    lastName,
    jerseyNumber,
    position
  } = req.body;
  // create a player
  const player = await Player.create({
    leagueId:leagueId,
    userId:userId,
    teamId:teamId,
    firstName:firstName,
    lastName:lastName,
    avatar:"",
    email:"",
    jerseyNumber:jerseyNumber,
    position:position,
    isAcceptedList:0,
    isWaitList:0,
    isSubstitute:true,
    isDeleted:0
  })
  // create a matchup
  await Matchup.create({
    playerId:player.id,
    userId:userId,
    leagueId:leagueId,
    matchId:matchId,
    teamId:teamId,
    points:0,
    points3:0,
    points2:0,
    points1:0,
    attempts3:0,
    attempts2:0,
    attempts1:0,
    blocks:0,
    rebounds:0,
    assists:0,
    fouls:0,
    steals:0,
    turnovers:0,
    attendance:1,
    isDeleted:0
  })
  const matchups = await Matchup.findAll({
    include: [
      { model: Player, as: 'player' },
      { model: Match, as: 'match' }
    ]
  });
  res.json({ matchups });
}

export const remove: RequestHandler = async (req, res) => {
  const { matchupId } = req.body;
  const matchup = await Matchup.findByPk(matchupId);
  if (matchup) {
    const player = await Player.findOne({
      where:{
        id:matchup.playerId
      }
    });
    if (player) {
      await player.destroy();
    }
    await matchup.destroy();
    const matchups = await Matchup.findAll({
      include: [
        { model: Player, as: 'player' },
        { model: Match, as: 'match' }
      ]
    });
    res.json({ matchups });
  }

}