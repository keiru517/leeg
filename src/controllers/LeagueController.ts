import { RequestHandler } from 'express';
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import League from '../models/League';
import Player from '../models/Player';
import User from '../models/User';
import Admin from '../models/Admin';
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
  try {
    const directoryPath = absolutePath(`public/upload/${data.userId}/leagues`);

    if (!existsSync(directoryPath)) {
      mkdirSync(directoryPath, { recursive: true });
    }

    if (req.file) {
      const extension = path.extname(req.file.originalname);

      const fileName = `${moment().format(
        FILE_NAME_DATE_TILE_FORMAT
      )}${extension}`;
      const filePath = path.join(directoryPath, fileName); // Use path.join to combine paths correctly

      const buffer = req.file.buffer;
      writeFileSync(filePath, buffer);
      data.logo = fileName;
    } else {
      const defaultFilePath = absolutePath(`public/league.png`);
      if (existsSync(defaultFilePath)) {
        const fileName = `${moment().format(FILE_NAME_DATE_TILE_FORMAT)}.png`;
        copyFileSync(defaultFilePath, leagueLogoPath(data.userId, fileName));
        data.logo = fileName;
      } else {
        data.logo = '';
      }
    }

    const league = await League.create(data);
    await Admin.create({
      userId: data.userId,
      leagueId: league.id,
      role: 1,
      isDeleted: 0
    });

    res.status(200).json({ message: 'A League Created Successfully!' });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error occurred while creating a league!' });
  }
};

// POST SERVER_URL/api/league/update
export const update: RequestHandler = async (req, res) => {
  const league = await League.findByPk(req.body.id);
  if (league) {
    // await league.update(req.body);
    league.name = req.body.name;
    league.description = req.body.description;
    league.startDate = req.body.startDate;
    league.endDate = req.body.endDate;
    if (req.file) {
      const extension = path.extname(req.file.originalname);
      const directoryPath = absolutePath(
        `public/upload/${req.body.userId}/leagues`
      );

      if (!existsSync(directoryPath)) {
        mkdirSync(directoryPath, { recursive: true });
      }

      const fileName = `${moment().format(
        FILE_NAME_DATE_TILE_FORMAT
      )}${extension}`;
      const filePath = path.join(directoryPath, fileName); // Use path.join to combine paths correctly

      const buffer = req.file.buffer;
      writeFileSync(filePath, buffer);
      league.logo = fileName;
    }
    await league.save();
    res.status(200).json({ message: 'league has updated successfully!' });
  } else {
    res.status(404).json({ message: 'league not found' });
  }
};

