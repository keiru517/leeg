export namespace Types {
  export type T_ENV = 'development' | 'test' | 'production';
  export interface T_DB {
    id: number;
    createdAt?: string;
    updatedAt?: string;
  }
  export interface T_User extends T_DB {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  export interface T_League extends T_DB {
    name: string;
    description: string;
    logo: string;
    startDate: string;
    endDate: string;
  }
  export interface T_Team extends T_DB {
    leagueId: number;
    name: string;
    logo: string;
    position: number;
    max: number;
    min: number;
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
    homeTeamId: number;
    awayTeamId: number;
    date: string;
    ps: number;
    gp: number;
    ppg: number;
  }
  export interface T_PLAYER extends T_DB {
    teamId: number;
    name: string;
    avatar: string;
    pts: number;
    jerseyNumber: number;
    height: string;
    weight: string;
    country: string;
    age: number;
    birthDate: string;
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
