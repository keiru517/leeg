import { RequestHandler } from 'express';
import Admin from '../models/Admin';
import { Types } from '../types';

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
  res.status(200).json({message:'A Admin Created Successfully!'});
};

// POST SERVER_URL/api/admin/invite
export const invite: RequestHandler =async (req, res) => {
  const admin = await Admin.findByPk(req.body.id);
  if (admin) {
    // set role into 2 because he is the invited admin
    await admin.update(req.body)
  }
}

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
