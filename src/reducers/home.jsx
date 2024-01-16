import * as actions from "../actions";

const initialState = {
  dark_mode: true,
  user: {},
  users: [],
  leagues: [],
  teams: [],
  matches: [],
  matchups: [],
  logs: [],
  players: [],
  substitutes: [],
  admins: [],
  league_password_dialog: {
    open: false,
    type: "",
    league: [],
  },
  league_dialog: {
    open: false,
    type: "create",
    league: [],
  },
  league_detail_dialog: {
    open: false,
    league: [],
  },
  select_player_dialog: {
    open: false,
  },
  matchup_setting_dialog: {
    open: false,
  },
  matchup_player_stats_dialog: {
    open: false,
    id: "",
  },
  event_dialog: {
    open: false,
    type: "",
    logId: "",
  },
  player_dialog: {
    open: false,
  },
  admin_dialog: {
    open: false,
  },
  jersey_number_dialog: {
    open: false,
  },
  team_dialog: {
    open: false,
    type: "create",
    team: [],
  },
  match_dialog: {
    open: false,
    type: "",
    match: [],
  },
  substitute_dialog: {
    open: false,
    id: "",
  },
  lineup_dialog: {
    open: false,
    id: "",
  },
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_DARK_MODE:
      return { ...state, dark_mode: action.payload };
    case actions.GET_USER:
      return { ...state, user: action.payload };
    case actions.GET_USERS:
      return { ...state, users: action.payload };
    case actions.UPDATE_AVATAR_URL:
      return {
        ...state,
        user:{
          ...state.user,
          avatar: action.payload
        }
      }
    case actions.GET_COUNTRIES:
      return { ...state, countries: action.payload };
    case actions.GET_LEAGUES:
      return { ...state, leagues: action.payload };

    case actions.OPEN_CREATE_LEAGUE_DIALOG:
      return {
        ...state,
        league_dialog: {
          open: action.payload,
          type: "create",
          league: [],
        },
      };

    case actions.CLOSE_LEAGUE_DIALOG:
      return {
        ...state,
        league_dialog: {
          open: false,
          type: "",
          league: [],
        },
      };

    case actions.OPEN_EDIT_LEAGUE_DIALOG:
      return {
        ...state,
        league_dialog: {
          open: true,
          type: "edit",
          league: action.payload,
        },
      };

    case actions.OPEN_DELETE_LEAGUE_DIALOG:
      return {
        ...state,
        league_dialog: {
          open: true,
          type: "delete",
          league: action.payload,
        },
      };

    case actions.OPEN_SET_LEAGUE_PASSWORD_DIALOG:
      return {
        ...state,
        league_password_dialog: {
          open: true,
          type: "create",
          league: action.payload,
        },
      };
    case actions.OPEN_REMOVE_LEAGUE_PASSWORD_DIALOG:
      return {
        ...state,
        league_password_dialog: {
          open: true,
          type: "remove",
          league: action.payload,
        },
      };
    case actions.OPEN_APPLY_LEAGUE_PASSWORD_DIALOG:
      return {
        ...state,
        league_password_dialog: {
          open: true,
          type: "apply",
          league: action.payload,
        },
      };
    case actions.CLOSE_LEAGUE_PASSWORD_DIALOG:
      return {
        ...state,
        league_password_dialog: {
          open: false,
          type: "",
          league: [],
        },
      };
    case actions.OPEN_LEAGUE_DETAIL_DIALOG:
      return {
        ...state,
        league_detail_dialog: {
          open: true,
          league: action.payload,
        },
      };
    case actions.CLOSE_LEAGUE_DETAIL_DIALOG:
      return {
        ...state,
        league_detail_dialog: {
          ...state.league_detail_dialog,
          open: false,
        },
      };

    // case actions.SET_LEAGUE_LOGO_URL:
    //   return {
    //     ...state,
    //     leagues: state.leagues.map((league) =>
    //       league.id == action.payload.id
    //         ? { ...league, logo: action.payload.logoUrl }
    //         : league
    //     ),
    //   };

    // Team
    case actions.GET_TEAMS:
      return { ...state, teams: action.payload };

    case actions.OPEN_INVITE_PLAYER_DIALOG:
      return {
        ...state,
        player_dialog: {
          ...state.player_dialog,
          open: action.payload,
        },
      };

    case actions.OPEN_SELECT_PLAYER_DIALOG:
      return {
        ...state,
        select_player_dialog: {
          ...state.player_dialog,
          open: action.payload,
        },
      };

    case actions.OPEN_CREATE_TEAM_DIALOG:
      return {
        ...state,
        team_dialog: {
          open: action.payload,
          type: "create",
          team: [],
        },
      };

    case actions.OPEN_EDIT_TEAM_DIALOG:
      return {
        ...state,
        team_dialog: {
          open: true,
          type: "edit",
          team: action.payload,
        },
      };

    case actions.CLOSE_TEAM_DIALOG:
      return {
        ...state,
        team_dialog: {
          ...state.team_dialog,
          open: false,
        },
      };

    case actions.SET_TEAM_LOGO_URL:
      return {
        ...state,
        teams: state.teams.map((team) =>
          team.id == action.payload.id
            ? {
                ...team,
                logo: action.payload.logoUrl,
              }
            : team
        ),
      };

    // match
    case actions.GET_MATCHES:
      return {
        ...state,
        matches: action.payload,
      };

    case actions.OPEN_CREATE_MATCH_DIALOG:
      return {
        ...state,
        match_dialog: {
          open: true,
          type: "create",
          match: [],
        },
      };

    case actions.OPEN_EDIT_MATCH_DIALOG:
      return {
        ...state,
        match_dialog: {
          open: true,
          type: "edit",
          match: action.payload,
        },
      };

    case actions.CLOSE_MATCH_DIALOG:
      return {
        ...state,
        match_dialog: {
          open: false,
          type: "",
          match: [],
        },
      };

    // matchups
    case actions.GET_MATCHUPS:
      return {
        ...state,
        matchups: action.payload,
      };
    // logs
    case actions.GET_LOGS:
      return {
        ...state,
        logs: action.payload,
      };

    case actions.OPEN_MATCHUP_SETTING_DIALOG:
      return {
        ...state,
        matchup_setting_dialog: {
          open: action.payload,
        },
      };
    case actions.OPEN_PLAYER_STATS_DIALOG:
      return {
        ...state,
        matchup_player_stats_dialog: {
          open: true,
          id: action.payload,
        },
      };
    case actions.CLOSE_PLAYER_STATS_DIALOG:
      return {
        ...state,
        matchup_player_stats_dialog: {
          open: false,
          id: "",
        },
      };
    case actions.OPEN_ADD_EVENT_DIALOG:
      return {
        ...state,
        event_dialog: {
          open: true,
          type: "add",
          logId: "action.payload",
        },
      };
    case actions.OPEN_EDIT_EVENT_DIALOG:
      return {
        ...state,
        event_dialog: {
          open: true,
          type: "edit",
          logId: action.payload,
        },
      };
    case actions.CLOSE_EDIT_EVENT_DIALOG:
      return {
        ...state,
        event_dialog: {
          open: false,
          type: "",
          logId: "",
        },
      };

    case actions.OPEN_ADD_PLAYER_DIALOG:
      return {
        ...state,
        team_dialog: {
          open: true,
          type: "addPlayer",
          team: action.payload,
        },
      };

    case actions.OPEN_DELETE_TEAM_DIALOG:
      return {
        ...state,
        team_dialog: {
          open: true,
          type: "delete",
          team: action.payload,
        },
      };

    case actions.GET_PLAYERS:
      return {
        ...state,
        players: action.payload,
      };

    case actions.GET_ADMINS:
      return {
        ...state,
        admins: action.payload,
      };

    case actions.GET_SUBSTITUES:
      return {
        ...state,
        substitutes: action.payload,
      };
    case actions.OPEN_ADD_SUBSTITUTE_DIALOG:
      return {
        ...state,
        substitute_dialog: {
          open: true,
          id: action.payload,
        },
      };

    case actions.CLOSE_ADD_SUBSTITUTE_DIALOG:
      return {
        ...state,
        substitute_dialog: {
          ...state.substitute_dialog,
          open: false,
        },
      };
    case actions.OPEN_LINEUP_DIALOG:
      return {
        ...state,
        lineup_dialog: {
          open: true,
          id: action.payload,
        },
      };

    case actions.CLOSE_LINEUP_DIALOG:
      return {
        ...state,
        lineup_dialog: {
          open: false,
        },
      };

    // admin
    case actions.OPEN_ADMIN_DIALOG:
      return {
        ...state,
        admin_dialog: {
          open: action.payload,
        },
      };
    default:
      return state;
  }
};

export default home;
