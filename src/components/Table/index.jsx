import { Card, Typography } from "@material-tailwind/react";
const TABLE_HEAD = ["Name", "Job", "Employed", ""];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

const Table = (props) => {
  const { columns, data } = props;

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
              <td>
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue"
                  className="font-medium"
                >
                  Edit
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
