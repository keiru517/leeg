export namespace Types {
  export type T_ENV = 'development' | 'test' | 'production';
  export interface T_DB {
    id: number;
    createdAt?: string;
    updatedAt?: string;
  }
  export interface T_User extends T_DB {
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    birthday: string;
    country: string;
    state: string;
    city: string;
    address: string;
    zipCode: string;
    password: string;
  }
  export interface T_League extends T_DB {
    userId: number;
    type: number; // 0 - public, 1 - private
    name: string;
    description: string;
    leagueId: string;
    logo: string;
    startDate: string;
    endDate: string;
    isAllowedFan: boolean;
    displayPosition: boolean;
    displayLeagueId: boolean;
    requirePassword: boolean;
    password: string;
    isDeleted: number;

  }

  export interface T_Admin extends T_DB {
    userId: number;
    leagueId: number;
    role: number;
    isDeleted: number;
  }
  export interface T_Team extends T_DB {
    userId: number;
    leagueId: number;
    name: string;
    logo: string;
    position: number;
    max: number;
    min: number;
    waitlist: number;
    win: number;
    lose: number;
    pointScored: number;
    pointAgainst: number;
    diff: number;
    isDeleted: number;
  }
  export interface T_Match extends T_DB {
    leagueId: number;
    homeTeamId: number;
    awayTeamId: number;
    date: string;
    time: string;
    location: string;
    homeTeamPoints: number;
    awayTeamPoints: number;
    isNew: boolean;
    isDeleted: number;
  }
  export interface T_Matchup extends T_DB {
    playerId: number;
    userId: number;
    leagueId: number;
    matchId: number;
    teamId: number;
    points: number;
    points3: number;
    points2: number;
    points1: number;
    isDeleted: number;
  }
  export interface T_Player extends T_DB {
    leagueId: number;
    teamId: number;
    matchId: number;
    userId: number;
    firstName: string;
    lastName: string;
    avatar: string;
    email: string;
    jerseyNumber: number;
    position: string;
    birthday: string;
    country: string;
    state: string;
    city: string;
    address: string;
    zipCode: string;
    isWaitList: number;
    isAcceptedList: number;
    isDeleted: number;
    isSubstitute: number;
  }
  export interface T_Score extends T_DB {
    playerId: number;
    leagueId: number;
    teamId: number;
    matchId: number;
    points: number;
  }
  export interface T_ResponseData<T> {
    data: T;
    message: string;
    status: boolean;
  }

  export interface T_Response<T> extends Response {
    json: () => Promise<T_ResponseData<T>>;
  }
  export type T_ResponseStatus = boolean;
}
