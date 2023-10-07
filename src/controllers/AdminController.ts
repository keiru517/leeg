import { RequestHandler } from 'express';
import Admin from '../models/Admin';
import User from '../models/User';
import { Types } from '../types';
import nodemailer from 'nodemailer';
import League from '../models/League';

// GET SERVER_URL/api/admin/all
export const all: RequestHandler = async (req, res) => {
  const admins = await Admin.findAll();
  res.json({ admins });
};

// POST SERVER_URL/api/admin/create
// Become an admin when the user creates a league
export const create: RequestHandler = async (req, res) => {
  const data: Types.T_Admin = req.body;

  await Admin.create(data);
  res.status(200).json({ message: 'A Admin Created Successfully!' });
};

// POST SERVER_URL/api/admin/invite
export const invite: RequestHandler = async (req, res) => {
  const email = req.body.email;
  const leagueId = req.body.leagueId;
  const inviter = req.body.inviter;

  const user = await User.findOne({
    where: {
      email: email
    }
  });
  if (user) {
    const userId = user.id;
    const league = await League.findOne({
      where: {
        id: leagueId
      }
    });
    if (league) {
      const admin = await Admin.findOne({
        where: {
          userId: userId,
          leagueId: leagueId
        }
      });
      if (admin) {
        admin.role = 2;
        await admin.save();
      } else {
        await Admin.create({
          userId: userId,
          leagueId: leagueId,
          role: 2, // invited admin's role is 2
          isDeleted: 0
        });
      }
      // sending invite email
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: process.env.INVITE_ADMIN_EMAIL_SUBJECT,
        text:
          inviter.firstName +
          ' ' +
          inviter.lastName + ' ' +
          process.env.INVITE_ADMIN_EMAIL_BODY +
          ' ' +
          league.name
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
    }
  } else {
    res.status(400).json({ message: 'The email is not resitered!' });
  }
};

// POST SERVER_URL/api/admin/remove
export const remove: RequestHandler = async (req, res) => {
  const adminId = req.body.adminId;
  const admin = await Admin.findByPk(adminId);
  if (admin) {
    await admin.destroy();
    res.status(200).json({ message: 'Removed the admin successfully!' });
  } else {
    res.status(404).json({ message: 'Admin not found!' });
  }
};
// // POST SERVER_URL/api/admin/update
// export const update: RequestHandler = async (req, res) => {

//   const admin = await Admin.findByPk(req.body.id);
//   if (admin) {
//     await admin.update(req.body);
//     res.status(200).json({ message:'admin has updated successfully!' });
//   } else {
//     res.status(404).json({ message: 'admin not found' });
//   }
// };

// // POST SERVER_URL/api/admin/remove/1
// export const remove: RequestHandler = async (req, res) => {
//   const id = Number(req.params.id);

//   const admin = await Admin.findByPk(id);
//   if (admin) {
//     await admin.destroy();

//     res.json({ message: 'deleted successfully!'});
//   } else {
//     res.status(404).json({ message: 'admin not found' });
//   }
// };

// // GET SERVER_URL/api/admin/info/1
// export const info: RequestHandler = async (req, res) => {
//   const id = Number(req.params.id);
//   const admin = await Admin.findOne({
//     where: {
//       id
//     }
//   });
//   if (admin) res.json({ admin });
//   else {
//     res.status(404).json({
//       message: 'admin not found'
//     });
//   }
// };
