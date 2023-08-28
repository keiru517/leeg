import { RequestHandler } from 'express';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import League from '../models/League';
import { Types } from '../types';
import { absolutePath, leagueLogoPath } from '../helpers';
import moment from 'moment';
import { FILE_NAME_DATE_TILE_FORMAT } from '../helpers';
import path from 'path';

// GET SERVER_URL/api/league/all
export const all: RequestHandler = async (req, res) => {
  const leagues = await League.findAll();
  res.json({ leagues });
};

// POST SERVER_URL/api/league/create
export const create: RequestHandler = async (req, res) => {
  const data: Types.T_League = req.body;
  const userId = 1;
  if (req.file) {
    const extension = path.extname(req.file.originalname);
    const directoryPath = absolutePath(`public/upload/${userId}/leagues`);
    
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
  }

  await League.create(data);
  res.status(200).json({ message: 'A League Created Successfully!' });
};

// POST SERVER_URL/api/league/update
export const update: RequestHandler = async (req, res) => {
  const league = await League.findByPk(req.body.id);
  if (league) {
    await league.update(req.body);
    res.status(200).json({ message: 'league has updated successfully!' });
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

// GET SERVER_URL/api/league/logo/1
export const getLogo: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const userId = 1;
  const league = await League.findOne({
    where: {
      id
    }
  });

  if (league) {
    res.sendFile(leagueLogoPath(userId, league.logo));
  } else {
    res.status(404).json({ message: 'logo not found' });
  }
};

// GET SERVER_URL/api/league/info/1
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