export const updateTimer: RequestHandler = async (req, res) => {
  const { leagueId, minute, second } = req.body;
  try {
    await League.update(
      {
        minute,
        second
      },
      {
        where: {
          id: leagueId
        }
      }
    );
    res.status(200).json({ message: 'Updated successfully!' });
  } catch {
    res.status(404).json({ message: 'Error occurred!' });
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
  const userId = Number(req.params.userId);

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

// apply to the league
export const apply: RequestHandler = async (req, res) => {
  const userId = Number(req.body.userId);
  const leagueId = Number(req.body.leagueId);
  const teamId = 0; // The player does not belong to any team now
  const player = await Player.findOne({
    where: {
      leagueId: leagueId,
      userId: userId,
      isDeleted: 0
    }
  });
  if (player) {
    player.isWaitList = 1;
    await player.save();
  } else {
    const user = await User.findByPk(userId);
    if (user) {
      await Player.create({
        leagueId,
        teamId,
        matchId: 0,
        userId,
        firstName: user?.firstName,
        lastName: user?.lastName,
        avatar: `${process.env.DOMAIN}/api/user/avatar/${userId}`,
        email: user?.email,
        jerseyNumber: '',
        position: '',
        birthday: user?.birthday,
        country: user?.country,
        state: user?.state,
        city: user?.city,
        address: user?.address,
        zipCode: user?.zipCode,
        isWaitList: 1,
        isAcceptedList: 0,
        isDeleted: 0,
        isSubstitute: 0
      });
    }
  }
  res.status(200).json({ message: 'Applied successfully!' });
};

export const allowFan: RequestHandler = async (req, res) => {
  const leagueId = req.body.leagueId;
  const status = req.body.status;
  const league = await League.findByPk(leagueId);
  if (league) {
    await league.update({ isAllowedFan: status });
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(404).json({ message: 'League not found' });
  }
};
// export const toggleLeagueId: RequestHandler =async (req, res) => {
//   const leagueId = req.body.leagueId;
//   const status = req.body.status;
//   const league = await League.findByPk(leagueId);
//   if (league) {
//     await league.update({displayLeagueId:status});
//     res.status(200).json({message: 'Success'})
//   } else {
//     res.status(404).json({message: 'League not found'});
//   }
// }

export const togglePosition: RequestHandler = async (req, res) => {
  const leagueId = req.body.leagueId;
  const status = req.body.status;
  const league = await League.findByPk(leagueId);
  if (league) {
    await league.update({ displayPosition: status });
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(404).json({ message: 'League not found' });
  }
};

export const toggleJerseyNumber: RequestHandler = async (req, res) => {
  const leagueId = req.body.leagueId;
  const status = req.body.status;
  const league = await League.findByPk(leagueId);
  if (league) {
    await league.update({ displayJerseyNumber: status });
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(404).json({ message: 'League not found' });
  }
};

export const toggleAttempts3: RequestHandler = async (req, res) => {
  const leagueId = req.body.leagueId;
  const status = req.body.status;
  const league = await League.findByPk(leagueId);
  if (league) {
    await league.update({ displayAttempts3: status });
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(404).json({ message: 'League not found' });
  }
};

export const toggleAttempts2: RequestHandler = async (req, res) => {
  const leagueId = req.body.leagueId;
  const status = req.body.status;
  const league = await League.findByPk(leagueId);
  if (league) {
    await league.update({ displayAttempts2: status });
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(404).json({ message: 'League not found' });
  }
};

export const toggleAttempts1: RequestHandler = async (req, res) => {
  const leagueId = req.body.leagueId;
  const status = req.body.status;
  const league = await League.findByPk(leagueId);
  if (league) {
    await league.update({ displayAttempts1: status });
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(404).json({ message: 'League not found' });
  }
};

export const toggleBlocks: RequestHandler = async (req, res) => {
  const leagueId = req.body.leagueId;
  const status = req.body.status;
  const league = await League.findByPk(leagueId);
  if (league) {
    await league.update({ displayBlocks: status });
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(404).json({ message: 'League not found' });
  }
};

export const toggleRebounds: RequestHandler = async (req, res) => {
  const leagueId = req.body.leagueId;
  const status = req.body.status;
  const league = await League.findByPk(leagueId);
  if (league) {
    await league.update({ displayRebounds: status });
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(404).json({ message: 'League not found' });
  }
};

export const toggleAssists: RequestHandler = async (req, res) => {
  const leagueId = req.body.leagueId;
  const status = req.body.status;
  const league = await League.findByPk(leagueId);
  if (league) {
    await league.update({ displayAssists: status });
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(404).json({ message: 'League not found' });
  }
};

export const toggleFouls: RequestHandler = async (req, res) => {
  const leagueId = req.body.leagueId;
  const status = req.body.status;
  const league = await League.findByPk(leagueId);
  if (league) {
    await league.update({ displayFouls: status });
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(404).json({ message: 'League not found' });
  }
};

export const toggleSteals: RequestHandler = async (req, res) => {
  const leagueId = req.body.leagueId;
  const status = req.body.status;
  const league = await League.findByPk(leagueId);
  if (league) {
    await league.update({ displaySteals: status });
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(404).json({ message: 'League not found' });
  }
};

export const toggleTurnovers: RequestHandler = async (req, res) => {
  const leagueId = req.body.leagueId;
  const status = req.body.status;
  const league = await League.findByPk(leagueId);
  if (league) {
    await league.update({ displayTurnovers: status });
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(404).json({ message: 'League not found' });
  }
};

export const togglePassword: RequestHandler = async (req, res) => {
  const leagueId = req.body.leagueId;
  const status = req.body.status;
  const league = await League.findByPk(leagueId);
  if (league) {
    await league.update({ requirePassword: status });
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(404).json({ message: 'League not found' });
  }
};
