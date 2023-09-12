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
    name: string;
    description: string;
    logo: string;
    startDate: string;
    endDate: string;
  }
  export interface T_Admin extends T_DB {
    userId: number;
    leagueId: number;
    role: number;
  }
  export interface T_Team extends T_DB {
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
  }
  export interface T_Match extends T_DB {
    leagueId: number;
    homeTeamId: number;
    awayTeamId: number;
    date: string;
    time: string;
    location: string;
    result: string;
    status: string;
  }
  export interface T_Matchup extends T_DB {
    playerId: number;
    matchId: string;
    teamId: number;
    points: number;
  }
  export interface T_Player extends T_DB {
    leagueId: number;
    teamId: number;
    name: string;
    email: string;
    avatar: string;
    points: number;
    jerseyNumber: number;
    height: string;
    weight: string;
    country: string;
    age: number;
    birthDate: string;
    role: number;
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