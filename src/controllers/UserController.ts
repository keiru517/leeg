import { RequestHandler } from 'express';
import User from '../models/User';
import path from 'path';
import { absolutePath } from '../helpers';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const signin: RequestHandler =async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user =  await User.findOne({
        where: {
          email: email
        }
      });

      if (user) {
        if (user.password == crypto.createHash('md5').update(password).digest('hex')) {
          const token = jwt.sign({ id: user.id?.toString(), email: user.email}, 'leeg517', {
            expiresIn: '1h',
          });

          res.status(200).json({message: "Signed in successfully!", token: token})
        } else {
          res.status(400).json({ message: 'Incorrect password'})
        }

      } else {
        res.status(400).json({ message: 'Email is not registered'})
      }
    } catch (error) {
      res.status(400).json({ message: 'Signin failed!'})
    }
}

export const verifyEmail: RequestHandler =async (req, res) => {
  console.log(process.env.EMAIL)
  try {
    const email = req.body.email;
    const verificationCode = Math.floor(1000 + Math.random() * 9000);
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: process.env.EMAIL_SUBJECT,
      text: process.env.EMAIL_BODY + verificationCode.toString()
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
        res.status(500).json({message: "Email sending failed"});
      } else {
        console.log(`Email sent: ${info.response}`);
        res.json({message: 'Sent', code:verificationCode})
      }
    })


  } catch (error) {
    console.log(error);
  }
}

export const signup: RequestHandler = async (req, res) => {
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


// GET SERVER_URL/api/user/all
export const all: RequestHandler = async (req, res) => {
  const users = await User.findAll();
  res.json({users})
}