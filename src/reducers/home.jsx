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
  // blogs: [
  //   {
  //     id: 1,
  //     leagueId: 1,
  //     userId: 1,
  //     title: 'Slam Dunk Chronicles',
  //     description: "Flowbite is an open-source library of UI components built with the utility-first classes from Tailwind CSS. It also includes interactive elements such as dropdowns, modals, datepickers. Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way, you can think things through before committing to an actual design project. But then I found a component library based on Tailwind CSS called Flowbite. It comes with the most commonly used UI components, such as buttons, navigation bars, cards, form elements, and more which are conveniently built with the utility classes from Tailwind CSS.",
  //     comments: [
  //       {
  //         id: 1,
  //         parentId: 2,
  //         isBlogComment: true,
  //         userId: 2,
  //         description: "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
  //         likes: 0,
  //         dislikes: 1,
  //         createdAt: "2024-01-05T15:30:47.000Z"
  //       },
  //       {
  //         id: 2,
  //         parentId: 1,
  //         isBlogComment: false,
  //         userId: 1,
  //         description: "comment comment Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
  //         likes: 0,
  //         dislikes: 1,
  //         createdAt: "2024-01-08T15:30:47.000Z"
  //       },
  //       {
  //         id: 3,
  //         parentId: 1,
  //         isBlogComment: false,
  //         userId: 3,
  //         description: "This is comment coment Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
  //         likes: 0,
  //         dislikes: 1,
  //         createdAt: "2024-01-09T15:30:47.000Z"
  //       },
  //     ],
  //     createdAt: "2024-01-29T15:30:47.000Z"
  //   },
  //   {
  //     id: 2,
  //     leagueId: 1,
  //     userId: 2,
  //     title: "Hoops Hustle Hub",
  //     description: "From buzzer-beaters to trade rumors, Hoops Hustle Hub delivers a dynamic blend of basketball league insights. Join the discussion on game strategies, standout performances, and the race to the championship.",
  //     comments: [
  //       {
  //         id: 4,
  //         parentId: 2,
  //         isBlogComment: true,
  //         userId: 2,
  //         description: "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
  //         likes: 0,
  //         dislikes: 1,
  //         createdAt: "2024-01-01T15:30:47.000Z"
  //       },
  //       {
  //         id: 5,
  //         parentId: 4,
  //         isBlogComment: false,
  //         userId: 1,
  //         description: "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
  //         likes: 0,
  //         dislikes: 1,
  //         createdAt: "2024-01-24T15:30:47.000Z"
  //       },
  //       {
  //         id: 6,
  //         parentId: 2,
  //         isBlogComment: true,
  //         userId: 3,
  //         description: "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
  //         likes: 0,
  //         dislikes: 1,
  //         createdAt: "2024-01-25T15:30:47.000Z"
  //       },
  //     ],
  //     createdAt: "2024-01-16T15:30:47.000Z"
  //   },
  //   {
  //     id: 3,
  //     leagueId: 1,
  //     userId: 1,
  //     title: "Courtside Confidential",
  //     description: "Uncover the behind-the-scenes stories, locker room chatter, and exclusive interviews with players and coaches. Courtside Confidential takes you beyond the court for an intimate look at the basketball league's human side.",
  //     comments: [],
  //     createdAt: "2024-01-18T15:30:47.000Z"
  //   },
  //   {
  //     id: 4,
  //     leagueId: 1,
  //     userId: 3,
  //     title: "Net Navigators",
  //     description: "Navigate the intricate plays, tactical maneuvers, and statistical breakdowns with Net Navigators. This blog dives deep into the analytics, offering a strategic perspective on how teams are conquering the basketball league.",
  //     comments: [],
  //     createdAt: "2024-01-04T15:30:47.000Z"
  //   },
  //   {
  //     id: 5,
  //     leagueId: 1,
  //     userId: 1,
  //     title: "Triple Threat Tribune",
  //     description: "Stay ahead of the game with Triple Threat Tribune, your go-to source for triple-doubles, MVP races, and rising stars. This blog covers the entire basketball league landscape, from rookies making waves to veterans rewriting records.",
  //     comments: [],
  //     createdAt: "2024-01-27T15:30:47.000Z"
  //   },
  // ],
  blogs: [],
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
  blog_dialog: {
    open: false,
    type: "create",
    blog: {}
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
        user: {
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
    case actions.GET_BLOGS:
      return { ...state, blogs: action.payload }
    case actions.OPEN_CREATE_BLOG_DIALOG:
      return {
        ...state,
        blog_dialog: {
          ...state.blog_dialog,
          open: true,
        }
      };
    case actions.OPEN_EDIT_BLOG_DIALOG:
      return {
        ...state,
        blog_dialog: {
          open: true,
          type: "edit",
          blog: action.payload
        }
      };
    case actions.CLOSE_BLOG_DIALOG:
      return {
        ...state,
        blog_dialog: {
          open: false,
          type: "create",
          blog: {}
        }
      };
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
