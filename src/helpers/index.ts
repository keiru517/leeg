import path, { join } from 'path';
import { Types } from '../types';

export const absolutePath = (path: string | undefined = undefined) => {
  return join(process.cwd(), path || '');
};
export const userAvatarPath = (userId: number, fileName: string) => {
  return path.join(UPLOAD_PATH, userId?.toString(), fileName);
};
export const leagueLogoPath = (userId: number, fileName: string) => {
  return path.join(UPLOAD_PATH, userId?.toString(), 'leagues', fileName);
};

export const teamLogoPath = (userId: number, fileName: string) => {
  return path.join(UPLOAD_PATH, userId?.toString(), 'teams', fileName);
};

export const rs = (
  data = {},
  message = '',
  status: Types.T_ResponseStatus = true
): Types.T_ResponseData<typeof data> => {
  return {
    status,
    data: data,
    message
  };
};

export const rf = (
  message: unknown = '',
  data = {},
  status: Types.T_ResponseStatus = false
): Types.T_ResponseData<typeof data> => {
  return {
    status,
    data: data,
    message: typeof message == 'string' ? message : 'error'
  };
};

export const FILE_NAME_DATE_TILE_FORMAT = 'YYYY-MM-DD-HH-mm-ss';
export const DATE_TILE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const UPLOAD_PATH = absolutePath('public/upload');
