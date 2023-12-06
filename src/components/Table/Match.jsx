import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import Option from "../Option";
import * as actions from "../../actions";

const MatchTable = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { matches, leagueId } = props;

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

  var columns = [];
  if (isAdmin) {
    var columns = [
      "Date",
      "Location",
      "Time",
      "Home",
      "Away",
      "Results",
      "Status",
      "Action",
    ];
  } else {
    var columns = ["Date", "Location", "Time", "Home", "Away", "Results", "Status"];
  }

  const options = [
    { id: 0, name: "Edit" },
    { id: 1, name: "Scoreboard" },
    { id: 2, name: "Delete" },
  ];

  const teams = useSelector((state) => state.home.teams);

  // const goToMatchup = (id) => {
  //   navigate(`/league/${leagueId}/matchup/${id}`)
  // }

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
    <div className="text-black dark:text-white h-5/6 w-full mt-4 overflow-auto">
      <table className="w-full min-w-max table-auto text-left">
        <thead className="sticky top-0 z-10 bg-white dark:bg-slate">
          <tr>
            {columns.map((head, idx) => (
              <th
                key={idx}
                className={`h-button text-center font-font-dark-gray font-normal text-sm ${head==="Action"?"":""}`}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {matches.map(
            (
              {
                id,
                date,
                location,
                homeTeamId,
                awayTeamId,
                time,
                homeTeamPoints,
                awayTeamPoints,
                isNew,
              },
              index
            ) => (
              // <tr onClick={()=>goToMatchup(id)} key={index} className="odd:bg-dark-gray even:bg-charcoal  hover:">
              <tr
                key={index}
                // className="odd:bg-light-dark-gray dark:odd:bg-dark-gray even:bg-light-charcoal dark:even:bg-charcoal"
              >
                <td className="1/6">{date}</td>
                <td className="1/6">{location}</td>
                <td className="1/6">{time}</td>
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className={`font-normal flex items-center justify-left sm:pl-8 ${
                      isDeletedTeam(homeTeamId) ? "" : "underline"
                    }`}
                  >
                    {isDeletedTeam(homeTeamId) ? (
                      <>
                        <img
                          src={teams.find((team) => team.id == homeTeamId).logo}
                          alt=""
                          className="h-8 w-8 mr-2 rounded-full border border-gray-500"
                        />
                        {teams.find((team) => team.id == homeTeamId).name}
                        <span className="bg-red-100 text-red-800 text-xs font-medium ml-3 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300 text-right">
                          Deleted
                        </span>
                      </>
                    ) : (
                      <Link
                        className="flex items-center space-x-3"
                        to={`/league/${leagueId}/team/${homeTeamId}`}
                      >
                        <img
                          src={teams.find((team) => team.id == homeTeamId)?.logo}
                          alt=""
                          className="h-8 w-8 mr-2 rounded-full border border-gray-500"
                        />
                        <p
                          className={`text-black dark:text-white truncate w-32 ${
                            homeTeamPoints > awayTeamPoints && !isNew
                              ? "font-bold"
                              : ""
                          }`}
                        >
                          {teams.find((team) => team.id == homeTeamId).name}
                        </p>
                      </Link>
                    )}
                  </Typography>
                </td>
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className={`font-normal flex items-center justify-left sm:pl-8 ${
                      isDeletedTeam(awayTeamId) ? "" : "underline"
                    }`}
                  >
                    {isDeletedTeam(awayTeamId) ? (
                      <>
                        <img
                          src={teams.find((team) => team.id == awayTeamId).logo}
                          alt=""
                          className="h-8 w-8 mr-2 rounded-full border border-gray-500"
                        />
                        {teams.find((team) => team.id == awayTeamId).name}
                        <span className="bg-red-100 text-red-800 text-xs font-medium ml-3 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300 text-right">
                          Deleted
                        </span>
                      </>
                    ) : (
                      <Link
                        className="flex items-center space-x-3"
                        to={`/league/${leagueId}/team/${awayTeamId}`}
                      >
                        <img
                          src={teams.find((team) => team.id == awayTeamId).logo}
                          alt=""
                          className="h-8 w-8 mr-2 rounded-full border border-gray-500"
                        />
                        <p
                          className={`text-black dark:text-white truncate w-32 ${
                            homeTeamPoints < awayTeamPoints && !isNew
                              ? "font-bold"
                              : ""
                          }`}
                        >
                          {teams.find((team) => team.id == awayTeamId).name}
                        </p>
                      </Link>
                    )}
                  </Typography>
                </td>
                <td className="1/6">
                  {homeTeamPoints} : {awayTeamPoints}
                </td>
                <td className="">{isNew ? "Incomplete" : "Completed"}</td>
                {isAdmin && (
                  <td className="">
                    <Option
                      options={options}
                      handleClick={(idx) => handleOption(idx, id)}
                    ></Option>
                  </td>
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MatchTable;
