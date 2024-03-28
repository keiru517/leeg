import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import Option from "../Option";
import * as actions from "../../actions";
import triupIconDark from "../../assets/img/dark_mode/triup-icon-dark.png";
import tridownIconDark from "../../assets/img/dark_mode/tridown-icon-dark.png";
import triupIconLight from "../../assets/img/dark_mode/triup-icon-light.png";
import tridownIconLight from "../../assets/img/dark_mode/tridown-icon-light.png";

const MatchTable = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { leagueId } = useParams();
  const isPublic = localStorage.getItem('token') ? false : true;
  const { keyword } = props;

  const darkMode = useSelector((state) => state.home.dark_mode);

  const teams = useSelector((state) => state.home.teams).filter(
    (team) => team.leagueId == leagueId
  );

  const matches = useSelector((state) => state.home.matches).filter((match) => {
    const homeTeam = teams.find((team) => team.id == match.homeTeamId);
    const awayTeam = teams.find((team) => team.id == match.awayTeamId);
    const status = match.isNew ? "Incomplete" : "Completed";
    const results = match.homeTeamPoints + ":" + match.awayTeamPoints;

    return (
      match.leagueId == leagueId &&
      match.isDeleted == 0 &&
      (match.homeTeamId == props.teamId || match.awayTeamId == props.teamId) &&
      (homeTeam?.name.toLowerCase().includes(keyword.toLowerCase()) ||
        awayTeam?.name.toLowerCase().includes(keyword.toLowerCase()) ||
        match.location?.toLowerCase().includes(keyword.toLowerCase()) ||
        match.date?.toLowerCase().includes(keyword.toLowerCase()) ||
        match.time?.toLowerCase().includes(keyword.toLowerCase()) ||
        status.toLowerCase().includes(keyword.toLowerCase()) ||
        results.toLowerCase().includes(keyword.toLowerCase()))
    );
  });

  const user = useSelector((state) => state.home.user);
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId && league.isDeleted !== 1
  );
  let leagueName = "pub-" + league?.name.replace(" ", "-")

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
    var columns = [
      "Date",
      "Location",
      "Time",
      "Home",
      "Away",
      "Results",
      "Status",
    ];
  }

  const options = [
    { id: 0, name: "Edit" },
    { id: 1, name: "Scoreboard" },
    { id: 2, name: "Statistics" },
    { id: 3, name: "Delete" },
  ];

  const handleOption = (idx, matchId) => {
    const match = matches.find((match) => match.id == matchId);
    // Clicked Edit
    if (idx === 0) {
      dispatch({ type: actions.OPEN_EDIT_MATCH_DIALOG, payload: match });
    }
    // Clicked scorebard
    else if (idx === 1) {
      navigate(`/${isPublic ? leagueName : "league"}/${leagueId}/matchup/${matchId}`);
    }
    // Clicked statistics
    else if (idx === 2) {
      dispatch({ type: actions.OPEN_MATCH_STATS_DIALOG, payload: { matchId: match.id, homeTeamId: match.homeTeamId, awayTeamId: match.awayTeamId } })
    }
    // Clicked delete
    else if (idx === 3) {
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

  const [sortField, setSortField] = useState("Date");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
  };

  matches.sort((a, b) => {
    if (sortField.toLowerCase() === "home") {
      a["home"] = teams.find((team) => team.id == a.homeTeamId)?.name;
      b["home"] = teams.find((team) => team.id == b.homeTeamId)?.name;
    } else if (sortField.toLowerCase() === "away") {
      a["away"] = teams.find((team) => team.id == a.awayTeamId)?.name;
      b["away"] = teams.find((team) => team.id == b.awayTeamId)?.name;
    } else if (sortField.toLowerCase() === "results") {
      a["results"] = a.homeTeamPoints + ":" + a.awayTeamPoints;
      b["results"] = b.homeTeamPoints + ":" + b.awayTeamPoints;
    } else if (sortField.toLowerCase() === "status") {
      a["status"] = a.isNew;
      b["status"] = b.isNew;
    } else if (sortField.toLowerCase() === "action") {
      return 1;
    }

    return (
      a[sortField.toLowerCase()]
        .toString()
        .localeCompare(b[sortField.toLowerCase()].toString(), "en", {
          numeric: true,
        }) * (order === "asc" ? 1 : -1)
    );
  });

  return (
    <div className="text-black dark:text-white h-5/6 w-full mt-4 overflow-auto">
      <table className="w-full min-w-max table-auto text-left">
        <thead className="sticky top-0 z-10 bg-white dark:bg-slate">
          <tr>
            {columns.map((head, idx) => (
              <th
                key={idx}
                className={`h-button text-center font-font-dark-gray font-normal text-sm hover:cursor-pointer ${head === "Action" ? "" : ""
                  }`}
                onClick={() => handleSortingChange(head)}
              >
                <div className="flex justify-center">
                  {head}
                  {head !== "Action" && (
                    <div className="ml-3">
                      <img
                        src={darkMode ? triupIconDark : triupIconLight}
                        alt=""
                        className="w-3 h-3 cursor-pointer hover:bg-opacity-70"
                      />
                      <img
                        src={darkMode ? tridownIconDark : tridownIconLight}
                        alt=""
                        className="w- h-3 cursor-pointer hover:bg-opacity-70"
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center text-sm">
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
                    className={`font-normal flex items-center justify-left sm:pl-8 ${isDeletedTeam(homeTeamId) ? "" : "hover:underline"
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
                        to={`/${isPublic ? leagueName : "league"}/${leagueId}/team/${homeTeamId}`}
                      >
                        <img
                          src={
                            teams.find((team) => team.id == homeTeamId)?.logo
                          }
                          alt=""
                          className="h-8 w-8 mr-2 rounded-full border border-gray-500"
                        />
                        <p
                          className={`text-black dark:text-white ${homeTeamPoints > awayTeamPoints && !isNew
                            ? "font-bold"
                            : ""
                            }`}
                        >
                          {teams.find((team) => team.id == homeTeamId)?.name}
                        </p>
                      </Link>
                    )}
                  </Typography>
                </td>
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className={`font-normal flex items-center justify-left sm:pl-8 ${isDeletedTeam(awayTeamId) ? "" : "hover:underline"
                      }`}
                  >
                    {isDeletedTeam(awayTeamId) ? (
                      <>
                        <img
                          src={
                            teams.find((team) => team.id == awayTeamId)?.logo
                          }
                          alt=""
                          className="h-8 w-8 mr-2 rounded-full border border-gray-500"
                        />
                        {teams.find((team) => team.id == awayTeamId)?.name}
                        <span className="bg-red-100 text-red-800 text-xs font-medium ml-3 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300 text-right">
                          Deleted
                        </span>
                      </>
                    ) : (
                      <Link
                        className="flex items-center space-x-3"
                        to={`/${isPublic ? leagueName : "league"}/${leagueId}/team/${awayTeamId}`}
                      >
                        <img
                          src={
                            teams.find((team) => team.id == awayTeamId)?.logo
                          }
                          alt=""
                          className="h-8 w-8 mr-2 rounded-full border border-gray-500"
                        />
                        <p
                          className={`text-black dark:text-white ${homeTeamPoints < awayTeamPoints && !isNew
                            ? "font-bold"
                            : ""
                            }`}
                        >
                          {teams.find((team) => team.id == awayTeamId)?.name}
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
                      className="mx-auto"
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
