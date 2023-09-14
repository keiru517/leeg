import { RequestHandler } from 'express';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import Team from '../models/Team';
import { Types } from '../types';
import path from 'path';
import { absolutePath, FILE_NAME_DATE_TILE_FORMAT, teamLogoPath } from '../helpers';
import moment from 'moment';

// GET SERVER_URL/api/team/all
export const all: RequestHandler = async (req, res) => {
  const teams = await Team.findAll();
  res.json({ teams });
};

// POST SERVER_URL/api/team/create
export const create: RequestHandler = async (req, res) => {
  const data: Types.T_Team = req.body;
  const userId = 1;
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
    // data.logo = URL.createObjectURL(new Blob([buffer], {type: "image/jpeg"}));
  }

  
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

// GET SERVER_URL/api/team/logo/1
export const logo: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const userId = 1;
  const team = await Team.findOne({
    where: {
      id
    }
  });
  if (team) {
    res.sendFile(teamLogoPath(userId, team.logo));
  }
  else {
    res.status(404).json({
      message: 'team not found'
    });
  }
};
