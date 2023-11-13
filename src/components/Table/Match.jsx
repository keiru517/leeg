import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import Option from "../Option";

const MatchTable = (props) => {
  const navigate = useNavigate();
  const { matches, leagueId } = props;

  // let { leagueId} = useParams();
  const user = useSelector((state) => state.home.user);
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId && league.isDeleted !== 1
  );

  var columns = [];
  if (league?.userId == user?.id) {
    var columns = [
      "Date",
      "Location",
      "Time",
      "Home",
      "Away",
      "Results",
      "Action",
    ];
  } else {
    var columns = ["Date", "Location", "Time", "Home", "Away", "Results"];
  }

  const options = [
    { id: 0, name: "Edit" },
    { id: 1, name: "Delete" },
  ];

  const teams = useSelector((state) => state.home.teams);

  // const goToMatchup = (id) => {
  //   navigate(`/league/${leagueId}/matchup/${id}`)
  // }

  const handleOption = (idx, matchId) => {
    if (idx === 0) {
      navigate(`/league/${leagueId}/matchup/${matchId}`);
    } else if (idx === 1) {
      alert("Match has been deleted");
    }
  };

  const isDeletedTeam = (teamId) => {
    const team = teams.find((team) => team.id == teamId);
    if (team.isDeleted === 1) return true;
    else return false;
  };

  return (
    <div className="text-black dark:text-white h-full w-full mt-4">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {columns.map((head, idx) => (
              <th
                key={idx}
                className="h-button text-center font-font-dark-gray font-normal  text-sm"
              >
                  {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {matches.map(
            (
              { id, date, location, homeTeamId, awayTeamId, time, homeTeamPoints, awayTeamPoints },
              index
            ) => (
              // <tr onClick={()=>goToMatchup(id)} key={index} className="odd:bg-dark-gray even:bg-charcoal  hover:">
              <tr key={index} className="odd:bg-light-dark-gray dark:odd:bg-dark-gray even:bg-light-charcoal dark:even:bg-charcoal">
                <td className="w-1/7">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {date}
                  </Typography>
                </td>
                <td className="w-1/7">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {location}
                  </Typography>
                </td>
                <td className="w-1/7">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {time}
                  </Typography>
                </td>
                <td className="w-1/7">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className={`font-normal flex items-center justify-center ${
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
                        className="flex items-center"
                        to={`/league/${leagueId}/team/${homeTeamId}`}
                      >
                        <img
                          src={teams.find((team) => team.id == homeTeamId).logo}
                          alt=""
                          className="h-8 w-8 mr-2 rounded-full border border-gray-500"
                        />
                        {teams.find((team) => team.id == homeTeamId).name}
                      </Link>
                    )}
                  </Typography>
                </td>
                <td className="w-1/7">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className={`font-normal flex items-center justify-center ${
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
                        className="flex items-center"
                        to={`/league/${leagueId}/team/${awayTeamId}`}
                      >
                        <img
                          src={teams.find((team) => team.id == awayTeamId).logo}
                          alt=""
                          className="h-8 w-8 mr-2 rounded-full border border-gray-500"
                        />
                        {teams.find((team) => team.id == awayTeamId).name}
                      </Link>
                    )}
                  </Typography>
                </td>
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {homeTeamPoints} : {awayTeamPoints}
                  </Typography>
                </td>
                {league?.userId == user?.id ? (
                  <td className="w-1/7">
                    <Option
                      options={options}
                      handleClick={(idx) => handleOption(idx, id)}
                    ></Option>
                  </td>
                ) : (
                  ""
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
