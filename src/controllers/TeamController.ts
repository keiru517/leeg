import { RequestHandler } from 'express';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import Team from '../models/Team';
import Player from '../models/Player';
// import { Types } from '../types';
import path from 'path';
import {
  absolutePath,
  FILE_NAME_DATE_TILE_FORMAT,
  teamLogoPath
} from '../helpers';
import moment from 'moment';
import { createCanvas } from 'canvas';

// GET SERVER_URL/api/team/all
export const all: RequestHandler = async (req, res) => {
  const teams = await Team.findAll();
  res.json({ teams });
};

// POST SERVER_URL/api/team/create
export const create: RequestHandler = async (req, res) => {
  console.log(req.body)
  const data = req.body;
  const userId = data.userId;
  if (req.file) {
    const extension = path.extname(req.file.originalname);
    const directoryPath = absolutePath(`public/upload/${userId}/teams`);

    if (!existsSync(directoryPath)) {
      mkdirSync(directoryPath, { recursive: true });
    }

    const fileName = `${moment().format(
      FILE_NAME_DATE_TILE_FORMAT
    )}${extension}`;
    const filePath = path.join(directoryPath, fileName); // Use path.join to combine paths correctly

    const buffer = req.file.buffer;
    writeFileSync(filePath, buffer);
    data.logo = fileName;
    // data.logo = filePath;
    // data.logo = URL.createObjectURL(new Blob([buffer], {type: "image/jpeg"}));
  } else {
    // Handle case when frontend does not send a file
    const color = data.color; // Assuming the frontend sends the color value

    // Generate a canvas with the desired size
    const canvas = createCanvas(58, 58);
    const ctx = canvas.getContext('2d');

    // Set the background color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Save the canvas as an image file
    const directoryPath = absolutePath(`public/upload/${userId}/teams`);

    if (!existsSync(directoryPath)) {
      mkdirSync(directoryPath, { recursive: true });
    }

    const fileName = `${moment().format(FILE_NAME_DATE_TILE_FORMAT)}.png`; // Use the desired file extension
    const filePath = path.join(directoryPath, fileName);
    const buffer = canvas.toBuffer('image/png');
    writeFileSync(filePath, buffer);

    data.logo = fileName;
  }

  await Team.create(data);
  res.status(200).json({ message: 'A Team Created Successfully!' });
};

export const update: RequestHandler = async (req, res) => {
  const data = req.body;
  const userId = data.userId;
  if (req.file) {
    const extension = path.extname(req.file.originalname);
    const directoryPath = absolutePath(`public/upload/${userId}/teams`);

    if (!existsSync(directoryPath)) {
      mkdirSync(directoryPath, { recursive: true });
    }

    const fileName = `${moment().format(
      FILE_NAME_DATE_TILE_FORMAT
    )}${extension}`;
    const filePath = path.join(directoryPath, fileName); // Use path.join to combine paths correctly

    const buffer = req.file.buffer;
    writeFileSync(filePath, buffer);
    data.logo = fileName;
    // data.logo = filePath;
    // data.logo = URL.createObjectURL(new Blob([buffer], {type: "image/jpeg"}));
  } else {
    // Handle case when frontend does not send a file
    const color = data.color; // Assuming the frontend sends the color value

    // Generate a canvas with the desired size
    const canvas = createCanvas(58, 58);
    const ctx = canvas.getContext('2d');

    // Set the background color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Save the canvas as an image file
    const directoryPath = absolutePath(`public/upload/${userId}/teams`);

    if (!existsSync(directoryPath)) {
      mkdirSync(directoryPath, { recursive: true });
    }

    const fileName = `${moment().format(FILE_NAME_DATE_TILE_FORMAT)}.png`; // Use the desired file extension
    const filePath = path.join(directoryPath, fileName);
    const buffer = canvas.toBuffer('image/png');
    writeFileSync(filePath, buffer);

    data.logo = fileName;
  }

  await Team.update({
    name:req.body.name,
    logo:data.logo,
  }, {
    where:{
      id:req.body.id
    }
  });
  const teams = await Team.findAll();
  res.status(200).json({ teams});
};


// DELETE SERVER_URL/api/team/remove/1
export const remove: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);

  const team = await Team.findByPk(id);
  if (team) {
    // Set deleted field to 1
    team.isDeleted = 1;
    await team.save();
    // const teams = await Team.findAll();
    const players = await Player.findAll({
      where: {
        teamId: id
      }
    });

    const promises = Object.values(players).map(async player => {
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
        //   position:"Select Postion",
        //   birthday: player.birthday,
        //   country: player.country,
        //   state: player.state,
        //   city: player.city,
        //   address: player.address,
        //   zipCode: player.zipCode,
        //   isWaitList: player.isWaitList,
        //   isAcceptedList: player.isAcceptedList,
        //   isDeleted: 0,
        // });
      }
    });

    await Promise.all(promises);

    res.json({ message: 'deleted successfully!' });
  } else {
    res.status(404).json({ message: 'team not found' });
  }
};

// GET SERVER_URL/api/team/logo/1
export const logo: RequestHandler = async (req, res) => {
  const userId = Number(req.params.userId);
  const id = Number(req.params.id);
  console.log("============", userId)
  const team = await Team.findOne({
    where: {
      id
    }
  });
  if (team) {
    res.sendFile(teamLogoPath(userId, team.logo));
  } else {
    res.status(404).json({
      message: 'team not found'
    });
  }
};


