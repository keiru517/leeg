import { RequestHandler } from 'express';
import Player from '../models/Player';
// import User from '../models/User';
import { Types } from '../types';

// GET SERVER_URL/api/player/all
export const all: RequestHandler = async (req, res) => {
  const players = await Player.findAll({where:{
    isDeleted: 0
  }});
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
  const { playerId, jerseyNumber, position } = req.body;
  console.log(playerId, jerseyNumber);

  const player = await Player.findByPk(playerId);
  if (player) {
    await player.update({ jerseyNumber: jerseyNumber, position: position });
    res.json({ message: 'Updated successfully!' });
  } else {
    res.status(404).json({ message: 'player not found' });
  }
};

// POST SERVER_URL/api/player/updatePoints
export const updatePoints: RequestHandler = async (req, res) => {
  const matchId = req.body.matchId;
  console.log(matchId);
  var playerFound = false;
  // const homeTeamPlayers = req.body.homeInputValues;
  // const awayTeamPlayers = req.body.awayInputValues;

  //   // Handle home team players
  //   const promise1 = Object.keys(homeTeamPlayers).map(async id => {
  //     const player = homeTeamPlayers[id];

  //     // check if there is a matchup data
  //     const result = await Player.findOne({
  //       where: {
  //         id: player.id,
  //         teamId: player.teamId,
  //         matchId: matchId
  //       }
  //     });

  //     // update a player
  //     // if (result) {
  //     //   await Player.update(
  //     //     { points: player.points, points3: player.points3, points2: player.points2, points1: player.points1 },
  //     //     { where: { id: player.id } }
  //     //   );
  //     // }
  //     // // Create a matchup
  //     // else {
  //     //   await Player.create({
  //     //     playerId: player.playerId,
  //     //     matchId: matchId,
  //     //     teamId: player.teamId,
  //     //     points: player.points,
  //     //     isDeleted: 0
  //     //   });
  //     // }

  //     playerFound = true;
  //   });

  //   // Handle away team players
  //   const promise2 = Object.keys(awayTeamPlayers).map(async id => {
  //     const player = awayTeamPlayers[id];

  //     // check if there is a matchup data
  //     const result = await Player.findOne({
  //       where: {
  //         id: player.id,
  //         teamId: player.teamId,
  //         matchId: matchId
  //       }
  //     });
  //     // update a matchup
  //     if (result) {
  //       await Player.update(
  //         { points: player.points, points3: player.points3, points2: player.points2, points1: player.points1 },
  //         { where: { id: player.id } }
  //       );
  //     }
  //     // Create a matchup
  //     // else {
  //     //   await Matchup.create({
  //     //     playerId: player.playerId,
  //     //     matchId: matchId,
  //     //     teamId: player.teamId,
  //     //     points: player.points,
  //     //     isDeleted: 0
  //     //   });
  //     // }
  //     playerFound = true;
  //   });
  //   await Promise.all(promise1);
  //   await Promise.all(promise2);

  if (playerFound) {
    res.status(200).json({ message: 'Saved successfully!' });
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
};
// POST SERVER_URL/api/player/remove
export const removeFromTeam: RequestHandler = async (req, res) => {
  const id = req.body.id;

  const player = await Player.findByPk(id);
  if (player) {
    player.teamId = 0;
    player.isWaitList = 0;
    player.isAcceptedList = 1;

    await player.save();

    // await Player.create({
    //   leagueId: player.leagueId,
    //   teamId: 0,
    //   matchId: 0,
    //   userId: player.userId,
    //   firstName: player.firstName,
    //   lastName: player.lastName,
    //   avatar: player.avatar,
    //   email: player.email,
    //   jerseyNumber: 0,
    //   position:"Select Position",
    //   birthday: player.birthday,
    //   country: player.country,
    //   state: player.state,
    //   city: player.city,
    //   address: player.address,
    //   zipCode: player.zipCode,
    //   isWaitList: player.isWaitList,
    //   isAcceptedList: player.isAcceptedList,
    //   isDeleted: 0
    // });

    res.json({ message: 'deleted successfully!' });
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
      player.teamId = 0;
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
