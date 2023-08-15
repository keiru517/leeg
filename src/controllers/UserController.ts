import { RequestHandler } from 'express';
import User from '../models/User';
import { writeFileSync } from 'fs';
import { absolutePath, rs } from './../helpers';
import moment from 'moment';
import { FILE_NAME_DATE_TILE_FORMAT } from '../helpers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const create: RequestHandler = async (req, res) => {
  try {
    console.log(req.body);
    if (req.file)
      writeFileSync(
        absolutePath(
          `public/upload/${moment().format(FILE_NAME_DATE_TILE_FORMAT)}-${
            req.file.originalname
          }`
        ),
        req.file.buffer
      );
    const user = new User();
    user.firstName = 'max';
    user.lastName = 'antoniuk';
    user.password = 'password';
    user.email = 'simpledev0042@gmail.com';
    await user.save();
    const users = await User.findAll();
    return res.send(rs({ users }));
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};
