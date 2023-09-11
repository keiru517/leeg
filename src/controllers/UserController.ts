import { RequestHandler } from 'express';
import User from '../models/User';
import path from 'path';
import { absolutePath } from '../helpers';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import crypto from 'crypto';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const create: RequestHandler = async (req, res) => {
  try {
    if (req.file) {
      const extension = path.extname(req.file.originalname);
      const fileName = `avatar${extension}`;
      const data = {
        avatar: fileName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        address: req.body.address,
        zipCode: req.body.zipCode,
        password: crypto.createHash('md5').update(req.body.password).digest('hex'),
      };

      
      const user = await User.create(data);
      const userId = user.id;
      
      const directoryPath = absolutePath(`public/upload/${userId}`);

      if (!existsSync(directoryPath)) {
        mkdirSync(directoryPath, { recursive: true });
      }
      const filePath = path.join(directoryPath, fileName);

      const buffer = req.file.buffer;
      writeFileSync(filePath, buffer);
    }
    res.status(200).json({ message: 'Singed up successfully!' });
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: 'Singup failed!' });
  }
};
