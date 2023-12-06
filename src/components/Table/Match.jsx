import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import Option from "../Option";
import * as actions from "../../actions";
import Table from "./index";

const MatchTable = ({matches, leagueId}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.home.user);
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId && league.isDeleted !== 1
  );

  const admins = useSelector((state) => state.home.admins).filter(
    (admin) => admin.leagueId == league?.id && admin.isDeleted !== 1
  );

  const isAdmin =
    admins.some((admin) => admin.userId == user?.id) ||
    league?.userId == user?.id;

  // let { leagueId} = useParams();

  const columns = [
    {
      label: 'Date',
      getValue: (row) => row.date
    },
    {
      label: 'Location',
      getValue: (row) => row.location
    },
    {
      label: 'Time',
      getValue: (row) => row.time
    },
    {
      label: 'Home',
      getValue: (row) => (
        <Typography
            variant="small"
            color="blue-gray"
            className={`font-normal flex items-center justify-left sm:pl-8 ${
                isDeletedTeam(row.homeTeamId) ? "" : "underline"
            }`}
        >
          {isDeletedTeam(row.homeTeamId) ? (
              <>
                <img
                    src={row.logo}
                    alt=""
                    className="h-8 w-8 mr-2 rounded-full border border-gray-500"
                />
                {row.name}
                <span className="bg-red-100 text-red-800 text-xs font-medium ml-3 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300 text-right">
                    Deleted
                </span>
              </>
          ) : (
              <Link
                  className="flex items-center space-x-3"
                  to={`/league/${leagueId}/team/${row.homeTeamId}`}
              >
                <img
                    src={row.logo}
                    alt=""
                    className="h-8 w-8 mr-2 rounded-full border border-gray-500"
                />
                <p
                    className={`text-black dark:text-white truncate w-32 ${
                        row.homeTeamPoints > row.awayTeamPoints && !row.isNew
                            ? "font-bold"
                            : ""
                    }`}
                >
                  {row.name}
                </p>
              </Link>
          )}
        </Typography>
      )
    },
    {
      label: 'Away',
      getValue: (row) => (
          <Typography
              variant="small"
              color="blue-gray"
              className={`font-normal flex items-center justify-left sm:pl-8 ${
                  isDeletedTeam(row.awayTeamId) ? "" : "underline"
              }`}
          >
            {isDeletedTeam(row.awayTeamId) ? (
                <>
                  <img
                      src={row.logo}
                      alt=""
                      className="h-8 w-8 mr-2 rounded-full border border-gray-500"
                  />
                  {row.name}
                  <span className="bg-red-100 text-red-800 text-xs font-medium ml-3 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300 text-right">
                    Deleted
                  </span>
                </>
            ) : (
                <Link
                    className="flex items-center space-x-3"
                    to={`/league/${leagueId}/team/${row.awayTeamId}`}
                >
                  <img
                      src={row.logo}
                      alt=""
                      className="h-8 w-8 mr-2 rounded-full border border-gray-500"
                  />
                  <p
                      className={`text-black dark:text-white truncate w-32 ${
                          row.homeTeamPoints < row.awayTeamPoints && !row.isNew
                              ? "font-bold"
                              : ""
                      }`}
                  >
                    {row.name}
                  </p>
                </Link>
            )}
          </Typography>
      )
    },
    {
      label: 'Results',
      getValue: (row) => (
          <Typography>
            {row.homeTeamPoints} : {row.awayTeamPoints}
          </Typography>
      )
    },
    {
      label: 'Status',
      condition: isAdmin,
      getValue: (row) => (
          <Typography>
            {row.isNew ? "Incomplete" : "Completed"}
          </Typography>
      )
    },
    {
      label: "Action",
      condition: isAdmin,
      getValue:(row) => (
          <Option
              options={options}
              handleClick={(idx) => handleOption(idx, row.id)}
          ></Option>
      )
    }

  ]

  const options = [
    { id: 0, name: "Edit" },
    { id: 1, name: "Scoreboard" },
    { id: 2, name: "Delete" },
  ];

  const teams = useSelector((state) => state.home.teams);

  const handleOption = (idx, matchId) => {
    const match = matches.find((match) => match.id == matchId);
    // Clicked Edit
    if (idx === 0) {
      dispatch({ type: actions.OPEN_EDIT_MATCH_DIALOG, payload: match });
    }
    // Clicked scorebard
    else if (idx === 1) {
      navigate(`/league/${leagueId}/matchup/${matchId}`);
    }
    // Clicked delete
    else if (idx === 2) {
      if (!match.isNew) {
        actions.incompleteMatchup(dispatch, { matchId });
      }
      actions.deleteMatch(dispatch, matchId);
    }
  };

  const isDeletedTeam = (teamId) => {
    const team = teams.find((team) => team.id == teamId);
    if (team?.isDeleted === 1) return true;
    else return false;
  };

  return (
    <div className="text-black dark:text-white w-full mt-4">
      <Table
          data={matches}
          columns={columns}
          optionsPlacement={"rows"}
      />
    </div>
  );
};

export default MatchTable;
