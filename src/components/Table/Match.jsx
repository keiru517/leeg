import { Link, useNavigate } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";
import actionIcon from "../../assets/img/dark_mode/action.png";
import { useParams } from "react-router";
import teamLogo from "../../assets/img/dark_mode/team-logo.png";
import { useSelector } from "react-redux";

const MatchTable = (props) => {
  const naviage = useNavigate();
  const { matches, leagueId } = props;

  // let { leagueId} = useParams();
  const columns = [
    "Date",
    "Location",
    "Time",
    "Home",
    "Away",
    "Results",
    "Action",
  ];

  const teams = useSelector((state) => state.home.teams);

  const goToMatchup = (id) => {
    naviage(`/league/${leagueId}/matchup/${id}`)
  }

  return (
    <div className="text-white h-full w-full mt-4">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {columns.map((head, idx) => (
              <th
                key={idx}
                className="h-button text-center font-font-dark-gray"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
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
                result,
              },
              index
            ) => (
              // <Link to={`matchup/${id}`}>
                <tr onClick={()=>goToMatchup(id)} key={index} className="odd:bg-dark-gray even:bg-charcoal  hover:opacity-70">
                  <td className="w-1/6">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {date}
                    </Typography>
                  </td>
                  <td className="w-1/6">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {location}
                    </Typography>
                  </td>
                  <td className="">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {time}
                    </Typography>
                  </td>
                  <td className="w-1/6">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal underline flex items-center"
                    >
                      <Link
                        className="flex items-center"
                        to={`/league/${leagueId}/team/${homeTeamId}`}
                      >
                        <img
                          src={
                            teams.find((team) => team.id == homeTeamId).logo
                          }
                          alt=""
                          className="h-8 w-8 mr-2"
                        />
                        {teams.find((team) => team.id == homeTeamId).name}
                      </Link>
                    </Typography>
                  </td>
                  <td className="w-1/6">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal underline flex items-center"
                    >
                      <Link
                        className="flex items-center"
                        to={`/league/${leagueId}/team/${awayTeamId}`}
                      >
                        <img
                          src={
                            teams.find((team) => team.id == awayTeamId).logo
                          }
                          alt=""
                          className="h-8 w-8 mr-2"
                        />
                        {teams.find((team) => team.id == awayTeamId).name}
                      </Link>
                    </Typography>
                  </td>
                  <td className="">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {result}
                    </Typography>
                  </td>
                  <td className="">
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue"
                      className="font-medium justify-between "
                    >
                      <img src={actionIcon} alt="" className="mx-auto" />
                    </Typography>
                  </td>
                </tr>
              // </Link>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MatchTable;
