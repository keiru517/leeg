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

export const playerAvatarPath = (playerId: number, fileName: string) => {
  return path.join(UPLOAD_PATH, 'players', playerId?.toString(), fileName)
}

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

export const randomString = (length: number) => {
  let text = '';
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789_-.';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// calculate number of events of the player from logs
export const calculateNumberOfEvents = (
  logs: any,
  event: any,
  playerId: any
) => {
  const logArray = Object.values(logs);
  const result = logArray.filter(
    (log: any) => log.event == event && log.playerId == playerId
  );

  const number = result.length;
  return number;
};