import { RequestHandler } from 'express';
import Player from '../models/Player';
// import User from '../models/User';
import { Types } from '../types';
import Matchup from '../models/Matchup';
import Match from '../models/Match';
import { Op } from 'sequelize';
import League from '../models/League';
import nodemailer from 'nodemailer';
import path from 'path';
import { absolutePath, playerAvatarPath} from '../helpers';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

// GET SERVER_URL/api/player/all
export const all: RequestHandler = async (req, res) => {
  const players = await Player.findAll({
    where: {
      isDeleted: 0
    }
  });
  res.json({ players });
};

// POST SERVER_URL/api/player/create
export const create: RequestHandler = async (req, res) => {
  // const { leagueId, userId, firstName, lastName, jerseyNumber, position} = req.body;
  const data: Types.T_Player = req.body;

  await Player.create(data);
  const players = await Player.findAll({
    where: {
      isDeleted: 0
    }
  });
  res.json({ players });
};

// POST SERVER_URL/api/player/update
export const update: RequestHandler = async (req, res) => {
  const { playerId, firstName, lastName, jerseyNumber, position } = req.body;
  console.log("==============", req.body.playerId)
  const player = await Player.findByPk(playerId);
  
  if (player) {
    if (req.file) {
      console.log("file exists")
      const extension = path.extname(req.file.originalname);
      const fileName = `avatar${extension}`;
      const directoryPath = absolutePath(`public/upload/players/${req.body.playerId}`)
      if (!existsSync(directoryPath)) {
        mkdirSync(directoryPath, { recursive: true });
      }
      const filePath = path.join(directoryPath, fileName);

      const buffer = req.file.buffer;
      writeFileSync(filePath, buffer);
      player.avatar = fileName
      await player.save()
    } else {
      player.avatar = "";
      await player.save()
    }
    await player.update({ firstName:firstName, lastName:lastName, jerseyNumber: jerseyNumber, position: position });
    const players = await Player.findAll({
      where: {
        isDeleted: 0
      }
    });
    res.json({ players });
  } else {
    res.status(404).json({ message: 'player not found' });
  }
};


export const uploadPlayerAvatar: RequestHandler = async(req, res) => {
  try {
    if (req.file) {
      const extension = path.extname(req.file.originalname);
      const fileName = `avatar${extension}`;
      const player = await Player.findOne({
        where:{
          id:req.body.playerId
        }
      });
      if (player) {
        const directoryPath = absolutePath(`public/upload/players/${req.body.playerId}`)
        if (!existsSync(directoryPath)) {
          mkdirSync(directoryPath, { recursive: true });
        }
        const filePath = path.join(directoryPath, fileName);

        const buffer = req.file.buffer;
        writeFileSync(filePath, buffer);
        player.avatar = fileName
        await player.save()
      } else {

      }
      const players = await Player.findAll({
        where: {
          isDeleted: 0
        }
      });
      res.json({ players });
    }
  } catch (error) {
    
  }
}

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

// POST SERVER_URL/api/player/removeFromTeam
export const removeFromTeam: RequestHandler = async (req, res) => {
  const id = req.body.id;

  const player = await Player.findByPk(id);
  if (player) {
    const teamId = player.teamId;
    player.teamId = 0;
    player.isWaitList = 0;
    player.isAcceptedList = 1;

    await player.save();

    // Remove from matchup if the match is new
    const matchups = await Matchup.findAll({
      where: {
        playerId: player.id,
        teamId: teamId
      }
    });

    if (matchups) {
      matchups.map(async matchup => {
        const matchId = matchup.matchId;
        const match = await Match.findByPk(matchId);
        // Check if the match is new or not
        if (match) {
          // if the match is new, remove matchup so it will be not displayed on matchup page
          if (match.isNew) {
            await matchup.destroy();
          }
          // if the match is not new, we need to keep history
          else {
            matchup.isDeleted = 1;
            await matchup.save();
          }
        }
      });
    }

    res.json({ message: 'deleted successfully!' });
  } else {
    res.status(404).json({ message: 'player not found' });
  }
};

export const removeSubstitute: RequestHandler = async (req, res) => {
  const { userId, leagueId, matchId } = req.body;
  const matchup = await Matchup.findOne({
    where: {
      userId,
      leagueId,
      matchId
    }
  });
  if (matchup) {
    await matchup.destroy();
    res.status(200).json({ message: 'Removed a substitute successfully!' });
  } else {
    res.status(404).json({ message: 'Player not found!' });
  }
};

// Add players to the team
// POST SERVER_URL/api/player/add
export const add: RequestHandler = async (req, res) => {
  const data = req.body;

  const teamId = data['teamId'];
  const playersList = data['playersList'];
  var playerFound = false;

  const promises = Object.keys(playersList).map(async id => {
    const player = await Player.findByPk(id);
    if (player && playersList[id]) {
      player.teamId = teamId;
      await player.save();
      const matches = await Match.findAll({
        where: {
          [Op.or]: [{ homeTeamId: teamId }, { awayTeamId: teamId }]
        }
      });

      matches.map(async match => {
        if (match.isNew) {
          await Matchup.create({
            playerId: player.id,
            userId: player.userId,
            leagueId: player.leagueId,
            matchId: match.id,
            teamId: player.teamId,
            points: 0,
            points3: 0,
            points2: 0,
            points1: 0,
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
            isDeleted: 0
          });
        }
      });
      playerFound = true;

      // Update matchup
      // If a player is added to a team, we need check all matchups and update it
      // If the match is new, we need to add a matchup
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
  var playerFound = false;

  const promises = Object.keys(data).map(async id => {
    console.log(data[id]);
    const player = await Player.findByPk(id);
    if (player) {
      if (data[id]) {
        player.isAcceptedList = 1;
        player.isWaitList = 0;
        await player.save();
      }
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
    if (player && data[id]) {
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

export const invite: RequestHandler = async (req, res) => {
  const { email, leagueId, inviter } = req.body;

  try {
    const league = await League.findOne({
      where: {
        id: leagueId
      }
    });
    if (league) {
      // sending invite email
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `${inviter.firstName} ${inviter.lastName} is inviting you to join their League!`,
        text: `
          ${league.name}
          League ID: ${league.id.toString().padStart(6, '0')}
          Sport: ${league.sport}
          ${league.description}
          Start Date: ${league.startDate}
          End Date: ${league.endDate}
          
          Sign up at Leeg.io! (https://leeg.io)
        `
      };
      const emailService = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });
      emailService.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Email sending failed' });
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      });
      res.status(200).json({ message: 'Invited successfully!' });
    } else {
      res.status(400).json({ message: 'Invite Failed!' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invite Failed!' });
  }
};

// Remove a player from the league
export const removeFromLeague: RequestHandler = async (req, res) => {
  const data = req.body;
  var playerFound = false;
  console.log(data)
  const promises = Object.keys(data).map(async id => {
    const player = await Player.findByPk(id);
    console.log("=====", player)
    if (player) {
      if (data[id]) {
        player.isAcceptedList = 0;
        player.isWaitList = 0;
        player.isDeleted = 1;
        await player.save();
      }
      playerFound = true;
    }
  });

  await Promise.all(promises);

  if (playerFound) {
    const players = await Player.findAll();
    res.status(200).json({ players });
  } else {
    res.status(404).json({ message: 'Player not found' });
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

export const avatar: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const player = await Player.findOne({
    where: {
      id
    }
  });
  if (player) {
    res.sendFile(playerAvatarPath(id, player.avatar))
    // res.sendFile(absolutePath(player.avatar))
    // res.sendFile(player.avatar+"avatar.jpg")
  }
}
