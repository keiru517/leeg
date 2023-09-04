import { Card, Typography } from "@material-tailwind/react";
import actionIcon from "../../assets/img/dark_mode/action.png";
import teamLogo from "../../assets/img/dark_mode/team-logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = (props) => {
  const { leagueId, playerId } = props;
  const columns = [
    "Game Date",
    "Matchup",
    "Points Scored",
    "Result",
    // "PPG",
  ];

  const teams = useSelector((state) => state.home.teams);
  const player = useSelector((state) => state.home.players).find(player=>player.id == playerId);
  const matches = useSelector(state=>state.home.matches).filter(match=>match.homeTeamId == player.teamId || match.awayTeamId == player.teamId);
  console.log(matches)
  const matchups = useSelector(state=>state.home.matchups).filter(matchup=>matchup.playerId == playerId);

  return (
    <div className="text-white mt-5 w-full">
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
          {
            // matches.map(({ logo, name}, index) =>
            matches.map((match, idx) => (
              <tr
                key={idx}
                className="odd:bg-dark-gray even:bg-charcoal h-[53px]"
              >
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {match.date}
                  </Typography>
                </td>
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal flex items-center space-x-2 justify-center"
                  >
                    <img
                      src={
                        teams.find((team) => team.id == match.homeTeamId)
                          .logo
                      }
                      alt=""
                      className="w-8 h-8 "
                    />
                    <p className="underline">
                      <Link
                        to={`/league/${leagueId}/team/${match.homeTeamId}`}
                      >
                        {
                          teams.find((team) => team.id == match.homeTeamId)
                            .name
                        }
                      </Link>
                    </p>
                    <p className="text-font-dark-gray">VS</p>
                    <img
                      src={
                        teams.find((team) => team.id == match.awayTeamId)
                          .logo
                      }
                      alt=""
                      className="w-8 h-8 mr-2"
                    />
                    <p className="underline">
                      <Link
                        to={`/league/${leagueId}/team/${match.awayTeamId}`}
                      >
                        {
                          teams.find((team) => team.id == match.awayTeamId)
                            .name
                        }
                      </Link>
                    </p>
                  </Typography>
                </td>
                <td className="w-1/5">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {matchups.find(matchup=>matchup.matchId == match.id).points}
                  </Typography>
                </td>
                 <td className="w-1/5">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {match.result}
                  </Typography>
                </td>
                {/*
                <td className="w-1/5">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {player.ppg}
                  </Typography>
                </td> */}
              </tr>
            ))
            // )
          }
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
