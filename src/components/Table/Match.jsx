import { Card, Typography } from "@material-tailwind/react";
import actionIcon from '../../assets/img/dark_mode/action.png';
import teamLogo from '../../assets/img/dark_mode/team-logo.png';

const MatchTable = (props) => {
  const { matches, columns } = props;
  // const columns = [
  //   "Date",
  //   "Location",
  //   "Time",
  //   "Home",
  //   "Away",
  //   "Results",
  //   "Action",
  // ];

  return (
    <div className="text-white h-full w-full mt-4">
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
          {matches.map(({ date, location, time, home, away, results }, index) => (
            <tr key={index} className="even:bg-dark-gray odd:bg-charcoal">
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {date}
                </Typography>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {location}
                </Typography>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {time}
                </Typography>
              </td>
              <td className="">
                {/* <img src={mark} alt="" className="mr-3"/> */}
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal underline flex items-center"
                >
                  <img src={teamLogo} alt="" className="h-8 w-8 mr-2" />
                  {home}
                </Typography>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal underline flex items-center"
                >
                  <img src={teamLogo} alt="" className="h-8 w-8 mr-2" />
                  {away}
                </Typography>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {results}
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
                  <img src={actionIcon} alt="" className="mx-auto"/>
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchTable;
