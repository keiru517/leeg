import { Card, Typography } from "@material-tailwind/react";
import actionIcon from '../../assets/img/dark_mode/action.png';
import teamLogo from '../../assets/img/dark_mode/team-logo.png';

const StandingTable = (props) => {
  const { teams } = props;

  const columns = [
    "Position",
    "Team",
    "W",
    "L",
    "Point Scored",
    "Point Against",
    "Diff",
  ];

  return (
    <div className="text-white h-full w-full mt-4">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {columns.map((head, idx) => (
              <th key={idx} className="h-button text-center font-font-dark-gray">
                <Typography
                  variant="small"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {teams.sort((a, b)=>b.win-a.win).map(({ position, name, logo, win, lose, pointScored, pointAgainst, diff }, index) => (
            <tr key={index} className="odd:bg-dark-gray even:bg-charcoal">
              <td className="w-1/6">
                <Typography
                  variant="small"
                  className="font-normal"
                >
                  {index + 1}
                </Typography>
              </td>
              <td className="w-1/6">
                <Typography
                  variant="small"
                  className="font-normal flex items-center underline justify-between px-8"
                >
                <img src={logo} alt="" className="h-8 w-8 mr-2 rounded-default" />
                  {name}
                </Typography>
              </td>
              <td className="w-1/6">
                <Typography
                  variant="small"
                  className="font-normal"
                >
                  {win}
                </Typography>
              </td>
              <td  className="w-1/6">
                {/* <img src={mark} alt="" className="mr-3"/> */}
                <Typography
                  variant="small"
                  className="font-normal"
                >
                  {lose}
                </Typography>
              </td>
              <td className="w-1/6">
                <Typography
                  variant="small"
                  className="font-normal"
                >
                  {pointScored}
                </Typography>
              </td>
              <td className="">
                <Typography
                  variant="small"
                  className="font-normal"
                >
                  {pointAgainst}
                </Typography>
              </td>
              <td className="">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  className="font-normal"
                >
                  {diff}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingTable;
