import { Card, Typography } from "@material-tailwind/react";
import actionIcon from '../../assets/img/dark_mode/action.png';
import teamLogo from '../../assets/img/dark_mode/team-logo.png';

const StandingTable = (props) => {
  const { data } = props;

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
          {data.sort((a, b)=>a.position-b.position).map(({ position, name, statistics }, index) => (
            <tr key={index} className="odd:bg-dark-gray even:bg-charcoal">
              <td className="w-1/6">
                <Typography
                  variant="small"
                  className="font-normal"
                >
                  {position}
                </Typography>
              </td>
              <td className="w-1/6">
                <Typography
                  variant="small"
                  className="font-normal flex items-center underline"
                >
                <img src={teamLogo} alt="" className="h-8 w-8 mr-2" />
                  {name}
                </Typography>
              </td>
              <td className="">
                <Typography
                  variant="small"
                  className="font-normal"
                >
                  {statistics.w}
                </Typography>
              </td>
              <td  className="w-1/6">
                {/* <img src={mark} alt="" className="mr-3"/> */}
                <Typography
                  variant="small"
                  className="font-normal"
                >
                  {statistics.l}
                </Typography>
              </td>
              <td className="w-1/6">
                <Typography
                  variant="small"
                  className="font-normal"
                >
                  {statistics.ps}
                </Typography>
              </td>
              <td className="">
                <Typography
                  variant="small"
                  className="font-normal"
                >
                  {statistics.pa}
                </Typography>
              </td>
              <td className="">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  className="font-normal"
                >
                  {statistics.diff}
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
