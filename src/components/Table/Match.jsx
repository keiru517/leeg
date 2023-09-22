import { Link, useNavigate } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";
import actionIcon from "../../assets/img/dark_mode/action.png";
import { useParams } from "react-router";
import teamLogo from "../../assets/img/dark_mode/team-logo.png";
import { useSelector } from "react-redux";
import Option from '../Option';

const MatchTable = (props) => {
  const navigate = useNavigate();
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
      navigate(`matchup/${matchId}`)
    } else if (idx=== 1) {
      alert("Match has been deleted")
    }
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
                // <tr onClick={()=>goToMatchup(id)} key={index} className="odd:bg-dark-gray even:bg-charcoal  hover:opacity-70">
                <tr key={index} className="odd:bg-dark-gray even:bg-charcoal ">
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
                      className="font-normal flex items-center justify-center underline"
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
                          className="h-8 w-8 mr-2 rounded-default"
                        />
                        {teams.find((team) => team.id == homeTeamId).name}
                      </Link>
                    </Typography>
                  </td>
                  <td className="w-1/7">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal flex items-center justify-center underline"
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
                          className="h-8 w-8 mr-2 rounded-default"
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
                  <td className="w-1/7">
                    {/* <Typography
                      // as="a"
                      variant="small"
                      color="blue"
                      className="font-medium justify-between "
                    > */}
                      <Option options={options} handleClick={(idx)=>handleOption(idx, id)}></Option>
                    {/* </Typography> */}
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
