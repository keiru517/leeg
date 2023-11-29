import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const StandingTable = (props) => {
  const { teams } = props;

  const columns = [
    "Position",
    "Team",
    "Wins",
    "Losses",
    "Points Scored",
    "Points Against",
    "Differential",
  ];

  return (
    <div className="text-black dark:text-white h-full w-full mt-4">
      <table className="w-full min-w-max table-auto text-left">
        <thead className="sticky top-0 z-10 bg-white dark:bg-slate">
          <tr>
            {columns.map((head, idx) => (
              <th key={idx} className="h-button text-center font-font-dark-gray">
                <Typography
                  variant="small"
                  className="font-normal leading-none "
                >
                  <p className="text-black dark:text-white">
                    {head}
                  </p>
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {teams.sort((a, b)=>b.win-a.win).map(({id, position, name, logo, win, lose, pointScored, pointAgainst, diff }, index) => (
            <tr key={index} className="odd:bg-light-dark-gray dark:odd:bg-dark-gray even:bg-light-charcoal dark:even:bg-charcoal">
              <td className="w-1">
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
                  className="font-normal flex items-center justify-left underline  sm:pl-8 space-x-3"
                >
                <img src={logo} alt="" className="h-8 w-8 mr-2 rounded-full" />
                <Link to={`team/${id}`}>
                  {name}
                </Link>
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
