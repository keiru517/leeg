import { Link } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";
import actionIcon from "../../assets/img/dark_mode/action.png";
import { useParams } from "react-router";
import teamLogo from "../../assets/img/dark_mode/team-logo.png";
import { useSelector } from "react-redux";

const LineupTable = (props) => {
  const { data, league_id } = props;

  // let { league_id} = useParams();
  const columns = [
 "#",
 "Players",
 "#"
  ];

  const teams = useSelector((state) => state.home.teams);
  const players = useSelector((state) => state.home.players);

  return (
    <div className="text-white h-full w-full overflow-y-scroll">
      <table className="h-[371px] w-full min-w-max table-auto text-left">
        <thead className="">
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
          {players.map((player, index) => (
            // <Link to={`matchup/${id}`}>
            <tr key={index} className="odd:bg-dark-gray even:bg-charcoal w-full">
              <td className="">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {index + 1}
                </Typography>
              </td>
              <td className="">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal flex items-center"
                >
                  <img src={player.avatar} alt="" className="w-8 h-8 mr-2"/>
                  {player.name}
                </Typography>
              </td>
              <td className="">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal flex items-center"
                >
                  <img src={player.avatar} alt="" className="w-5 h-5 mr-2"/>
                </Typography>
              </td>
            </tr>
            // </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LineupTable;
