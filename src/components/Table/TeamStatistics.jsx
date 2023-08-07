import { Card, Typography } from "@material-tailwind/react";
import actionIcon from '../../assets/img/dark_mode/action.png';
import teamLogo from '../../assets/img/dark_mode/team-logo.png';

const TeamStatistics = (props) => {
  const { data } = props;
  const columns = [
    "W",
    "L",
    "Point Scored",
    "Point Against",
    "Diff",
  ];

  return (
    <div className="text-white mt-5 w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {columns.map((head, idx) => (
              <th key={idx} className="h-button text-center font-font-dark-gray">
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
          {/* {data.map(({ w, l, ps, pa, diff}, index) => ( */}
            <tr className="odd:bg-dark-gray even:bg-charcoal h-[53px]">
              <td className="w-1/5">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {data.w}
                </Typography>
              </td>
              <td className="w-1/5">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {data.l}
                </Typography>
              </td>
              <td className="w-1/5">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {data.ps}
                </Typography>
              </td>
              <td className="w-1/5">
                {/* <img src={mark} alt="" className="mr-3"/> */}
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {data.ps}
                </Typography>
              </td>
              <td className="w-1/5">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {data.diff}
                </Typography>
              </td>
            </tr>
          {/* ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default TeamStatistics;
