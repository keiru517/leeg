import { Card, Typography } from "@material-tailwind/react";
import mark from '../../assets/img/mark.png';
import actionIcon from '../../assets/img/action.png';

const ScheduleTable = (props) => {
  const { data } = props;
  const columns = [
    "Date",
    "Location",
    "Time",
    "Home",
    "Away",
    "Results",
    "Action",
  ];

  return (
    <div className="text-white h-full w-full mt-4">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {columns.map((head, idx) => (
              <th key={idx} className="h-[53px] text-center font-table-border">
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
          {data.map(({ date, location, time, home, away, results }, index) => (
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
                  className="font-normal"
                >
                  {home}
                </Typography>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
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
                  className="font-medium"
                >
                  <img src={actionIcon} alt=""/>
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
